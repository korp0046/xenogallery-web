'use client'

/* Core */
import styles from './asseteditor.module.css';

import {
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
import EditorItemType from '../Editors/EditorItemType';
import { assetToCollection, deleteAsset, saveAsset } from '@/lib/util/util';
import EditorItemSubtype from '../Editors/EditorItemSubtype';

export default function ItemEditor(props: any){
    const dispatch = useDispatch();
    const windowSize = props.size;
    const work = props.mode == 'scratch' ? useSelector(selectScratch) : useSelector(selectWork);

    const workCollection = assetToCollection(work);


    const saveDoc = (newValue: any) => {
        if(props.mode == 'scratch'){
            dispatch(scratchSlice.actions.setScratch(newValue));
        } else {
            dispatch(assetSlice.actions.setWork(newValue));
        }
    }

    const setDoc = (newValue: any) => {
        dispatch(assetSlice.actions.setWork(newValue));
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
                    <EditorTextarea setDoc={setDoc} doc={work} field='description'/>
                    <EditorPowerFlags doc={work} setDoc={setDoc}/>
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '5px'}}>
                        <EditorNumber doc={work} field={'level'} setDoc={setDoc} min={0} max={5}/>
                        <EditorNumber doc={work} field={'bulk'} setDoc={setDoc} min={0} max={3}/>
                        <EditorItemType doc={work} setDoc={setDoc}/>
                        <EditorItemSubtype doc={work} setDoc={setDoc}/>
                    </div>
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
