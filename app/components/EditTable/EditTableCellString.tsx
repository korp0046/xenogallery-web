'use client'
import { assetToCollection } from '@/lib/util/util';
import styles from '../../styles/edittable.module.css';
import stylestable from '../../styles/table.module.css';
import { useState, useEffect } from 'react';
import { assetSlice, selectTrayOpen, selectWork, useSelector } from '@/lib/redux';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

export default function EditTableCellString(props: any){
    const dispatch = useDispatch();
    const fields = props.field.split('.');
    const work = useSelector(selectWork);
    const options = props.options;

    const updateString = (e: any) => {
        let tempDoc = _.cloneDeep(work);
        let newValue = String(e.target.value);
        if(fields && fields.length){
            if(fields.length == 1){
                tempDoc[fields[0]] = newValue;
            } else if (fields.length == 2){
                tempDoc[fields[0]][fields[1]] = newValue;
            } else if (fields.length == 3){
                tempDoc[fields[0]][fields[1]][fields[2]] = newValue;
            }
        }
        dispatch(assetSlice.actions.setWork(tempDoc));
    }

    const getValue = () => {
        if(fields && fields.length){
            if(fields.length == 1){
                return work[fields[0]];
            } else if (fields.length == 2){
                return work[fields[0]][fields[1]];
            } else if (fields.length == 3){
                return work[fields[0]][fields[1]][fields[2]];
            }
        } else {
            return '?';
        }
    }

    let value = getValue();

    return(
        <td>
            <select className={styles.inputnum} value={value} onChange={updateString}>
                {
                options.map((el: number, idx: number) => {
                    return(
                        <option key={idx} value={el}>{String(el)}</option>
                    );
                })
                }
            </select>
        </td>
    )
}