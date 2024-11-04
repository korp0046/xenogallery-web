'use client'

/* Core */
import styles from './assetview.module.css';

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
    selectAssetView,
    useDispatch,
    useSelector
} from '@/lib/redux';
import { assetToCollection, deleteAsset, saveAsset } from '@/lib/util/util';
import { StaticAsset } from '@/lib/util/assetTypes';
import AssetViewActor from './AssetViewActor';
import AssetViewPower from './AssetViewPower';
import AssetViewScene from './AssetViewScene';
import AssetViewItem from './AssetViewItem';
import AssetViewGame from './AssetViewGame';
import AssetViewRoom from './AssetViewRoom';
import AssetViewUser from './AssetViewUser';
import AssetViewQuest from './AssetViewQuest';
import AssetViewImage from './AssetViewImage';

export default function AssetView(props: any){
    const assetView: StaticAsset | null = useSelector(selectAssetView);
    const assetViewCollection = assetToCollection(assetView);
    
    if(assetView && assetViewCollection && ['characters', 'opponents', 'personas', 'liveactors'].includes(assetViewCollection)){
        return <div className={styles.tile}><AssetViewActor /></div>;
    } 
    else if (assetView && (assetViewCollection == 'powers')){
        return <div className={styles.tile}><AssetViewPower /></div>;
    }
    else if (assetView && assetViewCollection && ['battlemaps', 'exploremaps', 'basicscenes', 'livescenes'].includes(assetViewCollection)){
        return <div className={styles.tile}><AssetViewScene /></div>;
    }
    else if (assetView && (assetViewCollection == 'items')){
        return <div className={styles.tile}><AssetViewItem /></div>;
    }
    else if (assetView && (assetViewCollection == 'games')){
        return <div className={styles.tile}><AssetViewGame /></div>;
    }
    else if (assetView && (assetViewCollection == 'rooms')){
        return <div className={styles.tile}><AssetViewRoom /></div>;
    }
    else if (assetView && (assetViewCollection == 'items')){
        return <div className={styles.tile}><AssetViewItem /></div>;
    }
    else if (assetView && (assetViewCollection == 'users')){
        return <div className={styles.tile}><AssetViewUser /></div>;
    }
    else if (assetView && (assetViewCollection == 'quests')){
        return <div className={styles.tile}><AssetViewQuest /></div>;
    }
    else if (assetView && (assetViewCollection == 'images')){
        return <div className={styles.tile}><AssetViewImage /></div>;
    } else {
        return null;
    }
}
