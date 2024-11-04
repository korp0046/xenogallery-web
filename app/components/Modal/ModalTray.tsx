'use client'

/* Core */
import { FunctionComponent, ReactElement } from 'react';

/* Instruments */
import {
    modalSlice,
    selectModalOpen,
    selectModalPage,
    selectModalTrayOpen,
    selectModalTrayPage,
    selectModalTrayVisible,
    selectTrayOpen,
    useDispatch,
    useSelector
} from '@/lib/redux';
import AssetEditor from '../AssetEditor/AssetEditor';
import styles from '../../styles/modal.module.css';
import stylesbutton from '../../styles/button.module.css';
import ActionPanel from '../ActionPanel/ActionPanel';
import SmartPick from '../SmartPick/SmartPick';
import AssetView from '../AssetViewer/AssetView';
import { RuleTree } from '../Rules/RuleTree';
import AssetTable from '../AssetTable/AssetTable';

export default function ModalTray(props: any){
    const dispatch = useDispatch();
    const isOpen = useSelector(selectModalTrayOpen);
    const page = useSelector(selectModalTrayPage);
    const visible = useSelector(selectModalTrayVisible);
    const open = props.open;

    const openTray = (value: boolean) => {
        dispatch(modalSlice.actions.openTray(value));
    }

    if(visible){
        return (
            <div className={styles.modaltray}>
                <div className={`${stylesbutton.traycontrol}`} onClick={()=>openTray(!isOpen)}>
                    <div className={`${stylesbutton.button} ${stylesbutton.fill}`}>{isOpen ? 'CLOSE': 'OPEN'}</div>
                </div>
                <div className={`${styles.traybody} ${!isOpen ? styles.closed: ''}`}>
                    {
                        (page == 'assets') ? <AssetTable/> : null 
                    }
                    {
                        (page == 'work') ? <AssetEditor/> : null 
                    }
                    {
                        (page == 'action') ? <ActionPanel/> : null 
                    }
                    {
                        (page == 'assetview') ? <AssetView/> : null 
                    }
                    {
                        (page == 'ruletree') ? <RuleTree/> : null 
                    }
                </div>
            </div>
          )
    } else {
        return null;
    }

}
