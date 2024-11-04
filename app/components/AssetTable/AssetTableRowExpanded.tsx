'use client'
import styles from '../../styles/table.module.css';
import { useState } from 'react';
import { AssetActor, AssetItem, AssetPower, AssetScene, StaticAsset } from '@/lib/util/assetTypes';
import SimpleElement from '../SimpleLabel/SimpleElement';
import { md2html } from '@/lib/util/util';



export function AssetTableRowExpandedPower(props: any){
    let doc: AssetPower = props.doc;
    return(
        <td className={styles.expanded} colSpan={100}>
            <div className={styles.border} dangerouslySetInnerHTML={{__html: md2html(doc.system.description)}} />
        </td>
    )
}

export function AssetTableRowExpandedScene(props: any){
    let doc: AssetScene = props.doc;
    return(
        <td className={styles.expanded} colSpan={100}>
            <div className={`${styles.border} ${styles.imgfirst}`} ><img className={styles.expandedimg} src={doc.system.img} /><div dangerouslySetInnerHTML={{__html: md2html(doc.system.description)}} /></div>
        </td>
    )
}

export function AssetTableRowExpandedItem(props: any){
    let doc: AssetItem = props.doc;
    return(
        <td className={styles.expanded} colSpan={100}>
            <div className={styles.border} dangerouslySetInnerHTML={{__html: md2html(doc.system.description)}} />
        </td>
    )
}

export function AssetTableRowExpandedActor(props: any){
    let doc: AssetActor = props.doc;
    return(
        <td className={styles.expanded} colSpan={100}>
            <div className={styles.border} dangerouslySetInnerHTML={{__html: md2html(doc.system.description)}} />
        </td>
    )
}

export function AssetTableRowExpandedGeneric(props: any){
    let doc: StaticAsset = props.doc;
    return(
        <td className={styles.expanded} colSpan={100}>
            <div className={styles.border} dangerouslySetInnerHTML={{__html: md2html(doc.system.description)}} />
        </td>
    )
}