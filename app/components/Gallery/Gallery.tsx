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
import { useInView } from "react-intersection-observer";

let lastVersion = 0;

function GalleryCard(props:any){
  const dispatch = useDispatch();
  const galleryObjects = useSelector(selectGalleryObjects);
  const data = props.data;
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const loadedObjCount = galleryObjects.length;

  useEffect(()=>{
    if(inView && loadedObjCount == (props.idx + 1) && loadedObjCount >= 9){
      dispatch(getGalleryObjectsAsync({gallery: data.gallery, limit: 10, last: data.name, more: true}));
    }
  }, [inView]);


  return(
  <div key={props.idx} ref={ref}>
    <div>{data.name}</div>
    <img src={data.url}/>
    <div><KVEditor orig={data.tags} gallery={data.gallery} name={data.name}/></div>
  </div>
  )

}

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
      if(params && params.slug){
        dispatch(getGalleryObjectsAsync({gallery: gallery, more: false}));
      }
    }, []);
  
    if(true){
      return (
        <div className={stylespage.root}>
          THE GALLERY
          <div>
            {galleryObjects.map((el: any,idx: number)=>{
              return(<GalleryCard key={idx} idx={idx} data={el}/>)
            })}
          </div>
        </div>
      )

    } else {
      return <Loading />;
    }
  }