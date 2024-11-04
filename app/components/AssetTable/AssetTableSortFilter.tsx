'use client'
import { assetToCollection } from '@/lib/util/util';
import styles from '../../styles/table.module.css';

export default function AssetTableSortFilter(props: any){
    let currentSortKey = props.filter.sortKey;
    let currentSortDir = props.filter.sortDir;

    const setSortFilter = (sortKey: string) => {
        if(sortKey == currentSortKey && props.filter.sortDir == 1){
            props.setFilter({...props.filter, sortKey: sortKey, sortDir: -1});
        } else if(sortKey == currentSortKey && props.filter.sortDir == -1) {
            props.setFilter({...props.filter, sortKey: sortKey, sortDir: 1});
        } else {
            props.setFilter({...props.filter, sortKey: sortKey, sortDir: -1});
        }
    }

    return(
        <>
            <div className={`${styles.filteritem} ${currentSortKey == 'name' ? (currentSortDir > 0 ? styles.positive : styles.negative) : ''}`} onClick={()=>setSortFilter('name')}>name</div>
            { ['power', 'item'].includes(props.type) ? <div className={`${styles.filteritem} ${currentSortKey == 'level' ? (currentSortDir < 0 ? styles.positive : styles.negative) : ''}`} onClick={()=>setSortFilter('level')}>level</div> : null }
        </>
    )

 
}
