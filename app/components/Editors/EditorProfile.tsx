
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorProfile(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.profile = e.target.value;
        props.setDoc(tempDoc);
    }
    return (
      <div className={styles.editdiv}>
        <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Profile</div>
        <select className={styles.inputnum} value={props.doc.system.profile} onChange={updateString}>
            <option value="unique">Unique</option>
            <option value="alpha">Alpha</option>
            <option value="puppetmaster">Puppetmaster</option>
            <option value="tyrant">Tyrant</option>
            <option value="slaver">Slaver</option>
            <option value="broodmother">Broodmother</option>
            <option value="propehet">Prophet</option>
            <option value="rebel">Rebel</option>
            <option value="face">Face</option>
            <option value="veteran">Veteran</option>
            <option value="burdened">Burdened</option>
            <option value="saint">Saint</option>
            <option value="sage">Sage</option>
            <option value="outsider">Outsider</option>
            <option value="agent">Agent</option>
            <option value="thrillseeker">Thrillseeker</option>
            <option value="determinator">Determinator</option>
            <option value="scholar">Scholar</option>
            <option value="mercenary">Mercenary</option>
            <option value="glutton">Glutton</option>
            <option value="shunned">Shunned</option>
            <option value="corruptor">Corruptor</option>
            <option value="collector">Collector</option>
            <option value="void">Void</option>
            <option value="destroyer">Destroyer</option>
            <option value="explorer">Explorer</option>
            <option value="creator">Creator</option>
            <option value="pack">Pack</option>
            <option value="sycophant">Sycophant</option>
            <option value="enforcer">Enforcer</option>
            <option value="zealot">Zealot</option>
            <option value="rabble">Rabble</option>
            <option value="family">Family</option>
            <option value="guild">Guild</option>
            <option value="citizen">Citizen</option>
            <option value="soldier">Soldier</option>
            <option value="scum">Scum</option>
      </select>
      </div>
    );

}

export default EditorProfile;
