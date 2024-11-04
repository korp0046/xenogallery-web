'use client'

/* Core */
import { useEffect, useState } from 'react';
import corestyles from '../../styles/layout.module.css';

/* Instruments */
import {
  assetSlice,
  getRoomsAsync,
  navSlice,
  roomSlice,
  selectActiveRoom,
  selectRooms,
  selectUsername,
  useDispatch,
  useSelector
} from '@/lib/redux'
import styles from './rooms.module.css'
import AssetTileRoom from '../AssetTile/AssetTileRoom';
import AssetTable from '../AssetTable/AssetTable';
import { useRouter } from 'next/navigation';


export default function Rooms(){
    const router = useRouter();
    const dispatch = useDispatch();
    const rooms = useSelector(selectRooms);
    const activeRoom = useSelector(selectActiveRoom);
    const username = useSelector(selectUsername);

    useEffect(()=>{
      if(username){
        dispatch(getRoomsAsync(null));
      }
    }, [username]);
  
    return (
      <div className={styles.main}>
            <button>CREATE NEW ROOM</button>
            <AssetTable docs={[...rooms]} type='room' />
      </div>
    )
  }