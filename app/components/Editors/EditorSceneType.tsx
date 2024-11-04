
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorSceneType(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.foundrytype = String(e.target.value);
        props.setDoc(tempDoc);
    }
    return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Scene Type</div>
          <select className={styles.inputnum} value={props.doc.system.foundrytype} onChange={updateString}>
              <option value="basicscene">Basic Scene</option>
              <option value="battlemap">Battle Map</option>
              <option value="exploremap">Explore Map</option>
        </select>
        </div>
      );

}

export default EditorSceneType;
