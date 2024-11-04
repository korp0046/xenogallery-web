'use client'

/* Core */
import { useDispatch, useSelector } from 'react-redux';
/* Core */
import styles from './assetview.module.css';
import stylesbutton from '../../styles/button.module.css';
import { selectAssetView, selectIsSuperuser, selectModeSelect } from '@/lib/redux';

export default function AssetViewUser(props: any){
    const dispatch = useDispatch();
    const isSelectMode = useSelector(selectModeSelect);
    const assetView: any = useSelector(selectAssetView);
    const isSuperuser = useSelector(selectIsSuperuser);

    return(
        <div className={styles.tile}>
            <div className={styles.toprow}>
                <div className={styles.name}>{assetView.name}</div>
            </div>
            <div style={{display: 'flex'}}>
                <div className={styles.imgdiv}>
                    <img src="/branding/logo.svg" style={{width: '128px', maxWidth: '128px'}}/>
                </div>
            </div>
        </div>
    );
}
