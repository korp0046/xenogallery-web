'use client'

/* Core */
import { FunctionComponent, ReactElement, useState } from 'react';

/* Instruments */
import {
    modalSlice,
    selectModalOpen,
    selectModalPage,
    selectModalTrayOpen,
    selectTrayOpen,
    useDispatch,
    useSelector
} from '@/lib/redux';
import AssetEditor from '../AssetEditor/AssetEditor';
import styles from '../../styles/modal.module.css';
import GamedocBrowser from '../GamedocBrowser/GamedocBrowser';
import ActionPanel from '../ActionPanel/ActionPanel';
import SmartPick from '../SmartPick/SmartPick';
import AssetTableModalAdapter from '../AssetTable/AssetTableModalAdapter';
import ModalTray from './ModalTray';
import AssetScenePicker from '../AssetPicker/AssetPickerScene';

interface ModalPanelProps extends React.PropsWithChildren {
    children: ReactElement
  }

const ModalPanel: FunctionComponent<ModalPanelProps> = (props) => {
    const dispatch = useDispatch();

    const closeModal = () => {
        dispatch(modalSlice.actions.openTray(false));
        dispatch(modalSlice.actions.closeModal(null));
    }
    
    return(
        <div className={styles.innerpanel}>
            <div className={`${styles.topbar}`} onClick={()=>closeModal()}>CLOSE</div>
            {props.children}
        </div>
    );
}


export default function Modal(props: any){
    const dispatch = useDispatch();
    const page = useSelector(selectModalPage);
    const open = useSelector(selectModalOpen);
    const isTrayOpen = useSelector(selectModalTrayOpen);

    const closeModal = () => {
        dispatch(modalSlice.actions.openTray(false));
        dispatch(modalSlice.actions.closeModal(null));
    }

    if(open){
        return (
            <div className={`${styles.main} ${isTrayOpen ? styles.open: ''}`}>
                <div className={`${styles.shade}`} onClick={()=>closeModal()}></div>
              {
                  (page == 'items') ? <ModalPanel><AssetTableModalAdapter collection='items'/></ModalPanel> : null 
              }
              {
                  (page == 'powers') ? <ModalPanel><AssetTableModalAdapter collection='powers'/></ModalPanel> : null 
              }
              {
                  (page == 'battlemaps') ? <ModalPanel><AssetTableModalAdapter collection='battlemaps'/></ModalPanel> : null 
              }
              {
                  (page == 'basicscenes') ? <ModalPanel><AssetTableModalAdapter collection='basicscenes'/></ModalPanel> : null 
              }
              {
                  (page == 'exploremaps') ? <ModalPanel><AssetTableModalAdapter collection='exploremaps'/></ModalPanel> : null 
              }
              {
                  (page == 'allscenes') ? <ModalPanel><AssetTableModalAdapter collection='exploremaps'/></ModalPanel> : null 
              }
              {
                  (page == 'characters') ? <ModalPanel><AssetTableModalAdapter collection='characters'/></ModalPanel> : null 
              }
              {
                  (page == 'opponents') ? <ModalPanel><AssetTableModalAdapter collection='opponents'/></ModalPanel> : null 
              }
              {
                  (page == 'personas') ? <ModalPanel><AssetTableModalAdapter collection='personas'/></ModalPanel> : null 
              }
              {
                  (page == 'events') ? <ModalPanel><AssetTableModalAdapter collection='events'/></ModalPanel> : null 
              }
              {
                  (page == 'images') ? <ModalPanel><AssetTableModalAdapter collection='images'/></ModalPanel> : null 
              }
              {
                  (page == 'work') ? <ModalPanel><AssetEditor/></ModalPanel> : null 
              }
              {
                  (page == 'scratch') ? <ModalPanel><AssetEditor mode='scratch'/></ModalPanel> : null 
              }
              {
                  (page == 'gamedocs') ? <ModalPanel><GamedocBrowser/></ModalPanel> : null 
              }
              {
                  (page == 'action') ? <ModalPanel><ActionPanel/></ModalPanel> : null 
              }
              {
                  (page == 'smartpowers') ? <ModalPanel><SmartPick/></ModalPanel> : null 
              }
              {
                  (page == 'scenepicker') ? <ModalPanel><AssetScenePicker /></ModalPanel> : null 
              }
              <ModalTray/>
            </div>
          )
        }
    else{
        return null;
    }
}
