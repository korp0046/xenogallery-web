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

export default function SkillTestPanel(props: any){
    const dispatch = useDispatch();
    const work = useSelector(selectWork);
    const [selectedSkill, setSelectedSkill]: any = useState(null);
    const [selectedMiscMod, setSelectedMiscMod]: any = useState(0);
    const miscMods = _.range(-5, +15).map((el: number, idx: number) => el);

    const sendAbilityCheckChat = () => {
        console.log({text: rollString});
    }

    const getSelectedSkillValue = () => {
        if(selectedSkill != null){
            return work.system.skills[selectedSkill] * 2;
        } else {
            return 0;
        }
    }

    const rollString = `(1d20+${getSelectedSkillValue()}+${selectedMiscMod})`;

    return(
        <EditorGroupDiv label="Skill Test">
            <EditorGroupDiv label="Summary">
                <div>
                    <div style={{display: 'flex', justifyContent: 'center'}}></div>
                    <div>{'Skill: ' + selectedSkill}</div>
                    <div>
                        <SimpleIconButton img={sheetIcons.d20_20} tooltip="Roll!" text={rollString} action={()=>sendAbilityCheckChat()}/>
                    </div>
                </div>
            </EditorGroupDiv>
            <EditorGroupDiv label="Select">
                <div style={{'display': 'flex', 'flexWrap': 'wrap'}}>
                    <div>
                        <table>
                            <tbody>
                                <tr onClick={()=>setSelectedSkill('strike')}><td>Strike</td><td>+{work.system.skills.strike}</td></tr>
                                <tr onClick={()=>setSelectedSkill('strength')}><td>Strength</td><td>+{work.system.skills.strength}</td></tr>
                                <tr onClick={()=>setSelectedSkill('survival')}><td>Survival</td><td>+{work.system.skills.survival}</td></tr>
                                <tr onClick={()=>setSelectedSkill('marksmanship')}><td>Marksmanship</td><td>+{work.system.skills.marksmanship}</td></tr>
                                <tr onClick={()=>setSelectedSkill('guard')}><td>Guard</td><td>+{work.system.skills.guard}</td></tr>
                                <tr onClick={()=>setSelectedSkill('tactics')}><td>Tactics</td><td>+{work.system.skills.tactics}</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr onClick={()=>setSelectedSkill('stealth')}><td>Stealth</td><td>+{work.system.skills.stealth}</td></tr>
                                <tr onClick={()=>setSelectedSkill('mobility')}><td>Mobility</td><td>+{work.system.skills.mobility}</td></tr>
                                <tr onClick={()=>setSelectedSkill('lore')}><td>Lore</td><td>+{work.system.skills.lore}</td></tr>
                                <tr onClick={()=>setSelectedSkill('society')}><td>Society</td><td>+{work.system.skills.society}</td></tr>
                                <tr onClick={()=>setSelectedSkill('dexterity')}><td>Dexterity</td><td>+{work.system.skills.dexterity}</td></tr>
                                <tr onClick={()=>setSelectedSkill('healing')}><td>Healing</td><td>+{work.system.skills.healing}</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr onClick={()=>setSelectedSkill('draconic')}><td>Draconic Sorcery</td><td>+{work.system.skills.draconic}</td></tr>
                                <tr onClick={()=>setSelectedSkill('elven')}><td>Elven Sorcery</td><td>+{work.system.skills.elven}</td></tr>
                                <tr onClick={()=>setSelectedSkill('imperial')}><td>Imperial Sorcery</td><td>+{work.system.skills.imperial}</td></tr>
                                <tr onClick={()=>setSelectedSkill('aura')}><td>Aura Sorcery</td><td>+{work.system.skills.aura}</td></tr>
                                <tr onClick={()=>setSelectedSkill('protean')}><td>Protean Sorcery</td><td>+{work.system.skills.protean}</td></tr>
                                <tr onClick={()=>setSelectedSkill('pact')}><td>Pact Sorcery</td><td>+{work.system.skills.pact}</td></tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <EditorDynamicSelect label="Select Misc Bonus" list={miscMods} value={selectedMiscMod} action={setSelectedMiscMod} funcvalue={(el: any)=>Number(el)} funcstring={(el: any)=>el} width={200}/>
            </EditorGroupDiv>
        </EditorGroupDiv>
    );
}