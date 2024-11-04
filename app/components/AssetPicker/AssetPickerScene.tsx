'use client'

/* Core */
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import _ from 'lodash';

/* Instruments */
import {
    assetSlice,
    selectActiveGame,
    selectDataLite,
    selectToken,
    useDispatch
} from '@/lib/redux';
import styles from './assetpicker.module.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loading from '../Loading/Loading';
import AssetTable from '../AssetTable/AssetTable';

function AssetScenePickerTabs(props: any){
    const dispatch = useDispatch();
    return(
        <div className={`${styles.flex}`}>
            <div onClick={()=>props.setTab('live')}>Live</div>
            <div onClick={()=>props.setTab('basic')}>Basic</div>
            <div onClick={()=>props.setTab('battle')}>Battle</div>
            <div onClick={()=>props.setTab('explore')}>Explore</div>
        </div>
    )
}

export default function AssetScenePicker(props: any){
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState('live');
    const [dataBasic, setDataBasic] = useState([]);
    const [dataBattle, setDataBattle] = useState([]);
    const [dataExplore, setDataExplore] = useState([]);
    const [dataLive, setDataLive] = useState([]);
    const activeGame = useSelector(selectActiveGame);

    useEffect(()=> {
        dispatch(assetSlice.actions.setModeSelect(true));
        (async function() {
            try {
                setLoading(true);
                let headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${token}`
                };
                const resExplore = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/exploremaps`, { headers: headers });
                const resBattle = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/battlemaps`, { headers: headers });
                const resBasic = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/basicscenes`, { headers: headers });
                const resLive = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/livescenes/${activeGame}`, { headers: headers });
                setDataBattle(resBattle.data.data);
                setDataExplore(resExplore.data.data);
                setDataBasic(resBasic.data.data);
                setDataLive(resLive.data.data);
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
          })();

    }, []);

    useLayoutEffect(() => {
        dispatch(assetSlice.actions.setModeSelect(false));
    }, [])

    const chosenData = () => {
        if(tab == 'live'){
            return dataLive;
        } else if (tab == 'battle'){
            return dataBattle;
        } else if (tab == 'basic'){
            return dataBasic;
        } else if (tab == 'explore'){
            return dataExplore;
        } else {
            return [];
        }
    }

    if(loading){
        return (
            <>
                <div>
                    <AssetScenePickerTabs setTab={setTab} tab={tab}/>
                </div>
                <Loading />
            </>
        )
    } else {
        return(
            <div>
                <AssetScenePickerTabs setTab={setTab} tab={tab}/>
                <AssetTable modal={true} docs={chosenData()} />
            </div>
        );
    }
}
