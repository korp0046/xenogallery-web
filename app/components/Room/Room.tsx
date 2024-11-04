'use client'

/* Core */
import { useEffect, useState } from 'react';


/* Instruments */
import {
  ViewBox,
  assetSlice,
  getGameAsync,
  getRoomAsync,
  navSlice,
  roomSlice,
  sceneSlice,
  selectActiveRoom,
  selectRoomState,
  selectUsername,
  selectViewBox,
  useDispatch,
  useSelector
} from '@/lib/redux';
import styles from './room.module.css';
import stylestags from '../../styles/tags.module.css';
import stylesbutton from '../../styles/button.module.css';
import stylespage from '../../styles/page.module.css';
import { EditorGroupDiv } from '../Editors';
import Loading from '../Loading/Loading';
import { Excalidraw, Footer } from '@excalidraw/excalidraw';
import debounce from 'debounce';
import _ from 'lodash';
import { ReceiveCanvasPayload } from '@/lib/util/assetTypes';
//import Chat from '../Chat/Chat';

let lastVersion = 0;

export default function Room(props: any){
    const roomId = props.slug;
    const dispatch = useDispatch();
    const activeRoom = useSelector(selectActiveRoom);
    const roomState = useSelector(selectRoomState);
    const username = useSelector(selectUsername);
    const [excalidrawAPI, setExcalidrawAPI]: any = useState(null);

    const bc = new BroadcastChannel(roomId);
    if(bc){
      bc.onmessage = (e: any) => {
        const sceneData = {
          elements: e.data.payload.els,
          appState: {
            
          },
          collaborators: [],
          commitToStore: false
        }
        console.log('canvas', e.data);
        if(excalidrawAPI){
          lastVersion = e.data.payload.version;
          excalidrawAPI.updateScene(sceneData);
        }
      }
    }

    useEffect(()=>{
      if(username && roomId){
        dispatch(getRoomAsync(roomId));
      }
    }, [activeRoom, username]);

    useEffect(()=>{
      if(roomState){
        dispatch(roomSlice.actions.setActiveRoom(roomId));
      }
    }, [roomState]);

    
    useEffect(()=>{
      if(username && roomId){
        console.log(roomId);
      }
    }, []);
    

    const viewAsset = (doc: any) => {
      dispatch(assetSlice.actions.setAssetView(doc));
      dispatch(navSlice.actions.setTrayPage('assetview'));
      dispatch(navSlice.actions.setTrayState(true));
  }
  
    if(roomState && activeRoom){
      return (
        <div className={stylespage.root}>
          <EditorGroupDiv label="Current Room">
            {roomState.name}
          </EditorGroupDiv>
            <EditorGroupDiv label="Members">
            <div className={stylesbutton.buttonwrapper}>
              <div className={`${stylesbutton.button} ${stylestags.large}`}>INVITE NEW MEMBER</div>
              {
                  
                  roomState.system.users.map((el: any, idx: any)=>{
                    return(
                      <div className={`${stylesbutton.button} ${stylestags.large} ${username == el.username ? stylesbutton.selected : ''}`} key={idx} onClick={()=>viewAsset(el)}>{el.name}</div>
                    );
                  })
                  
                }
            </div>
            </EditorGroupDiv>
            <EditorGroupDiv label="Games">
            <div className={stylesbutton.buttonwrapper}>
              <div className={`${stylesbutton.button} ${stylestags.large}`}>CREATE NEW GAME</div>
              {
                  
                  roomState.system.games.map((el: any, idx: any)=>{
                    return(
                      <div className={`${stylesbutton.button} ${stylestags.large}`} key={idx} onClick={()=>viewAsset(el)}>{el.name}</div>
                    );
                  })
                  
                }
            </div>
            </EditorGroupDiv>
            <div style={{height: 'calc(100vh - 48px - 48px - 180px', width: 'min(100vw,1024px)'}}>
              <Excalidraw 
                name={roomId}
                excalidrawAPI={(api: any)=> setExcalidrawAPI(api)}
                onChange={_.debounce(function (els, appState) {
                  const version = _.sumBy(els, 'version');
                  
                  if(version != lastVersion){
                    lastVersion = version;
                    console.log({ type: 'drawing', id: roomId, version: version, els: els, appState: appState });
                  }
                }, 1000)}
              >
                  <Footer>
                  </Footer>
              </Excalidraw>
            </div>
        </div>
      )

    } else {
      return <Loading />;
    }
  }