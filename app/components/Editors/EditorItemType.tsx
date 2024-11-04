import _ from 'lodash';
import styles from './editor.module.css';
import { itemTypes } from '@/lib/gamedata/contentAssets';

export function EditorItemType(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.type = e.target.value;
        props.setDoc(tempDoc);
    }
    if(props.doc.system && props.doc.system.type){
      return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Item Type</div>
          <select className={styles.inputnum} value={props.doc.system.type} onChange={updateString}>
            {
              itemTypes.map((el: string, idx: number)=> {
                return(<option value={el}>{_.capitalize(el)}</option>)
              })
            }
        </select>
        </div>
      );
    } else {
      return null;
    }

}

export default EditorItemType;
