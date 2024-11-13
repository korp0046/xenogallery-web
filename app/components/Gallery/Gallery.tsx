'use client'

/* Core */
import { useEffect, useState } from 'react';
import axios from 'axios';

/* Instruments */
import {
  ViewBox,
  assetSlice,
  deleteGalleryObjectsAsync,
  gallerySlice,
  genSlice,
  getGalleryListAsync,
  getGalleryObjectsAsync,
  getGameAsync,
  getRoomAsync,
  moveGalleryObjectsAsync,
  navSlice,
  roomSlice,
  sceneSlice,
  selectActiveRoom,
  selectGalleryEditor,
  selectGalleryList,
  selectGalleryMoveTarget,
  selectGalleryObjects,
  selectGalleryScratch,
  selectGallerySelection,
  selectRoomState,
  selectToken,
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
import { toast } from 'react-toastify';
import { MinioBucketType } from '@/lib/util/assetTypes';

let lastVersion = 0;

function GalleryEditor(props: any){
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const scratch = useSelector(selectGalleryScratch);
  const editor = useSelector(selectGalleryEditor);
  const token = useSelector(selectToken);

  const endEdit = () => {
    dispatch(gallerySlice.actions.setScratch(null));
    dispatch(gallerySlice.actions.setEditor(false));
  }

  const leoUpload = async () => {
    if(!uploading){
      setUploading(true);
      try{
          let headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer: ${token}`
          };
          let res = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/generate/upload`, scratch, {headers: headers});
          dispatch(gallerySlice.actions.updateLocalItem(res.data));
      } catch (e){
          console.log('prep4ai', e);
      }
      setUploading(false);
    }
  }

  const sendToControlnet = async () => {
    console.log('scratch', scratch);
    dispatch(genSlice.actions.pushControlnet(scratch));
  }

  if(editor){
    return(
    <div className={styles.galleryeditor}>
      <div>{scratch.name}</div>
      <div><KVEditor orig={scratch.tags} gallery={scratch.gallery} name={scratch.name}/></div>
      <div className={styles.editbutton} onClick={()=>endEdit()}>X</div>
      <button onClick={()=>leoUpload()}>PREP4AI</button>
      <button onClick={()=>sendToControlnet()}>CONTROLNET</button>

    </div>
    );
  } else {
    return(<></>);
  }
}

function GalleryCard(props:any){
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageDimensions, setImageDimensions]: any = useState({height: 512, width: 512, displayHeight: 512, displayWidth: 512});
  const galleryObjects = useSelector(selectGalleryObjects);
  const gallerySelection = useSelector(selectGallerySelection);
  const data = props.data;
  const selected = gallerySelection.map((el: any)=> el.name).includes(data.name);
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const calculateAspectRatioFit = (srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) => {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { displayWidth: srcWidth*ratio, displayHeight: srcHeight*ratio };
 }

  const loadImage = () => {
    setLoading(true);
    const img = new Image();
    console.log(data.url);
    img.src = data.url;
  
    img.onload = () => {
      let aspect = calculateAspectRatioFit(img.width, img.height, 512, 512);
      console.log('aspect', aspect);
      setImageDimensions({
        height: img.height,
        width: img.width,
        displayHeight: aspect.displayHeight || 512,
        displayWidth: aspect.displayWidth || 512
      });
      setLoading(false);
    };
    img.onerror = (err) => {
      console.log("img error");
      console.error(err);
    };
  };

  useEffect(() => {
    if(data.url){
        loadImage();
    }
  }, [data.url]);

  const loadedObjCount = galleryObjects.length;

  useEffect(()=>{
    if(inView && loadedObjCount == (props.idx + 1) && loadedObjCount >= 9){
      dispatch(getGalleryObjectsAsync({gallery: data.gallery, limit: 10, last: data.lastModified, more: true}));
    }
  }, [inView]);

  const startEdit = () => {
    dispatch(gallerySlice.actions.setScratch(data));
    dispatch(gallerySlice.actions.setEditor(true));
  }

  const getLink = () => {
    if(navigator.clipboard){
      navigator.clipboard.writeText(data.url);
      toast(`Link ${data.url} Copied to Clipboard`);
    } else {
      toast(`${data.url}`);
    }
  }


  return(
  <div className={`${styles.gallerycard} ${selected ? styles.border : ''}`} style={{width: imageDimensions.displayWidth, height: imageDimensions.displayHeight}} key={props.idx} ref={ref}>
    <div className={styles.gallerycardname} style={{width: imageDimensions.displayWidth}}>{data.name}</div>
    <img src={data.urlThumb} style={{width: imageDimensions.displayWidth, height: imageDimensions.displayHeight}}/>
    <div className={styles.editbutton} onClick={()=>startEdit()}>EDIT</div>
    <div className={styles.linkbutton} onClick={()=>getLink()}>LINK</div>
    <div className={`${styles.selectbutton} ${selected ? styles.opaque : styles.transparent}`} onClick={()=>dispatch(gallerySlice.actions.toggleSelected(data))}>SELECT</div>
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
    const moveTarget = useSelector(selectGalleryMoveTarget);
    const galleryObjects = useSelector(selectGalleryObjects);
    const gallerySelection = useSelector(selectGallerySelection);
    const galleryList = useSelector(selectGalleryList);

    const gallery = params && params.slug ? params.slug : 'default';

    useEffect(()=>{
      dispatch(getGalleryListAsync(null));
    }, []);

    useEffect(()=>{
      if(params && params.slug){
        dispatch(getGalleryObjectsAsync({gallery: gallery, more: false}));
      }
    }, []);
  
    if(true){
      return (
        <div className={stylespage.root}>
          <div className={styles.galleryheader}>
            <span>THE GALLERY</span>
            <span>{`Selected: ${gallerySelection.length}`}</span>
            <button onClick={()=>dispatch(deleteGalleryObjectsAsync(gallerySelection))}>DELETE SELECTION</button>
            <select value={moveTarget} onChange={(e)=>dispatch(gallerySlice.actions.setMoveTarget(e.target.value))}>
              {
                galleryList.map((el: MinioBucketType, idx: number)=> {
                  return(
                    <option value={el.name}>{el.name}</option>
                  )
                })
              }
          </select>
            <button onClick={()=>dispatch(moveGalleryObjectsAsync({objects: gallerySelection, bucket: moveTarget}))}>MOVE SELECTION</button>
          </div>
          <div className={styles.gallerycardwrapper}>
            {galleryObjects.map((el: any,idx: number)=>{
              return(<GalleryCard key={idx} idx={idx} data={el}/>)
            })}
          </div>
          <GalleryEditor />
        </div>
      )

    } else {
      return <Loading />;
    }
  }