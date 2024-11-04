'use client'

/* Core */
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import styles from './assettile.module.css';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    selectGame,
    selectIsSuperuser,
    selectModeSelect,
    selectUsername,
    upsertLiveSceneAsync,
    useDispatch,
    useSelector
} from '@/lib/redux';
import { cloneAsset, importScene, md2html } from '@/lib/util/util';

export default function AssetTileScene(props: any){
    const dispatch = useDispatch();
    const game = useSelector(selectGame);
    const isSelectMode = useSelector(selectModeSelect);
    const isSuperuser = useSelector(selectIsSuperuser);
    const username = useSelector(selectUsername);
    const type = props.data.type;
    const tags = props.data.system.tags ? props.data.system.tags.split(',') : [];
    const clone = (props.clone && isSuperuser) || false;
    const edit = (props.edit && isSuperuser) || false;

    const openWork = () => {
        dispatch(assetSlice.actions.setWork(props.data));
        dispatch(modalSlice.actions.openModal('work'));
    }

    return(
        <div className={styles.tilescene}>
            <div className={styles.toprow}>
                <div className={styles.name}>{props.data.name}</div>
            </div>
            <div className={styles.tilegrid}>
                <div className={styles.bigimg}>
                    <img src={props.data.system.img}/>
                </div>
                <div style={{display: 'flex', flexDirection:'column', padding: '5px'}}>
                        <div>
                            <div className={styles.brief}>{props.data.system.brief}</div>
                        </div>
                        <div>
                            <div className={styles.description} dangerouslySetInnerHTML={{__html: md2html(props.data.system.description)}} />
                        </div>
                        <div className={styles.tagblock}>
                            <SimpleTagWrapper data={tags}/>
                        </div>
                    </div>
            </div>
            {
                isSuperuser ? 
                <div className={styles.controls}>
                        { clone ? <button className={styles.controls} onClick={()=>cloneAsset(props.data)}>CLONE</button> : null}
                        { game  ? <button className={styles.controls} onClick={()=>importScene(props.data)}>IMPORT</button> : null}
                        { edit ? <button className={styles.controls} onClick={()=>openWork()}>EDIT</button> : null}
                    </div>
                    : null
            }
        </div>
    );
}
