import _ from 'lodash';
import styles from './editor.module.css';

export function EditorItemSubtype(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.subtype = e.target.value;
        props.setDoc(tempDoc);
    }
    return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Item Subtype</div>
          <select className={styles.inputnum} value={props.doc.system.subtype} onChange={updateString}>
                <option value="">Default</option>
                {props.doc.system.type == 'weapon' ? <option value="melee_light">Light Melee</option> : null}
                {props.doc.system.type == 'weapon' ? <option value="melee_medium">Medium Melee</option> : null}
                {props.doc.system.type == 'weapon' ? <option value="melee_heavy">Heavy Melee</option> : null}
                {props.doc.system.type == 'weapon' ? <option value="ranged_light">Ranged Light</option> : null}
                {props.doc.system.type == 'weapon' ? <option value="ranged_heavy">Ranged Heavy</option> : null}

                {props.doc.system.type == 'apparel' ? <option value="boots">Boots</option> : null}
                {props.doc.system.type == 'apparel' ? <option value="belt">Belt</option> : null}
                {props.doc.system.type == 'apparel' ? <option value="cloak">Cloak</option> : null}
                {props.doc.system.type == 'apparel' ? <option value="gloves">Gloves</option> : null}
                {props.doc.system.type == 'apparel' ? <option value="headwear">Headwear</option> : null}

                {props.doc.system.type == 'alchemic' ? <option value="reagent">Reagent</option> : null}
                {props.doc.system.type == 'alchemic' ? <option value="bomb">Bomb</option> : null}

                {props.doc.system.type == 'jewelry' ? <option value="amulet">Amulet</option> : null}
                {props.doc.system.type == 'jewelry' ? <option value="ring">Ring</option> : null}

                {props.doc.system.type == 'focus' ? <option value="wand">Wand</option> : null}
                {props.doc.system.type == 'focus' ? <option value="staff">Staff</option> : null}
                {props.doc.system.type == 'focus' ? <option value="rod">Rod</option> : null}
        </select>
        </div>
      );

}

export default EditorItemSubtype;
