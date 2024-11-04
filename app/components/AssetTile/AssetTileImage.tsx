'use client'

/* Core */
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import styles from './assettile.module.css';
import _ from 'lodash';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    selectGame,
    selectIsSuperuser,
    selectModeSelect,
    selectWork,
    useDispatch,
    useSelector
} from '@/lib/redux';
import { md2html } from '@/lib/util/util';

export default function AssetTileImage(props: any){
    const dispatch = useDispatch();
    const game = useSelector(selectGame);
    const isSuperuser = useSelector(selectIsSuperuser);
    const isSelectMode = useSelector(selectModeSelect);
    const work = useSelector(selectWork);
    const type = props.data.type;
    const tags = props.data.system.tags ? props.data.system.tags.split(',') : [];
    const matches = props.data.meta.match ? props.data.meta.match.map((el: any, idx: any) =>{ return `${el.collection}-${el.name}`}) : [];
    const clone = (props.clone && isSuperuser) || false;
    const edit = (props.edit && isSuperuser) || false;

    const openWork = () => {
        dispatch(assetSlice.actions.setWork(props.data));
        dispatch(modalSlice.actions.openModal('work'));
    }

    const selectItem = () => {
        const newWork = _.cloneDeep(work);
        if(newWork.img){
            newWork.img = props.data.img;
        }
        if(newWork && newWork.system && newWork.system.img){
            newWork.system.img = props.data.system.img;
        }
        dispatch(assetSlice.actions.setWork(newWork));
    }

    const breakpointValues: any = Object.keys(props.breakpoints).map((el:any)=>Number(el)).filter((el:any)=> el > 0);
    const maxSize: any = Math.min(...breakpointValues);

    let selected = false;
    if(work && work.system && work.system.img){
        if(work.system.img == String(props.data.system.img)){
            selected = true;
        }
    }

    return(
        <div className={styles.tilescene}>
            <div className={styles.toprow}>
                <div className={styles.name}>{props.data.name}</div>
            </div>
            <div className={styles.imgdiv}>
                <img src={props.data.img} style={{maxWidth: maxSize, maxHeight: maxSize}}/>
            </div>
            <div>
                <div className={styles.description} dangerouslySetInnerHTML={{__html: md2html(props.data.system.description)}} />
            </div>
            <div className={styles.tagblock}>
                <SimpleTagWrapper data={tags}/>
            </div>
            <div className={styles.tagblock}>
                <SimpleTagWrapper data={matches}/>
            </div>
            <div className={styles.controls}>
                { edit ? <button className={styles.controls} onClick={()=>openWork()}>EDIT</button> : null }
                
                {
                (!props.action || !props.actionText) && isSuperuser ? 
                <>
                {
                    isSelectMode ? (selected ? <button className={styles.controls} onClick={()=>selectItem()}>UNSELECT</button> : <button className={styles.controls} onClick={()=>selectItem()}>SELECT</button>) : null
                    
                }
                {
                    !isSelectMode ? <button className={styles.controls} onClick={()=>openWork()}>EDIT</button> : null
                }
                </>
                :
                null
                }
            </div>
        </div>
    );
}
