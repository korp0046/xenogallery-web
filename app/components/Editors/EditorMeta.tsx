
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorMeta(props: any) {

    const updateMeta = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.meta[e.target.name] = Boolean(e.target.checked);
        props.setDoc(tempDoc);
    }

    if(props.doc.meta && Object.hasOwn(props.doc.meta, 'trash') && Object.hasOwn(props.doc.meta, 'public')){
      return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheaderfixed}>Meta</div>
          <input type="checkbox" id="trash" name="trash" checked={props.doc.meta.trash} onChange={updateMeta} /><label htmlFor="trash">Trash</label>
          <input type="checkbox" id="public" name="public" checked={props.doc.meta.public} onChange={updateMeta} /><label htmlFor="public">Public</label>
        </div>
      );
    } else {
      return null;
    }

}

export default EditorMeta;
