
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorNodeSize(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.size = Number(e.target.value);
        props.setDoc(tempDoc);
    }
    if(props.doc.system && ('size' in props.doc.system) && (props.doc.system.size || props.doc.system.size == 0)){
      return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Size</div>
          <select className={styles.inputnum} value={props.doc.system.size} onChange={updateString}>
              <option value={25}>Tiny</option>
              <option value={35}>Small</option>
              <option value={45}>Medium</option>
              <option value={65}>Large</option>
              <option value={80}>Huge</option>
              <option value={100}>Gargantuan</option>
        </select>
        </div>
      );
    } else {
      return null;
    }

}

export default EditorNodeSize;
