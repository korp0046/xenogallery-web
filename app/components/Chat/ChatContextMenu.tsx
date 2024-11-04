import { selectActiveScene, useDispatch, useSelector, assetSlice, modalSlice, selectLiveActors, selectLiveScenes } from "@/lib/redux";
import styles from "./chat.module.css";
import { lookupLiveAny, lookupSceneItem } from "@/lib/util/util";

export function ChatContextMenu(props: any){
    const dispatch = useDispatch();
    const liveactors = useSelector(selectLiveActors);
    const livescenes = useSelector(selectLiveScenes);
    const mapState = useSelector(selectActiveScene);

  return (
    <div className={styles.menudiv} style={{left: `${props.left}px`, top: `${props.top}px`}} onContextMenu={(e)=>e.preventDefault()}>
        TEST
    </div>
  );
};