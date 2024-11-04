'use client'

/* Core */
import { useEffect, useState } from 'react';
import corestyles from '../../styles/layout.module.css';
import styles from './storedactionpanel.module.css';

/* Instruments */
import {
  chatSlice,
  selectChatStored,
  selectChatStoredMode,
  useDispatch,
  useSelector
} from '@/lib/redux';


export default function StoredActionPanel(){
    const dispatch = useDispatch();
    const storedAction = useSelector(selectChatStored);
    const storedActionMode: any = useSelector(selectChatStoredMode);


    if(storedAction){
        return (
          <div>
            <button style={{filter: storedActionMode == 0.5 ? "invert(1)" : "invert(0)"}} onClick={()=>dispatch(chatSlice.actions.setStoredMode(0.5))}>0.5</button>
            <button style={{filter: storedActionMode == 1.0 ? "invert(1)" : "invert(0)"}} onClick={()=>dispatch(chatSlice.actions.setStoredMode(1.0))}>1.0</button>
            <button style={{filter: storedActionMode == 1.5 ? "invert(1)" : "invert(0)"}} onClick={()=>dispatch(chatSlice.actions.setStoredMode(1.5))}>1.5</button>
            <button style={{filter: storedActionMode == 2.0 ? "invert(1)" : "invert(0)"}} onClick={()=>dispatch(chatSlice.actions.setStoredMode(2.0))}>2.0</button>
            <button onClick={()=>dispatch(chatSlice.actions.setStoredMode(null))}>X</button>
            {storedAction.payload}
            {storedAction.type}
          </div>
        )
    } else {
        return null;
    }
  }