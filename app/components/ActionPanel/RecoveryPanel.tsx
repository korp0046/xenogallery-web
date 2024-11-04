import React, { useEffect, useRef, useState } from 'react';

import styles from './actionpanel.module.css';
import { EditorGroupDiv, EditorNumberClassic } from '../Editors';
import { sheetIcons, actionIcons, gameIconsClean } from '@/lib/gamedata/imgAssets';
import SimpleLabel from '../SimpleLabel/SimpleLabel';
import { AssetActor } from '@/lib/util/assetTypes';
import { actionRefuge, actionLongRest, actionShortRest } from '@/lib/util/gameActions';
import SimpleIconButton from '../SimpleLabel/SimpleIconButton';


export default function RecoveryPanel(props: any) {
    const actor: AssetActor = props.doc;
    const stamina = actor.live?.stamina;

    
  return (
    <EditorGroupDiv label="Recovery & Rest Actions">
        <SimpleIconButton img={actionIcons.camp} tooltip="Long Rest" text="Long Rest" action={()=>{
            let newActor = actionLongRest(actor);
            props.setDoc(newActor);
        }}/>
        <SimpleIconButton img={gameIconsClean.break} tooltip="Short Rest" text="Short Rest" action={()=>{
            let newActor = actionShortRest(actor);
            props.setDoc(newActor);
        }}/>
    </EditorGroupDiv>
  );
}
