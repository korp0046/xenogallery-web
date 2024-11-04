/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import axios from 'axios';
import { toast } from 'react-toastify';
import { reduxStore } from '../../store';
import { assetToCollection } from '@/lib/util/util';
import _ from 'lodash';

const removeLastS = (mystring: string) => {
  if(mystring.slice(-1) == 's'){
    return mystring.slice(0, -1);
  }
  return mystring;
}

export const doGetAsset = async (
    payload: any
  ): Promise<any> => {
    const token = reduxStore.getState().user.token;
    let collection = payload.collection;
    const queryHistory = reduxStore.getState().asset.queryHistory[collection];
    let findObj: any = {};
    findObj[`${payload.queryFindKey}`] = payload.queryFind;
    let sortObj: any = {};
    sortObj[`${payload.querySortKey}`] = payload.querySort;
    let requestPayload = {
        queryLimit: payload.queryLimit,
        queryStart: payload.queryStart,
        queryFind: findObj || {name: "/.*/"},
        querySort: sortObj || { name: 1 },
        tagsInclude: payload.tagsInclude || [],
        tagsExclude: payload.tagsExclude || [],
        flagsInclude: payload.flagsInclude || [],
        flagsExclude: payload.flagsExclude || [],
        public: payload.public || 'any',
        queryType: payload.queryType || 'any',
        queryElement: payload.queryElement || 'any',
        collection: removeLastS(payload.collection)
    };
    let changed = payload.queryFind != queryHistory.queryFind || requestPayload.public != queryHistory.public || requestPayload.queryType != queryHistory.queryType || !_.isEqual(requestPayload.tagsInclude, queryHistory.tagsInclude) || !_.isEqual(requestPayload.tagsExclude, queryHistory.tagsExclude) || !_.isEqual(requestPayload.flagsInclude, queryHistory.flagsInclude) || !_.isEqual(requestPayload.flagsExclude, queryHistory.flagsExclude) || !_.isEqual(requestPayload.queryElement, queryHistory.queryElement);
    if(changed){
      requestPayload.queryStart = 0;
    }
    if(!requestPayload.querySort?.name){
      requestPayload.querySort = {...requestPayload.querySort, name: 1};
    }
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`
    };
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/${collection}`, requestPayload, { headers: headers });
    const result = response.data;
    return { ...payload, data: result.data, count: result.count, allflags: result.allflags, alltags: result.alltags };
}

export const getAssetAsync = createAppAsyncThunk(
    'asset/getAssetAsync',
    async (payload: any) => {
      try{
        const response = await doGetAsset(payload);
        if(response.count == 0){
          toast('No Search Results.');
        }
        return response;
      } catch(e){
        console.log(e);
        toast('doGetAsset-Failure');
      }

      // The value we return becomes the `fulfilled` action payload
      return { ...payload, data: [], count: 0 };
    }
)

export const doUpsertAsset = async (
  payload: any
): Promise<any> => {
  const token = reduxStore.getState().user.token;
  let collection = payload.collection;
  let data = payload.data;
  let headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer: ${token}`
  };
  const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/${collection}`, data, { headers: headers });
  return response.data;
}

export const upsertAssetAsync = createAppAsyncThunk(
    'asset/upsertAssetAsync',
    async (payload: any) => {
      let collection = assetToCollection(payload);
      if(collection){
        try{
          const response = await doUpsertAsset({data: payload, collection: collection});
          return response;
        } catch(e){
          console.log(e);
          toast('upsertAssetAsync-Failure');
        }
      }
      return null;
    }
  )


  export const doDeleteAsset = async (
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
  
  export const deleteAssetAsync = createAppAsyncThunk(
      'asset/deleteAssetAsync',
      async (payload: any) => {
        let collection = assetToCollection(payload);
        if(collection){
          try{
            const response = await doDeleteAsset({data: payload, collection: collection});
            return response;
          } catch(e){
            console.log(e);
            toast('deleteAssetAsync-Failure');
          }
        }
        return {success: false, id: payload.data._id, collection: collection};
      }
    )