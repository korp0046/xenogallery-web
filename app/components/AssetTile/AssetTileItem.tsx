'use client'

import { assetToCollection, cloneAsset, md2html, powerToLivePower } from '@/lib/util/util';
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

export default function AssetTileItem(props: any){
    const dispatch = useDispatch();
    const isSelectMode = useSelector(selectModeSelect);
    const work = useSelector(selectWork);
    
    const isSuperuser = useSelector(selectIsSuperuser);
    const workCollection = assetToCollection(work);
    const type = props.data.type;
    const tags = props.data.system.tags ? props.data.system.tags.split(',') : [];
    const subclass = props.data.system.subclass ? props.data.system.subclass.split(',') : [];
    const clone = (props.clone && isSuperuser) || false;
    const edit = (props.edit && isSuperuser) || false;

    const openWork = () => {
        dispatch(assetSlice.actions.setWork(props.data));
        dispatch(modalSlice.actions.openModal('work'));
    }

    const selectItem = (newItem: any) => {
        const newWork = _.cloneDeep(work);
        if(newWork && newWork.items && typeof Array.isArray(newWork.items)){
            const newItems = newWork.items.filter((el: any) => el.name != newItem.name);
            if(newItems.length == newWork.items.length){
                newItems.push(newItem);
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

    return(
        <div className={styles.tilescene}>
            <div className={styles.toprow}>
                <div className={styles.name}><span>{props.data.name}</span><span style={{marginLeft: 'auto', float: 'right'}}>{props.data.system.level}</span></div>
            </div>
            <div>
                <div className={styles.brief}>{props.data.system.brief}</div>
            </div>
            <div className={styles.subrowwrapper}>
                <div className={styles.imgdivright}>
                    <div className={styles.databar}>
                        <img src={props.data.img} style={{width: '128px', maxWidth: '128px'}}/>
                    </div>
                </div>
                <div className={styles.statsflexv}>
                    <AssetElements doc={props.data} />
                    <AssetFlags doc={props.data} />
                    <div className={styles.statsflex}>
                        <SimpleLabel value={props.data.system.bulk} label='Bulk' tooltip='Weight and bulkiness of an item.'/>
                        <SimpleLabel value={props.data.system.type} label='Type' tooltip='The item type.'/>
                    </div>
                    </div>
                    <div>
                        <div className={styles.description} dangerouslySetInnerHTML={{__html: md2html(props.data.system.description)}} />
                    </div>
            </div>
            <div className={styles.tagblock}>
                <SimpleTagWrapper data={subclass}/>
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
                        {props.edit ? <button className={styles.controls} onClick={()=>openWork()}>EDIT</button> : null}
                    { (props.action && props.actionText) ? <button className={styles.controls} onClick={()=>props.action(props.data)}>{props.actionText}</button> : null }
                        </>
                        :null
                    }

                </div>
        </div>
    );
}
