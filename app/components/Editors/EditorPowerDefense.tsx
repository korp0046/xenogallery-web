
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorPowerDefense(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.defense = String(e.target.value);
        props.setDoc(tempDoc);
    }
    return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Defense Type</div>
          <select className={styles.inputnum} value={props.doc.system.defense} onChange={updateString}>
              <option value="complex">See Description</option>
              <option value="armor">Armor</option>
              <option value="fortitude">Fortitude</option>
              <option value="reflex">Reflex</option>
              <option value="will">Will</option>
              <option value="harmless">Harmless</option>
        </select>
        </div>
      );

}

export default EditorPowerDefense;
