
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorLevel(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.level = Number(e.target.value);
        props.setDoc(tempDoc);
    }
    if(props.doc.system && props.doc.system.level == 0 || props.doc.system.level){
      return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Level</div>
          <select className={styles.inputnum} value={props.doc.system.level} onChange={updateString}>
              <option value={0}>0 (NPC)</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              {
                props.doc.system.foundrytype && props.doc.system.foundrytype != 'player' && props.doc.system.foundrytype != 'character' ? 
                <>
                    <option value={11}>11 (NPC)</option>
                    <option value={12}>12 (NPC)</option>
                    <option value={13}>13 (NPC)</option>
                    <option value={14}>14 (NPC)</option>
                    <option value={15}>15 (NPC)</option>
                    <option value={16}>16 (NPC)</option>
                    <option value={17}>17 (NPC)</option>
                    <option value={18}>18 (NPC)</option>
                    <option value={19}>19 (NPC)</option>
                    <option value={20}>20 (NPC)</option>
                </> : null

              }
        </select>
        </div>
      );
    } else {
      return null;
    }

}

export default EditorLevel;
