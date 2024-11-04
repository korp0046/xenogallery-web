'use client'

/* Core */
import _ from 'lodash';
import {useState} from 'react';
import styles from './track.module.css';
import { TrackType } from '@/lib/util/assetTypes';
import { isGMFunc, removeTrack, updateTrack } from '@/lib/util/util';
import SimpleIconButtonXS from '../SimpleLabel/SimpleIconButtonXS';
import { uiIcons } from '@/lib/gamedata/imgAssets';
import EditorLiteString from '../EditorLite/EditorLiteString';
import EditorLiteOption from '../EditorLite/EditorLiteOption';

function TrackLinear(props: any) {
    const data: TrackType = props.data;

    return(
        <div className={styles.linearmain}>
            {
                _.range(0, data.valueMax + 1).map((el: number, idx: any)=>{
                    return(
                        <div 
                            className={`${styles.linearslice} ${el == data.value ? styles.linearsliceselect : ''}`} 
                            key={idx}
                            onClick={()=>{
                                let newData = _.cloneDeep(data);
                                newData.value = el;
                                updateTrack(newData);
                            }}
                            >
                            {el}
                        </div>
                    )
                })
            }
        </div>
    );
}

export function Track(props: any){
    const data: TrackType = props.data;
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [hiddenDesc, setHiddenDesc] = useState(data.hiddenDesc);
    const [publicDesc, setPublicDesc] = useState(data.publicDesc);
    const [valueMax, setValueMax] = useState(data.valueMax);
    //const [value, setValue] = useState(data.value);
    const [threshold, setThreshold] = useState(data.threshold);
    const [title, setTitle] = useState(data.title);
    const [hide, setHide] = useState(data.hide);
    const [zone, setZone] = useState(data.zone);
    let isGM = isGMFunc();

    const doEdit = () => {
        if(edit){
            let newTrack = {...data, hiddenDesc, valueMax, publicDesc, threshold, title, hide, zone};
            updateTrack(newTrack);
            setEdit(false);
        } else {
            setEdit(true);
            setOpen(true);
        }
    }

    return(
        <div className={styles.main}>
            <div className={styles.trackheader}>
                <EditorLiteString action={setTitle} keys="title" state={title} doc={data} edit={edit} />
                <SimpleIconButtonXS img={uiIcons.edit} action={()=>doEdit()}/>
                <SimpleIconButtonXS img={uiIcons.trash} action={()=>removeTrack(String(data._id))}/>
            </div>
            <TrackLinear data={data}/>
            <div onClick={()=>setOpen(!open)}>...</div>
            {
                open ? 
                <div>
                    { edit ? <EditorLiteOption action={setValueMax} keys="valueMax" state={valueMax} doc={data} edit={edit} options={_.range(3, 13)} /> : null }
                    { edit ? <EditorLiteOption action={setThreshold} keys="threshold" state={threshold} doc={data} edit={edit} options={_.range(2, valueMax)} /> : null }
                    <EditorLiteString action={setPublicDesc} keys="publicDesc" state={publicDesc} doc={data} edit={edit} />
                    { isGM ? <EditorLiteString action={setHiddenDesc} keys="hiddenDesc" state={hiddenDesc} doc={data} edit={edit} /> : null }
                </div>
                : 
                null
            }
        </div>
    );
}



export default Track;