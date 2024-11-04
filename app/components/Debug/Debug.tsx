'use client'

/* Instruments */
import {
    selectGame,
    selectLiveActors,
    selectLiveScenes,
    selectWork,
    useSelector,
    selectAssetDebug,
    selectChat,
    selectActiveScene
} from '@/lib/redux';

export default function Debug(props: any){
    const work = useSelector(selectWork);
    const game = useSelector(selectGame);
    const liveactors = useSelector(selectLiveActors);
    const livescenes = useSelector(selectLiveScenes);
    const assets = useSelector(selectAssetDebug);
    const chat = useSelector(selectChat);
    const activeSceneData = useSelector(selectActiveScene);
    return(
        <div>
            WORK
            <div>
                <button onClick={()=>console.log(work)}>PRINTWORK</button>
                <button onClick={()=>console.log(game)}>PRINTGAME</button>
                <button onClick={()=>console.log(livescenes)}>PRINTLIVESCENES</button>
                <button onClick={()=>console.log(liveactors)}>PRINTLIVEACTORS</button>
                <button onClick={()=>console.log(chat)}>PRINTCHAT</button>
                <button onClick={()=>console.log(activeSceneData)}>PRINTACTIVESCENE</button>
            </div>
        </div>
    );
}
