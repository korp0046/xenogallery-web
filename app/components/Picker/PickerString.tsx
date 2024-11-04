'use client'

/* Core */
import _ from 'lodash';
import styles from './picker.module.css';

/* Instruments */
import {
    assetSlice,
    useDispatch
} from '@/lib/redux';
import ToggleBinary from '../Toggle/ToggleBinary';

export function PickerString(props: any){
    const dispatch = useDispatch();

    const options = props.options;
    const action = props.action;
    const headers = props.headers;
    const selected = props.selected;

    return(
        <div>
            <table>
                <tr>
                    {
                        headers.map((el: any, idx: any)=> {
                            return(<th key={idx}>{el}</th>);
                        })
                    }
                    <th>Select</th>
                </tr>
                {
                    options.map((el: any, idx: any)=> {
                        return(
                            <tr key={idx}>
                                <td>{el}</td>
                                <td><ToggleBinary disabled={false} checked={selected.includes(el)} action={action} actionData={el}/></td>
                            </tr>
                            );
                    })
                }
            </table>
        </div>
    );
}



export default PickerString;