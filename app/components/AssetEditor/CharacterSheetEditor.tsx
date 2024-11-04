'use client'

/* Core */
import styles from './asseteditor.module.css';

import {
    EditorMeta,
    EditorName,
    EditorNumber,
    EditorNumberClassic,
    EditorPowerFlags,
    EditorPowerList,
    EditorProfile,
    EditorRole,
    EditorSize,
    EditorString,
    EditorTextarea
} from '../Editors';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    navSlice,
    selectWork,
    upsertAssetAsync,
    useDispatch,
    useSelector
} from '@/lib/redux';
import EditorImage from '../Editors/EditorImage';
import EditorLevel from '../Editors/EditorLevel';
import { assetToCollection, deleteAsset, saveAsset, normalizeActorStats } from '@/lib/util/util';
import EditorFoundryType from '../Editors/EditorFoundryType';
import EditorClass from '../Editors/EditorClass';
import EditorItemList from '../Editors/EditorItemList';

export default function CharacterSheetEditor(props: any){
    const dispatch = useDispatch();
    const windowSize = props.size;
    const work = useSelector(selectWork);
    const workCollection = assetToCollection(work);

    const setDoc = (newValue: any) => {
        dispatch(assetSlice.actions.setWork(newValue));
    }

    const normalizeStats = () => {
        let newActor = normalizeActorStats(work);
        setDoc(newActor);
    }

    const openSelectModal = (value: string) => {
        dispatch(navSlice.actions.setInnerNavState(false));
        dispatch(navSlice.actions.setNavState(false));
        dispatch(modalSlice.actions.openModal(value));
        dispatch(assetSlice.actions.setModeSelect(true));
    }

    if(work){
        return(
            <div className={styles.main}>
                <div className={styles.maininner}>
                    {
                        work.meta && work.meta.trash ? 
                        <div className={styles.savebutton}><button className={styles.save} onClick={()=>saveAsset(work)}>SAVE</button><button className={styles.delete} onClick={()=>deleteAsset(work)}>DELETE</button></div>
                        : 
                        <div className={styles.savebutton}><button className={styles.save} onClick={()=>saveAsset(work)}>SAVE</button></div>
                    }
                    <EditorName setDoc={setDoc} doc={work}/>
                    <EditorString doc={work} field={'brief'} setDoc={setDoc}/>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                        <EditorLevel doc={work} setDoc={setDoc}/>
                        <EditorNumberClassic doc={work} field={'hp'} setDoc={setDoc} label="MAX HP"/>
                        <EditorSize doc={work} setDoc={setDoc}/>
                        <EditorNumber doc={work} field={'pb'} setDoc={setDoc} max={16}/>
                        <EditorNumber doc={work} field={'pp'} setDoc={setDoc} min={0} max={110} width="220px" label="Total Power Points"/>
                        <EditorNumber doc={work} field={'ab'} setDoc={setDoc} min={0} max={30} width="220px" label="Attack Bonus"/>
                        <EditorNumber doc={work} field={'ad'} setDoc={setDoc} min={0} max={30} width="220px" label="Attack Damage"/>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                        <EditorNumber doc={work} field={'armor'} setDoc={setDoc}/>
                        <EditorNumber doc={work} field={'fortitude'} setDoc={setDoc}/>
                        <EditorNumber doc={work} field={'reflex'} setDoc={setDoc}/>
                        <EditorNumber doc={work} field={'will'} setDoc={setDoc}/>
                        <EditorString doc={work} field={'resist'} setDoc={setDoc} grow={true}/>
                    </div>
                    <button onClick={()=>normalizeStats()}>Normalize Stats</button>
                    <EditorString doc={work} field={'traits'} setDoc={setDoc}/>
                    <EditorMeta doc={work} setDoc={setDoc}/>
                    <EditorPowerList doc={work} openSelectModal={openSelectModal} workCollection={workCollection}/>
                    <EditorItemList doc={work} openSelectModal={openSelectModal} workCollection={workCollection}/>
                    <EditorImage doc={work} setDoc={setDoc} />
                </div>
            </div>
        );
        } else {
            return null;
        }
}
