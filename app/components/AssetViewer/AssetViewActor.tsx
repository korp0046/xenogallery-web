'use client'

import ItemWrapper from '../ItemWrapper/ItemWrapper';
/* Core */
import { addPlusMinus, assetToCollection, cloneAsset, getCurrentBulkString, getPowerPointsString, importScene, md2html, sizeMapper } from '@/lib/util/util';
import SimpleLabel from '../SimpleLabel/SimpleLabel';
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import styles from './assetview.module.css';
import stylesbutton from '../../styles/button.module.css';
import styleslayout from '../../styles/layout.module.css';
import { sheetIcons, gameIconsClean } from '@/lib/gamedata/imgAssets';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    selectAssetView,
    selectGame,
    selectIsSuperuser,
    selectModeSelect,
    upsertLiveActorAsync,
    useDispatch,
    useSelector
} from '@/lib/redux';
import _ from 'lodash';
import SimpleAttack from '../SimpleLabel/SimpleAttack';
import { AssetActor } from '@/lib/util/assetTypes';

export default function AssetViewActor(props: any){
    const dispatch = useDispatch();
    const isSelectMode = useSelector(selectModeSelect);
    const isSuperuser = useSelector(selectIsSuperuser);
    const assetView: any = useSelector(selectAssetView);
    const assetViewCollection = assetToCollection(assetView);
    const game = useSelector(selectGame);
    const type = assetView.type;
    const tags = assetView.system.tags ? assetView.system.tags.split(',') : [];
    const resists = assetView.system.resist ? assetView.system.resist.split(',') : [];
    const traits = assetView.system.traits ? assetView.system.traits.split(',') : [];
    const subclass = assetView.system.subclass ? assetView.system.subclass.split(',') : [];

    const openAssetView = () => {
        dispatch(assetSlice.actions.setAssetView(assetView));
        dispatch(modalSlice.actions.openModal('assetView'));
    }

    const selectItem = (newItem: any) => {
        const newAssetView = _.cloneDeep(assetView);
        if(newAssetView && newAssetView.items && typeof Array.isArray(newAssetView.items)){
            const newItems = newAssetView.items.filter((el: any) => el.name != newItem.name);
            if(newItems.length == newAssetView.items.length){
                newItems.push(newItem);
                newAssetView.items = newItems;
                dispatch(assetSlice.actions.setAssetView(newAssetView));
            } else {
                newAssetView.items = newItems;
                dispatch(assetSlice.actions.setAssetView(newAssetView));
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

    return(
        <div className={styles.tileinner}>
        <div className={styles.toprow}>
            <div className={styles.name}>{assetView.name}</div>
            {
                assetView.system.role && assetView.system.level != undefined && assetView.system.level != null  ?
                <div className={styles.powerlevel}>{assetView.system.role} {assetView.system.level}</div>
                :
                null
            }
            
        </div>
        <div className={styles.bodywide}>
                <div className={styles.imgdivright}>
                    <img src={assetView.img}/>
                </div>
                <div className={styles.sheetdatabar}>
                    <div className={styles.brief}>{assetView.system.brief} | {assetView.system.profile} | {sizeMapper(assetView.system.size)}</div>
                    <div className={styles.statswrap}>
                        <div className={styles.statswrapinner}>
                            <SimpleLabel value={assetView.system.pb} label='Proficiency Bonus' tooltip='Proficiency Bonus' img={gameIconsClean.proficiency}/>
                            <SimpleLabel value={assetView.system.ab} label='Attack' tooltip='Attack Bonus' img={gameIconsClean.accuracy}/>
                            <SimpleLabel value={assetView.system.ad} label='AD' tooltip='Attack Damage' img={gameIconsClean.attackDamage}/>
                            <SimpleLabel value={assetView.system.ap} label='AP' tooltip='Ability Power' img={gameIconsClean.abilityPower}/>
                        </div>

                        <div className={styles.statswrapinner}>
                            <SimpleLabel value={assetView.system.hp} label='HP' tooltip='Hit Points' img={gameIconsClean.hitpoints}/>
                            <SimpleLabel value={assetView.system.es} label='ENERGYSHIELD' tooltip='Energy Shield' img={gameIconsClean.es}/>
                            <SimpleLabel value={assetView.system.evasion} label='EVASION' tooltip='Evasion' img={gameIconsClean.reflex}/>
                            <SimpleLabel value={assetView.system.armor} label='ARMOR' tooltip='Armor' img={gameIconsClean.armor}/>
                        </div>

                        <div className={styles.statswrapinner}>
                            <SimpleLabel value={assetView.system.speed} label='Speed' tooltip='Speed (Squares)' img={gameIconsClean.speed}/>
                            <SimpleLabel value={getPowerPointsString(assetView)} label='Power Points' tooltip='Power Points'  img={gameIconsClean.powerPoints}/>
                            <SimpleLabel value={getCurrentBulkString(assetView)} label='Bulk' tooltip='Bulk'  img={gameIconsClean.bulk}/>
                            
                        </div>
                    </div>
                    <div className={styleslayout.containerrow}>
                        <ItemWrapper data={subclass} label='Subclasses'/>
                        <ItemWrapper data={traits} label='Traits'/>
                        <ItemWrapper data={resists} label='Resists'/>
                        <ItemWrapper label='Powers' data={assetView.items.filter((el: any)=>el.system && el.system.foundrytype == 'power')} />
                        <ItemWrapper label='Equipment' data={assetView.items.filter((el: any)=>el.system && el.system.foundrytype == 'equipment')} />
                    </div>
                </div>


                <div className={styles.description} dangerouslySetInnerHTML={{__html: md2html(assetView.system.description)}} />

            </div>
            <div className={styles.footerwide}>
                <div className={styles.tagblock}>
                        <SimpleTagWrapper data={tags}/>
                </div>
                <div className={styles.controls}>
                    { game  ?  <button className={styles.controls} onClick={()=>dispatch(upsertLiveActorAsync({data: assetView, original: false}))}>IMPORT</button> : null}
                </div>
            </div>

        </div>
    );
}
