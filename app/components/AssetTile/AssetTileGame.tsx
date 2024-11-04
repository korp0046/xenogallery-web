'use client'

/* Core */
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import styles from './assettile.module.css';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    selectGame,
    selectModeSelect,
    upsertLiveSceneAsync,
    useDispatch,
    useSelector
} from '@/lib/redux';
import { cloneAsset, importScene, md2html } from '@/lib/util/util';

export default function AssetTileGame(props: any){

    return(
        <div className={styles.tile}>
            <div className={styles.toprow}>
                <div className={styles.name}>{props.data.name}</div>
            </div>
            <div style={{display: 'flex'}}>
                <div className={styles.imgdiv}>
                    <img src="/branding/logo.svg" style={{width: '128px', maxWidth: '128px'}}/>
                </div>
            </div>
            <div className={styles.controls}>
                    <button className={styles.controls} onClick={()=>props.action(props.data._id)}>ENTER</button>
                </div>
        </div>
    );
}
