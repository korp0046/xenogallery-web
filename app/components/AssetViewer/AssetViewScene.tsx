'use client'

import { AssetScene } from '@/lib/util/assetTypes';
/* Core */
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import styles from './assetview.module.css';
import stylesbutton from '../../styles/button.module.css';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    selectActiveCollection,
    selectActiveGame,
    selectActiveScene,
    selectActiveSceneId,
    selectAssetView,
    selectGame,
    selectIsSuperuser,
    selectModeSelect,
    selectSelectedNode,
    selectUsername,
    upsertLiveSceneAsync,
    useDispatch,
    useSelector
} from '@/lib/redux';
import { cloneAsset, importScene, md2html, setNodeScene } from '@/lib/util/util';
import { toast } from 'react-toastify';

export default function AssetViewScene(props: any){
    const dispatch = useDispatch();
    const assetView: any = useSelector(selectAssetView);
    const game = useSelector(selectGame);
    const isSelectMode = useSelector(selectModeSelect);
    const activeSceneData = useSelector(selectActiveScene);
    const isSuperuser = useSelector(selectIsSuperuser);
    const activeGame = useSelector(selectActiveGame);
    const selectedNode = useSelector(selectSelectedNode);
    const username = useSelector(selectUsername);
    const type = assetView.type;
    const tags = assetView.system.tags ? assetView.system.tags.split(',') : [];
    const clone = (props.clone && isSuperuser) || false;
    const edit = (props.edit && isSuperuser) || false;

    const openAssetView = () => {
        dispatch(assetSlice.actions.setAssetView(assetView));
        dispatch(modalSlice.actions.openModal('assetView'));
    }

    const selectSceneAction = (scene: AssetScene) => {
        if(activeGame && activeSceneData && selectedNode){
            if(scene?.meta?.gameFrom && scene?.meta?.gameFrom == String(activeGame)){
                // assign scene to node in current map
                setNodeScene(activeSceneData._id, selectedNode, String(scene._id));

            } else {
                // import scene then add to node
                const newScene = importScene(scene);
                if(newScene){
                    setNodeScene(activeSceneData._id, selectedNode, String(newScene._id));
                } else {
                    toast("Can't Import, Import Error");
                }
            }

        } else {
            toast("Can't Import, No Active Game");
        }
    }

    return(
        <div className={styles.tileinner}>
            <div className={styles.toprow}>
                <div className={styles.name}>{assetView.name}</div>
            </div>
            <div className={styles.tilegrid}>
                <div className={styles.bigimg}>
                    <img src={assetView.system.img}/>
                </div>
                <div style={{display: 'flex', flexDirection:'column', padding: '5px'}}>
                        <div>
                            <div className={styles.brief}>{assetView.system.brief}</div>
                        </div>
                        <div>
                            <div className={styles.description} dangerouslySetInnerHTML={{__html: md2html(assetView.system.description)}} />
                        </div>
                        <div className={styles.tagblock}>
                            <SimpleTagWrapper data={tags}/>
                        </div>
                        <div className={styles.controls}>
                            {
                                isSelectMode ? <button className={stylesbutton.button} onClick={()=>selectSceneAction(assetView)}>SELECT</button> : null
                            }
                            { game  ?  <button className={styles.controls} onClick={()=>dispatch(upsertLiveSceneAsync({data: assetView, original: false}))}>IMPORT</button> : null}
                        </div>
                    </div>
            </div>
        </div>
    );
}
