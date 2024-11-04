'use client'

/* Core */
import styles from './asseteditor.module.css';

/* Instruments */
import {
    assetSlice,
    selectRole,
    selectWork,
    upsertAssetAsync,
    useDispatch,
    useSelector,
    upsertLiveSceneAsync,
    selectScratch
} from '@/lib/redux';
import { useEffect } from 'react';
import { assetToCollection, deleteAsset, saveAsset, packScene } from '@/lib/util/util';
import EditorIcon from '../Editors/EditorIcon';
import EditorNodeSize from '../Editors/EditorNodeSize';
import EditorSceneType from '../Editors/EditorSceneType';
import AssetView from '../AssetViewer/AssetView';

export default function AssetEditorPreview(props: any){
    const dispatch = useDispatch();
    const windowSize = props.size;
    const work = props.mode == 'scratch' ? useSelector(selectScratch) : useSelector(selectWork);

    const role = useSelector(selectRole);

    const collection = assetToCollection(work);

    useEffect(()=>{
        dispatch(assetSlice.actions.setAssetView(work));
    }, [])

    return(
        <>
            <AssetView />
        </>
    );
}
