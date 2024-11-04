'use client'

/* Core */
import styles from './assettile.module.css';

/* Instruments */

import { elementThumbs } from '@/lib/gamedata/imgAssets';

export default function AssetElements(props: any){

    if(props.doc && props.doc.system && props.doc.system.element){
        return(
            <div className={styles.databar}>
                {
                    Object.keys(props.doc.system.element).filter((key: any)=>{return props.doc.system.element[key]}).map((el: any, idx: any) => {
                        return(
                            <img key={idx} src={elementThumbs[el]} />
                        );
                    })
                }
            </div>
        );

    } else {
        return null;
    }
}
