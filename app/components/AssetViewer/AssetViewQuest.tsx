'use client'

import { assetToCollection, cloneAsset, md2html } from '@/lib/util/util';
/* Core */
import SimpleLabel from '../SimpleLabel/SimpleLabel';
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import styles from './assetview.module.css';
import stylesbutton from '../../styles/button.module.css';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    selectAssetView,
    selectIsSuperuser,
    selectModeSelect,
    selectWork,
    useDispatch,
    useSelector
} from '@/lib/redux';
import _ from 'lodash';
import { factions } from '@/lib/gamedata/contentAssets';
import AssetFlags from '../AssetTile/AssetFlags';
import AssetElements from '../AssetTile/AssetElements';

export default function AssetViewQuest(props: any){
    const dispatch = useDispatch();
    const isSelectMode = useSelector(selectModeSelect);
    const assetView: any = useSelector(selectAssetView);
    const work: any = useSelector(selectWork);
    const isSuperuser = useSelector(selectIsSuperuser);
    const assetViewCollection = assetToCollection(assetView);
    const type = assetView.type;
    const tags = assetView.system.tags ? assetView.system.tags.split(',') : [];
    const clone = (props.clone && isSuperuser) || false;
    const edit = (props.edit && isSuperuser) || false;

    const openAssetView = () => {
        dispatch(assetSlice.actions.setAssetView(assetView));
        dispatch(modalSlice.actions.openModal('assetView'));
    }

    const selectItem = (newPower: any) => {
        const newWork = _.cloneDeep(work);
        if(newWork && newWork.items && typeof Array.isArray(newWork.items)){
            const newItems = newWork.items.filter((el: any) => el.name != newPower.name);
            if(newItems.length == newWork.items.length){
                newItems.push(newPower);
                newWork.items = newItems;
                dispatch(assetSlice.actions.setWork(newWork));
            } else {
                newWork.items = newItems;
                dispatch(assetSlice.actions.setWork(newWork));
            }
        }

    }

    let selected = false;
    if(assetView && assetView.items && typeof Array.isArray(assetView.items)){
        for(let item of assetView.items){
            if(item.name && String(item.name) == String(assetView.name)){
                selected = true;
            }
        }
    }

    const npcorlevel = assetView.system.flags.npc ? 'NPC' : assetView.system.level;

    const factionObj = factions.find((el: any)=>assetView.system.origin == el.key);

    return(
        <div className={styles.tileinner}>
            <div className={styles.toprow}>
                <div className={styles.name}><span>{assetView.name}</span></div>
            </div>
            <div className={styles.subrowwrapper}>
                <AssetFlags doc={assetView} />
                <div><b>Origin Faction: </b>{factionObj ? factionObj.text : 'None'}</div>
            </div>
            <div>
                <div className={styles.description} dangerouslySetInnerHTML={{__html: md2html(assetView.system.description)}} />
            </div>
            <div className={styles.tagblock}>
                <SimpleTagWrapper data={tags}/>
            </div>
            <div className={styles.controls}>
                    {
                        isSelectMode ? (selected ? <button className={stylesbutton.button} onClick={()=>selectItem(assetView)}>UNSELECT</button> : <button className={stylesbutton.button} onClick={()=>selectItem(assetView)}>SELECT</button>) : null
                        
                    }
                </div>
        </div>
    );
}
