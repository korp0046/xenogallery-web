'use client'

/* Core */
import useWindowSize from '@/app/hooks/useWindowSize';
import { useEffect, useRef, useState } from 'react';
import _ from 'lodash';

/* Instruments */
import {
    getGamedocAsync,
    upsertGamedocAsync,
    selectGamedocs,
    useDispatch,
    useSelector,
    gamedocSlice,
    selectGamedocWork,
    navSlice
} from '@/lib/redux';
import styles from './gamedocbrowser.module.css';
import Loading from '../Loading/Loading';
import { Gamedoc } from '@/lib/util/assetTypes';
import { getDefaultGamedoc } from '@/lib/gamedata/defaultAssets';
import GamedocEditor from '../GamedocEditor/GamedocEditor';
import { gameDocMapper } from '@/lib/util/util';

function GamedocItem(props: any){
    const [open, setOpen]: any = useState([]);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(navSlice.actions.setTrayPage('default'));
    }, []);

    const toggleDirectory = (directpath: string) => {
        if(open.includes(directpath)){
            setOpen(open.filter((el: string)=> el != directpath));
        } else {
            let newOpen = _.cloneDeep(open);
            newOpen.push(directpath);
            setOpen(newOpen);
        }
    }

    return(
        <>
            <div style={{paddingLeft: `${props.level * 16}px`, display: 'flex'}}>
                <button onClick={()=>{dispatch(gamedocSlice.actions.setWork(null)); setTimeout(()=>dispatch(gamedocSlice.actions.setWork(props.data)), 250)}}>{props.data.name}</button>
                {props.data.children.length > 0 ? <button onClick={()=>toggleDirectory(props.data.system.directpath)}>{open.includes(props.data.system.directpath) ? "<" : ">"}</button> : null }
            </div>
            {
                open.includes(props.data.system.directpath) ? 
                <div>
                    {
                        props.data.children.map((el: Gamedoc, idx: number)=>{
                            return(<GamedocItem key={idx} data={el} level={props.level + 1} />)
                        })
                    }
                </div>
                : null
            }
        </>
    );
}

export default function GamedocBrowser(props: any){
    const scrollRef: any = useRef();
    const dispatch = useDispatch();
    const size = useWindowSize();
    const [breakpoints, setBreakpoints] = useState({350: 1, 700:2});
    const gamedocs = useSelector(selectGamedocs);
    const gamedocwork = useSelector(selectGamedocWork);

    useEffect(()=>{
        dispatch(getGamedocAsync(null));
      }, []);

    const allDocs = gameDocMapper(gamedocs);

    return(
        <div className={styles.main} ref={scrollRef}>
            {
                allDocs.map((el: Gamedoc, idx: number)=>{
                    return(
                        <GamedocItem key={idx} data={el} level={0}/>
                    );
                })
            }
            <div>
                <button onClick={()=>dispatch(upsertGamedocAsync(getDefaultGamedoc()))}>NEW</button>
            </div>
            {
                gamedocwork ? <GamedocEditor allDocs={allDocs} /> : null
            }
        </div>
    );
}
