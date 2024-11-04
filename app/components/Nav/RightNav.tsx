'use client'

/* Core */
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { toast } from 'react-toastify';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

import {
  assetSlice,
  gameSlice,
  modalSlice,
  navSlice,
  roomSlice,
  sceneSlice,
  selectActiveGame,
  selectActiveRoom,
  selectActiveScene,
  selectAutoSave,
  selectDark,
  selectDroppable,
  selectGame,
  selectIsSuperuser,
  selectLiveActors,
  selectLiveScenes,
  selectNavOpen,
  selectRightNavOpen,
  selectRightNavTab,
  selectRoomState,
  selectTrayOpen,
  selectTrayPage,
  selectUsername,
  upsertLiveActorAsync,
  upsertLiveSceneAsync,
  useDispatch,
  useSelector,
  userSlice
} from '@/lib/redux';

/* Instruments */
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SimpleIconButton from '../SimpleLabel/SimpleIconButton';
import { actionIcons, itemIcons, sheetIcons, uiIcons } from '@/lib/gamedata/imgAssets';
import SimpleIconButtonXL from '../SimpleLabel/SimpleIconButtonXL';
import styles from '../../styles/rightnav.module.css';
import stylesbutton from '../../styles/button.module.css';
import AssetEditor from '../AssetEditor/AssetEditor';
import ActionPanel from '../ActionPanel/ActionPanel';
import AssetView from '../AssetViewer/AssetView';
import { RuleTree } from '../Rules/RuleTree';
import { cloneLiveactor, getActiveSceneActors, isGMFunc, saveAsset, saveGame, updateTrack } from '@/lib/util/util';
import Debug from '../Debug/Debug';
import SimpleIconButtonXS from '../SimpleLabel/SimpleIconButtonXS';
import { defaultTrack, getDefaultPlayerCharacter, getDefaultTrack } from '@/lib/gamedata/defaultAssets';
import { getDefaultScene } from '@/lib/gamedata/defaultScenes';
import StoredActionPanel from '../StoredActionPanel/StoredActionPanel';
import Chat from '../Chat/Chat';
import Track from '../Track/Track';
import _ from 'lodash';
import EditorLiteOption from '../EditorLite/EditorLiteOption';
import ToggleBinary from '../Toggle/ToggleBinary';

export default function RightNav(props: any) {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectRightNavOpen);
    const router = useRouter();
    const [isDesktop, setIsDesktop] = useState(false);
    const username = useSelector(selectUsername);
    const gameState = useSelector(selectGame);
    const roomState = useSelector(selectRoomState);
    const isSuperuser = useSelector(selectIsSuperuser);
    const innerTab = useSelector(selectRightNavTab);
    const game = useSelector(selectGame);
    const activeRoom = useSelector(selectActiveRoom);
    const activeGame = useSelector(selectActiveGame);
    const droppable = useSelector(selectDroppable);
    const liveActors = useSelector(selectLiveActors);
    const liveScenes = useSelector(selectLiveScenes);
    const activeSceneData = useSelector(selectActiveScene);
    const autoSave = useSelector(selectAutoSave);
    let isGM = isGMFunc();

    const setOpen = (value: boolean) => {
        dispatch(navSlice.actions.setRightNavState(value));
    }

    const openModal = (value: string) => {
        router.push('/');
        dispatch(navSlice.actions.setInnerNavState(false));
        dispatch(navSlice.actions.setNavState(false));
        dispatch(modalSlice.actions.openModal(value));
        dispatch(assetSlice.actions.setModeSelect(false));
    }

    const editAsset = (asset: any, createNew='false') => {
        if(createNew == 'false'){
          dispatch(assetSlice.actions.setWork(asset));
          dispatch(navSlice.actions.setTrayPage('work'));
          dispatch(navSlice.actions.setTrayState(true));
        } else if (createNew == 'actor') {
          dispatch(assetSlice.actions.setWork(getDefaultPlayerCharacter(true)));
          dispatch(navSlice.actions.setTrayPage('work'));
          dispatch(navSlice.actions.setTrayState(true));
        } else if (createNew == 'battlemap') {
          dispatch(assetSlice.actions.setWork(getDefaultScene('battlemap')));
          dispatch(navSlice.actions.setTrayPage('work'));
          dispatch(navSlice.actions.setTrayState(true));
        } else if (createNew == 'exploremap') {
          dispatch(assetSlice.actions.setWork(getDefaultScene('exploremap')));
          dispatch(navSlice.actions.setTrayPage('work'));
          dispatch(navSlice.actions.setTrayState(true));
        } else if (createNew == 'basicscene') {
          dispatch(assetSlice.actions.setWork(getDefaultScene('basicscene'))); 
          dispatch(navSlice.actions.setTrayPage('work'));
          dispatch(navSlice.actions.setTrayState(true));
        }
    }
    
      const dropAction = (el: any) => {
        if(droppable && el._id == droppable._id){
          dispatch(sceneSlice.actions.setDroppable(null));
        } else {
          dispatch(sceneSlice.actions.setDroppable(el));
        } 
      }
    
      const openActionPanel = (asset: any) => {
        dispatch(assetSlice.actions.setWork(asset));
        dispatch(modalSlice.actions.openModal('action'));
        dispatch(modalSlice.actions.setTrayPage(null));
      }

      let tabs = ['chat'];
      if(gameState){
        if(isGM){
            tabs = ['characters', 'opponents', 'personas', 'scenes', 'tracks', 'turns', 'debug', ...tabs];
        } else {
            tabs = ['characters', 'turns', ...tabs];
        }
      }
    
      const characters = liveActors.filter((el: any)=> el.system.foundrytype == 'character' || el.system.foundrytype == 'player');
      const opponent = liveActors.filter((el: any)=> el.system.foundrytype == 'opponent');
      const persona = liveActors.filter((el: any)=> el.system.foundrytype == 'persona');

    if(username && (activeRoom || activeGame)){

        return (
            <nav className={`${styles.rightnav} ${isOpen ? '': styles.close}`}>
                <div className={`${styles.rightcontrol} ${styles.unselectable}`}>
                    <div className={`${stylesbutton.button}`} onClick={()=>setOpen(!isOpen)}>{isOpen ? 'CLOSE': 'OPEN'}</div>
                </div>
                <div className={`${styles.body}`}>
            {
                isGM && gameState ? 
                <div>
                    <div className={styles.navheader}>
                        <SimpleIconButton img={actionIcons.save} size={36} hover={true} action={()=>saveGame()} />
                        <ToggleBinary checked={autoSave} action={()=>dispatch(gameSlice.actions.setAutoSave(!autoSave))}/>
                    
                    </div>
                </div>
                : null
            }
            <div>
                <div className={styles.tabpanel}>
                {
                    tabs.map((el:any, idx: any)=>{
                    return(
                        <button key={idx} className={`${stylesbutton.button}  ${el == innerTab ? stylesbutton.selected : ''}`} onClick={()=>dispatch(navSlice.actions.setRightNavTab(el))}>{String(el).toLocaleUpperCase()}</button>)
                    })
                }
                </div>
            </div>
            <div className={styles.navbody}>
                <StoredActionPanel />
            {
                innerTab == 'chat' || !gameState ? <Chat />: null
            }
            {
                innerTab == 'characters' && gameState ? 
                <div>
                <label>Player</label>
                <button onClick={()=>dispatch(upsertLiveActorAsync({data: getDefaultPlayerCharacter(), original: true}))}>Create</button>
                <button onClick={()=>dispatch(modalSlice.actions.openModal('characters'))}>Import</button>
                <table className={styles.datatable}>
                    <tbody>
                    {
                    characters.map((el: any, idx: any)=>{
                        return(
                        <tr key={idx} className={styles.tabpanel}><td className={styles.datarowcellxl}>
                            <SimpleIconButtonXS active={droppable && el._id == droppable._id ? true : false} img={uiIcons.position} action={()=>dropAction(el)}/>
                            <div className={styles.rowlabel}>{el.name}</div>
                            <SimpleIconButtonXS img={uiIcons.action} action={()=>openActionPanel(el)}/>
                            <SimpleIconButtonXS img={uiIcons.edit} action={()=>editAsset(el)}/>
                            <SimpleIconButtonXS img={uiIcons.clone} action={()=>cloneLiveactor(el)}/>
                            </td></tr>
                        );
                    })
                    }
                    </tbody>
                </table>
                </div>
                : null
            }
            {
                innerTab == 'opponents' && gameState ? 
                <div>
                <label>Opponents</label>
                <button onClick={()=>dispatch(modalSlice.actions.openModal('opponents'))}>Import</button>
                <table className={styles.datatable}>
                    <tbody>
                    {
                    opponent.map((el: any, idx: any)=>{
                        return(
                        <tr key={idx} className={styles.tabpanel}><td className={styles.datarowcellxl}>
                            <SimpleIconButtonXS active={droppable && el._id == droppable._id ? true : false} img={uiIcons.position} action={()=>dropAction(el)}/>
                            <div className={styles.rowlabel}>{el.name}</div>
                            <SimpleIconButtonXS img={uiIcons.action} action={()=>openActionPanel(el)}/>
                            <SimpleIconButtonXS img={uiIcons.edit} action={()=>editAsset(el)}/>
                            <SimpleIconButtonXS img={uiIcons.clone} action={()=>cloneLiveactor(el)}/>
                            </td></tr>
                        );
                    })
                    }
                    </tbody>
                </table>
                </div>
                : null
            }
            {
                innerTab == 'personas' && gameState ? 
                <div>
                <label>Personas</label>
                <button onClick={()=>dispatch(modalSlice.actions.openModal('personas'))}>Import</button>
                <table className={styles.datatable}>
                    <tbody>
                    {
                    persona.map((el: any, idx: any)=>{
                        return(
                        <tr key={idx} className={styles.tabpanel}><td className={styles.datarowcellxl}>
                            <SimpleIconButtonXS active={droppable && el._id == droppable._id ? true : false} img={uiIcons.position} action={()=>dropAction(el)}/>
                            <div className={styles.rowlabel}>{el.name}</div>
                            <SimpleIconButtonXS img={uiIcons.action} action={()=>openActionPanel(el)}/>
                            <SimpleIconButtonXS img={uiIcons.edit} action={()=>editAsset(el)}/>
                            <SimpleIconButtonXS img={uiIcons.clone} action={()=>cloneLiveactor(el)}/>
                        </td></tr>
                        );
                    })
                    }
                    </tbody>
                </table>
                </div>
                : null
            }
            {
                innerTab == 'scenes' && gameState ? 
                <div>
                    <label>Scenes</label>
                    <div>
                    <div style={{display: 'flex'}}>
                        <div>Basic Scenes</div>
                        <button onClick={()=>dispatch(upsertLiveSceneAsync({data: getDefaultScene('basicscene'), original: true}))}>NEW</button>
                        <button onClick={()=>dispatch(modalSlice.actions.openModal('basicscenes'))}>Import</button>
                    </div>
                    <table className={styles.datatable}>
                    <tbody>
                    {
                        liveScenes.filter((el: any)=>el.system.foundrytype == 'basicscene').map((el:any,idx:any)=>{
                            return(
                            <tr key={idx} className={styles.tabpanel}><td className={styles.datarowcell}>
                                <SimpleIconButtonXS active={droppable && el._id == droppable._id ? true : false} img={uiIcons.position} action={()=>dropAction(el)}/>
                                <div className={styles.rowlabel}>{el.name}</div>
                                <SimpleIconButtonXS img={uiIcons.edit} action={()=>editAsset(el)}/>
                                <SimpleIconButtonXS img={uiIcons.launch} action={()=>dispatch(gameSlice.actions.setActiveScene(el._id))}/>
                            </td></tr>
                            );
                        })
                    }
                    </tbody>
                    </table>
                </div>
                <div>
                    <div style={{display: 'flex'}}>
                        <div>Battle Scenes</div>
                        <button onClick={()=>dispatch(upsertLiveSceneAsync({data: getDefaultScene('battlemap'), original: true}))}>NEW</button>
                        <button onClick={()=>dispatch(modalSlice.actions.openModal('battlemaps'))}>Import</button>
                    </div>
                    <table className={styles.datatable}>
                    <tbody>
                    {
                        liveScenes.filter((el: any)=>el.system.foundrytype == 'battlemap').map((el:any,idx:any)=>{
                            return(
                            <tr key={idx} className={styles.tabpanel}><td className={styles.datarowcell}>
                                <SimpleIconButtonXS active={droppable && el._id == droppable._id ? true : false} img={uiIcons.position} action={()=>dropAction(el)}/>
                                <div className={styles.rowlabel}>{el.name}</div>
                                <SimpleIconButtonXS img={uiIcons.edit} action={()=>editAsset(el)}/>
                                <SimpleIconButtonXS img={uiIcons.launch} action={()=>dispatch(gameSlice.actions.setActiveScene(el._id))}/>
                            </td></tr>
                            );
                        })
                    }
                    </tbody>
                    </table>
                </div>
                <div>
                    <div style={{display: 'flex'}}>
                        <div>Exploration Scenes</div>
                        <button onClick={()=>dispatch(upsertLiveSceneAsync({data: getDefaultScene('exploremap'), original: true}))}>NEW</button>
                        <button onClick={()=>dispatch(modalSlice.actions.openModal('exploremaps'))}>Import</button>
                        
                    </div>
                    <table className={styles.datatable}>
                    <tbody>
                    {
                        liveScenes.filter((el: any)=>el.system.foundrytype == 'exploremap').map((el:any,idx:any)=>{
                            return(
                            <tr key={idx} className={styles.tabpanel}><td className={styles.datarowcell}>
                                <SimpleIconButtonXS active={droppable && el._id == droppable._id ? true : false} img={uiIcons.position} action={()=>dropAction(el)}/>
                                <div className={styles.rowlabel}>{el.name}</div>
                                <SimpleIconButtonXS img={uiIcons.edit} action={()=>editAsset(el)}/>
                                <SimpleIconButtonXS img={uiIcons.launch} action={()=>dispatch(gameSlice.actions.setActiveScene(el._id))}/>
                            </td></tr>
                            );
                        })
                    }
                    </tbody>
                    </table>
                </div>
                </div>
                : null
            }
            {
                
                innerTab == 'turns' && gameState ?
                <div>
                <label>Turns</label>
                <table className={styles.datatable}>
                    <tbody>
                    {
                        getActiveSceneActors().sort((a: any, b: any)=> b.live.initiative - a.live.initiative).map((actor: any, idx: number)=> {
                        return(
                            <tr key={idx} className={styles.tabpanel}><td className={styles.datarowcellinit}>
                                <EditorLiteOption action={(x: any)=>{
                                    let newActor = _.cloneDeep(actor);
                                    newActor.live.initiative = x;
                                    saveAsset(newActor);
                                }} keys="live.initiative" state={actor.live.initiative} doc={actor} edit={true} options={_.range(0, 30)} />
                                <div className={styles.rowlabel}>{actor.name}</div>
                                <SimpleIconButtonXS img={uiIcons.edit} action={()=>editAsset(actor)}/>
                                <SimpleIconButtonXS img={uiIcons.launch} action={()=>dispatch(gameSlice.actions.setActiveScene(actor._id))}/>
                            </td></tr>
                        );
                        })
                    }
                    </tbody>
                </table>
                </div>
                :
                null
                
            }
            {
                innerTab == 'tracks' && gameState ?
                <div>
                <label>Tracks</label>
                <button onClick={()=> {
                    let newTrack = _.cloneDeep(getDefaultTrack());
                    updateTrack(newTrack);
                }}>NEW</button>
                {
                    gameState.system.tracks.map((el: any, idx: number)=> {
                        return(
                            <Track key={idx} data={el}/>
                        );
                    })
                }
                </div>
                :
                null
            }
            {
                innerTab == 'debug' ?
                <div>
                <label>Debug</label>
                <Debug />
                </div>
                :
                null
            }
            </div>


                </div>
                
            </nav>
        )
    } else {
        return null;
    }
}
