'use client'
import styles from '../../styles/table.module.css';

export default function AssetTableSceneTypeSelect(props: any){
    let currentSceneType = props.filter.sceneType;

    const setElementFilter = (sceneType: string) => {
        if(sceneType == currentSceneType){
            props.setFilter({...props.filter, sceneType: 'any'});
        } else {
            props.setFilter({...props.filter, sceneType: sceneType});
        }
    }

    return(
        <>
            <div className={`${styles.filteritem} ${currentSceneType == 'basicscene' ? styles.selected : ''}`} onClick={()=>setElementFilter('basicscene')}>basicscene</div>
            <div className={`${styles.filteritem} ${currentSceneType == 'battlemap' ? styles.selected : ''}`} onClick={()=>setElementFilter('battlemap')}>battlemap</div>
            <div className={`${styles.filteritem} ${currentSceneType == 'exploremap' ? styles.selected : ''}`} onClick={()=>setElementFilter('exploremap')}>exploremap</div>
        </>
    )

 
}
