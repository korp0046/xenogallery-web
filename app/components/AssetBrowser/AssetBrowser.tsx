'use client'

/* Core */
import useWindowSize from '@/app/hooks/useWindowSize';
import { useEffect, useRef, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import _ from 'lodash';

/* Instruments */
import {
    getAssetAsync,
    selectActiveCollection,
    selectAssetQueryStatus,
    selectBasicscenes,
    selectBattlemaps,
    selectCharacters,
    selectEvents,
    selectExploremaps,
    selectImages,
    selectItems,
    selectModeSelect,
    selectOpponents,
    selectPersonas,
    selectPowers,
    selectQueryCount,
    selectQueryFindKey,
    selectQueryHistory,
    selectQueryLimit,
    selectQueryStart,
    useDispatch,
    useSelector
} from '@/lib/redux';
import AssetTile from '../AssetTile/AssetTile';
import styles from './assetbrowser.module.css';
import Loading from '../Loading/Loading';
import AssetBrowserSearch from './AssetBrowserSearch';

export default function AssetBrowser(props: any){
    const scrollRef: any = useRef();
    const dispatch = useDispatch();
    const size = useWindowSize();
    const [width, setWidth] = useState(1024);
    const [breakpoints, setBreakpoints] = useState({350: 1, 700:2});
    const assetQueryStatus = useSelector(selectAssetQueryStatus);
    const battlemaps = useSelector(selectBattlemaps);
    const characters = useSelector(selectCharacters);
    const items = useSelector(selectItems);
    const exploremaps = useSelector(selectExploremaps);
    const basicscenes = useSelector(selectBasicscenes);
    const powers = useSelector(selectPowers);
    const events = useSelector(selectEvents);
    const images = useSelector(selectImages);
    const personas = useSelector(selectPersonas);
    const opponents = useSelector(selectOpponents);
    const queryCount = useSelector(selectQueryCount);
    const queryLimit = useSelector(selectQueryLimit);
    const queryStart = useSelector(selectQueryStart);
    const activeCollection = useSelector(selectActiveCollection);
    const queryHistory = useSelector(selectQueryHistory);
    const selectMode = useSelector(selectModeSelect);
    const queryFindKey: any = useSelector(selectQueryFindKey);

    const assets = {
        battlemaps: battlemaps,
        basicscenes: basicscenes,
        characters: characters,
        items: items,
        exploremaps: exploremaps,
        powers: powers,
        personas: personas,
        opponents: opponents,
        events: events,
        images: images
    }

    const setPage = (x: number) => {
        if(assetQueryStatus == 'idle'){
            let nextVal = Math.min(Math.max(queryHistory[props.collection].queryStart + x, 0), Math.max(0, queryHistory[props.collection].queryCount - 20));
            dispatch(getAssetAsync({collection: props.collection, queryStart: nextVal, queryLimit: queryHistory[props.collection].queryLimit, queryFindKey: queryFindKey, queryFind: queryHistory[props.collection].queryFind, querySort: queryHistory[props.collection].querySort, querySortKey: queryHistory[props.collection].querySortKey, tagsInclude: queryHistory[props.collection].tagsInclude, tagsExclude: queryHistory[props.collection].tagsExclude, flagsInclude: queryHistory[props.collection].flagsInclude, flagsExclude: queryHistory[props.collection].flagsExclude, public: queryHistory[props.collection].public, queryType: queryHistory[props.collection].queryType, queryElement: queryHistory[props.collection].queryElement}));
        }
    }

    useEffect(()=>{
        if(props.collection != activeCollection){
            dispatch(getAssetAsync({collection: props.collection, queryStart: queryHistory[props.collection].queryStart, queryLimit: queryHistory[props.collection].queryLimit, queryFind: queryHistory[props.collection].queryFind, queryFindKey: queryFindKey, querySort: queryHistory[props.collection].querySort, querySortKey: queryHistory[props.collection].querySortKey, tagsInclude: queryHistory[props.collection].tagsInclude, tagsExclude: queryHistory[props.collection].tagsExclude, flagsInclude: queryHistory[props.collection].flagsInclude, flagsExclude: queryHistory[props.collection].flagsExclude, public: queryHistory[props.collection].public, queryType: queryHistory[props.collection].queryType, queryElement: queryHistory[props.collection].queryElement}));
        }
      }, [activeCollection]);

    const tileMasonryMinWidth: any = {
        battlemaps: Math.min(420, size.width - 20),
        characters: Math.min(420, size.width - 20),
        items: Math.min(420, size.width - 20),
        maps: Math.min(420, size.width - 20),
        powers: Math.min(420, size.width - 20),
        personas: Math.min(420, size.width - 20),
        opponents: Math.min(420, size.width - 20),
        images: Math.min(420, size.width - 20),
        basicscenes: Math.min(420, size.width - 20)
    }

    useEffect(() => {
        const minWidth = tileMasonryMinWidth[props.collection];
        const landscape = size.width >= 1024 &&  size.height < size.width;
        let itemWidth: any = minWidth;
        setWidth(itemWidth);
        const breakpoints: any = {};
        for(let x = 0; x<(size.width/minWidth); x++){
            breakpoints[String(itemWidth * x)] = x;
        }
        setBreakpoints(breakpoints);
    }, [size]);

    const masonry = ['powers', 'items', 'images'].includes(props.collection);

    return(
        <div className={styles.main} ref={scrollRef}>
            <div>
                <div>

                </div>
                <AssetBrowserSearch collection={props.collection}/>
                <div className={styles.queryresults}></div>
            </div>
                {
                    assetQueryStatus != 'idle' ? <Loading /> : null
                }
                <div>
                    {
                    assets[props.collection as keyof typeof assets].map((el:any,idx:any)=>{
                        return(
                            <AssetTile key={idx} data={el} size={size} collection={props.collection} clone={true} edit={true}/>
                        )
                    })
                    }
                </div>
                <div><button disabled={assetQueryStatus != 'idle'} onClick={()=>{setPage(-20); scrollRef.current.scrollTo(0,0);}}>{assetQueryStatus == 'idle' ? '<<<' : 'BUSY'}</button><span>{queryStart}/{queryStart+queryLimit} ({queryCount})</span><button disabled={assetQueryStatus != 'idle'} onClick={()=>{setPage(20); scrollRef.current.scrollTo(0,0);}}>{assetQueryStatus == 'idle' ? '>>>' : 'BUSY'}</button></div>
        </div>
    );
}
