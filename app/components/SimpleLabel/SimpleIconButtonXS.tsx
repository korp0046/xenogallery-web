import styles from './simplelabel.module.css';
import { ReactSVG } from 'react-svg'

export default function SimpleIconButtonXS(props: any) {
    const noop = ()=>{};
    let action = props.action || noop;
    let active = props.active || false;
    let tooltip = props.tooltip || null;
    let selected = props.selected || null;
    let invert = props.invert || null;
    let text = props.text || null;
    return (
        <div className={`${styles.simpleitemxs} ${tooltip ? styles.tooltip: ''}  ${invert ? styles.invert: ''} ${selected ? styles.selected: ''} ${active ? styles.active: ''}`} onClick={()=>props.action()}>
            <ReactSVG className={styles.simpleimgxs} src={props.img} />
            { text ? <div className={styles.simplevaluexs}>{text}</div> : null }
            { tooltip ? <span className={styles.tooltiptext}>{tooltip}</span> : null }
        </div>
    )
}