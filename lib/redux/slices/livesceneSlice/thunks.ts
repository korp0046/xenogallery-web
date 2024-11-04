/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import { assetToCollection } from '@/lib/util/util';
import axios from 'axios';
import ObjectID from 'bson-objectid';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { reduxStore } from '../../store';

export const doUpsertLiveScene = async (
  payload: any
): Promise<any> => {
  const token = reduxStore.getState().user.token;
  const gameId = reduxStore.getState().game.gameState?._id;
  let data = _.cloneDeep(payload.data);
  let headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
  };
  const newMeta = {...data.meta};
  const newData = {...data };
  if(!newMeta.hasOwnProperty('gameFrom') || newMeta.gameFrom == null){
    newMeta['gameFrom'] = ObjectID(gameId);
  }
  if(newMeta){
    newMeta['dirty'] = false;
  }
  if(!newMeta.hasOwnProperty('cloneFrom') || newMeta.cloneFrom == null){
    let isOriginal = payload.original;
    if(!isOriginal){
      newMeta['cloneFrom'] = ObjectID(data._id);
      newData._id = ObjectID();
    } else {
      newMeta['cloneFrom'] = null;
    }
  }
  newData.meta = newMeta;
  const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/livescenes`, newData, { headers: headers });
  return response.data;
}

export const doGetLiveScenes = async (
    payload: any
  ): Promise<any> => {
    const token = reduxStore.getState().user.token;
    let gameId = payload;
    if(!gameId){
      gameId = reduxStore.getState().game.gameState?._id;
    }
    if(token && gameId){
      let headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${token}`
      };
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/livescenes/${gameId}`, { headers: headers });
      return response.data;
    }
  return null;

}

export const upsertLiveSceneAsync = createAppAsyncThunk(
    'livescene/upsertLiveSceneAsync',
    async (payload: any) => {
      const response = await doUpsertLiveScene(payload);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  )

export const getLiveSceneAsync = createAppAsyncThunk(
    'livescene/getLiveSceneAsync',
    async (payload: any) => {
        const response = await doGetLiveScenes(payload);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  )

  export const doDeleteLivescene = async (
    payload: any
  ): Promise<any> => {
    const token = reduxStore.getState().user.token;
    let collection = payload.collection;
    let data = payload.data;
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`
    };
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/${collection}/${data._id}`, { headers: headers });
    return {success: response.status == 200, id: data._id, collection: collection};
  }
  
  export const deleteLivesceneAsync = createAppAsyncThunk(
      'asset/deleteLivesceneAsync',
      async (payload: any) => {
        let collection = assetToCollection(payload);
        if(collection){
          try{
            const response = await doDeleteLivescene({data: payload, collection: collection});
            return payload;
          } catch(e){
            console.log(e);
            toast('deleteLivesceneAsync-Failure');
          }
        }
        return {success: false, id: payload.data._id, collection: collection};
      }
    )