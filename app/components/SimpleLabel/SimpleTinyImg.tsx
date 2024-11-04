import { elementThumbs, sheetIcons } from '@/lib/gamedata/imgAssets';
import styles from './simplelabel.module.css';
import { addPlusMinus } from '@/lib/util/util';

export default function SimpleTinyImg(props: any) {
    return (
        <div className={`${props.dark ? styles.tinydark : ''}`}>
            <img className={styles.tinyimg} src={props.src} />
        </div>
    )
}
