'use client'

/* Core */
import { useEffect, useState } from 'react';

/* Instruments */
import {
  ViewBox,
  assetSlice,
  getGameAsync,
  getRoomAsync,
  loginAsync,
  navSlice,
  registerAsync,
  roomSlice,
  sceneSlice,
  selectActiveRoom,
  selectRoomState,
  selectUsername,
  selectViewBox,
  useDispatch,
  useSelector
} from '@/lib/redux';
import styles from './login.module.css';
import stylesbutton from '../../styles/button.module.css';
import stylespage from '../../styles/page.module.css';
import { useRouter } from 'next/navigation';
//import Chat from '../Chat/Chat';

export default function Login(props: any){
    const dispatch = useDispatch();
    const router = useRouter();
    const username = useSelector(selectUsername);
    const [newUsername, setNewUsername] = useState('');
    const [pw, setPw] = useState('');

    useEffect(()=>{
        if(username != null && username == newUsername){
            router.push(`/`);
        }
      }, [username]);
  
      return (
        <div className={stylespage.root}>
            <div className={`${styles.outer}`}>
                <div className={`${styles.inner}`}>
                    <div>
                        <input type='text' onChange={(e: any)=>setNewUsername(e.target.value)} placeholder='Username'></input>
                        <input type='password' onChange={(e: any)=>setPw(e.target.value)} placeholder='Password'></input>
                    </div>
                    <div>
                        <button className={`${stylesbutton.button}`} onClick={()=>dispatch(loginAsync({username: newUsername, password: pw}))}>LOGIN</button>
                        <button className={`${stylesbutton.button}`} onClick={()=>dispatch(registerAsync({username: newUsername, password: pw}))}>REGISTER</button>
                    </div>
                </div>
            </div>
        </div>
      )

  }