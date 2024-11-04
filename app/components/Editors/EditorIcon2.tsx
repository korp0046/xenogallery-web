
import _ from 'lodash';
import styles from './editor.module.css';
import { itemIcons } from '@/lib/gamedata/imgAssets';
import { assetToCollection } from '@/lib/util/util';

export function EditorIcon2(props: any) {
    const assetType = assetToCollection(props.doc);
    let images = {};
    if(assetType == 'items'){
        images = itemIcons;
    }

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.img = e.target.value;
        props.setDoc(tempDoc);
    }
    if(Object.keys(images).length > 0){
        return (
            <div className={styles.editdiv}>
              <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Choose an Icon</div>
              <select className={styles.inputnum} value={props.doc.img} onChange={updateString}>
                {
                    Object.keys(itemIcons).sort((a,b)=>String(a).localeCompare(b)).map((el: any, idx: number)=>{
                        return(
                            <option key={idx} value={itemIcons[el]}>{_.capitalize(el)}</option>
                        );
                    })
                }
            </select>
            </div>
          );
    } else {
        return null;
    }


}

export default EditorIcon2;
