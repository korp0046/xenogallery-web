'use client'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
/* Core */
import styles from './assetview.module.css';
import stylesbutton from '../../styles/button.module.css';
import { assetSlice, navSlice, roomSlice, selectAssetView, selectIsSuperuser, selectModeSelect, selectToken } from '@/lib/redux';
import { md2html } from '@/lib/util/util';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SimpleTags from '../SimpleLabel/SimpleTags';
import { EditorGroupDiv } from '../Editors';

export default function AssetViewRoom(props: any){
  const dispatch = useDispatch();
  const router = useRouter();
  const isSelectMode = useSelector(selectModeSelect);
  const assetView: any = useSelector(selectAssetView);
  const isSuperuser = useSelector(selectIsSuperuser);
  const token = useSelector(selectToken);
  const [detail, setDetail]: any = useState(null);

  useEffect(()=> {
    (async function() {
        if(assetView && assetView._id){
            try {
                let headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${token}`
                };
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/rooms/${String(assetView._id)}`, { headers: headers });
                setDetail(res.data);
            } catch (e) {
                console.error(e);
            }
        }
      })();

}, [assetView]);

  const goToRoom = () => {
    router.push(`/room/${assetView._id}`)
    dispatch(assetSlice.actions.setAssetView(null));
    dispatch(navSlice.actions.setTrayState(false));
  }

  const editRoom = () => {
    dispatch(assetSlice.actions.setAssetView(null));
    dispatch(navSlice.actions.setTrayState(false));
  }

    return(
        <div className={styles.tile}>
            <div className={styles.toprow}>
                <div className={styles.name}>{assetView.name}</div>
            </div>
            <div style={{display: 'flex'}}>
                <div className={styles.imgdiv}>
                    <img src="/branding/logo.svg" style={{width: '128px', maxWidth: '128px'}}/>
                </div>
                <div className={styles.gridrows}>
                <div className={styles.description} dangerouslySetInnerHTML={{__html: md2html(assetView.system.description)}} />

                    <EditorGroupDiv label="Members">
                    {
                        detail && detail.system && detail.system.users ?
                        <SimpleTags data={detail.system.users.map((el:any)=>el.username).join(',')} />
                        : null
                    }
                    </EditorGroupDiv>
                    <EditorGroupDiv label="Games">
                    {
                        detail && detail.system && detail.system.games ?
                        <SimpleTags data={detail.system.games.map((el:any)=>el.name).join(',')} />
                        : null
                    }
                    </EditorGroupDiv>
                </div>

            </div>
            <div className={styles.controls}>
                    <button className={stylesbutton.button} onClick={()=>goToRoom()}>ENTER</button>
            </div>
        </div>
    );
}
