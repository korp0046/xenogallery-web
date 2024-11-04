import { ReactSVG } from 'react-svg';
import styles from './simplelabel.module.css';

export default function SimpleLabel(props: any) {
    let small = props.small || false;
    if ((props.value === 0 || props.value) && props.img){
        return (
            <div className={styles.simpleitem + ' ' + props.tooltip ? styles.tooltip : ''}>
                <ReactSVG className={`${small ? styles.simpleimgs : styles.simpleimg}`} src={props.img} />
                <div className={styles.simplevalue}>{props.value}</div>
                { props.tooltip ? <span className={styles.tooltiptext}>{props.tooltip}</span> : null }
            </div>
        )
    } else if(props.value === 0 || props.value){
        return (
            <div className={styles.simpleitem + ' ' + props.tooltip ? styles.tooltip : ''}>
                <div className={styles.simplelabel}>{props.label}</div>
                <div className={styles.simplevalue}>{props.value}</div>
                { props.tooltip ? <span className={styles.tooltiptext}>{props.tooltip}</span> : null }
            </div>
        )
    } else {
        return null;
    }
}