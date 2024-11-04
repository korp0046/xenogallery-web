
import _ from 'lodash';
import styles from './editorlite.module.css';

export function EditorLiteOption(props: any) {
    let edit = props.edit;
    let keys = props.keys;
    let doc = props.doc;
    let state = props.state;
    let options = props.options;
    let action: Function = props.action;
    let value = _.get(doc, keys);

    let isNum = false;
    if(typeof value == "number"){
        isNum = true;
    }

    if(!edit){
        return (
            <div className={styles.editdiv}>
                {value}
            </div>
          );

    } else {
        return (
            <div className={styles.editdiv}>
                <select className={styles.inputnum} value={state} onChange={(e)=>
                    action(isNum ? Number(e.target.value) : String(e.target.value))
                }>
                    {
                        options.map((el: any, idx: number)=> {
                            return(<option key={idx} value={el}>{String(el)}</option>);
                        })
                    }
                </select>
            </div>
          );

    }

}

export default EditorLiteOption;
