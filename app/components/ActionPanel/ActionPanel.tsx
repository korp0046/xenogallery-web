'use client'

import { useEffect } from 'react';
/* Core */
import { addPlusMinus, assetToCollection, chatPower, saveAsset } from '@/lib/util/util';
import SimpleLabel from '../SimpleLabel/SimpleLabel';
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import styles from './actionpanel.module.css';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    selectGame,
    selectLiveActors,
    selectModeSelect,
    selectWork,
    upsertLiveActorAsync,
    useDispatch,
    useSelector
} from '@/lib/redux';
import _ from 'lodash';
import { EditorGroupDiv, EditorNumberClassic, EditorPowerList } from '../Editors';
import AbilityCheckPanel from './AbilityCheckPanel';
import EditorItemList from '../Editors/EditorItemList';
import { sheetIcons } from '@/lib/gamedata/imgAssets';
import SimpleAttack from '../SimpleLabel/SimpleAttack';
import RecoveryPanel from './RecoveryPanel';
import EditorStatsTable from '../Editors/EditorStatsTable';
import SkillTestPanel from './SkillTestPanel';

export default function ActionPanel(props: any){
    const dispatch = useDispatch();
    const liveactors = useSelector(selectLiveActors);
    const isSelectMode = useSelector(selectModeSelect);
    const work = useSelector(selectWork);
    const workCollection = assetToCollection(work);
    const game = useSelector(selectGame);
    const type = work.type;
    const tags = work.system.tags ? work.system.tags.split(',') : [];
    const resists = work.system.resist ? work.system.resist.split(',') : [];
    const traits = work.system.traits ? work.system.traits.split(',') : [];
    
    const usePower = (power: any) => {
        chatPower(work, power);
    }

    const actionReady = (power: any) => {
        let newWork = _.cloneDeep(work);
        for(let item of newWork.items){
            if(item.name == power.name){
                item.live.ready = !item.live.ready;
            }
        }
        setDoc(newWork);
    }

    const setDoc = (newValue: any) => {
        dispatch(assetSlice.actions.setWork(newValue));
        saveAsset(newValue);
    }

    let selected = false;
    if(work && work.items && typeof Array.isArray(work.items)){
        for(let item of work.items){
            if(item.name && String(item.name) == String(work.name)){
                selected = true;
            }
        }
    }

    useEffect(()=> {
        dispatch(modalSlice.actions.setTrayPage('default'));
    }, []);

    return(
        <div className={styles.main}>
            <div className={styles.maininner}>
        <div className={styles.toprow}>
            <div className={styles.name}>{work.name}</div>
            {
                work.system.role && work.system.level != undefined && work.system.level != null  ?
                <div className={styles.powerlevel}>{work.system.role} {work.system.level}</div>
                :
                null
            }
        </div>
        <div className={styles.bodywide}>
                <EditorGroupDiv label="Status">
                    <EditorNumberClassic parentfield="live" doc={work} field={'stress'} setDoc={setDoc} label="STRESS" img={sheetIcons.stress}/>
                    <EditorNumberClassic parentfield="live" doc={work} field={'gear'} setDoc={setDoc} label="GEAR" img={sheetIcons.gear}/>
                    <EditorNumberClassic parentfield="live" doc={work} field={'provisions'} setDoc={setDoc} label="PROVISIONS" img={sheetIcons.provisions}/>
                    <EditorNumberClassic parentfield="live" doc={work} field={'wealth'} setDoc={setDoc} label="WEALTH" img={sheetIcons.wealth}/>
                    <EditorNumberClassic parentfield="live" doc={work} field={'wounds'} setDoc={setDoc} label="WOUNDS" img={sheetIcons.skulls}/>
                </EditorGroupDiv>
                <EditorGroupDiv label="Defenses">
                    <EditorNumberClassic parentfield="live" doc={work} field={'evasion'} setDoc={setDoc} label="EVASION" img={sheetIcons.reflex}/>
                    <EditorNumberClassic parentfield="live" doc={work} field={'es'} setDoc={setDoc} label="ENERGY SHIELD" img={sheetIcons.es}/>
                    <EditorNumberClassic parentfield="live" doc={work} field={'armor'} setDoc={setDoc} label="ARMOR" img={sheetIcons.armor}/>
                    <EditorNumberClassic parentfield="live" doc={work} field={'hp'} setDoc={setDoc} label="CURRENT HP" img={sheetIcons.hitpoints}/>
                </EditorGroupDiv>
                <EditorGroupDiv label="Complications">
                    <div><div>CONDITIONS PLACEHOLDER</div></div>
                    <div><div>AFFLICTIONS PLACEHOLDER</div></div>
                </EditorGroupDiv>
                <div className={styles.bodywide}>
                <RecoveryPanel doc={work} setDoc={setDoc}/>
                <div>
                    <SimpleTagWrapper data={resists} label='Resists'/>
                </div>
                <SkillTestPanel doc={work} setDoc={setDoc}/>


                </div>
                <div className={styles.bodywide}>
                    <EditorPowerList doc={work} disableControls={true} openSelectModal={()=>{}} action={usePower} actionReady={actionReady} actionText="Use Power"/>
                    <EditorItemList doc={work} disableControls={true} openSelectModal={()=>{}} action={usePower} actionReady={actionReady} actionText="Use Item"/>
                </div>


        </div>
        <div className={styles.bodywide}>

            </div>
            <div className={styles.footerwide}>
                <div className={styles.tagblock}>
                    </div>
            </div>
        </div>
        </div>
    );
}
