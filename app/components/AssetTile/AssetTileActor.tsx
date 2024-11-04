'use client'

import ItemWrapper from '../ItemWrapper/ItemWrapper';
/* Core */
import { addPlusMinus, assetToCollection, cloneAsset, md2html } from '@/lib/util/util';
import SimpleLabel from '../SimpleLabel/SimpleLabel';
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import AssetElements from './AssetElements';
import AssetFlags from './AssetFlags';
import styles from './assettile.module.css';
import { sheetIcons } from '@/lib/gamedata/imgAssets';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    selectGame,
    selectIsSuperuser,
    selectModeSelect,
    selectWork,
    upsertLiveActorAsync,
    useDispatch,
    useSelector
} from '@/lib/redux';
import _ from 'lodash';
import SimpleAttack from '../SimpleLabel/SimpleAttack';

export default function AssetTileActor(props: any){
    const dispatch = useDispatch();
    const isSelectMode = useSelector(selectModeSelect);
    const isSuperuser = useSelector(selectIsSuperuser);
    const work = useSelector(selectWork);
    const workCollection = assetToCollection(work);
    const game = useSelector(selectGame);
    const type = props.data.type;
    const tags = props.data.system.tags ? props.data.system.tags.split(',') : [];
    const resists = props.data.system.resist ? props.data.system.resist.split(',') : [];
    const traits = props.data.system.traits ? props.data.system.traits.split(',') : [];

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
        <div className={styles.tile}>
        <div className={styles.toprow}>
            <div className={styles.name}>{props.data.name}</div>
            {
                props.data.system.role && props.data.system.level != undefined && props.data.system.level != null  ?
                <div className={styles.powerlevel}>{props.data.system.role} {props.data.system.level}</div>
                :
                null
            }
            
        </div>
        <div className={styles.bodywide}>
                <div className={styles.imgdivright}>
                    <img src={props.data.img}/>
                </div>
                <div className={styles.sheetdatabar}>
                    <div className={styles.brief}>{props.data.system.brief} | {props.data.system.profile}</div>
                    <div className={styles.statsflex}>
                        <SimpleLabel value={addPlusMinus(props.data.system.pb)} label='Proficiency Bonus' tooltip='Proficiency Bonus' img={sheetIcons.proficiency}/>
                        <SimpleLabel value={props.data.system.hp} label='HP' tooltip='Hit Points' img={sheetIcons.hitpoints}/>
                        <SimpleLabel value={props.data.system.armor} label='ARMOR' tooltip='Armor Defense' img={sheetIcons.armor}/>
                        <SimpleLabel value={props.data.system.fortitude} label='FORT' tooltip='Fortitude Defense' img={sheetIcons.fortitude}/>
                        <SimpleLabel value={props.data.system.reflex} label='REF' tooltip='Reflex Defense' img={sheetIcons.reflex}/>
                        <SimpleLabel value={props.data.system.will} label='WILL' tooltip='Will Defense' img={sheetIcons.will}/>
                        <SimpleLabel value={props.data.system.size} label='Size' tooltip='Size' img={sheetIcons.size}/>
                        <SimpleLabel value={props.data.system.speed} label='Speed' tooltip='Speed (Squares)' img={sheetIcons.speed}/>

                        
                    </div>
                    {
                        props.data.system.foundrytype == 'character' ? 
                        <div className={styles.statsflexv}>
                            <SimpleLabel value={props.data.system.pp} label='Total Power Points' tooltip='Total points that can be spent on powers.'/>
                        </div>
                        : null
                    }
                    <div className={styles.statsflexv}>
                        <SimpleAttack doc={props.data} />
                    </div>
                    <div>
                        <SimpleTagWrapper data={traits} label='Traits'/>
                        <SimpleTagWrapper data={resists} label='Resists'/>
                    </div>
                </div>

                <div className={styles.description} dangerouslySetInnerHTML={{__html: md2html(props.data.system.description)}} />
                <ItemWrapper label='Powers' data={props.data.items} />

            </div>
            <div className={styles.footerwide}>
                <div className={styles.tagblock}>
                        <SimpleTagWrapper data={tags}/>
                    </div>
                    {
                        isSuperuser ?
                        <div className={styles.controls}>
                                <button className={styles.controls} onClick={()=>cloneAsset(props.data)}>CLONE</button>
                                <button className={styles.controls} onClick={()=>dispatch(upsertLiveActorAsync({data: props.data, original: false}))}>IMPORT</button>
                                <button className={styles.controls} onClick={()=>openWork()}>EDIT</button>
                        </div>
                        :null
                    }
            </div>
        </div>
    );
}
