import _ from 'lodash';
import { useState } from "react";
import styles from './editor.module.css';

export function EditorName(props: any) {
    const [selected, setSelected] = useState(false);

    const updateString = (e: any) => {
      let tempDoc = _.cloneDeep(props.doc);
      tempDoc.name = e.target.value;
      props.setDoc(tempDoc);
  }

  const hasText = props.doc.name != "";
  return (
    <div className={styles.editdiv}>
      <input className={styles.inputstr} type="text" value={props.doc.name} onChange={updateString} onFocus={()=>setSelected(true)} onBlur={()=>setSelected(false)} />
      <div className={styles.inputstrheader + ' ' + (selected || hasText ? styles.inputstrheaderselect : '')}>Name</div>

    </div>
  );
}

export default EditorName;
