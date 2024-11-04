'use client'
import { assetToCollection } from '@/lib/util/util';
import styles from '../../styles/edittable.module.css';
import stylestable from '../../styles/table.module.css';
import { useState, useEffect } from 'react';
import { selectWork, useSelector } from '@/lib/redux';
import { useDispatch } from 'react-redux';
import EditTableInner from './EditTableInner';
import SimpleIconButton from '../SimpleLabel/SimpleIconButton';
import EditTableCellNumber from './EditTableCellNumber';
import { gameIconsClean, sheetIcons } from '@/lib/gamedata/imgAssets';
import EditTableCellSum from './EditTableCellSum';



export default function EditTableFlex(props: any){
    const work = useSelector(selectWork);
    const collection = assetToCollection(work);
    const dispatch = useDispatch();
    return(
        <div className={`${styles.editflexbody}`}>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={gameIconsClean.hitpoints} action={()=>{}}/></div>
                <div>Max Hit Points</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
            <span><EditTableCellNumber min={0} max={1000} field="system.hp"/></span>
            { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={100} field="live.hp"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.hp,live.hp"/></span> : null }
            </div>
        </div>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={gameIconsClean.accuracy} action={()=>{}}/></div>
                <div>Attack Bonus</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
            <span><EditTableCellNumber min={0} max={20} field="system.ab"/></span>
            { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={20} field="live.ab"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.ab,live.ab"/></span> : null }
            </div>
        </div>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={gameIconsClean.attackDamage} action={()=>{}}/></div>
                <div>Attack Damage</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
            <span><EditTableCellNumber min={0} max={20} field="system.ad"/></span>
            { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={20} field="live.ad"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.ad,live.ad"/></span> : null }
            </div>
        </div>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={gameIconsClean.abilityPower} action={()=>{}}/></div>
                <div>Ability Power</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
                <span><EditTableCellNumber min={0} max={20} field="system.ap"/></span>
                { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={20} field="live.ap"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.ap,live.ap"/></span> : null }
            </div>
        </div>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={gameIconsClean.proficiency} action={()=>{}}/></div>
                <div>Prof. Bonus</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
            <span><EditTableCellNumber min={0} max={20} field="system.pb"/></span>
            { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={20} field="live.pb"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.pb,live.pb"/></span> : null }
            </div>
        </div>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={gameIconsClean.armor} action={()=>{}}/></div>
                <div>Armor</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
            <span><EditTableCellNumber min={0} max={20} field="system.armor"/></span>
            { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={20} field="live.armor"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.armor,live.armor"/></span> : null }
            </div>
        </div>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={gameIconsClean.fortitude} action={()=>{}}/></div>
                <div>Fortitude</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
            <span><EditTableCellNumber min={0} max={20} field="system.fortitude"/></span>
            { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={20} field="live.fortitude"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.fortitude,live.fortitude"/></span> : null }
            </div>
        </div>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={gameIconsClean.reflex} action={()=>{}}/></div>
                <div>Reflex</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
            <span><EditTableCellNumber min={0} max={20} field="system.reflex"/></span>
            { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={20} field="live.reflex"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.reflex,live.reflex"/></span> : null }
            </div>
        </div>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={gameIconsClean.will} action={()=>{}}/></div>
                <div>Will</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
            <span><EditTableCellNumber min={0} max={20} field="system.will"/></span>
            { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={20} field="live.will"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.will,live.will"/></span> : null }
            </div>
        </div>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={gameIconsClean.speed} action={()=>{}}/></div>
                <div>Speed</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
            <span><EditTableCellNumber min={0} max={20} field="system.speed"/></span>
            { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={20} field="live.speed"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.speed,live.speed"/></span> : null }
            </div>
        </div>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={gameIconsClean.size} action={()=>{}}/></div>
                <div>Size</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
            <span><EditTableCellNumber min={0} max={5} field="system.size"/></span>
            { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={5} field="live.size"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.size,live.size"/></span> : null }
            </div>
        </div>
        <div className={`${styles.editflexitem}`}>
            <div className={`${styles.editflexlabel}`}>
                <div className={`${styles.center}`}><SimpleIconButton img={sheetIcons.stamina} action={()=>{}}/></div>
                <div>Max Stamina</div>
            </div>
            <div className={`${styles.editflexlabel}`}>
            <span><EditTableCellNumber min={3} max={12} field="system.stamina"/></span>
            { collection?.includes('live') ? <span><EditTableCellNumber min={0} max={10} field="live.stamina"/></span> : null }
            </div>
            <div className={`${styles.editflexlabel} ${styles.bigvalue}`}>
            { collection?.includes('live') ? <span><EditTableCellSum fields="system.stamina,live.stamina"/></span> : null }
            </div>
        </div>
        </div>
    )
}
