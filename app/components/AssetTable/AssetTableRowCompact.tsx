'use client'
import styles from '../../styles/table.module.css';
import { useState } from 'react';
import { AssetActor, AssetItem, AssetPower, AssetQuest, AssetScene, StaticAsset } from '@/lib/util/assetTypes';
import SimpleElement from '../SimpleLabel/SimpleElement';
import SimpleFlags from '../SimpleLabel/SimpleFlags';
import SimpleWordIcon from '../SimpleLabel/SimpleWordIcon';
import SimpleTinyImg from '../SimpleLabel/SimpleTinyImg';
import SimpleTags from '../SimpleLabel/SimpleTags';



export function AssetTableRowCompactPower(props: any){
    let doc: AssetPower = props.doc;
    return(
        <>
            <td>
                {doc.system.level}
            </td>
            <td>
                <SimpleElement data={doc.system.element} />
            </td>
            <td>
                {doc.system.build}
            </td>
            <td>
                <SimpleWordIcon data={doc.system.attack} />
            </td>
            <td>
                <SimpleWordIcon data={doc.system.defense} />
            </td>
            <td>
                <SimpleWordIcon data={doc.system.time} />
            </td>
            <td>
                {doc.system.recharge}
            </td>
            <td>
                {doc.system.duration}
            </td>
            <td>
                {doc.system.range}
            </td>
            <td>
                <SimpleFlags data={doc.system.flags} />
            </td>
        </>
    )
}

export function AssetTableRowCompactScene(props: any){
    let doc: AssetScene = props.doc;
    return(
        <>
            <td>
                <SimpleTinyImg src={doc.system.icon} dark={true} />
            </td>
            <td>
                <SimpleWordIcon data={doc.system.foundrytype} />
            </td>
            <td>
                <SimpleTags data={doc.system.tags} />
            </td>
        </>
    )
}

export function AssetTableRowCompactQuest(props: any){
    let doc: AssetQuest = props.doc;
    return(
        <>
            <td>
                {doc.system.origin}
            </td>
            <td>
                <SimpleFlags data={doc.system.flags} />
            </td>
        </>
    )
}


export function AssetTableRowCompactImage(props: any){
    let doc: AssetQuest = props.doc;
    return(
        <>
            <td>
            {doc.system.description}
            </td>
        </>
    )
}

export function AssetTableRowCompactItem(props: any){
    let doc: AssetItem = props.doc;
    return(
        <>
            <td>
                <SimpleTinyImg src={doc.img} dark={true} />
            </td>
            <td>
                {doc.system.level}
            </td>
            <td>
                {doc.system.type}
            </td>
            <td>
                {doc.system.subtype}
            </td>
            <td>
                {doc.system.bulk}
            </td>
            <td>
                {doc.system.recharge}
            </td>
        </>
    )
}

export function AssetTableRowCompactActor(props: any){
    let doc: AssetActor = props.doc;
    return(
        <>
        </>
    )
}

export function AssetTableRowCompactGeneric(props: any){
    let doc: StaticAsset = props.doc;
    return(
        <>
        </>
    )
}