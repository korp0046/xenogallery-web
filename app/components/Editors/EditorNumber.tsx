import _ from 'lodash';
import styles from './editor.module.css';

export function EditorNumber(props: any) {
  let parentfield = props.parentfield || 'system';

  const updateNumber = (e: any) => {
    let tempDoc = _.cloneDeep(props.doc);
    tempDoc[parentfield][props.field] = Number(e.target.value);
    props.setDoc(tempDoc);
}

let min = props.min || 0;
let max = props.max || 30;

  if(props.doc && props.doc[parentfield] && (props.doc[parentfield][props.field] == 0 || props.doc[parentfield][props.field])){
      return (
        <div className={styles.editdiv} style={{width: props.width || 'auto'}}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>{props.label || props.field}</div>
          <select className={styles.inputnum} value={props.doc[parentfield][props.field]} onChange={updateNumber}>
            {
              _.range(min, max+1).map((el: number, idx: number) => {
                return(
                  <option key={idx} value={el}>{String(el)}</option>
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


export default EditorNumber;