
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorClass(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.role = e.target.value;
        props.setDoc(tempDoc);
    }
    if(props.doc.system && props.doc.system.role){
      return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Class</div>
          <select className={styles.inputnum} value={props.doc.system.role} onChange={updateString}>
              <option value="fighter">Fighter</option>
              <option value="rogue">Rogue</option>
              <option value="mage">Mage</option>
        </select>
        </div>
      );
    } else {
      return null;
    }

}

export default EditorClass;
