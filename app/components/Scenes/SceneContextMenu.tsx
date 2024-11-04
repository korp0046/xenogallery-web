import { selectActiveScene, useDispatch, useSelector, assetSlice, modalSlice, selectLiveActors, selectLiveScenes, navSlice, selectSelectedNode, sceneSlice, livesceneSlice } from "@/lib/redux";
import styles from "./scene.module.css";
import { isGMFunc, lookupLiveAny, lookupSceneItem } from "@/lib/util/util";
import _ from 'lodash';

export function SceneContextMenu(props: any){
    const dispatch = useDispatch();
    const selectedNode = useSelector(selectSelectedNode);
    const liveactors = useSelector(selectLiveActors);
    const livescenes = useSelector(selectLiveScenes);
    const mapState = useSelector(selectActiveScene);
    let isGM = isGMFunc();
    const clickedNodeData = props.clickObj == 'node' ? lookupSceneItem(props.clickId, mapState): {name: 'background'};
    let liveObject = clickedNodeData?.linkedObject ? lookupLiveAny(clickedNodeData?.linkedObject, liveactors, livescenes) : null;

    const openActionPanel = () => {
        if(liveObject){
            dispatch(assetSlice.actions.setWork(liveObject));
            dispatch(modalSlice.actions.openModal('action'));
            dispatch(modalSlice.actions.setTrayPage(null));
        }
      }

    const openScenePicker = () => {
        dispatch(sceneSlice.actions.setSelectedNode(props.clickId));
        dispatch(modalSlice.actions.openModal('scenepicker'));
    }

      const openEditPanel = () => {
        if(liveObject){
            dispatch(assetSlice.actions.setWork(liveObject));
            dispatch(navSlice.actions.setTrayPage('work'));
            dispatch(navSlice.actions.setTrayState(true));
        }
      }

      const openEditScene = () => {
        dispatch(assetSlice.actions.setWork(mapState));
        dispatch(navSlice.actions.setTrayPage('work'));
        dispatch(navSlice.actions.setTrayState(true));
      }

    const setFog = () => {
        const newMapState = _.cloneDeep(mapState);
        for(let i=0; i<newMapState.system.nodes.length; i++){
            let node = newMapState.system.nodes[i];
            if(node.id == props.clickId){
                if(!node.fog || node.fog == 0){
                    node.fog = 1;
                } else {
                    node.fog = 0;
                }
                break;
            }
        }
        dispatch(livesceneSlice.actions.updateScene(newMapState));
    }

  return (
    <div className={styles.menudiv} style={{left: `${props.left}px`, top: `${props.top}px`}} onContextMenu={(e)=>e.preventDefault()}>
        { liveObject ? <div className={styles.contextname}>{liveObject.name}</div> : <div>Placeholder</div>}
        <div className={styles.menudivinner}>
        {
            props.clickObj == 'map' && isGM ?
            <div>
                <div className={styles.menuitemdiv} onClick={()=>props.addNode({x: props.svgPoints.x, y: props.svgPoints.y})}>AddNode</div>
                <div className={styles.menuitemdiv} onClick={()=>openEditScene()}>EditScene</div>
            </div>
            :
            null
        }
        {
            props.clickObj == 'node' ?
            <div>
                { isGM ? <div className={styles.menuitemdiv} onClick={()=>dispatch(sceneSlice.actions.setSelectedNode(props.clickId))}>SelectNode</div> : null }
                {
                    selectedNode && isGM ? 
                    <div className={styles.menuitemdiv} onClick={()=>props.linkNode(props.clickId)}>LinkNode</div>
                    :
                    null
                }
                { isGM ? <div className={styles.menuitemdiv} onClick={()=>props.deleteNode(props.clickId)}>DeleteNode</div> : null }
                { isGM ? <div className={styles.menuitemdiv} onClick={()=>dispatch(sceneSlice.actions.setSelectedNode(null))}>UnselectNode</div> : null }
                { isGM ? <div className={styles.menuitemdiv} onClick={()=>setFog()}>Toggle Fog</div> : null }
                { liveObject && liveObject.type == 'actor' && (liveObject.system.foundrytype == 'character' || isGM) ? <div className={styles.menuitemdiv} onClick={()=>{dispatch(sceneSlice.actions.setSelectedNode(props.clickId)); openEditPanel();}}>Edit Actor</div> : null }
                { liveObject && liveObject.type == 'scene' && isGM ? <div className={styles.menuitemdiv} onClick={()=>{dispatch(sceneSlice.actions.setSelectedNode(props.clickId)); openEditPanel();}}>Edit Scene</div> : null }
                { liveObject && liveObject.type == 'actor' && (liveObject.system.foundrytype == 'character' || isGM) ? <div className={styles.menuitemdiv} onClick={()=>{dispatch(sceneSlice.actions.setSelectedNode(props.clickId)); openActionPanel();}}>Action!</div> : null }
                { !liveObject || liveObject.type == 'scene' && isGM  ? <div className={styles.menuitemdiv} onClick={()=>{openScenePicker(); }}>Pick Scene</div> : null }
            </div>
            :
            null
        }
        </div>
    </div>
  );
};