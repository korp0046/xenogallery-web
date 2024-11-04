'use client'
import { assetToCollection } from '@/lib/util/util';
import styles from '../../styles/table.module.css';
import AssetTableBody from './AssetTableBody';
import AssetTableFilter from './AssetTableFilter';
import { useState, useEffect } from 'react';
import AssetTableRowHeader from './AssetTableRowHeader';
import { assetSlice, selectDataLite, selectDataModalLite, selectDevMode, selectModalTrayOpen, selectToken, selectTrayOpen, useSelector } from '@/lib/redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { StaticAsset } from '@/lib/util/assetTypes';
import _ from 'lodash';



export default function AssetTable(props: any){
    const dispatch = useDispatch();
    const [tidx, setTidx] = useState(-1);
    const [filter, setFilter] = useState({sortKey: 'name', sortDir: 1, element: 'any', sceneType: 'any', type: 'any', subclass: 'any', substring: '', incTags: [], excTags: [], incFlags: [], excFlags: ['npc'], public: 'any'});
    const trayOpen = useSelector(selectTrayOpen);
    const modalTrayOpen = useSelector(selectModalTrayOpen);
    const devMode = useSelector(selectDevMode);
    const token = useSelector(selectToken);

    const dataLive: any = useSelector(selectDataLite);
    const setData = (data: any)=> {
      dispatch(assetSlice.actions.setDataLite(data));
  };
  
    useEffect(()=> {
        if(devMode && !props.modal){
            (async function() {
                try {
                    let headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer: ${token}`
                    };
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/${props.type}s`, { headers: headers });
                    setData(res.data.data);
                } catch (e) {
                    console.error(e);
                }
              })();
        }

    }, [devMode]);

    const doFilter = !['room', 'game', 'user'].includes(props.type);

    const docs = (devMode && !props.modal) ? dataLive : props.docs;

    const compact = !props.modal && trayOpen ? true : (props.modal && modalTrayOpen) ? true : false;

    let filteredDocs = () => {
        let tempdocs = _.cloneDeep(docs);
        if(filter.sortKey == 'name'){
            tempdocs = tempdocs.sort((a: StaticAsset, b: StaticAsset)=> filter.sortDir == 1 ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        }
        if(doFilter){
            if(filter.public == 'public'){
                tempdocs = tempdocs.filter((el: any)=> el.meta.public == true);
            } else if (filter.public == 'private'){
                tempdocs = tempdocs.filter((el: any)=> el.meta.public == false);
            }
            if(filter.sortKey == 'level'){
                tempdocs = tempdocs.sort((a: any, b: any)=> a.system?.level - b.system?.level || a.name.localeCompare(b.name));
            }
            if(filter.element != 'any'){
                tempdocs = tempdocs.filter((el: any)=> el.system.element[filter.element] == true);
            }
            if(filter.substring.length > 0){
                tempdocs = tempdocs.filter((el: any)=> String(el.name).includes(filter.substring) || String(el.system.description).includes(filter.substring));
            }
            if(filter.sceneType != 'any'){
                tempdocs = tempdocs.filter((el: any)=> el.system.foundrytype == filter.sceneType);
            }
            if(filter.subclass != 'any'){
                tempdocs = tempdocs.filter((el: any)=> el.system.subclass == undefined || (el.system.subclass && el.system.subclass.includes(filter.subclass)) );
            }
            if(filter.type != 'any'){
                tempdocs = tempdocs.filter((el: any)=> el.system.type == filter.type);
            }
            if(filter.incTags.length > 0 || filter.excTags.length > 0){
                tempdocs = tempdocs.filter((el: any)=> {
                    let compareTags = el.system.tags.split(',');
                    for(let item of filter.incTags){
                        if(!compareTags.includes(item)){
                            return false;
                        }
                    }
                    for(let item of filter.excTags){
                        if(compareTags.includes(item)){
                            return false;
                        }
                    }
                    return true;
                });
            }
            if(filter.incFlags.length > 0 || filter.excFlags.length > 0){
                if(tempdocs.length > 0 && tempdocs[0].system.flags){
                    tempdocs = tempdocs.filter((el: any)=> {
                        let compareFlags = Object.keys(el.system.flags).filter((el2: string)=> el.system.flags[el2]);
                        for(let item of filter.incFlags){
                            if(!compareFlags.includes(item)){
                                return false;
                            }
                        }
                        for(let item of filter.excFlags){
                            if(compareFlags.includes(item)){
                                return false;
                            }
                        }
                        return true;
                    });
                }
            }
        }
        
        return tempdocs;
    }

    const finalDocs = filteredDocs();

    return(
        <div className={`${styles.wrapper} ${(props.modal && compact) ? styles.compactm: ''} ${(!props.modal && compact) ? styles.compact: ''}`}>
            { doFilter ? <AssetTableFilter docs={docs} filter={filter} setFilter={setFilter} type={props.type} modal={props.modal} filterCount={finalDocs.length}/> : null}
            <table className={styles.table}>
                <AssetTableRowHeader type={props.type} modal={props.modal}/>
                <AssetTableBody docs={finalDocs} filter={filter} type={props.type} modal={props.modal} tidx={tidx} setTidx={setTidx}/>
            </table>
        </div>
    )
}
