'use client'

/* Core */
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';

/* Instruments */

export default function AssetFlags(props: any){

    if(props.doc && props.doc.system && props.doc.system.flags){
        const flags = Object.keys(props.doc.system.flags).filter((key: any)=>{return props.doc.system.flags[key];});
        return(
            <SimpleTagWrapper data={flags} />
        );

    } else {
        return null;
    }
}
