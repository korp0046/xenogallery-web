'use client'

/* Core */
import _ from 'lodash';
import styles from './picker.module.css';

/* Instruments */
import {
    assetSlice,
    useDispatch
} from '@/lib/redux';
import { elementThumbs } from '@/lib/gamedata/imgAssets';
import SimpleIconButton from '../SimpleLabel/SimpleIconButton';

export function PickerElement(props: any){
    const dispatch = useDispatch();
    const selected = props.selected || false;

    return(
        <div className={styles.grid3}>
            {
                Object.keys(elementThumbs).map((el: string, idx: any)=> {
                    return(
                        <div key={idx}><SimpleIconButton action={()=>props.action(el)} img={elementThumbs[el]} selected={selected == el ? true : false}/></div>
                    );
                })
            }
        </div>
    );
}



export default PickerElement;