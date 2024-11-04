
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorPowerMiss(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.miss = String(e.target.value);
        props.setDoc(tempDoc);
    }
    return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Miss Effect</div>
          <select className={styles.inputnum} value={props.doc.system.miss} onChange={updateString}>
              <option value="complex">See Description</option>
              <option value="harmless">Harmless</option>
              <option value="negates">Negates</option>
              <option value="half">Half</option>
              <option value="only_damage">Damage Only</option>
              <option value="only_condition">Condition Only</option>
        </select>
        </div>
      );

}

export default EditorPowerMiss;
