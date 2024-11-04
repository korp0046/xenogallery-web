import { elementThumbs, sheetIcons } from '@/lib/gamedata/imgAssets';
import styles from './simplelabel.module.css';
import { addPlusMinus } from '@/lib/util/util';
import SimpleTinyImg from './SimpleTinyImg';

export default function SimpleElement(props: any) {
    const element = props.data;
    if(element){
        return (
            <span>
                {
                    Object.keys(element).filter((el)=>element[el]).map((el: any, idx: any)=>{
                        return(
                            <SimpleTinyImg key={idx} src={elementThumbs[el]} />
                        ); 
                    })
                }
            </span>
        )
    } else {
        return null;
    }
}
