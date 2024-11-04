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
  loginAsync,
  modalSlice,
  navSlice,
  registerAsync,
  roomSlice,
  selectDark,
  selectGame,
  selectIsSuperuser,
  selectNavTabOpen,
  selectPowers,
  selectRoomState,
  selectTrayOpen,
  selectUsername,
  useDispatch,
  useSelector,
  userSlice
} from '@/lib/redux';

/* Instruments */
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SimpleIconButton from '../SimpleLabel/SimpleIconButton';
import { itemIcons, sheetIcons, uiIcons } from '@/lib/gamedata/imgAssets';
import SimpleIconButtonXL from '../SimpleLabel/SimpleIconButtonXL';
import styles from '../../styles/topnav.module.css';
import stylesbutton from '../../styles/button.module.css';

export default function TopNav(props: any) {
    const dispatch = useDispatch();
    const tabOpen = useSelector(selectNavTabOpen);
    const router = useRouter();
    const [isDesktop, setIsDesktop] = useState(false);
    const username = useSelector(selectUsername);
    const gameState = useSelector(selectGame);
    const roomState = useSelector(selectRoomState);
    const isSuperuser = useSelector(selectIsSuperuser);
    const [newUsername, setNewUsername] = useState('');
    const [pw, setPw] = useState('');

    const setNavTabOpen = (value: string | null) => {
        if(tabOpen == value){
            dispatch(navSlice.actions.setNavTabOpen(null));
        } else {
            dispatch(navSlice.actions.setNavTabOpen(value));
        }
    }

    const gotoRoute = (value: string) => {
        router.push(value);
        setNavTabOpen(null);
    }

    const openModal = (value: string) => {
        gotoRoute('/');
        dispatch(navSlice.actions.setInnerNavState(false));
        dispatch(navSlice.actions.setNavState(false));
        dispatch(modalSlice.actions.openModal(value));
        dispatch(assetSlice.actions.setModeSelect(false));
      }
    
      const logout = () => {
        gotoRoute('/');
        dispatch(userSlice.actions.logout(null)); 
        dispatch(navSlice.actions.setNavState(false));
        dispatch(navSlice.actions.setPage('main'));
        dispatch(modalSlice.actions.closeModal(null));
        dispatch(roomSlice.actions.setLeaveRoom(null));
        dispatch(gameSlice.actions.leaveGame(null));
        setNavTabOpen(null);
        toast('Logout Success');
      }
    
      const leaveRoom = () => {
        dispatch(gameSlice.actions.leaveGame(null));
        dispatch(roomSlice.actions.setLeaveRoom(null));
        dispatch(navSlice.actions.setPage('main'));
        setNavTabOpen(null);
      }
    
      const leaveGame = () => {
        dispatch(gameSlice.actions.leaveGame(null));
        dispatch(navSlice.actions.setPage('room'));
        setNavTabOpen(null);
      }

      useEffect(()=>{
        let potentialToken = localStorage.getItem("ertoken");
        if(potentialToken && potentialToken.length > 100){
          dispatch(userSlice.actions.setToken(potentialToken));
        }
      },[]);

      useEffect(()=>{
        if(username){
            setNavTabOpen(null);
        }
      },[username]);

    return (
        <nav className={`${styles.topnav}`}>
            <div className={`${styles.topnav} ${styles.flex}`}>
                <div className={`${stylesbutton.button} ${tabOpen == null ? styles.opentab : ''}`} onClick={()=>{gotoRoute('/'); setNavTabOpen(null);}}>HOME</div>
                { username ? <div className={`${stylesbutton.button} ${tabOpen == 'rooms' ? styles.opentab : ''}`} onClick={()=>gotoRoute('/rooms')}>ROOMS</div> : null }
                <div className={`${stylesbutton.button} ${tabOpen == 'gallery' ? styles.opentab : ''}`} onClick={()=>setNavTabOpen('gallery')}>GALLERY</div>
                <div className={`${stylesbutton.button} ${tabOpen == 'assets' ? styles.opentab : ''}`} onClick={()=>setNavTabOpen('assets')}>ASSETS</div>
                <div className={`${stylesbutton.button} ${tabOpen == 'rules' ? styles.opentab : ''}`} onClick={()=>setNavTabOpen('rules')}>RULES</div>
                <div className={`${stylesbutton.button} ${tabOpen == 'about' ? styles.opentab : ''}`} onClick={()=>setNavTabOpen('about')}>ABOUT</div>
                { username ? <div className={`${stylesbutton.button} ${tabOpen == 'user' ? styles.opentab : ''}`} onClick={()=>setNavTabOpen('user')}>USER</div> : <div onClick={()=>setNavTabOpen('login')}>LOGIN</div> }
                { isSuperuser ? <div className={`${stylesbutton.button} ${tabOpen == 'admin' ? styles.opentab : ''}`} onClick={()=>setNavTabOpen('admin')}>ADMIN</div> : null }
            </div>
            <div className={`${styles.body}`}>
                {
                    tabOpen == 'user' ? 
                    <div className={`${styles.flex} ${styles.dropwrapper}`}>
                        <SimpleIconButton text={`Logout: ${username}`} img={sheetIcons.user} action={()=>logout()}/>
                        { roomState ? <SimpleIconButton text={`Leave Room: ${roomState.name}`} action={()=>leaveRoom()} img={sheetIcons.exit}/> : null }
                        { gameState ? <SimpleIconButton text={`Leave Game: ${gameState.name}`} action={()=>leaveGame()} img={sheetIcons.exit}/> : null }
                        { false ? <DarkModeToggle /> : null }
                    </div>
                    : null
                }
                {
                    tabOpen == 'login' ? 
                    <div className={`${styles.flex} ${styles.dropwrapper}`}>
                        <input type='text' onChange={(e: any)=>setNewUsername(e.target.value)} placeholder='Username'></input>
                        <input type='password' onChange={(e: any)=>setPw(e.target.value)} placeholder='Password'></input>
                        <button className={`${stylesbutton.button}`} onClick={()=>dispatch(loginAsync({username: newUsername, password: pw}))}>LOGIN</button>
                        <button className={`${stylesbutton.button}`} onClick={()=>dispatch(registerAsync({username: newUsername, password: pw}))}>REGISTER</button>
                    </div>
                    : null
                }

                {
                    tabOpen == 'assets' ? 
                    <div className={`${styles.flex} ${styles.dropwrapper}`}>
                        <SimpleIconButtonXL text={`Roleplay`} img={uiIcons.basicscene} action={()=>gotoRoute('/assets/basicscenes')}/>
                        <SimpleIconButtonXL text={`Battle`} img={uiIcons.battlemap} action={()=>gotoRoute('/assets/battlemaps')}/>
                        <SimpleIconButtonXL text={`Exploration`} img={uiIcons.nodemap} action={()=>gotoRoute('/assets/exploremaps')}/>
                        <SimpleIconButtonXL text={`Pregens`} img={uiIcons.hero} action={()=>gotoRoute('/assets/characters')}/>
                        <SimpleIconButtonXL text={`Opponents`} img={uiIcons.opponent} action={()=>gotoRoute('/assets/opponents')}/>
                        <SimpleIconButtonXL text={`Personas`} img={uiIcons.persona} action={()=>gotoRoute('/assets/personas')}/>
                        <SimpleIconButtonXL text={`Equipment`} img={uiIcons.artifact} action={()=>gotoRoute('/assets/items')}/>
                        <SimpleIconButtonXL text={`Powers`} img={uiIcons.power} action={()=>gotoRoute('/assets/powers')}/>
                        <SimpleIconButtonXL text={`Events`} img={uiIcons.event} action={()=>gotoRoute('/assets/events')}/>
                        <SimpleIconButtonXL text={`Quests`} img={uiIcons.quest} action={()=>gotoRoute('/assets/quests')}/>
                    </div>
                    : null
                }
                {
                    tabOpen == 'rules' ? 
                    <div className={`${styles.flex} ${styles.dropwrapper}`}>
                        <SimpleIconButtonXL text={`Players Handbook`} action={()=>gotoRoute('/rules/players')}/>
                        <SimpleIconButtonXL text={`Gamemastery Guide`} action={()=>gotoRoute('/rules/gamemastery')}/>
                        <SimpleIconButtonXL text={`Memori Campaign Setting`} action={()=>gotoRoute('/rules/memori')}/>
                        <SimpleIconButtonXL text={`All Books`} action={()=>gotoRoute('/rule/65a83705d962b32d395228ee')}/>
                    </div>
                    : null
                }
                {
                    tabOpen == 'about' ? 
                    <div className={`${styles.flex} ${styles.dropwrapper}`}>
                        <SimpleIconButtonXL text={`Licenses`} img={uiIcons.licenses} action={()=>gotoRoute('/licenses')}/>
                    </div>
                    : null
                }
                {
                    tabOpen == 'gallery' ? 
                    <div className={`${styles.flex} ${styles.dropwrapper}`}>
                        <SimpleIconButtonXL text={`Gallery`} img={uiIcons.licenses} action={()=>gotoRoute('/gallery')}/>
                    </div>
                    : null
                }
                {
                    tabOpen == 'admin' ? 
                    <div className={`${styles.flex} ${styles.dropwrapper}`}>
                            <SimpleIconButtonXL text={`Gamedocs`} img={uiIcons.rules} action={()=>gotoRoute('/admin/gamedocs')}/>
                            <SimpleIconButtonXL text={`Users`} img={uiIcons.users} action={()=>gotoRoute('/admin/users')}/>
                            <SimpleIconButtonXL text={`Images`} img={uiIcons.image} action={()=>openModal('images')}/>
                        
                            {/*

                            <SimpleIconButtonXL text={`Roleplay`} img={uiIcons.basicscene} action={()=>openModal('basicscenes')}/>
                            <SimpleIconButtonXL text={`Battle`} img={uiIcons.battlemap} action={()=>openModal('battlemaps')}/>
                            <SimpleIconButtonXL text={`Exploration`} img={uiIcons.nodemap} action={()=>openModal('exploremaps')}/>
                            <SimpleIconButtonXL text={`Pregens`} img={uiIcons.hero} action={()=>openModal('characters')}/>
                            <SimpleIconButtonXL text={`Opponents`} img={uiIcons.opponent} action={()=>openModal('opponents')}/>
                            <SimpleIconButtonXL text={`Personas`} img={uiIcons.persona} action={()=>openModal('personas')}/>
                            <SimpleIconButtonXL text={`Equipment`} img={uiIcons.artifact} action={()=>openModal('items')}/>
                            <SimpleIconButtonXL text={`Powers`} img={uiIcons.power} action={()=>openModal('powers')}/>
                            <SimpleIconButtonXL text={`Events`} img={uiIcons.event} action={()=>openModal('events')}/>
                */}
                    </div>
                    : null
                }
            </div>
            
        </nav>
    )
}
