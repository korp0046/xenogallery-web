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
  useSelector,
  updateObjectTagsAsync
} from '@/lib/redux';
import styles from './kveditor.module.css';
import stylespage from '../../styles/page.module.css';
import { EditorGroupDiv } from '../Editors';
import Loading from '../Loading/Loading';
import debounce from 'debounce';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
//import Chat from '../Chat/Chat';

let lastVersion = 0;

export default function KVEditor(props: any){
    const dispatch = useDispatch();
    const gallery = props.gallery;
    const name = props.name;
    let [data, setData] = useState(props.orig);
    let [dirty, setDirty] = useState(false);
    let edit = props.edit;
    // [{"Key":"testkey","Value":"testvalue"}]

    const addNewKey = () => {
        let found = data.find((el:any)=> el.Key == "newkey");
        if(!found){
            let temp = _.cloneDeep(data);
            temp.push({"Key": "newkey", "Value": "newvalue"});
            setData(temp);
            setDirty(true);
        }
    }

    const removeKey = (key: string) => {
        let temp = _.cloneDeep(data);
        let filtered = temp.filter((el:any)=> el.Key != key);
        setData(filtered);
        setDirty(true);
    }

    const updateKey = (e: any, idx: number) => {
        let temp = _.cloneDeep(data);
        let updatedItem = e.target.value;
        temp[idx]['Key'] = updatedItem;
        console.log(temp);
        setData(temp);
        setDirty(true);
    }

    const updateValue = (e: any, idx: number) => {
        let temp = _.cloneDeep(data);
        let updatedItem = e.target.value;
        temp[idx]['Value'] = updatedItem;
        console.log(temp);
        setData(temp);
        setDirty(true);
    }

    const save = () => {
        let temp: any = {};
        for(let item of data){
            temp[item.Key] = item.Value;
        }
        console.log(temp);

        dispatch(updateObjectTagsAsync({gallery: gallery, object: name, tags: temp}));
        setDirty(false);
    }

    return (
        <div className={stylespage.root}>
            {
                data.map((el: any, idx: any)=> {
                    return(<div key={idx}><input value={el.Key} onChange={(e)=>{updateKey(e, idx)}} /> <input value={el.Value} onChange={(e)=>{updateValue(e, idx)}} /><button onClick={()=>removeKey(el.Key)}>X</button></div>);
                })
            }
            <button onClick={()=>addNewKey()}>New Key</button><>{dirty ? <button onClick={()=>save()}>SAVE</button>: null}</>
        </div>
      )
  }