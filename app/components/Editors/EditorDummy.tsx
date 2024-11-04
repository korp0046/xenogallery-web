
import _ from 'lodash';
import { useState } from "react";
import styles from './editor.module.css';

export function EditorDummy(props: any) {
    const selected = true;
    return (
        <div className={styles.editdiv + ' ' + (props.grow ? styles.grow : '')}>
          <input disabled className={styles.inputstr} type="text" value={props.value} />
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>{props.field}</div>

        </div>
      );
}

export default EditorDummy;
