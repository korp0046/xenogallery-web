
import _ from 'lodash';
import { useState } from "react";
import styles from './editor.module.css';

export function EditorStringClassic(props: any) {
    const [selected, setSelected] = useState(false);

    return (
        <div className={styles.editdiv + ' ' + (props.grow ? styles.grow : '')}>
          <input className={styles.inputstr} type="text" value={props.value} onChange={(e)=>props.action(e.target.value)} onFocus={()=>setSelected(true)} onBlur={()=>setSelected(false)} />
          <div className={styles.inputstrheader + ' ' + (selected || String(props.value).length > 0 ? styles.inputstrheaderselect : '')}>{props.field}</div>

        </div>
      );
}

export default EditorStringClassic;
