import _ from 'lodash';
import styles from './editor.module.css';

export function EditorNumberClassic(props: any) {
  let parentfield = props.parentfield || 'system';
  let label = props.label || props.field;
  let min = props.min ? props.min : 0;
  let max = props.max ? props.max : 999;
  let img = props.img ? props.img : null;

    const updateNumber = (e: any) => {
        if(e.target.value >= min && e.target.value <= max){
          let tempDoc = _.cloneDeep(props.doc);
          tempDoc[parentfield][props.field] = Number(e.target.value);
          props.setDoc(tempDoc);
        }
    }

    if(props.doc && props.doc[parentfield] && (props.doc[parentfield][props.field] == 0 || props.doc[parentfield][props.field])){
      return (
        <div className={styles.editdiv + ' ' + styles.slim}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>{_.capitalize(String(label))}</div>
          <input className={`${styles.inputnum} ${styles.compact}`} type="number" value={props.doc[parentfield][props.field]} onChange={updateNumber}/>
          {img ? <img style={{position: 'absolute', height: '32px', width: '32px', right: 8, bottom: 8}}src={props.img} />: null}
        </div>
      );
    } else {
      return null;
    }
}

export default EditorNumberClassic;