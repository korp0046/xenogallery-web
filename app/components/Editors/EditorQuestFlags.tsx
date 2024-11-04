
import _ from 'lodash';
import styles from './editor.module.css';
import { questFlags } from '@/lib/gamedata/contentAssets';

export function EditorQuestFlags(props: any) {

  const updateFlags = (e: any) => {
      let tempDoc = _.cloneDeep(props.doc);
      tempDoc.system.flags[e.target.name] = Boolean(e.target.checked);
      props.setDoc(tempDoc);
  }

  if(props.doc && props.doc.system && props.doc.system.flags && props.doc.system.foundrytype && props.doc.system.foundrytype == 'quest'){
    return (
      <div className={styles.editdiv + ' ' + styles.dynamicflex}>
        <div className={styles.inputstrheaderfixed}>Quest Flags</div>
        {
            questFlags.map((el: string, idx: number)=>{
                return (<div key={idx} className={styles.check}><input  type="checkbox" id={el} name={el} checked={props.doc.system.flags[el]} onChange={updateFlags} /><label htmlFor={el}>{_.capitalize(el)}</label></div>)
            })
        }
      </div>
    );
  } else {
    return null;
  }

}

export default EditorQuestFlags;
