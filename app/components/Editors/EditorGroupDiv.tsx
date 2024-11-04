
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorGroupDiv(props: any) {

    if(props.children){
        return (
            <div className={styles.group}>
                {props.label ? <div className={styles.grouplabel}>{props.label}</div> : null}
                {props.children}
            </div>
        );
    } else {
        return null;
    }

}

export default EditorGroupDiv;
