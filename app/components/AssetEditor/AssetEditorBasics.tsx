'use client'

/* Core */
import SceneEditor from './AssetEditorScene';
import CharacterSheetEditor from './CharacterSheetEditor';
import PowerEditor from './PowerEditor';
import styles from './asseteditor.module.css';
import stylesbutton from '../../styles/button.module.css';

import {
    EditorImage,
    EditorMeta,
    EditorName,
    EditorString,
    EditorTextarea
} from '../Editors';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    scratchSlice,
    selectScratch,
    selectWork,
    useDispatch,
    useSelector
} from '@/lib/redux';
import ItemEditor from './ItemEditor';
import { assetToCollection, deleteAsset, saveAsset } from '@/lib/util/util';
import { useEffect } from 'react';

export default function AssetEditorBasics(props: any){
    const dispatch = useDispatch();
    const work = props.mode == 'scratch' ? useSelector(selectScratch) : useSelector(selectWork);

    const workCollection = assetToCollection(work);

    const collection = workCollection ? workCollection : '';

    console.log('collection', collection);

    const setDoc = (newValue: any) => {
        if(props.mode == 'scratch'){
            dispatch(scratchSlice.actions.setScratch(newValue));
        } else {
            dispatch(assetSlice.actions.setWork(newValue));
        }
    }

    if(work){
        return(
            <>
                <EditorName setDoc={setDoc} doc={work}/>
                {work?.system && work.system.hasOwnProperty('brief') ? <EditorString doc={work} field={'brief'} setDoc={setDoc}/> : null}
                <EditorTextarea setDoc={setDoc} doc={work} field='description'/>
                <EditorString doc={work} field={'tags'} setDoc={setDoc}/>
                { ['powers'].includes(collection) ? <EditorString doc={work} field={'subclass'} setDoc={setDoc}/> : null}
                
                <EditorMeta doc={work} setDoc={setDoc}/>
            </>
        );
        } else {
            return null;
        }
}
