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
  modalSlice,
  navSlice,
  roomSlice,
  selectDark,
  selectGame,
  selectIsSuperuser,
  selectNavOpen,
  selectRoomState,
  selectTrayOpen,
  selectTrayPage,
  selectTrayVisible,
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
import styles from '../../styles/tray.module.css';
import stylesbutton from '../../styles/button.module.css';
import AssetEditor from '../AssetEditor/AssetEditor';
import ActionPanel from '../ActionPanel/ActionPanel';
import AssetView from '../AssetViewer/AssetView';
import { RuleTree } from '../Rules/RuleTree';
import dynamic from 'next/dynamic';
import { EditUser } from '../AdminUserPanel/AdminUserPanel';



const AssetViewWithNoSSR = dynamic(
  () => import('../AssetViewer/AssetView'),
  { ssr: false }
)

export default function Tray(props: any) {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectTrayOpen);
    const visible = useSelector(selectTrayVisible);
    const router = useRouter();
    const [isDesktop, setIsDesktop] = useState(false);
    const username = useSelector(selectUsername);
    const gameState = useSelector(selectGame);
    const roomState = useSelector(selectRoomState);
    const isSuperuser = useSelector(selectIsSuperuser);
    const page = useSelector(selectTrayPage);
    

    const setTrayState = (value: boolean) => {
        dispatch(navSlice.actions.setTrayState(value));
    }

    if(visible){
        return (
            <nav className={`${styles.tray} ${isOpen ? '': styles.close}`}>
                <div className={`${styles.control}`} onClick={()=>setTrayState(!isOpen)}>
                    <div className={`${stylesbutton.button} ${stylesbutton.fill}`}>{isOpen ? 'CLOSE': 'OPEN'}</div>
                </div>
                <div className={`${styles.body}`}>
                  
                  {
                      (page == 'work') ? <AssetEditor/> : null 
                  }
                  {
                      (page == 'action') ? <ActionPanel/> : null 
                  }
                  {
                      (page == 'assetview') ? <AssetViewWithNoSSR/> : null 
                  }
                  {
                      (page == 'ruletree') ? <RuleTree/> : null 
                  }
                  {
                      (page == 'edituser') ? <EditUser/> : null 
                  }
                </div>
                
            </nav>
        )
    } else {
        return null;
    }

}
