
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorFoundryType(props: any) {

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.foundrytype = e.target.value;
        props.setDoc(tempDoc);
    }
    if(props.doc.system && props.doc.system.foundrytype){
      if(props.doc.type == "item" || props.doc.type == "actor"){
        return (
          <div className={styles.editdiv}>
            <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Character</div>
            <select className={styles.inputnum} value={props.doc.system.foundrytype} onChange={updateString}>
                {
                  props.doc.type == "actor" ?
                  <>
                    <option value="character">Player Character</option>
                    <option value="persona">Persona</option>
                    <option value="opponent">Opponent</option>
                  </>
                  : null
                }
                {
                  /*
                  props.doc.type == "item" ?
                  <>
                    <option value="item">Item</option>
                    <option value="power">Power</option>
                    <option value="event">Event</option>
                  </>
                  : null
                  */
                }
                {
                  props.doc.type == "scene" ?
                  <>
                    <option value="basicscene">Basic</option>
                    <option value="battlemap">Battle</option>
                    <option value="exploremap">Explore</option>
                  </>
                  : null
                }
          </select>
          </div>
        );
      }
    }
    return null;

}

export default EditorFoundryType;
