'use client'

/* Core */
import { useEffect, useState } from 'react';

/* Instruments */
import {
  ViewBox,
  assetSlice,
  getGalleryObjectsAsync,
  getGameAsync,
  getRoomAsync,
  navSlice,
  roomSlice,
  sceneSlice,
  selectActiveRoom,
  selectGalleryObjects,
  selectRoomState,
  selectUsername,
  selectViewBox,
  updateObjectTagsAsync,
  useDispatch,
  useSelector
} from '@/lib/redux';
import { useParams } from "next/navigation";
import styles from './gallery.module.css';
import stylestags from '../../styles/tags.module.css';
import stylesbutton from '../../styles/button.module.css';
import stylespage from '../../styles/page.module.css';
import { EditorGroupDiv } from '../Editors';
import Loading from '../Loading/Loading';
import debounce from 'debounce';
import _ from 'lodash';
import KVEditor from '../KVEditor/KVEditor';
//import Chat from '../Chat/Chat';

let lastVersion = 0;

export default function Gallery(props: any){
    const galleryName = props.slug;
    const dispatch = useDispatch();
    const params = useParams();
    const activeRoom = useSelector(selectActiveRoom);
    const roomState = useSelector(selectRoomState);
    const username = useSelector(selectUsername);
    const galleryObjects = useSelector(selectGalleryObjects);

    const gallery = params && params.slug ? params.slug : 'default';

    useEffect(()=>{
      console.log('params', params);
      if(params && params.slug){
        dispatch(getGalleryObjectsAsync({gallery: gallery}));
      }
    }, []);

    console.log(galleryObjects);
  
    if(true){
      return (
        <div className={stylespage.root}>
          THE GALLERY
          <div>
            {galleryObjects.map((el: any,idx: number)=>{
              return(<div key={idx}>
                <div>{el.name}</div>
                <div><KVEditor orig={el.tags} gallery={gallery} name={el.name}/></div>
                <button onClick={()=>dispatch(updateObjectTagsAsync({gallery: gallery, object: el.name, tags: {"testkey": "testvalue"}}))}>UPDATE</button>
              </div>
              )
            })}
          </div>
        </div>
      )

    } else {
      return <Loading />;
    }
  }