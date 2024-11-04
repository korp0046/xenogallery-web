import _ from 'lodash';
import styles from './editor.module.css';

export function EditorDynamicSelect(props: any) {

    const funcvalue = props.funcvalue ? props.funcvalue : (x: any)=>x;
    const funcstring = props.funcstring ? props.funcstring : (x: any)=>x;

    return (
        <div className={styles.editdiv} style={{width: props.width || 'auto'}}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>{props.label}</div>
          <select className={styles.inputnum} value={props.value} onChange={(e)=>props.action(e.target.value)}>
              {
                  props.list.map((el: any, idx: number) => {
                    return(
                        <option key={idx} value={funcvalue(el)}>{funcstring(el)}</option>
                    )
                  })
              }
        </select>
        </div>
      );

}

export default EditorDynamicSelect;
