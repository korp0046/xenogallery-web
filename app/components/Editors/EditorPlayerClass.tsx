
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorPlayerClass(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system[props.field] = e.target.value;
        props.setDoc(tempDoc);
    }
    if(props.doc.system && props.doc.system.playerClass){
      return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Profile</div>
          <select className={styles.inputselect} value={props.doc.system.playerClass} onChange={updateString}>
              <option value="npc">NPC</option>
              <option value="rogue">Rogue</option>
              <option value="fighter">Fighter</option>
              <option value="mage">Mage</option>
        </select>
        </div>
      );
    }

}

export default EditorPlayerClass;
