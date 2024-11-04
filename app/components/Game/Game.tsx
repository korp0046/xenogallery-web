'use client'

/* Core */
import { useEffect, useState } from 'react';

/* Instruments */
import {
  ViewBox,
  doGetGame,
  gameSlice,
  getGameAsync,
  getLiveActorAsync,
  getLiveSceneAsync,
  sceneSlice,
  selectActiveScene,
  selectAutoSave,
  //selectActiveGame,
  selectGame,
  selectLastSave,
  selectUsername,
  selectViewBox,
  useDispatch,
  useSelector
} from '@/lib/redux';
import Scene from '../Scenes/Scene';
import styles from './game.module.css';
import Loading from '../Loading/Loading';
import { useRouter } from 'next/navigation';

import { saveGame } from '@/lib/util/util';

let initHW = false;

let saveMillis = 10000;

export default function Game(props: any){
    const gameId = props.slug;
    const dispatch = useDispatch();
    const game = useSelector(selectGame);
    const username = useSelector(selectUsername);
    const router = useRouter();
    const viewBox = useSelector(selectViewBox);
    const autoSave = useSelector(selectAutoSave);
    const lastSave = useSelector(selectLastSave);
    const setViewBox = (vb: ViewBox)=>dispatch(sceneSlice.actions.updateViewBox(vb));

    useEffect(()=>{
      const doAutoSave = () => {
        if(autoSave && (lastSave + saveMillis) < Date.now()){
          saveGame();
        }
      }

      const i = setInterval(doAutoSave, saveMillis);
      return () => clearInterval(i);
    });

    useEffect(()=>{
      if(initHW == false && viewBox.h == 1024 || viewBox.w == 1024){
        let newHW = {w: window.innerWidth, h: window.innerHeight};
        let newVB = {...viewBox, ...newHW};
        setViewBox(newVB);
        initHW == true;
      }
    }, []);

    useEffect(()=>{
      if(username && (!game || (String(game._id) != gameId))){
          dispatch(getGameAsync(gameId));
          dispatch(getLiveActorAsync(gameId));
          dispatch(getLiveSceneAsync(gameId));
      }
    }, [game, username, gameId]);

    

    useEffect(()=>{
      if(username && gameId){
          console.log(gameId);
      }
    }, [username, gameId]);

    if(game){
      return (
        <Scene />
      )
    } else {
      return <Loading />;
    }
  }