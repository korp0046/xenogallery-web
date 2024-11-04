
import _ from 'lodash';
import styles from './editorlite.module.css';

export function EditorLiteString(props: any) {
    let edit = props.edit;
    let keys = props.keys;
    let doc = props.doc;
    let state = props.state;
    let action: Function = props.action;
    let value = _.get(doc, keys);

    if(!edit){
        return (
            <div className={styles.editdiv}>
                {value}
            </div>
          );

    } else {
        return (
            <div className={styles.editdiv}>
                <input className={styles.inputstr} type="text" value={state} onChange={(e: any)=>action(e.target.value)} />
            </div>
          );

    }

}

export default EditorLiteString;
