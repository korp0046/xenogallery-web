import styles from './simplelabel.module.css';
import stylesbutton from '../../styles/button.module.css';
import { ReactSVG } from 'react-svg'

export default function SimpleIconButtonXL(props: any) {
    const noop = ()=>{};
    let action = props.action || noop;
    let tooltip = props.tooltip || null;
    let selected = props.selected || null;
    let text = props.text || null;
    return (
        <div className={`${stylesbutton.button} ${stylesbutton.iconxl} ${tooltip ? stylesbutton.tooltip: ''} ${selected ? stylesbutton.selected: ''}`} onClick={()=>action()}>
            <ReactSVG 
            beforeInjection={(svg) => {
                const [firstGElement] = [...svg.querySelectorAll('rect')];
                firstGElement.setAttribute('fill', 'rgba(0,0,0,0)');
                svg.setAttribute('style', 'width: 80px; height: 80px;')
              }}
            className={stylesbutton.svg} 
            src={props.img} 
            />
            { text ? <div className={stylesbutton.simplevaluexl}><div>{text}</div></div> : null }
            { tooltip ? <span className={stylesbutton.tooltiptext}>{tooltip}</span> : null }
        </div>
    )
}