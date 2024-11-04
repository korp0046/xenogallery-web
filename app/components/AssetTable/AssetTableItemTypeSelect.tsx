'use client'
import { capitalize } from 'lodash';
import styles from '../../styles/table.module.css';
import { itemTypes } from '@/lib/gamedata/contentAssets';

export default function AssetTableTypeSelect(props: any){
    let currentType = props.filter.type;

    const setFilter = (sceneType: string) => {
        if(sceneType == currentType){
            props.setFilter({...props.filter, type: 'any'});
        } else {
            props.setFilter({...props.filter, type: sceneType});
        }
    }

    return(
        <>
            {
                itemTypes.map((el: string, idx: number)=> {
                return(
                    <div className={`${styles.filteritem} ${currentType == el ? styles.selected : ''}`} onClick={()=>setFilter(el)}>{capitalize(el)}</div>
                )
                })
            }
        </>
    )

 
}
