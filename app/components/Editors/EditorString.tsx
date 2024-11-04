
import _ from 'lodash';
import { useState } from "react";
import styles from './editor.module.css';

export function EditorString(props: any) {
    let parentfield = props.parentfield || 'system';
    const [selected, setSelected] = useState(false);

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc[parentfield][props.field] = e.target.value;
        props.setDoc(tempDoc);
    }

    if(props.doc && props.doc[parentfield] && Object.hasOwn(props.doc[parentfield], props.field)){
      const hasText = props.doc[parentfield][props.field] != "";
      return (
        <div className={styles.editdiv + ' ' + (props.grow ? styles.grow : '')}>
          <input className={styles.inputstr} type="text" value={props.doc[parentfield][props.field]} onChange={updateString} onFocus={()=>setSelected(true)} onBlur={()=>setSelected(false)} />
          <div className={styles.inputstrheader + ' ' + (selected || hasText ? styles.inputstrheaderselect : '')}>{props.label || props.field}</div>

        </div>
      );
    } else {
      return null;
    }
}

export default EditorString;
