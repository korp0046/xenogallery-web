'use client'
import { assetToCollection } from '@/lib/util/util';
import styles from '../../styles/edittable.module.css';
import stylestable from '../../styles/table.module.css';
import { useState, useEffect } from 'react';
import { selectTrayOpen, useSelector } from '@/lib/redux';
import { useDispatch } from 'react-redux';
import EditTableInner from './EditTableInner';



export default function EditTable(props: any){
    const dispatch = useDispatch();
    return(
        <div className={`${styles.wrapper}`}>
            <table className={styles.table}>
                <EditTableInner />
            </table>
        </div>
    )
}
