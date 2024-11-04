'use client'
import { assetToCollection } from '@/lib/util/util';
import styles from '../../styles/table.module.css';
import AssetTableElementFilter from './AssetTableElementSelect';
import { useState, useEffect } from 'react';
import AssetTableSortFilter from './AssetTableSortFilter';
import AssetTableSceneTypeSelect from './AssetTableSceneTypeSelect';
import AssetTableTagSelect from './AssetTableTagSelect';
import AssetTableFlagSelect from './AssetTableFlagSelect';
import { useDispatch, useSelector } from 'react-redux';
import { assetSlice, navSlice, selectAssetView, selectDevMode, selectIsSuperuser, selectModeSelect, selectWork } from '@/lib/redux';
import AssetTableItemTypeSelect from './AssetTableItemTypeSelect';
import AssetTableSubstringFilter from './AssetTableSubstringFilter';
import AssetTableSubclassFilter from './AssetTableSubclassSelect';

export default function AssetTableFilter(props: any){
    const dispatch = useDispatch();
    const [tab, setTab] = useState('sort');
    const isSuperuser = useSelector(selectIsSuperuser);
    const isDevMode = useSelector(selectDevMode);
    const isSelectMode = useSelector(selectModeSelect);
    const assetView = useSelector(selectAssetView);
    const work = useSelector(selectWork);

    useEffect(()=>{
        if(!isSelectMode){
            if(isDevMode){
                dispatch(assetSlice.actions.setWork(assetView));
                dispatch(navSlice.actions.setTrayPage('work'));
            } else {
                dispatch(assetSlice.actions.setAssetView(work));
                dispatch(navSlice.actions.setTrayPage('assetview'));
            }
        }
    }, [isDevMode]);

    const togglePublicFilter = () => {
        if(props.filter.public == 'any'){
            props.setFilter({...props.filter, public: 'public'});
        } else if (props.filter.public == 'public'){
            props.setFilter({...props.filter, public: 'private'});
        } else if (props.filter.public == 'private'){
            props.setFilter({...props.filter, public: 'any'});
        }
    }

    const toggleLiveMode = () => {
        if(isDevMode){
            props.setFilter({...props.filter, public: 'any'});
        }
        dispatch(assetSlice.actions.setDevMode(!isDevMode));
    }

    return(
        <div>
            <div className={styles.filterrow}>
                <div className={`${styles.filteritem} ${styles.disabled}`}>{props.filterCount}</div>
                <div className={`${styles.filteritem} ${tab == 'sort' ? styles.selected : ''}`} onClick={()=>setTab('sort')}>SORT</div>
                { props.type == 'power' ? <div className={`${styles.filteritem} ${tab == 'element' ? styles.selected : ''}`} onClick={()=>setTab('element')}>ELEMENT</div> : null }
                { props.type == 'scene' ? <div className={`${styles.filteritem} ${tab == 'scenetype' ? styles.selected : ''}`} onClick={()=>setTab('scenetype')}>SCENETYPE</div> : null }
                { props.type == 'item' ? <div className={`${styles.filteritem} ${tab == 'itemtype' ? styles.selected : ''}`} onClick={()=>setTab('itemtype')}>ITEMTYPE</div> : null }
                <div className={`${styles.filteritem} ${tab == 'tags' ? styles.selected : ''}`} onClick={()=>setTab('tags')}>TAGS</div>
                { props.type == 'power' ? <div className={`${styles.filteritem} ${tab == 'subclass' ? styles.selected : ''}`} onClick={()=>setTab('subclass')}>SUBCLASS</div> : null }
                { props.type == 'power' ? <div className={`${styles.filteritem} ${tab == 'flags' ? styles.selected : ''}`} onClick={()=>setTab('flags')}>FLAGS</div> : null }
                {isSuperuser && !props.modal ? <div className={`${styles.filteritem} ${isDevMode ? styles.selected : ''}`} onClick={()=>toggleLiveMode()}>LIVE</div> : null}
                {isSuperuser && !props.modal ? <div className={`${styles.filteritem} ${props.filter.public == 'public' ? styles.positive : ''} ${props.filter.public == 'private' ? styles.negative : ''}`} onClick={()=>togglePublicFilter()}>PUBLIC</div> : null}
                <div className={`${styles.filteritem} ${tab == 'text' ? styles.selected : ''}`} onClick={()=>setTab('text')}>TEXT</div>
                

            </div>
            <div className={styles.filterrow}>
                { tab == 'sort' ? <AssetTableSortFilter filter={props.filter} setFilter={props.setFilter} type={props.type}/> : null }
                { tab == 'element' ? <AssetTableElementFilter filter={props.filter} setFilter={props.setFilter}/> : null }
                { tab == 'scenetype' ? <AssetTableSceneTypeSelect filter={props.filter} setFilter={props.setFilter}/> : null }
                { tab == 'itemtype' ? <AssetTableItemTypeSelect filter={props.filter} setFilter={props.setFilter}/> : null }
                { tab == 'tags' ? <AssetTableTagSelect docs={props.docs} filter={props.filter} setFilter={props.setFilter}/> : null }
                { tab == 'subclass' ? <AssetTableSubclassFilter docs={props.docs} filter={props.filter} setFilter={props.setFilter}/> : null }
                { tab == 'flags' ? <AssetTableFlagSelect docs={props.docs} filter={props.filter} setFilter={props.setFilter}/> : null }
                { tab == 'text' ? <AssetTableSubstringFilter docs={props.docs} filter={props.filter} setFilter={props.setFilter}/> : null }
            </div>
        </div>
    )
}

