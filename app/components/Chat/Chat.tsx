'use client'

/* Core */
import { useState } from 'react';

/* Instruments */
import {
  chatSlice,
  selectChat,
  selectChatStored,
  selectUsername,
  useDispatch,
  useSelector
} from '@/lib/redux';
import moment from 'moment';
import styles from './chat.module.css';
import { ReceiveChatPayload } from '@/lib/util/assetTypes';
import SimpleIconButtonXS from '../SimpleLabel/SimpleIconButtonXS';
import { uiIcons } from '@/lib/gamedata/imgAssets';

function ChatEntry(props: any) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const chatPayload: ReceiveChatPayload = props.data;
  
  const formatTimestamp = (unixTime: number) => {
    let millis: number = unixTime * 1000;
    if(moment().format("MMM Do YY") == moment(millis).format("MMM Do YY")){
      return moment(millis).format('LT');
    } else{
      return moment(millis).format('L');
    }
  }

  const processText = (inputText: string) => {
    let splitText = [inputText];
    if(chatPayload.payload.rolls.length > 0){
      let rollTextArr = chatPayload.payload.rolls.map((el:any)=>el.rollText);
      let tempRx = rollTextArr.join("|");
      let splitRx = new RegExp(tempRx);
      splitText = inputText.split(splitRx);
    }
    let lastj = 0;
    for(let i=0; i<chatPayload.payload.rolls.length; i++){
      let rollData = chatPayload.payload.rolls[i];
      for(let j=lastj; j<splitText.length; j++){
        if(splitText[j] == `(${rollData.notation})` || splitText[j] == `${rollData.notation}`){
          splitText.splice(j+1, 0, rollData.total);
          lastj = j+2;
          break;
        }
      }
    }

    let tempArr = splitText.filter((el: any)=> el);

    let finalArr = tempArr.map((el: any, idx: number)=>{
      if(typeof el == 'string'){
        return(
          <span key={idx}>{el}</span>
        )
      } else {
        return(
          <span key={idx}> <span className={styles.chatrolltotal} onContextMenu={(e: any)=>{
            dispatch(chatSlice.actions.setStored({type: "damage", payload: el}));
          }}>{el}</span></span> 
        )
      }

    });
    return finalArr;
  }

    const hasTitle = chatPayload.payload.title || false;
    const hasActor = chatPayload.payload.actorName || false;

    return(
      <div className={styles.chatitem}>
        <div className={styles.chatitemheader} onClick={(e: any)=>{
        if(e.button === 0){
          setOpen(!open);
        }
      }}>
          <div className={styles.chatitemheaderuser}>{chatPayload.username}</div>
          <div className={styles.chatitemheadertime}>{formatTimestamp(chatPayload.timestamp)}</div>
        </div>
        {
          hasTitle || hasActor ?
          <div className={styles.chatactionheader} onClick={(e: any)=>{
            if(e.button === 0){
              setOpen(!open);
            }
          }}>
            <div className={styles.chatitemheaderuser}>{chatPayload.payload.title}</div>
            <div className={styles.chatitemheadertime}>{chatPayload.payload.actorName}</div>
          </div>
          : null
        }
        <div className={styles.chatbody} onContextMenu={(e)=>e.preventDefault()}>
          <div>{processText(chatPayload.payload.text)}</div>
          {
            open ? 
            <div className={styles.rolls}>
            {
              chatPayload.payload.rolls.map((el: any, idx2: any)=>{
                return(
                  <div key={idx2}>{el.output}</div>
                );
              })
            }
            </div>
            : null
          }
        </div>
      </div>
    );
}

export default function Chat() {
  const dispatch = useDispatch();
  const chat = useSelector(selectChat);
  const username = useSelector(selectUsername);
  const [chatText, setChatText] = useState("");

  const chatAction = () => {
    if(chatText.length > 0) {
        console.log({text: chatText});
        setChatText("");
    }
  }

  let sortedChat = [...chat].sort((a: any, b: any)=> b.timestamp - a.timestamp);

  return (
    <div className={styles.main}>
      <div className={styles.chatdisplay}>
        {
            sortedChat.map((el: any, idx: number) => {
              return(<ChatEntry key={idx} data={el} />);
          })
        }
      </div>
      <div className={styles.chatinput}>
            <input type='text' value={chatText} onChange={(e)=> {setChatText(e.target.value)}}/><SimpleIconButtonXS img={uiIcons.chat} action={()=>chatAction()}/>
      </div>
    </div>
  )
}
