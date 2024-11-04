'use client'

/* Core */
import styles from './asseteditor.module.css';

import {
    EditorImage,
    EditorMeta,
    EditorName,
    EditorNumber,
    EditorPowerFlags,
    EditorProfile,
    EditorRole,
    EditorSize,
    EditorString,
    EditorTextarea,
    EditorQuestFlags,
    EditorElement
} from '../Editors';

/* Instruments */
import {
    assetSlice,
    selectRole,
    selectWork,
    upsertAssetAsync,
    useDispatch,
    useSelector,
    upsertLiveSceneAsync,
    selectScratch,
    scratchSlice
} from '@/lib/redux';
import { assetToCollection, deleteAsset, saveAsset, packScene, normalizeActorStats } from '@/lib/util/util';
import { dieProgression, factions, rechargeProgression } from '@/lib/gamedata/contentAssets';
import EditorIcon from '../Editors/EditorIcon';
import EditorNodeSize from '../Editors/EditorNodeSize';
import EditorSceneType from '../Editors/EditorSceneType';
import EditorPowerAttack from '../Editors/EditorPowerAttack';
import EditorPowerDefense from '../Editors/EditorPowerDefense';
import EditorPowerMiss from '../Editors/EditorPowerMiss';
import EditorItemType from '../Editors/EditorItemType';
import EditorItemSubtype from '../Editors/EditorItemSubtype';
import EditorFoundryType from '../Editors/EditorFoundryType';
import EditorLevel from '../Editors/EditorLevel';
import EditorDynamicSelect from '../Editors/EditorDynamicSelect';
import _ from 'lodash';
import EditorGrid from '../Editors/EditorGrid';
import EditorFog from '../Editors/EditorFog';
import EditTableFlex from '../EditTable/EditTableFlex';
import EditorSkill from '../Editors/EditorSkill';

export default function AssetEditorDetails(props: any){
    const dispatch = useDispatch();
    const windowSize = props.size;
    const work = props.mode == 'scratch' ? useSelector(selectScratch) : useSelector(selectWork);

    const role = useSelector(selectRole);

    const collection = assetToCollection(work);

    const setDoc = (newValue: any) => {
        if(props.mode == 'scratch'){
            dispatch(scratchSlice.actions.setScratch(newValue));
        } else {
            dispatch(assetSlice.actions.setWork(newValue));
        }
    }

    const normalizeStats = () => {
        let newActor = normalizeActorStats(work);
        setDoc(newActor);
    }
    
    if(work && collection){
        if(['battlemaps', 'exploremaps', 'basicscenes', 'livescenes'].includes(collection)){
            return(
                <>
                    <EditorSceneType setDoc={setDoc} doc={work} />
                    <EditorIcon setDoc={setDoc} doc={work}/>
                    <EditorSize setDoc={setDoc} doc={work}/>
                    <EditorGrid setDoc={setDoc} doc={work} />
                    <EditorFog setDoc={setDoc} doc={work} />
                </>
            );
        } else if (['powers'].includes(collection)){
            return(
                <>
                <EditorPowerFlags doc={work} setDoc={setDoc}/>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                    <EditorNumber doc={work} field={'level'} setDoc={setDoc} min={0} max={5}/>
                    <EditorNumber doc={work} field={'build'} label='Rarity' setDoc={setDoc} min={0} max={6}/>
                    <EditorDynamicSelect list={rechargeProgression}
                            label="Recharge"
                            width={160}
                            value={work.system.recharge}
                            funcvalue={(x: any)=>x} 
                            funcstring={((x:any)=>x)} 
                            action={(x:string)=>{
                                let newDoc = _.cloneDeep(work);
                                newDoc.system.recharge = String(x);
                                setDoc(newDoc);
                    }}/>
                    <EditorString doc={work} field={'time'} setDoc={setDoc}/>
                    <EditorString doc={work} field={'duration'} setDoc={setDoc}/>
                    <EditorString doc={work} field={'range'} setDoc={setDoc}/>
                    <EditorString doc={work} field={'limit'} setDoc={setDoc}/>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                    <EditorPowerAttack doc={work} setDoc={setDoc} />
                    <EditorPowerMiss doc={work} setDoc={setDoc} />
                </div>
                <EditorString doc={work} field={'prereq'} setDoc={setDoc}/>
                </>
            )
        } else if (['items'].includes(collection)){
            return(
                <>
                    <EditorPowerFlags doc={work} setDoc={setDoc}/>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                        <EditorNumber doc={work} field={'level'} setDoc={setDoc} min={0} max={5}/>
                        <EditorNumber doc={work} field={'bulk'} setDoc={setDoc} min={0} max={3}/>
                        <EditorDynamicSelect list={rechargeProgression}
                            label="Recharge"
                            width={160}
                            value={work.system.recharge}
                            funcvalue={(x: any)=>x} 
                            funcstring={((x:any)=>x)} 
                            action={(x:string)=>{
                                let newDoc = _.cloneDeep(work);
                                newDoc.system.recharge = String(x);
                                setDoc(newDoc);
                        }}/>
                        <EditorItemType doc={work} setDoc={setDoc}/>
                        <EditorItemSubtype doc={work} setDoc={setDoc}/>
                        {work.system.type == 'armor' ?  <EditorNumber doc={work} field={'bonus_armor'} setDoc={setDoc}  min={0} max={20}/> : null }
                        {work.system.type == 'weapon' || work.system.type == 'focus' ?  
                            <EditorDynamicSelect list={dieProgression}
                            label="Weapon Damage"
                            width={160}
                            value={work.system.bonus_damage}
                            funcvalue={(x: any)=>x} 
                            funcstring={((x:any)=>x)} 
                            action={(x:string)=>{
                                let newDoc = _.cloneDeep(work);
                                newDoc.system.bonus_damage = String(x);
                                setDoc(newDoc);
                            }}/>
                        
                        : null }
                    </div>
                </>
            )
        } else if (['characters', 'opponents', 'personas', 'liveactors'].includes(collection)){
            return(
                <>
                    <div className={styles.flexwrap}>
                        <EditorFoundryType setDoc={setDoc} doc={work} />
                        <EditorRole setDoc={setDoc} doc={work}/>
                        <EditorNumber doc={work} field={'hp'} label={"Max HP"} setDoc={setDoc} min={0} max={500}/>
                        <EditorNumber doc={work} field={'speed'} setDoc={setDoc} min={0} max={18}/>
                        <EditorNumber doc={work} field={'size'} setDoc={setDoc} min={0} max={6}/>
                    </div>
                    <div className={styles.flexwrap}>
                        <EditorString doc={work} field={'origin'} setDoc={setDoc}/>
                        <EditorString doc={work} field={'guild'} setDoc={setDoc}/>
                    </div>
                    <div className={styles.flexwrap}>
                        <EditorSkill doc={work} setDoc={setDoc} />
                    </div>
                    
                </>
            )
        } else if (['quests'].includes(collection)){
            return(
                <>
                    <EditorQuestFlags doc={work} setDoc={setDoc}/>
                    <EditorDynamicSelect list={factions}
                    label="Origin Faction"
                    value={work.system.origin}
                    funcvalue={(x: any)=>x.key} 
                    funcstring={((x:any)=>x.text)} 
                    action={(x:string)=>{
                        let newDoc = _.cloneDeep(work);
                        newDoc.system.origin = String(x);
                        setDoc(newDoc);
                    }}/>
                </>
            )
        } else {
            return null;
        }
    } else {
        return null;
    }

    
}
