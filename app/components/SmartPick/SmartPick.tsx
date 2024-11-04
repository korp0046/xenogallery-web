'use client'

/* Core */
import useWindowSize from '@/app/hooks/useWindowSize';
import { useEffect, useRef, useState } from 'react';

import { md2html } from '@/lib/util/util';

import _ from 'lodash';

/* Instruments */
import {
    selectToken,
    useDispatch,
    useSelector
} from '@/lib/redux';
import Loading from '../Loading/Loading';
import axios from 'axios';

import styles from './smartpick.module.css';
import editorstyles from '../Editors/editor.module.css';
import { elementThumbs, sheetIcons, uiIcons } from '@/lib/gamedata/imgAssets';
import SimpleIconButton from '../SimpleLabel/SimpleIconButton';

function PowerRow(props: any){
    const [expanded, setExpanded] = useState(false);
    return(
        <>
            <tr onClick={()=>setExpanded(!expanded)}>
                <td className={editorstyles.elemtext}>{props.data.name}</td>
                <td className={editorstyles.elemtext}>{props.data.system.level}</td>
                <td>
                    {
                        props.data.system.element ?
                        Object.keys(props.data.system.element).filter((el2)=>props.data.system.element[el2]).map((el3: any, idx3: any)=>{
                            return(
                                <img className={editorstyles.tinyimg} key={idx3} src={elementThumbs[el3]} />
                            ); 
                        })
                        :
                        null
                    }
                </td>
                <td className={editorstyles.elemtext}>{props.data.system.recharge}</td>
                <td className={editorstyles.elemtext}>{props.data.system.build}</td>
            </tr>
            {
                expanded ?
                    <tr><td colSpan={33} dangerouslySetInnerHTML={{__html: md2html(props.data.system.description)}}></td></tr>
                    : null
            }
        </>
    )
}

export default function SmartPick(props: any){
    const dispatch = useDispatch();
    const size = useWindowSize();
    const [data, setData] = useState([]);
    const [allFlags, setAllFlags] = useState([]);
    const [allTags, setAllTags] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const token = useSelector(selectToken);
    useEffect(()=>{
        (async function() {
            try {
                let headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${token}`
                };
                const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/powers`, {queryFind: {"name": '/.*/'}, public: true, flagsExclude: ['npc'], queryStart: 0, queryLimit: 9999, querySort: {"name": 1}, queryType: 'any'}, { headers: headers });
                const result = response.data;
                setCount(result.count);
                setAllFlags(result.allflags);
                setAllTags(result.alltags);
                setData(result.data);
                setLoading(false);
            } catch (e) {
                console.error(e);
            }
        })();
      }, [])


    return(
        <div className={styles.main}>
                {
                    loading  ? <Loading /> : null
                }
                <div className={styles.overflow}>
                    <table className={editorstyles.editortable}>
                    <thead className={editorstyles.editortable}>
                    <tr>
                        <th>Power Name</th>
                        <th>Level</th>
                        <th>Elements</th>
                        <th><SimpleIconButton img={sheetIcons.recharge} tooltip="Recharge Threshold"/></th>
                        <th><SimpleIconButton img={sheetIcons.powerpoints} tooltip="Power Point Cost"/></th>
                            </tr>
                        </thead>
                        <tbody  className={editorstyles.editortable}>
                        {
                        data.map((el:any,idx:any)=>{
                            return(
                                <PowerRow data={el} key={idx} />
                            )
                        })
                        }
                        </tbody>
                    </table>
    
                </div>
        </div>
    );
}
