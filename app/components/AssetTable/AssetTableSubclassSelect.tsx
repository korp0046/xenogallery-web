'use client'
import { subclassTypes } from '@/lib/gamedata/contentAssets';
import styles from '../../styles/table.module.css';

export default function AssetTableSubclassFilter(props: any){
    let currentSubclass = props.filter.subclass;

    const setSubclassFilter = (subclass: string) => {
        if(subclass == currentSubclass){
            props.setFilter({...props.filter, subclass: 'any'});
        } else {
            props.setFilter({...props.filter, subclass: subclass});
        }
    }

    return(
        <>
        {
            subclassTypes.map((el: string, idx: number)=>{
                return(<div key={idx} className={`${styles.filteritem} ${currentSubclass == el ? styles.selected : ''}`} onClick={()=>setSubclassFilter(el)}>{el}</div>);

            })
        }
        </>
    )

 
}
