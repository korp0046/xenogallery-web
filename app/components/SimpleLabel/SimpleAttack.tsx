import { sheetIcons } from '@/lib/gamedata/imgAssets';
import styles from './simplelabel.module.css';
import { addPlusMinus } from '@/lib/util/util';

export default function SimpleAttack(props: any) {
    return (
        <table className={styles.basictable}>
            <tbody>
                <tr className={styles.basictable}>
                    <th style={{minWidth: '36px'}}></th>
                    <th>
                        <div className={styles.simpleitem + ' ' + styles.tooltip}>
                            <div className={styles.simplelabel}>Attack</div>
                            <span className={styles.tooltiptext}>Bonus To-Hit</span>
                        </div>
                    </th>
                    <th>
                        <div className={styles.simpleitem + ' ' + styles.tooltip}>
                            <div className={styles.simplelabel}>Save DC</div>
                            <span className={styles.tooltiptext}>Save Difficulty Check</span>
                        </div>
                    </th>
                    <th>
                        <div className={styles.simpleitem + ' ' + styles.tooltip}>
                            <div className={styles.simplelabel}>Base Damage</div>
                            <span className={styles.tooltiptext}>Base Damage</span>
                        </div>
                    </th>
                </tr>
                <tr>
                    <td style={{maxWidth: '36px'}}>
                        <div className={styles.simpleitem + ' ' + styles.tooltip} style={{maxWidth: '36px'}}>
                            <img src={sheetIcons.melee} style={{height: '32px', width: '32px'}}/>
                            <span className={styles.tooltiptext}>Attacks</span>
                        </div>
                    </td>
                    <td className={styles.basictable}>{addPlusMinus(props.doc.system.ab)}</td>
                    <td className={styles.basictable}>{props.doc.system.ab + 10}</td>
                    <td className={styles.basictable}>{props.doc.system.ad}</td>
                </tr>
            </tbody>
        </table>
    )
}