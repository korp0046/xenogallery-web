
import _ from 'lodash';
import { useState } from "react";
import styles from './editor.module.css';

export function EditorStringSimple(props: any) {
    const [selected, setSelected] = useState(false);

    const hasText = props.value != "";
    return (
      <div className={styles.editdiv + ' ' + (props.grow ? styles.grow : '')}>
        <input className={styles.inputstr} type="text" value={props.value} onChange={(e)=>props.action(e.target.value)} onFocus={()=>setSelected(true)} onBlur={()=>setSelected(false)} />
        <div className={styles.inputstrheader + ' ' + (selected || hasText ? styles.inputstrheaderselect : '')}>{props.label}</div>

      </div>
    );
}

export default EditorStringSimple;
