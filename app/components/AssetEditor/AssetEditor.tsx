'use client'

/* Core */
import styles from './asseteditor.module.css';
import stylesbutton from '../../styles/button.module.css';

/* Instruments */
import {
    modalSlice,
    selectScratch,
    selectWork,
    useDispatch,
    useSelector
} from '@/lib/redux';
import { assetToCollection, cloneAsset, deleteAsset, saveAsset, updateWorkwithScratch } from '@/lib/util/util';
import { useEffect, useState } from 'react';
import AssetEditorBasics from './AssetEditorBasics';
import AssetEditorImage from './AssetEditorImage';
import AssetEditorDetails from './AssetEditorDetails';
import AssetEditorPowers from './AssetEditorPowers';
import AssetEditorItems from './AssetEditorItems';
import AssetEditorPreview from './AssetEditorPreview';

export default function AssetEditor(props: any){
    const dispatch = useDispatch();
    const work = props.mode == 'scratch' ? useSelector(selectScratch) : useSelector(selectWork);
    const workCollection = assetToCollection(work);
    const [tab, setTab] = useState('basics');

    useEffect(()=> {
        setTimeout(()=>{
            if(!work){
                dispatch(modalSlice.actions.closeModal(null));
            }
        },250);
    }, [work]);

    const save = (doc: any) => {
        if(props.mode == 'scratch'){
            updateWorkwithScratch(doc);
        } else {
            saveAsset(doc);
        }
    }

    let isCharacter = false;
    
    if(work && workCollection && ['characters', 'opponents', 'personas', 'liveactors'].includes(workCollection)){
        isCharacter = true;
    }

    if(work){
        return(
            <div className={styles.main}>
                <div className={stylesbutton.buttonwrapper}>
                    <button className={`${stylesbutton.button}  ${stylesbutton.green}`} onClick={()=>save(work)}>SAVE</button>
                    
                    <button className={`${stylesbutton.button} ${tab == 'preview' ? stylesbutton.selected : ''}`} onClick={()=>setTab('preview')}>PREVIEW</button>
                    <button className={`${stylesbutton.button} ${tab == 'basics' ? stylesbutton.selected : ''}`} onClick={()=>setTab('basics')}>BASICS</button>
                    <button className={`${stylesbutton.button} ${tab == 'details' ? stylesbutton.selected : ''}`} onClick={()=>setTab('details')}>DETAILS</button>
                    {
                    isCharacter ? 
                    <>
                        <button className={`${stylesbutton.button} ${tab == 'powers' ? stylesbutton.selected : ''}`} onClick={()=>setTab('powers')}>POWERS</button>
                        <button className={`${stylesbutton.button} ${tab == 'items' ? stylesbutton.selected : ''}`} onClick={()=>setTab('items')}>ITEMS</button>
                    </> : null
                    }
                    <button className={`${stylesbutton.button} ${tab == 'image' ? stylesbutton.selected : ''}`} onClick={()=>setTab('image')}>IMAGE</button>
                    <div className={` ${stylesbutton.right}`}>
                        <button className={`${stylesbutton.button} ${stylesbutton.yellow}`} onClick={()=>cloneAsset(work)}>CLONE</button>
                        { work.meta && work.meta.trash ? <button className={`${stylesbutton.button} ${stylesbutton.red}`} onClick={()=>deleteAsset(work)}>DELETE</button> : null}
                    </div>

                </div>
                {tab == 'preview' ? <AssetEditorPreview mode={props.mode}/> : null}
                {tab == 'basics' ? <AssetEditorBasics mode={props.mode}/> : null}
                {tab == 'details' ? <AssetEditorDetails mode={props.mode}/> : null}
                {
                    isCharacter ? 
                    <>
                    {tab == 'powers' ? <AssetEditorPowers mode={props.mode}/> : null}
                    {tab == 'items' ? <AssetEditorItems mode={props.mode}/> : null}
                    </> : null
                }
                {tab == 'image' ? <AssetEditorImage mode={props.mode}/> : null}
            </div>
        );
        } else {
            return null;
        }
}
