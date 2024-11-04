'use client'

import { assetToCollection, cloneAsset, md2html } from '@/lib/util/util';
/* Core */
import SimpleLabel from '../SimpleLabel/SimpleLabel';
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import AssetElements from './AssetElements';
import AssetFlags from './AssetFlags';
import styles from './assettile.module.css';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    selectIsSuperuser,
    selectModeSelect,
    selectWork,
    useDispatch,
    useSelector
} from '@/lib/redux';
import _ from 'lodash';

export default function AssetTilePower(props: any){
    const dispatch = useDispatch();
    const isSelectMode = useSelector(selectModeSelect);
    const work = useSelector(selectWork);
    const isSuperuser = useSelector(selectIsSuperuser);
    const workCollection = assetToCollection(work);
    const type = props.data.type;
    const tags = props.data.system.tags ? props.data.system.tags.split(',') : [];
    const clone = (props.clone && isSuperuser) || false;
    const edit = (props.edit && isSuperuser) || false;

    const openWork = () => {
        dispatch(assetSlice.actions.setWork(props.data));
        dispatch(modalSlice.actions.openModal('work'));
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
    if(work && work.items && typeof Array.isArray(work.items)){
        for(let item of work.items){
            if(item.name && String(item.name) == String(props.data.name)){
                selected = true;
            }
        }
    }

    const npcorlevel = props.data.system.flags.npc ? 'NPC' : props.data.system.level;

    return(
        <div className={styles.tilescene}>
            <div className={styles.toprow}>
                <div className={styles.name}><span>{props.data.name}</span><span style={{marginLeft: 'auto', float: 'right'}}>{npcorlevel}</span></div>
            </div>
            <div className={styles.subrowwrapper}>
                <div className={styles.imgdivright}>
                    <AssetElements doc={props.data} />
                </div>
                <AssetFlags doc={props.data} />
                <div className={styles.statsflexv}>
                    <SimpleLabel value={props.data.system.build} label='Build' tooltip='Cost in Power Points to Obtain'/>
                    <SimpleLabel value={props.data.system.recharge} label='Recharge' tooltip='Recharge Type'/>
                    <SimpleLabel value={props.data.system.time} label='Action/Time' tooltip='Action to Initiate Power'/>
                    <SimpleLabel value={props.data.system.duration} label='Duration' tooltip='Time Effect Can Persist'/>
                    <SimpleLabel value={props.data.system.range} label='Range' tooltip="Distance Effect Will Travel and Area of Effect (5' Squares)"/>
                    <SimpleLabel value={props.data.system.limit} label='Limit' tooltip='Usage Limits'/>
                    <SimpleLabel value={props.data.system.prereq} label='Prerequisite' tooltip='The prerequisite must be met to learn this power.'/>
                </div>
                <div className={styles.statsflexv}>
                    <SimpleLabel value={props.data.system.attack} label='Attack' tooltip='Which Attack Stat to Use'/>
                    <SimpleLabel value={props.data.system.defense} label='Defense' tooltip='Which Defense Stat to Use'/>
                    <SimpleLabel value={props.data.system.miss} label='Miss Effect' tooltip='Effect on Miss'/>
                </div>
            </div>
            <div className={styles.statsflexv}>
                <div className={styles.description} dangerouslySetInnerHTML={{__html: md2html(props.data.system.description)}} />
            </div>
            <div className={styles.tagblock}>
                <SimpleTagWrapper data={tags}/>
            </div>
            <div className={styles.controls}>
                    {
                        isSelectMode ? (selected ? <button className={styles.controls} onClick={()=>selectItem(props.data)}>UNSELECT</button> : <button className={styles.controls} onClick={()=>selectItem(props.data)}>SELECT</button>) : null
                        
                    }
                    {
                        isSuperuser ?
                        <>
                        {props.clone ? <button className={styles.controls} onClick={()=>cloneAsset(props.data)}>CLONE</button> : null }
                        {props.edit ? <button className={styles.controls} onClick={()=>openWork()}>EDIT</button> : null }
                    { (props.action && props.actionText) ? <button className={styles.controls} onClick={()=>props.action(props.data)}>{props.actionText}</button> : null }
                        </>
                        :null
                    }

                </div>
        </div>
    );
}
