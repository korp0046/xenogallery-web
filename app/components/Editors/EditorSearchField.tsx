
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorSearchField(props: any) {

    if(props.type == 'sort'){
        return (
            <div className={styles.editdiv}>
              <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Sort Field</div>
              <select className={styles.inputnum} value={props.value} onChange={(e)=>props.action(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="meta.modified">Modified</option>
                    <option value="meta.created">Created</option>
                    { ['powers', 'items', 'personas', 'opponents', 'characters'].includes(props.collection) ?
                        <option value="system.level">Level</option>
                        :null
                    }
            </select>
            </div>
          );
    } else if (props.type == 'find'){
        return (
        <div className={styles.editdiv}>
        <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Find Field</div>
        <select className={styles.inputnum} value={props.value} onChange={(e)=>props.action(e.target.value)}>
            <option value="name">Name</option>
            <option value="system.description">Description</option>
            <option value="system.tags">Tags</option>
            <option value="dynamic">Dynamic</option>
                
      </select>
      </div>
        );
    }

}

export default EditorSearchField;
