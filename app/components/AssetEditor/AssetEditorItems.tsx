'use client'

/* Core */
import styles from './asseteditor.module.css';

import {
    EditorImage,
    EditorMeta,
    EditorName,
    EditorPowerList,
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
    navSlice,
    modalSlice,
    selectScratch,
    scratchSlice
} from '@/lib/redux';
import { assetToCollection, deleteAsset, saveAsset, packScene } from '@/lib/util/util';
import EditorIcon from '../Editors/EditorIcon';
import EditorNodeSize from '../Editors/EditorNodeSize';
import EditorSceneType from '../Editors/EditorSceneType';
import EditorItemList from '../Editors/EditorItemList';

export default function AssetEditorItems(props: any){
    const dispatch = useDispatch();
    const windowSize = props.size;
    const work = props.mode == 'scratch' ? useSelector(selectScratch) : useSelector(selectWork);

    const role = useSelector(selectRole);

    const collection = assetToCollection(work);

    const openSelectModal = (value: string) => {
        dispatch(modalSlice.actions.openModal(value));
        dispatch(assetSlice.actions.setModeSelect(true));
    }

    const openScratchModal = (value: string) => {
        dispatch(scratchSlice.actions.setScratch(value));
        dispatch(modalSlice.actions.openModal('scratch'));
    }

    return(
        <>
            <EditorItemList doc={work} openSelectModal={openSelectModal} openScratchModal={openScratchModal} workCollection={collection}/>
        </>
    );
}
