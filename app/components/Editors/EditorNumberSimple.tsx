import _ from 'lodash';
import styles from './editor.module.css';

export function EditorNumberSimple(props: any) {

let min = props.min || 0;
let max = props.max || 30;

return (
    <div className={styles.editdiv} style={{width: props.width || 'auto'}}>
      <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>{props.label || props.field}</div>
      <select className={styles.inputnum} value={props.value} onChange={(e)=>props.action(Number(e.target.value))}>
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

}


export default EditorNumberSimple;