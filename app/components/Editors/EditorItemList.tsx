'use client'

/* Core */
import _ from 'lodash';
import { useState } from 'react';
import styles from './editor.module.css';


import AssetTileItem from '../AssetTile/AssetTileItem';

/* Instruments */
import {
    assetSlice,
    useDispatch
} from '@/lib/redux';

import { elementThumbs, gameIconsClean, sheetIcons, uiIcons } from '@/lib/gamedata/imgAssets';
import EditorGroupDiv from './EditorGroupDiv';
import SimpleIconButton from '../SimpleLabel/SimpleIconButton';
import ToggleBinary from '../Toggle/ToggleBinary';
import { getDefaultItem } from '@/lib/gamedata/defaultAssets';

export function FlexibleItem(props: any){
    const [clicked, setClicked] = useState(false);
    const [remove, setRemovable] = useState(false);

    const removeWithConfirmation = () => {
        if(!remove){
            setRemovable(true);
        } else {
            props.removeItem(props.data);
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
                <SimpleIconButton img={props.data.img} size={24}/>
                <span>{`Level ${props.data.system.level}; Bulk ${props.data.system.bulk}`}</span>
            </div>
            
            <div className={`${styles.flexiblecontrol} ${clicked ? styles.flexiblecontrolopen : ''}`}>
                <SimpleIconButton img={uiIcons.edit} size={24} action={()=>props.openScratchModal(props.data)}/>
                <SimpleIconButton img={uiIcons.trash} size={24} action={()=>removeWithConfirmation()}/>
            </div>
        </div>
    )

}

export function EditorItemListInner2(props: any){

    

    return(
        <div className={styles.flexiblewrapper}>
        {
            props.doc.items.filter((el: any)=>el.system.foundrytype == 'equipment').map((el:any, idx: any)=>{
                return(
                    <FlexibleItem key={idx} data={el} action={props.action} removeItem={props.removeItem} actionReady={props.actionReady} openScratchModal={props.openScratchModal}/>
                );
            })
        }
        </div>
    );

}

export function EditorItemList(props: any){
    const [itemBoxData, setItemBoxData] = useState(null);
    const dispatch = useDispatch();

    const removeItem = (power: any) => {
        const newValue = _.cloneDeep(props.doc);
        const newItems = _.cloneDeep(props.doc.items).filter((el: any)=> el._id != power._id);
        newValue.items = newItems;
        dispatch(assetSlice.actions.setWork(newValue));
        setItemBoxData(null);
    }

    let bulkTotal = props.doc.items.filter((el: any)=>el.system.foundrytype == 'equipment').reduce((acc: number, el:any)=>{
        return(acc + el.system.bulk);
    },0)

    const clickAction = props.action || removeItem;
    const actionText = props.actionText || "Remove";
    const actionReady = props.actionReady || null;
    const activeControls = !(props.disableControls === true);
    const openScratchModal = props.openScratchModal || null;

    const addNewItem = () => {
        const newWork = _.cloneDeep(props.doc);
        if(newWork && newWork.items && typeof Array.isArray(newWork.items)){
            newWork.items.push(getDefaultItem());
            dispatch(assetSlice.actions.setWork(newWork));
        }
    }

        return(
            <EditorGroupDiv label="Items">
                {
                    activeControls ? 
                    <div className={styles.controls}>
                    <SimpleIconButton img={gameIconsClean.new} size={48} action={()=>addNewItem()} hover={true}/>
                        <SimpleIconButton img={uiIcons.edit} size={48} action={()=>props.openSelectModal('items')} hover={true}/>
                        <SimpleIconButton img={gameIconsClean.bulk} size={48} text={`${bulkTotal}/14`}/>
                    </div>
                    : null
                }
                <EditorItemListInner2 doc={props.doc} action={setItemBoxData} removeItem={removeItem} actionReady={actionReady} openScratchModal={openScratchModal}/>
                {
                    itemBoxData ?
                    <div>
                        <AssetTileItem data={itemBoxData} action={clickAction} actionText={actionText}/>

                    </div>
                    :
                    null
                }
            </EditorGroupDiv>
        );
}



export default EditorItemList;