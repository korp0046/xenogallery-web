
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorPowerAttack(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.attack = String(e.target.value);
        props.setDoc(tempDoc);
    }
    return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Attack Type</div>
          <select className={styles.inputnum} value={props.doc.system.attack} onChange={updateString}>
              <option value="complex">See Description</option>
              <option value="melee">Melee</option>
              <option value="ranged">Ranged</option>
              <option value="spell">Spell</option>
              <option value="versatile">Versatile</option>
              <option value="harmless">Harmless</option>
        </select>
        </div>
      );

}

export default EditorPowerAttack;
