'use client'

import ItemWrapper from '../ItemWrapper/ItemWrapper';
/* Core */
import { addPlusMinus, assetToCollection, cloneAsset } from '@/lib/util/util';
import SimpleLabel from '../SimpleLabel/SimpleLabel';
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import styles from './actionpanel.module.css';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    selectGame,
    selectLiveActors,
    selectModeSelect,
    selectWork,
    upsertLiveActorAsync,
    useDispatch,
    useSelector
} from '@/lib/redux';
import _ from 'lodash';
import { EditorGroupDiv } from '../Editors';
import { elementThumbs, sheetIcons } from '@/lib/gamedata/imgAssets';
import AbilityElementSelector from './AbilityElementSelector';
import { useRef, useState } from 'react';
import AbilityTraitSelector from './AbilityTraitSelector';
import EditorDynamicSelect from '../Editors/EditorDynamicSelect';
import PickerString from '../Picker/PickerString';
import PickerElement from '../Picker/PickerElement';
import SimpleIconButton from '../SimpleLabel/SimpleIconButton';

export default function AbilityCheckPanel(props: any){
    const dispatch = useDispatch();
    const abilityCheckRef: any = useRef(null);
    const work = useSelector(selectWork);
    const game = useSelector(selectGame);
    const pb = work.system.pb;
    const [selectedTraits, setSelectedTraits]: any = useState([]);
    const [selectedMiscMod, setSelectedMiscMod]: any = useState(0);
    const type = work.type;
    const tags = work.system.tags ? work.system.tags.split(',') : [];
    const resists = work.system.resist ? work.system.resist.split(',') : [];
    const traits = work.system.traits ? work.system.traits.split(',') : [];    
    const miscMods = _.range(-5, +15).map((el: number, idx: number) => el);

    const toggleTrait = (targetTrait: string) => {
        if(targetTrait.length > 0){
            if(selectedTraits.includes(targetTrait)){
                let newSelectedTraits = selectedTraits.filter((el: string)=> el != targetTrait);
                setSelectedTraits(newSelectedTraits);
            } else {
                let newSelectedTraits = _.cloneDeep(selectedTraits);
                newSelectedTraits.push(targetTrait);
                setSelectedTraits(newSelectedTraits);
            }
        }
    }

    const sendAbilityCheckChat = () => {
        console.log({text: rollString});
    }

    const rollString = `(1d20${selectedTraits.length > 0 ? ('+' + pb): ''}${selectedTraits.length > 1 ? '+' + ((selectedTraits.length-1)*2): ''}${selectedMiscMod != 0 ? (selectedMiscMod > 0 ? ('+' + selectedMiscMod) : selectedMiscMod) : ''})`

    return(
        <EditorGroupDiv label="Ability Check">
            <EditorGroupDiv label="Summary">
                <div>
                    <div style={{display: 'flex', justifyContent: 'center'}}></div>
                    <div>
                        <SimpleIconButton img={sheetIcons.d20_20} tooltip="Roll!" text={rollString} action={()=>sendAbilityCheckChat()}/>
                    </div>
                </div>
            </EditorGroupDiv>
            <EditorGroupDiv label="Select">
                <PickerString action={toggleTrait} selected={selectedTraits} options={traits} headers={['Traits']}/>
                <EditorDynamicSelect label="Select Misc Bonus" list={miscMods} value={selectedMiscMod} action={setSelectedMiscMod} funcvalue={(el: any)=>Number(el)} funcstring={(el: any)=>el} width={200}/>
            </EditorGroupDiv>
        </EditorGroupDiv>
    );
}