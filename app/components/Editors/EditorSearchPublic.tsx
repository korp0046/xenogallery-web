
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorSearchPublic(props: any) {

    return (
        <div className={styles.editdiv}>
        <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Pub/Priv</div>
        <select className={styles.inputnum} value={props.value} onChange={(e)=>props.action(e.target.value)}>
            <option value="any">Any</option>
            <option value="public">Public</option>
            <option value="private">Private</option>    
      </select>
      </div>
        );

}

export default EditorSearchPublic;
