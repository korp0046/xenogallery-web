/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import { actorToLiveactor, assetToCollection } from '@/lib/util/util';
import axios from 'axios';
import ObjectID from 'bson-objectid';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { reduxStore } from '../../store';

export const doUpsertLiveActor = async (
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
  if(!newMeta.hasOwnProperty('cloneFrom') || newMeta.cloneFrom == null){
    let isOriginal = payload.original;
    if(!isOriginal){
      newMeta['cloneFrom'] = ObjectID(data._id);
      newData._id = ObjectID();
    } else {
      newMeta['cloneFrom'] = null;
    }
  }
  if(newMeta){
    newMeta['dirty'] = false;
  }
  newData.meta = newMeta;
  actorToLiveactor(newData);
  const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/liveactors`, newData, { headers: headers });
  return response.data;
}

export const doGetLiveActors = async (
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
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/liveactors/${gameId}`, { headers: headers });
      return response.data;
    }
  return null;
}

export const upsertLiveActorAsync = createAppAsyncThunk(
    'liveactor/upsertLiveActorAsync',
    async (payload: any) => {
      const response = await doUpsertLiveActor(payload);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  )

export const getLiveActorAsync = createAppAsyncThunk(
    'liveactor/getLiveActorAsync',
    async (payload: any) => {
        const response = await doGetLiveActors(payload);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  )

  export const doDeleteLiveactor = async (
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
  
  export const deleteLiveactorAsync = createAppAsyncThunk(
      'asset/deleteLiveactorAsync',
      async (payload: any) => {
        let collection = assetToCollection(payload);
        if(collection){
          try{
            const response = await doDeleteLiveactor({data: payload, collection: collection});
            return payload;
          } catch(e){
            console.log(e);
            toast('deleteLiveactorAsync-Failure');
          }
        }
        return {success: false, id: payload.data._id, collection: collection};
      }
    )