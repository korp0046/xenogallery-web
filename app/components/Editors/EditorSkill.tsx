import _ from 'lodash';
import styles from './editor.module.css';

export function EditorSkill(props: any) {
  let parentfield = props.parentfield || 'system';

  const updateNumber = (field: string, e: any) => {
    let tempDoc = _.cloneDeep(props.doc);
    tempDoc.system.skills[field] = Number(e.target.value);
    props.setDoc(tempDoc);
}

let min = 0;
let max = 5;

  if(props.doc && props.doc.system && props.doc.system.skills){
      return (
        <div style={{'display': 'grid', 'gridTemplateColumns': '1fr 1fr 1fr'}}>
            <div style={{'display': 'flex', 'flexWrap': 'wrap'}} className={styles.tintsubred}>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Strike</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.strike} onChange={(e)=>updateNumber('strike', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Strength</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.strength} onChange={(e)=>updateNumber('strength', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Marksmanship</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.marksmanship} onChange={(e)=>updateNumber('marksmanship', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Survival</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.survival} onChange={(e)=>updateNumber('survival', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Tactics</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.tactics} onChange={(e)=>updateNumber('tactics', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Guard</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.guard} onChange={(e)=>updateNumber('guard', e)}/>
                </div>
            </div>
            <div style={{'display': 'flex', 'flexWrap': 'wrap'}} className={styles.tintsubgreen}>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Stealth</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.stealth} onChange={(e)=>updateNumber('stealth', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Mobility</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.mobility} onChange={(e)=>updateNumber('mobility', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Lore</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.lore} onChange={(e)=>updateNumber('lore', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Society</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.society} onChange={(e)=>updateNumber('society', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Dexterity</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.dexterity} onChange={(e)=>updateNumber('dexterity', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Healing</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.healing} onChange={(e)=>updateNumber('healing', e)}/>
                </div>
            </div>
            <div style={{'display': 'flex', 'flexWrap': 'wrap'}} className={styles.tintsubblue}>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Draconic Sorcery</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.draconic} onChange={(e)=>updateNumber('draconic', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Elven Sorcery</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.elven} onChange={(e)=>updateNumber('elven', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Imperial Sorcery</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.imperial} onChange={(e)=>updateNumber('imperial', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Aura Sorcery</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.aura} onChange={(e)=>updateNumber('aura', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Protean Sorcery</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.protean} onChange={(e)=>updateNumber('protean', e)}/>
                </div>
                <div className={styles.editdiv}>
                    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Pact Sorcery</div>
                    <input min={min} max={max} className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc.system.skills.pact} onChange={(e)=>updateNumber('pact', e)}/>
                </div>
            </div>

        </div>
        );
    } else {
      return null;
    }

}


export default EditorSkill;