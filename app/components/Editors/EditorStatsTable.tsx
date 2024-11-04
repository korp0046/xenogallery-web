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

import { elementThumbs, itemIcons, sheetIcons } from '@/lib/gamedata/imgAssets';
import EditorGroupDiv from './EditorGroupDiv';
import SimpleIconButton from '../SimpleLabel/SimpleIconButton';
import { AssetActor } from '@/lib/util/assetTypes';

function CellEditString(props: any){
    return(
        <td>
            <input className={styles.inputstr} type="text" value={props.value} onChange={(e)=>props.updateField(!props.editLive, props.field, e.target.value)} />
        </td>
    )

}

function CellEditNumber(props: any){
    return(
        <td>
        <button onClick={()=>props.updateField(!props.editLive, props.field, props.value - 10)}>-10</button>
            <button onClick={()=>props.updateField(!props.editLive, props.field, props.value - 5)}>-5</button>
            <button onClick={()=>props.updateField(!props.editLive, props.field, props.value - 1)}>-1</button>
            <button onClick={()=>props.updateField(!props.editLive, props.field, props.value + 1)}>+1</button>
            <button onClick={()=>props.updateField(!props.editLive, props.field, props.value + 5)}>+5</button>
            <button onClick={()=>props.updateField(!props.editLive, props.field, props.value + 10)}>+10</button>
        </td>
    )

}

function EditorStatsRow(props: any){
    const actor: any = props.actor;
    const img = props.img;
    const field = props.field;
    const label = props.label;
    const rollable = props.rollable;
    const hasSystem = Object.hasOwn(actor.system, props.field);
    const hasLive = (actor.live && Object.hasOwn(actor.live, props.field));
    const liveValue = hasLive ? actor.live[field] : 0;
    const systemValue = hasSystem ? actor.system[field] : 0;
    const isString = typeof liveValue == 'string' || typeof systemValue == 'string';
    const totalValue = isString ? `${systemValue} + ${liveValue}` : liveValue + systemValue;

    return(
        <tr onClick={()=>props.action(props.data)}>
            <td className={styles.elemtext}><SimpleIconButton img={img} action={()=>console.log(field)}/> </td>
            <td>{label}</td>
            <td>{systemValue}</td>
            <td>{liveValue}</td>
            <td>{totalValue}</td>
            { isString ? <CellEditString value={props.editLive ? liveValue: systemValue} updateField={props.updateField} field={field} editLive={props.editLive} />
             :
             <CellEditNumber value={props.editLive ? liveValue: systemValue} updateField={props.updateField} field={field} editLive={props.editLive} />
            }

        </tr>
    );
}

export function EditorStatsTable(props: any){
    const dispatch = useDispatch();

    const actor: AssetActor = props.doc;
    const actorSystem = actor.system;
    const actorLive = actor.live;
    const editLive = props.editLive || false;    
    const noop = ()=>{};
    const rowAction = props.rowAction || noop;

    const updateField = (system: boolean, field: string, value: any) => {
        const newActor: any = _.cloneDeep(actor);
        const root = system ? 'system' : 'live';
        newActor[root][field] = value;
        props.setDoc(newActor);
    }
 

        return(
            <div className={styles.editortable}>
                <table className={styles.editortable}>
                    <thead className={styles.editortable}>
                        <tr>
                            <th></th>
                            <th>Stat</th>
                            <th>Base</th>
                            <th>Mod</th>
                            <th>Total</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody className={styles.editortable}>
                        <EditorStatsRow actor={actor} img={sheetIcons.hitpoints} field="hp" label="Max Hit Points (HP)" rollable={false} updateField={updateField} editLive={editLive} action={rowAction}/>
                        <EditorStatsRow actor={actor} img={sheetIcons.proficiency} field="pb" label="Proficiency" rollable={false} updateField={updateField} editLive={editLive} action={rowAction}/>
                        <EditorStatsRow actor={actor} img={sheetIcons.armor} field="armor" label="Defense (Armor)" rollable={true} updateField={updateField} editLive={editLive} action={rowAction}/>
                        <EditorStatsRow actor={actor} img={sheetIcons.fortitude} field="fortitude" label="Defense (Fortitude)" rollable={true} updateField={updateField} editLive={editLive} action={rowAction}/>
                        <EditorStatsRow actor={actor} img={sheetIcons.reflex} field="reflex" label="Defense (Reflex)" rollable={true} updateField={updateField} editLive={editLive} action={rowAction}/>
                        <EditorStatsRow actor={actor} img={sheetIcons.will} field="will" label="Defense (Will)" rollable={true} updateField={updateField} editLive={editLive} action={rowAction}/>
                        <EditorStatsRow actor={actor} img={sheetIcons.speed} field="speed" label="Speed" rollable={true} updateField={updateField} editLive={editLive} action={rowAction}/>
                        <EditorStatsRow actor={actor} img={sheetIcons.size} field="size" label="Size" rollable={true} updateField={updateField} editLive={editLive} action={rowAction}/>
                        <EditorStatsRow actor={actor} img={sheetIcons.melee} field="ab" label="Base Attack Bonus" rollable={true} updateField={updateField} editLive={editLive} action={rowAction}/>
                        <EditorStatsRow actor={actor} img={sheetIcons.melee} field="ad" label="Base Attack Damage" rollable={true} updateField={updateField} editLive={editLive} action={rowAction}/>
                        { !editLive ? 
                            <>
                            <EditorStatsRow actor={actor} img={sheetIcons.stamina} field="stamina" label="Stamina" rollable={true} updateField={updateField} editLive={editLive} action={rowAction}/>
                            <EditorStatsRow actor={actor} img={sheetIcons.stamina} field="stamina" label="Stamina" rollable={true} updateField={updateField} editLive={editLive} action={rowAction}/>
                            <EditorStatsRow actor={actor} img={sheetIcons.stamina} field="stamina" label="Stamina" rollable={true} updateField={updateField} editLive={editLive} action={rowAction}/>
                            </>
                            : null
                        }
                    </tbody>
                </table>
            </div>
        );
}



export default EditorStatsTable;