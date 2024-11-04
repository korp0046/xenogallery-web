import React, { useEffect, useRef, useState } from 'react';

import styles from './actionpanel.module.css';
import axios from 'axios';

// import required modules
import { elementThumbs } from '@/lib/gamedata/imgAssets';
import { elementDescription } from '@/lib/gamedata/contentAssets';
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import { selectWork, useSelector } from '@/lib/redux';
import { Gamedoc } from '@/lib/util/assetTypes';
import { getDefaultGamedoc } from '@/lib/gamedata/defaultAssets';
import { md2html } from '@/lib/util/util';


export default function AbilityElementSelector(props: any) {
  const [moreInfo, setMoreInfo] = useState(false);
  const [selectedElementData, setSelectedElementData] = useState(getDefaultGamedoc());
  const [allElements, setAllElements] = useState([]);

  const elements = ["light", "air", "fire", "water", "earth", "metal", "wood", "shadow", "universal"];

    useEffect(()=>{
        async function getElements(){
            const newAllElements: any = [];
            for(let element of elements){
                const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/gamedocs/element_${element}`);
                const result = {...response.data, category: element};
                newAllElements.push(result);
            }
            setAllElements(newAllElements);
        }
            getElements();
    },[]);

    useEffect(()=>{
        if(allElements.length == 9){
            const elementDesc = allElements.find((el:any)=>el.category == props.selectedElement);
            if(elementDesc){
                setSelectedElementData(elementDesc);
            }
        }

    },[props.selectedElement, allElements]);
    
  const tagsaltSelected = selectedElementData && selectedElementData.system.tagsalt ? selectedElementData.system.tagsalt.split(',') : [];
  return (
    <div className={styles.elementselectormain}>
        {
            allElements.length == 9 && selectedElementData ?
            <>
                <div className={styles.elementselectorfocus} onClick={()=>setMoreInfo(!moreInfo)}>
                    <img src={selectedElementData.img}></img>
                    <SimpleTagWrapper data={tagsaltSelected}/>
                    { moreInfo ? <div dangerouslySetInnerHTML={{__html: md2html(selectedElementData.system.text)}} /> : null}
                </div>
                <div className={styles.elementselectorwrap}>
                {
                    allElements.map((el: any, idx: any)=>{
                        const tagsalt = el.system.tagsalt ? el.system.tagsalt.split(',') : [];
                        return(
                            <div key={idx} className={styles.elementselectoritem} onClick={()=>props.setSelectedElement(el.category)}>
                                <img src={el.img} />
                                <div>
                                    <SimpleTagWrapper data={tagsalt} vertical={true}/>
                                </div>
                            </div>
                        );
                    })
                }

            </div>
            </>
            :null
        }

    </div>
  );
}
