'use client'
import { assetToCollection } from '@/lib/util/util';
import styles from '../../styles/edittable.module.css';
import stylestable from '../../styles/table.module.css';
import { useState, useEffect } from 'react';
import { selectTrayOpen, selectWork, useSelector } from '@/lib/redux';
import { useDispatch } from 'react-redux';
import EditTableCellNumber from './EditTableCellNumber';
import SimpleIconButton from '../SimpleLabel/SimpleIconButton';
import { gameIconsClean, itemIcons, sheetIcons } from '@/lib/gamedata/imgAssets';
import { dieProgression } from '@/lib/gamedata/contentAssets';
import EditTableCellSum from './EditTableCellSum';
import EditTableCellString from './EditTableCellString';



export function EditTableActorStatsHead(props: any){
    const dispatch = useDispatch();
    const work = useSelector(selectWork);
    const collection = assetToCollection(work);
    return(
        <thead className={styles.table}>
            <tr><th> </th><th>STAT</th><th>BASE</th>
            { collection?.includes('live') ? <><th>BONUS</th><th>TOTAL</th></> : null }
            </tr>
        </thead>
    )
}

export function EditTableActorStatsBody(props: any){
    const work = useSelector(selectWork);
    const collection = assetToCollection(work);
    return(
        <tbody className={styles.table}>
            <tr>
                <td><SimpleIconButton img={sheetIcons.hitpoints} action={()=>{}}/></td>
                <td>Max Hit Points</td>
                <td><EditTableCellNumber min={0} max={1000} field="system.hp"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={100} field="live.hp"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.hp,live.hp"/></td> : null }
            </tr>
            <tr>
                <td><SimpleIconButton img={sheetIcons.stamina} action={()=>{}}/></td>
                <td>Max Stamina</td>
                <td><EditTableCellNumber min={3} max={12} field="system.stamina"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={10} field="live.stamina"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.stamina,live.stamina"/></td> : null }
            </tr>
            <tr>
                <td><SimpleIconButton img={sheetIcons.proficiency} action={()=>{}}/></td>
                <td>Proficiency Bonus</td>
                <td><EditTableCellNumber min={0} max={20} field="system.pb"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={20} field="live.pb"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.pb,live.pb"/></td> : null }
            </tr>
            <tr>
                <td><SimpleIconButton img={sheetIcons.armor} action={()=>{}}/></td>
                <td>Armor</td>
                <td><EditTableCellNumber min={0} max={20} field="system.armor"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={20} field="live.armor"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.armor,live.armor"/></td> : null }
            </tr>
            <tr>
                <td><SimpleIconButton img={sheetIcons.fortitude} action={()=>{}}/></td>
                <td>Fortitude</td>
                <td><EditTableCellNumber min={0} max={20} field="system.fortitude"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={20} field="live.fortitude"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.fortitude,live.fortitude"/></td> : null }
            </tr>
            <tr>
                <td><SimpleIconButton img={sheetIcons.reflex} action={()=>{}}/></td>
                <td>Reflex</td>
                <td><EditTableCellNumber min={0} max={20} field="system.reflex"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={20} field="live.reflex"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.reflex,live.reflex"/></td> : null }
            </tr>
            <tr>
                <td><SimpleIconButton img={sheetIcons.will} action={()=>{}}/></td>
                <td>Will</td>
                <td><EditTableCellNumber min={0} max={20} field="system.will"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={20} field="live.will"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.will,live.will"/></td> : null }
            </tr>
            <tr>
                <td><SimpleIconButton img={gameIconsClean.speed} action={()=>{}}/></td>
                <td>Speed</td>
                <td><EditTableCellNumber min={0} max={20} field="system.speed"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={20} field="live.speed"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.speed,live.speed"/></td> : null }
            </tr>
            <tr>
                <td><SimpleIconButton img={sheetIcons.size} action={()=>{}}/></td>
                <td>Size</td>
                <td><EditTableCellNumber min={0} max={5} field="system.size"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={5} field="live.size"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.size,live.size"/></td> : null }
            </tr>
            <tr>
                <td><SimpleIconButton img={gameIconsClean.accuracy} action={()=>{}}/></td>
                <td>Attack Bonus</td>
                <td><EditTableCellNumber min={0} max={20} field="system.ab"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={20} field="live.ab"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.ab,live.ab"/></td> : null }
            </tr>
            <tr>
                <td><SimpleIconButton img={gameIconsClean.attackDamage} action={()=>{}}/></td>
                <td>Attack Damage</td>
                <td><EditTableCellNumber min={0} max={20} field="system.ad"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={20} field="live.ad"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.ad,live.ad"/></td> : null }
            </tr>
            <tr>
                <td><SimpleIconButton img={gameIconsClean.abilityPower} action={()=>{}}/></td>
                <td>Ability Power</td>
                <td><EditTableCellNumber min={0} max={20} field="system.ap"/></td>
                { collection?.includes('live') ? <td><EditTableCellNumber min={0} max={20} field="live.ap"/></td> : null }
                { collection?.includes('live') ? <td><EditTableCellSum fields="system.ap,live.ap"/></td> : null }
            </tr>
        </tbody>
    )
}