'use client'

/* Core */
import { useEffect, useState } from 'react';

/* Instruments */
import {
  ViewBox,
  assetSlice,
  gallerySlice,
  getGalleryListAsync,
  getGameAsync,
  getRoomAsync,
  navSlice,
  postGalleryAsync,
  roomSlice,
  sceneSlice,
  selectActiveRoom,
  selectGalleryList,
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
import { useRouter } from 'next/navigation';
//import Chat from '../Chat/Chat';

let lastVersion = 0;

export default function GalleryRoot(props: any){
    const [newGallery, setNewGallery] = useState("");
    const router = useRouter();
    const roomId = props.slug;
    const dispatch = useDispatch();
    const activeRoom = useSelector(selectActiveRoom);
    const roomState = useSelector(selectRoomState);
    const username = useSelector(selectUsername);
    const galleryList = useSelector(selectGalleryList);

    useEffect(()=>{
      dispatch(getGalleryListAsync(null));
    }, []);
  
    if(true){
      return (
        <div className={stylespage.root}>
          <div>THE GALLERY ROOT</div>
          <div>
            <div>{newGallery}</div>
            <button onClick={()=>dispatch(postGalleryAsync({action: 'create', gallery: newGallery}))}>CREATE NEW GALLERY</button>
            <input type="text" value={newGallery} onChange={(e)=>setNewGallery(e.target.value)} ></input>
          </div>
          {
          galleryList.map((el: any, idx: number)=> {
            return(<div key={idx}><button onClick={()=>router.push(`/gallery/${el.name}`)}>GO</button>{JSON.stringify(el)}</div>);
          })
          }
        </div>
      )

    } else {
      return <Loading />;
    }
  }