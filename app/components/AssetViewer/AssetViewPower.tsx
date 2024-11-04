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
import { AssetPower } from '@/lib/util/assetTypes';
import AssetFlags from '../AssetTile/AssetFlags';
import AssetElements from '../AssetTile/AssetElements';

export default function AssetViewPower(props: any){
    const dispatch = useDispatch();
    const isSelectMode = useSelector(selectModeSelect);
    const assetView: any = useSelector(selectAssetView);
    const work: any = useSelector(selectWork);
    const isSuperuser = useSelector(selectIsSuperuser);
    const assetViewCollection = assetToCollection(assetView);
    const type = assetView.type;
    const subclass = assetView.system.subclass ? assetView.system.subclass.split(',') : [];
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

    return(
        <div className={styles.tileinner}>
            <div className={styles.toprow}>
                <div className={styles.name}><span>{assetView.name}</span><span style={{marginLeft: 'auto', float: 'right'}}>{npcorlevel}</span></div>
            </div>
            <div className={styles.subrowwrapper}>
                <div className={styles.imgdivright}>
                    <AssetElements doc={assetView} />
                </div>
                <AssetFlags doc={assetView} />
                <div className={styles.statsflexv}>
                    <SimpleLabel value={assetView.system.build} label='Build' tooltip='Cost in Power Points to Obtain'/>
                    <SimpleLabel value={assetView.system.recharge} label='Recharge' tooltip='Recharge Type'/>
                    <SimpleLabel value={assetView.system.time} label='Action/Time' tooltip='Action to Initiate Power'/>
                    <SimpleLabel value={assetView.system.duration} label='Duration' tooltip='Time Effect Can Persist'/>
                    <SimpleLabel value={assetView.system.range} label='Range' tooltip="Distance Effect Will Travel and Area of Effect (5' Squares)"/>
                    <SimpleLabel value={assetView.system.limit} label='Limit' tooltip='Usage Limits'/>
                    <SimpleLabel value={assetView.system.prereq} label='Prerequisite' tooltip='The prerequisite must be met to learn this power.'/>
                </div>
                <div className={styles.statsflexv}>
                    <SimpleLabel value={assetView.system.attack} label='Attack' tooltip='Which Attack Stat to Use'/>
                    <SimpleLabel value={assetView.system.defense} label='Defense' tooltip='Which Defense Stat to Use'/>
                    <SimpleLabel value={assetView.system.miss} label='Miss Effect' tooltip='Effect on Miss'/>
                </div>
            </div>
            <div>
                <div className={styles.description} dangerouslySetInnerHTML={{__html: md2html(assetView.system.description)}} />
            </div>
            <div className={styles.tagblock}>
                <SimpleTagWrapper data={subclass}/>
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
