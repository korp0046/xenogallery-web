'use client'
import styles from '../../styles/table.module.css';

export default function AssetTableElementFilter(props: any){
    let currentElement = props.filter.element;

    const setElementFilter = (element: string) => {
        if(element == currentElement){
            props.setFilter({...props.filter, element: 'any'});
        } else {
            props.setFilter({...props.filter, element: element});
        }
    }

    return(
        <>
            <div className={`${styles.filteritem} ${currentElement == 'fire' ? styles.selected : ''}`} onClick={()=>setElementFilter('fire')}>fire</div>
            <div className={`${styles.filteritem} ${currentElement == 'air' ? styles.selected : ''}`} onClick={()=>setElementFilter('air')}>air</div>
            <div className={`${styles.filteritem} ${currentElement == 'water' ? styles.selected : ''}`} onClick={()=>setElementFilter('water')}>water</div>
            <div className={`${styles.filteritem} ${currentElement == 'earth' ? styles.selected : ''}`} onClick={()=>setElementFilter('earth')}>earth</div>
            <div className={`${styles.filteritem} ${currentElement == 'light' ? styles.selected : ''}`} onClick={()=>setElementFilter('light')}>light</div>
            <div className={`${styles.filteritem} ${currentElement == 'metal' ? styles.selected : ''}`} onClick={()=>setElementFilter('metal')}>metal</div>
            <div className={`${styles.filteritem} ${currentElement == 'shadow' ? styles.selected : ''}`} onClick={()=>setElementFilter('shadow')}>shadow</div>
            <div className={`${styles.filteritem} ${currentElement == 'wood' ? styles.selected : ''}`} onClick={()=>setElementFilter('wood')}>wood</div>
        </>
    )

 
}
