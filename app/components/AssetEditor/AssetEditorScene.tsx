'use client'

/* Core */
import styles from './asseteditor.module.css';

import {
    EditorImage,
    EditorMeta,
    EditorName,
    EditorSize,
    EditorString,
    EditorTextarea
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
import { assetToCollection, deleteAsset, saveAsset, packScene } from '@/lib/util/util';
import EditorIcon from '../Editors/EditorIcon';
import EditorNodeSize from '../Editors/EditorNodeSize';
import EditorSceneType from '../Editors/EditorSceneType';
import EditorGrid from '../Editors/EditorGrid';

export default function AssetEditorScene(props: any){
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

    return(
        <>
            <EditorSceneType setDoc={setDoc} doc={work} />
            <EditorIcon setDoc={setDoc} doc={work}/>
            <EditorSize setDoc={setDoc} doc={work}/>
        </>
    );
}
