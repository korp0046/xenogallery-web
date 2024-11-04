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
import styles from './galleryroot.module.css';
import stylestags from '../../styles/tags.module.css';
import stylesbutton from '../../styles/button.module.css';
import stylespage from '../../styles/page.module.css';
import { EditorGroupDiv } from '../Editors';
import Loading from '../Loading/Loading';
import debounce from 'debounce';
import _ from 'lodash';
//import Chat from '../Chat/Chat';

let lastVersion = 0;

export default function GalleryRoot(props: any){
    const roomId = props.slug;
    const dispatch = useDispatch();
    const activeRoom = useSelector(selectActiveRoom);
    const roomState = useSelector(selectRoomState);
    const username = useSelector(selectUsername);

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

    

    const viewAsset = (doc: any) => {
      dispatch(assetSlice.actions.setAssetView(doc));
      dispatch(navSlice.actions.setTrayPage('assetview'));
      dispatch(navSlice.actions.setTrayState(true));
  }
  
    if(true){
      return (
        <div className={stylespage.root}>
          THE GALLERY ROOT
        </div>
      )

    } else {
      return <Loading />;
    }
  }