'use client'

/* Core */
import _ from 'lodash';
import styles from './toggle.module.css';

export function ToggleBinary(props: any){

    const disabled = props.disabled; //props.data.system.recharge == 0
    const checked = props.checked; //props.data.live.ready
    const action = props.action; //props.actionReady(props.data)
    const actionData = props.actionData; //props.data

    return(
        <label className={styles.switch}>
            <input type="checkbox" disabled={disabled} value={checked} checked={checked} onChange={()=>action(actionData)}/>
            <span className={styles.slider}></span>
        </label>
    );
}



export default ToggleBinary;