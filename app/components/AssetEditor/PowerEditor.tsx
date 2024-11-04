'use client'

/* Core */
import styles from './asseteditor.module.css';

import {
    EditorElement,
    EditorMeta,
    EditorName,
    EditorNumber,
    EditorPowerFlags,
    EditorString,
    EditorTextarea
} from '../Editors';

/* Instruments */
import {
    assetSlice,
    scratchSlice,
    selectScratch,
    selectWork,
    upsertAssetAsync,
    useDispatch,
    useSelector
} from '@/lib/redux';
import EditorImage from '../Editors/EditorImage';
import { assetToCollection, deleteAsset, saveAsset } from '@/lib/util/util';
import EditorPowerAttack from '../Editors/EditorPowerAttack';
import EditorPowerDefense from '../Editors/EditorPowerDefense';
import EditorPowerMiss from '../Editors/EditorPowerMiss';
import EditorDynamicSelect from '../Editors/EditorDynamicSelect';
import { rechargeProgression } from '@/lib/gamedata/contentAssets';
import _ from 'lodash';

export default function PowerEditor(props: any){
    const dispatch = useDispatch();
    const windowSize = props.size;
    const work = props.mode == 'scratch' ? useSelector(selectScratch) : useSelector(selectWork);

    const workCollection = assetToCollection(work);

    const setDoc = (newValue: any) => {
        if(props.mode == 'scratch'){
            dispatch(scratchSlice.actions.setScratch(newValue));
        } else {
            dispatch(assetSlice.actions.setWork(newValue));
        }
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
                    <EditorString doc={work} field={'appearance'} setDoc={setDoc}/>
                    <EditorTextarea setDoc={setDoc} doc={work} field='description'/>
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
                    <EditorString doc={work} field={'tags'} setDoc={setDoc}/>
                    <EditorMeta doc={work} setDoc={setDoc}/>
                    <EditorImage doc={work} setDoc={setDoc}/>
                </div>
            </div>
        );
        } else {
            return null;
        }
}
