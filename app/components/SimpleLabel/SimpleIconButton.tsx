import styles from './simplelabel.module.css';
import { ReactSVG } from 'react-svg'

export default function SimpleIconButton(props: any) {
    const noop = ()=>{};
    let action = props.action || noop;
    let tooltip = props.tooltip || null;
    let selected = props.selected || null;
    let text = props.text || null;
    let small = props.small || false;
    let size = props.size || null;
    let hover = props.hover || null;
    if(!size){
        return (
            <div className={`${styles.simpleitem} ${tooltip ? styles.tooltip: ''} ${selected ? styles.selected: ''}`} onClick={()=>props.action()}>
                <ReactSVG className={`${small ? styles.simpleimgs : styles.simpleimg}`} src={props.img} />
                { text ? <div className={styles.simplevalue}>{text}</div> : null }
                { tooltip ? <span className={styles.tooltiptext}>{tooltip}</span> : null }
            </div>
        )
    } else {
        return (
            <div className={`${styles.simpleitem} ${tooltip ? styles.tooltip: ''} ${selected ? styles.selected: ''} ${hover ? styles.hover: ''}`} onClick={()=>props.action()}>
                <ReactSVG
                    beforeInjection={(svg) => {
                        //svg.classList.add('svg-class-name')
                        svg.setAttribute('style', `width: ${size}px`);
                    }}
                    src={props.img} 
                />
                { text ? <div className={styles.simplevalue}>{text}</div> : null }
            </div>
        )
    }
}