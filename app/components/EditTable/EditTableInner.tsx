'use client'
import { assetToCollection } from '@/lib/util/util';
import styles from '../../styles/edittable.module.css';
import stylestable from '../../styles/table.module.css';
import { useState, useEffect } from 'react';
import { selectTrayOpen, selectWork, useSelector } from '@/lib/redux';
import { useDispatch } from 'react-redux';
import { EditTableActorStatsHead, EditTableActorStatsBody } from './EditTableActorStats';


export default function EditTableInner(props: any){
    const dispatch = useDispatch();
    const work = useSelector(selectWork);
    const collection = assetToCollection(work);
    const trayOpen = useSelector(selectTrayOpen);
    if(collection && ['liveactors', 'characters', 'opponents', 'personas'].includes(collection)){
        return(
            <>
            <EditTableActorStatsHead />
            <EditTableActorStatsBody />
            </>
        )
    } else {
        return(
            <>
            <thead className={styles.table}>
            </thead>
            <tbody className={styles.table}>
            </tbody>
            </>
        )
    }
}
