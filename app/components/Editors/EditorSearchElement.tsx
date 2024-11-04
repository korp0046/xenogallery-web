
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorSearchElement(props: any) {

    if(props.collection == 'powers'){
        return (
            <div className={styles.editdiv}>
            <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Element</div>
            <select className={styles.inputnum} value={props.value} onChange={(e)=>props.action(e.target.value)}>
                  <option value="any">Any</option>
                  <option value="universal">Universal</option>
                  <option value="fire">Fire</option>
                  <option value="water">Water</option>
                  <option value="earth">Earth</option>
                  <option value="air">Air</option>
                  <option value="light">Light</option>
                  <option value="shadow">Shadow</option>
                  <option value="metal">Metal</option>
                  <option value="wood">Wood</option>
          </select>
          </div>
            );
    } else {
        return null;
    }


}

export default EditorSearchElement;
