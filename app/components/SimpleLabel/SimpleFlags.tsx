import { elementThumbs, sheetIcons } from '@/lib/gamedata/imgAssets';
import styles from './simplelabel.module.css';
import { addPlusMinus } from '@/lib/util/util';
import SimpleTinyImg from './SimpleTinyImg';

export default function SimpleFlags(props: any) {
    const flags = props.data;
    if(flags){
        return (
            <span>
                {
                    Object.keys(flags).filter((el)=>flags[el]).map((el: any, idx: any)=>{
                        return(
                            <span key={idx} className={styles.flag}>{el}</span>
                        ); 
                    })
                }
            </span>
        )
    } else {
        return <span></span>
    }

}
