'use client'

/* Core */
import _ from 'lodash';
import { useState } from 'react';
import styles from './editor.module.css';


import AssetTilePower from '../AssetTile/AssetTilePower';

/* Instruments */
import {
    assetSlice,
    useDispatch
} from '@/lib/redux';

import { elementThumbs, gameIconsClean, sheetIcons, uiIcons } from '@/lib/gamedata/imgAssets';
import EditorGroupDiv from './EditorGroupDiv';
import SimpleIconButton from '../SimpleLabel/SimpleIconButton';
import ToggleBinary from '../Toggle/ToggleBinary';
import { getMaxPowerLevel } from '@/lib/gamedata/characterFormula';
import { getPowerPoints } from '@/lib/util/util';
import { getDefaultPower } from '@/lib/gamedata/defaultAssets';

export function FlexiblePower(props: any){
    const [clicked, setClicked] = useState(false);
    const [remove, setRemovable] = useState(false);

    const removeWithConfirmation = () => {
        if(!remove){
            setRemovable(true);
        } else {
            props.removePower(props.data);
        }
    }

    return(
        <div className={`${styles.flexibleitem} ${remove ? styles.removable : ''}`}
            onClick={()=>{
                setClicked(!clicked);
                props.action(props.data);
            }}
            onMouseLeave={()=>{
                setClicked(false)
                setRemovable(false);
            }}
        >
            <div className={`${styles.flexibleitemtitle}`}>{props.data.name}</div>
            <div className={`${styles.flexibleitemdetail}`}>
                {
                    props.data.system.element ?
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        {
                        Object.keys(props.data.system.element).filter((el)=>props.data.system.element[el]).map((el: any, idx: any)=>{
                            return(
                                <SimpleIconButton key={idx} size={24} img={elementThumbs[el]} />
                            ); 
                        })
                        }
                    </div>
                        :
                        null
                }
                
                <span>{`Level ${props.data.system.level}; Recharge ${props.data.system.recharge}`}</span>
            </div>
            
            <div className={`${styles.flexiblecontrol} ${clicked ? styles.flexiblecontrolopen : ''}`}>
                <SimpleIconButton img={uiIcons.edit} size={24} action={()=>props.openScratchModal(props.data)}/>
                <SimpleIconButton img={uiIcons.trash} size={24} action={()=>removeWithConfirmation()}/>
            </div>
        </div>
    )

}

export function EditorPowerListInner2(props: any){

    

    return(
        <div className={styles.flexiblewrapper}>
        {
            props.doc.items.filter((el: any)=>el.system.foundrytype == 'power').map((el:any, idx: any)=>{
                return(
                    <FlexiblePower key={idx} data={el} action={props.action} removePower={props.removePower} actionReady={props.actionReady} openScratchModal={props.openScratchModal}/>
                );
            })
        }
        </div>
    );

}

export function EditorPowerList(props: any){
    const [powerBoxData, setPowerBoxData] = useState(null);
    const dispatch = useDispatch();
    const subclassSet = new Set(props.doc.system.subclass.split(','));

    const removePower = (power: any) => {
        const newValue = _.cloneDeep(props.doc);
        const newItems = _.cloneDeep(props.doc.items).filter((el: any)=> el._id != power._id);
        newValue.items = newItems;
        dispatch(assetSlice.actions.setWork(newValue));
        setPowerBoxData(null);
    }


    const clickAction = props.action || removePower;
    const actionText = props.actionText || "Remove";
    const actionReady = props.actionReady || null;
    const activeControls = !(props.disableControls === true);
    const openScratchModal = props.openScratchModal || null;

    const addNewPower = () => {
        const newWork = _.cloneDeep(props.doc);
        if(newWork && newWork.items && typeof Array.isArray(newWork.items)){
            newWork.items.push(getDefaultPower());
            dispatch(assetSlice.actions.setWork(newWork));
        }
    }

        return(
            <EditorGroupDiv label="Powers">
                {
                    activeControls ? 
                    <div className={styles.controls}>
                        <SimpleIconButton img={gameIconsClean.new} size={48} action={()=>addNewPower()} hover={true}/>
                        <SimpleIconButton img={uiIcons.edit} size={48} action={()=>props.openSelectModal('powers')} hover={true}/>
                    </div>
                    : null
                }

                <EditorPowerListInner2 doc={props.doc} action={setPowerBoxData} removePower={removePower}  actionReady={actionReady} openScratchModal={openScratchModal}/>
                {
                    powerBoxData ?
                    <div>
                        <AssetTilePower data={powerBoxData} action={clickAction} actionText={actionText} activeControls={activeControls}/>

                    </div>
                    :
                    null
                }
            </EditorGroupDiv>
        );
}



export default EditorPowerList;