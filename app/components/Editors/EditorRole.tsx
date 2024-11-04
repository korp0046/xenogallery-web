
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorRole(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.role = e.target.value;
        props.setDoc(tempDoc);
    }
    if(props.doc.system && props.doc.system.role){
      return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Class/Role</div>
          <select className={styles.inputnum} value={props.doc.system.role} onChange={updateString}>
              <option disabled={props.doc.system.foundrytype == 'character' ? false : true} value="fighter">Fighter</option>
              <option disabled={props.doc.system.foundrytype == 'character' ? false : true} value="rogue">Rogue</option>
              <option disabled={props.doc.system.foundrytype == 'character' ? false : true} value="mage">Mage</option>
              <option disabled={props.doc.system.foundrytype == 'character' ? true : false} value="unique">Unique</option>
              <option disabled={props.doc.system.foundrytype == 'character' ? true : false} value="bruiser">Bruiser</option>
              <option disabled={props.doc.system.foundrytype == 'character' ? true : false} value="marksman">Marksman</option>
              <option disabled={props.doc.system.foundrytype == 'character' ? true : false} value="striker">Striker</option>
              <option disabled={props.doc.system.foundrytype == 'character' ? true : false} value="assassin">Assassin</option>
              <option disabled={props.doc.system.foundrytype == 'character' ? true : false} value="controller">Controller</option>
              <option disabled={props.doc.system.foundrytype == 'character' ? true : false} value="leader">Leader</option>
              <option disabled={props.doc.system.foundrytype == 'character' ? true : false} value="blaster">Blaster</option>
              <option disabled={props.doc.system.foundrytype == 'character' ? true : false} value="defender">Defender</option>
        </select>
        </div>
      );
    } else {
      return null;
    }

}

export default EditorRole;
