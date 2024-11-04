
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorSearchType(props: any) {

    if(props.collection == 'items'){
        return (
            <div className={styles.editdiv}>
            <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Item Type</div>
            <select className={styles.inputnum} value={props.value} onChange={(e)=>props.action(e.target.value)}>
                  <option value="any">Any</option>
                  <option value="default">Default</option>
                  <option value="armor">Armor</option>
                  <option value="weapon">Weapon</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="potion">Potion</option>
                  <option value="book">Book</option>
                  <option value="focus">Focus</option>
                  <option value="apparel">Apparel</option>
                  <option value="artifact">Artifact</option>
                  <option value="alchemic">Alchemic</option>
                  <option value="tool">Tool</option>
          </select>
          </div>
            );
    } else {
        return null;
    }


}

export default EditorSearchType;
