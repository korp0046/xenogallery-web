'use client'
import styles from '../../styles/table.module.css';
import { useState } from 'react';
import { AssetActor, AssetPower, AssetQuest, StaticAsset } from '@/lib/util/assetTypes';

import { AssetTableRowCompactActor, AssetTableRowCompactGeneric, AssetTableRowCompactImage, AssetTableRowCompactItem, AssetTableRowCompactPower, AssetTableRowCompactQuest, AssetTableRowCompactScene } from './AssetTableRowCompact';

import { AssetTableRowExpandedActor, AssetTableRowExpandedGeneric, AssetTableRowExpandedItem, AssetTableRowExpandedPower, AssetTableRowExpandedScene } from './AssetTableRowExpanded';
import { useDispatch, useSelector } from 'react-redux';
import { assetSlice, modalSlice, navSlice, selectDevMode } from '@/lib/redux';
import SimpleTinyImg from '../SimpleLabel/SimpleTinyImg';

export function AssetTableRowExpandedBase(props: any){
    let baseDoc: any = props.doc;
    if(props.type == 'item'){
        let doc: AssetPower = baseDoc;
        return(
            <tr className={`${styles.table}`}>
                <AssetTableRowExpandedItem doc={doc}/>
            </tr>
        )
    } else if (props.type == 'actor'){
        let doc: AssetActor = baseDoc;
        return(
            <tr className={`${styles.table}`}>
                <AssetTableRowExpandedActor doc={doc}/>
            </tr>
        )
    } else if (props.type == 'power'){
        let doc: AssetActor = baseDoc;
        return(
            <tr className={`${styles.table}`}>
                <AssetTableRowExpandedPower doc={doc}/>
            </tr>
        )
    } else if (props.type == 'scene'){
        let doc: AssetActor = baseDoc;
        return(
            <tr className={`${styles.table}`}>
                <AssetTableRowExpandedScene doc={doc}/> 
            </tr>
        )
    } else {
        let doc: StaticAsset = baseDoc;
        return(
            <tr className={`${styles.table}`}>
                <AssetTableRowExpandedGeneric doc={doc}/>
            </tr>
        )

    }


}

export function AssetTableRowCompactBase(props: any){
    const dispatch = useDispatch();
    const isLive = useSelector(selectDevMode);
    let baseDoc: any = props.doc;

    const viewAsset = (ridx: number) => {
        props.setTidx(ridx);
        dispatch(navSlice.actions.setArrowsEnabled(true));
        if(props.modal){
            dispatch(assetSlice.actions.setAssetView(baseDoc));
            dispatch(modalSlice.actions.setTrayPage('assetview'));
            dispatch(modalSlice.actions.openTray(true));

        } else {
            if(isLive){
                dispatch(assetSlice.actions.setWork(baseDoc));
                dispatch(assetSlice.actions.setAssetView(baseDoc));
                dispatch(navSlice.actions.setTrayPage('work'));
                dispatch(modalSlice.actions.openTray(false));
                dispatch(navSlice.actions.setTrayState(true));

            } else {
                dispatch(assetSlice.actions.setAssetView(baseDoc));
                dispatch(navSlice.actions.setTrayPage('assetview'));
                dispatch(modalSlice.actions.openTray(false));
                dispatch(navSlice.actions.setTrayState(true));

            }
        }
    }

    if(props.type == 'item'){
        let doc: AssetPower = baseDoc;
        return(
            <tr className={`${styles.table} ${props.ridx == props.tidx ? styles.selected : ''}`} onClick={()=>viewAsset(props.ridx)}>
                <td>{doc.name}</td>
                <AssetTableRowCompactItem doc={doc}/>
            </tr>
        )
    } else if (props.type == 'actor'){
        let doc: AssetActor = baseDoc;
        return(
            <tr className={`${styles.table} ${props.ridx == props.tidx ? styles.selected : ''}`} onClick={()=>viewAsset(props.ridx)}>
                <td>{doc.name}</td>
                <AssetTableRowCompactActor doc={doc}/>
            </tr>
        )
    } else if (props.type == 'power'){
        let doc: AssetActor = baseDoc;
        return(
            <tr className={`${styles.table} ${props.ridx == props.tidx ? styles.selected : ''}`} onClick={()=>viewAsset(props.ridx)}>
                <td>{doc.name}</td>
                <AssetTableRowCompactPower doc={doc}/>
            </tr>
        )
    } else if (props.type == 'scene'){
        let doc: AssetActor = baseDoc;
        return(
            <tr className={`${styles.table} ${props.ridx == props.tidx ? styles.selected : ''}`} onClick={()=>viewAsset(props.ridx)}>
                <td>{doc.name}</td>
                <AssetTableRowCompactScene doc={doc}/>
            </tr>
        )
    } else if (props.type == 'quest'){
        let doc: AssetQuest = baseDoc;
        return(
            <tr className={`${styles.table} ${props.ridx == props.tidx ? styles.selected : ''}`} onClick={()=>viewAsset(props.ridx)}>
                <td>{doc.name}</td>
                <AssetTableRowCompactQuest doc={doc}/>
            </tr>
        )
    } else if (props.type == 'image'){
        let doc: AssetQuest = baseDoc;
        return(
            <tr className={`${styles.table} ${props.ridx == props.tidx ? styles.selected : ''}`} onClick={()=>viewAsset(props.ridx)}>
                <td>{doc.name}</td>
                <AssetTableRowCompactImage doc={doc}/>
            </tr>
        )
    } else {
        let doc: StaticAsset = baseDoc;
        return(
            <tr className={`${styles.table} ${props.ridx == props.tidx ? styles.selected : ''}`} onClick={()=>viewAsset(props.ridx)}>
                <td>{doc.name}</td>
                <AssetTableRowCompactGeneric doc={doc}/>
            </tr>
        )

    }


}


export default function AssetTableRow(props: any){
    const doc = props.doc;


    return(
        <>
            <AssetTableRowCompactBase doc={doc} type={props.type} modal={props.modal} ridx={props.ridx} tidx={props.tidx} setTidx={props.setTidx} />
        </>
    )

}
