
import _ from 'lodash';
import styles from './editor.module.css';
import exploreAssets from '@/lib/gamedata/exploreAssets';

export function EditorIcon(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.icon = e.target.value;
        props.setDoc(tempDoc);
    }
    if(props.doc.system && props.doc.system.icon){
      return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Map Icon</div>
          <select className={styles.inputnum} value={props.doc.system.icon} onChange={updateString}>
            <option value={props.doc.img}>Default</option>
            {
                Object.keys(exploreAssets.nodeIcons).map((el: any, idx: number)=>{
                    return(
                        <option key={idx} value={exploreAssets.nodeIcons[el]}>{_.capitalize(el)}</option>
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

export default EditorIcon;
