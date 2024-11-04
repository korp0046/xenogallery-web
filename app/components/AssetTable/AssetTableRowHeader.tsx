'use client'
import styles from '../../styles/table.module.css';
import { useState } from 'react';
import { AssetActor, AssetItem, AssetPower, AssetScene, StaticAsset } from '@/lib/util/assetTypes';
import { sheetIcons, uiIcons } from '@/lib/gamedata/imgAssets';
import SimpleTinyImg from '../SimpleLabel/SimpleTinyImg';



export function AssetTableRowHeaderPower(props: any){
    return(
        <>
            <th>
                Name
            </th>
            <th>
                <SimpleTinyImg src={sheetIcons.level} />
            </th>
            <th>
                <SimpleTinyImg src={sheetIcons.elements} />
            </th>
            <th>
                <SimpleTinyImg src={sheetIcons.powerpoints} />
            </th>
            <th>
                Attack
            </th>
            <th>
                Defense
            </th>
            <th>
                Action
            </th>
            <th>
                <SimpleTinyImg src={sheetIcons.recharge} />
            </th>
            <th>
                Duration
            </th>
            <th>
                Range
            </th>
            <th>
                Flags
            </th>
        </>
    )
}

export function AssetTableRowHeaderScene(props: any){
    return(
        <>
            <th>
                Name
            </th>
            <th>
                Icon
            </th>
            <th>
                Type
            </th>
            <th>
                Tags
            </th>
        </>
    )
}

export function AssetTableRowHeaderItem(props: any){
    return(
        <>
            <th>
                Name
            </th>
            <th>
                
            </th>
            <th>
                <SimpleTinyImg src={sheetIcons.level} />
            </th>
            <th>
                Type
            </th>
            <th>
                Subtype
            </th>
            <th>
                <SimpleTinyImg src={sheetIcons.bulk} />
            </th>
            <th>
                <SimpleTinyImg src={sheetIcons.recharge} />
            </th>
        </>
    )
}

export function AssetTableRowHeaderActor(props: any){
    return(
        <>
            <th>
                Name
            </th>
        </>
    )
}

export function AssetTableRowHeaderQuest(props: any){
    return(
        <>
            <th>
                Name
            </th>
            <th>
                Origin
            </th>
            <th>
                Flags
            </th>
        </>
    )
}

export function AssetTableRowHeaderImage(props: any){
    let doc: StaticAsset = props.doc;
    return(
            <>
            <th>
                Name
            </th>
            <th>
                Description
            </th>
        </>
    )
}

export function AssetTableRowHeaderGeneric(props: any){
    let doc: StaticAsset = props.doc;
    return(
        <>
            <th>
                Name GENERIC
            </th>
        </>
    )
}

export default function AssetTableRowHeader(props: any){
    if(props.type == 'item'){
        return(
            <thead>
                <tr className={styles.table}>
                    <AssetTableRowHeaderItem/>
                    <th></th>
                
                </tr>
            </thead>
        )
    } else if (props.type == 'actor'){
        return(
            <thead>
            <tr className={styles.table}>
                <AssetTableRowHeaderActor/>
                <th></th>
                
            </tr>
            </thead>
        )
    } else if (props.type == 'power'){
        return(
            <thead>
            <tr className={styles.table}>
                <AssetTableRowHeaderPower/>
                <th></th>
                
            </tr>
            </thead>
        )
    } else if (props.type == 'scene'){
        return(
            <thead>
            <tr className={styles.table}>
                <AssetTableRowHeaderScene/>
                <th></th>
                
            </tr>
            </thead>
        )
    } else if (props.type == 'quest'){
        return(
            <thead>
            <tr className={styles.table}>
                <AssetTableRowHeaderQuest/>
                <th></th>
                
            </tr>
            </thead>
        )
    } else if (props.type == 'image'){
        return(
            <thead>
            <tr className={styles.table}>
                <AssetTableRowHeaderImage/>
                <th></th>
                
            </tr>
            </thead>
        )
    } else {
        return(
            <thead>
            <tr className={styles.table}>
                <AssetTableRowHeaderGeneric/>
                <th></th>
                
            </tr>
            </thead>
        )

    }
}