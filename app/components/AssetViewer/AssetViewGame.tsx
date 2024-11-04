'use client'

/* Core */
import styles from './assetview.module.css';
import { useEffect, useState } from 'react';
import stylesbutton from '../../styles/button.module.css';
import {
    assetSlice,
    getGameAsync,
    navSlice,
    selectAssetView,
    selectIsSuperuser,
    selectModeSelect,
    selectToken,
    useDispatch,
    useSelector
  } from '@/lib/redux';
import { md2html } from '@/lib/util/util';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { EditorGroupDiv } from '../Editors';
import SimpleTags from '../SimpleLabel/SimpleTags';

export default function AssetViewGame(props: any){
  const router = useRouter();
  const dispatch = useDispatch();
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
                const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/games/${String(assetView._id)}`, { headers: headers });
                setDetail(res.data);
            } catch (e) {
                console.error(e);
            }
        }
      })();

}, [assetView]);

  const goToGame = () => {
    router.push(`/game/${assetView._id}`)
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
                  <EditorGroupDiv label="Gamemasters">
                      {
                          detail && detail.system && detail.system.gms ?
                          <SimpleTags data={detail.system.gms.map((el:any)=>el.username).join(',')} />
                          : null
                      }
                      </EditorGroupDiv>
                </div>
            </div>
            <div className={styles.controls}>
                    <button className={stylesbutton.button} onClick={()=>goToGame()}>ENTER</button>
                </div>
        </div>
    );
}
