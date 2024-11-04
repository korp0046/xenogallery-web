'use client'
import { selectWork, useSelector } from '@/lib/redux';
import _ from 'lodash';

export default function EditTableCellSum(props: any){
    const fieldsTemp = props.fields.split(',');
    const fieldList = fieldsTemp.map((el: string, idx: number)=> {
        return(el.split('.'))
    });
    const work = useSelector(selectWork);

    const getValue = () => {
        let sum = 0;
        for(let fields of fieldList){
            if(fields && fields.length){
                console.log('fields', fields);
                if(fields.length == 1){
                    let value = Number(work[fields[0]]);
                    if(value){
                        sum += value;
                    }
                } else if (fields.length == 2){
                    let value = Number(work[fields[0]][fields[1]]);
                    if(value){
                        sum += value;
                    }
                } else if (fields.length == 3){
                    let value = Number(work[fields[0]][fields[1]][fields[2]]);
                    if(value){
                        sum += value;
                    }
                }
            }
        }
        return sum;
    }

    let value = getValue();

    return(
        <td>{value}</td>
    )
}