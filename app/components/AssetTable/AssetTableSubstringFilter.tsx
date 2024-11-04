'use client'
import { capitalize } from 'lodash';
import styles from '../../styles/table.module.css';
import { itemTypes } from '@/lib/gamedata/contentAssets';
import { useState } from 'react';

export default function AssetTableSubstringFilter(props: any){
    const [tempSubstring, setTempSubstring] = useState(props.filter.substring);
    let currentSubstring = props.filter.substring;

    const setFilter = (substring: string) => {
        props.setFilter({...props.filter, substring: substring});
    }

    return(
        <div><input type="text" value={tempSubstring} onChange={(e: any)=>setTempSubstring(e.target.value)} /><button onClick={()=>setFilter(tempSubstring)}>GO</button></div>
    )

 
}
