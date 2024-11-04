
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorSearchSortDir(props: any) {

    return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Sort</div>
          <select className={styles.inputnum} value={props.value} onChange={(e)=>props.action(Number(e.target.value))}>
              <option value={1}>Asc</option>
              <option value={-1}>Desc</option>
        </select>
        </div>
      );

}

export default EditorSearchSortDir;
