/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import { Gamedoc } from '@/lib/util/assetTypes';
import axios from 'axios';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { reduxStore } from '../../store';

export const doGetGamedoc = async (
    payload: any
  ): Promise<any> => {
    const token = reduxStore.getState().user.token;
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`
    }
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/gamedocs`, { headers: headers });
    const result = response.data;
  
    return result
}

export const getGamedocAsync = createAppAsyncThunk(
    'gamedoc/getGamedocAsync',
    async (payload: any) => {
      const response: Array<Gamedoc> = await doGetGamedoc(payload);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  )

  export const doUpsertGamedoc = async (
    payload: Gamedoc
  ): Promise<any> => {
    const token = reduxStore.getState().user.token;
    let data = _.cloneDeep(payload);
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`
    };
    if(Object.hasOwn(data, 'children')){
      delete data.children;
    }
    const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/gamedocs`, data, { headers: headers });
    return response.data;
  }
  
  export const upsertGamedocAsync = createAppAsyncThunk(
      'gamedoc/upsertGamedocAsync',
      async (payload: Gamedoc) => {
        try{
          const response: Gamedoc = await doUpsertGamedoc(payload);
          return response;
        } catch(e){
          console.log(e);
          toast('upsertGamedocAsync-Failure');
        }
        return null;
      }
    )


    export const doDeleteGamedoc = async (
      payload: any
    ): Promise<any> => {
      const token = reduxStore.getState().user.token;
      let data = payload;
      let headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${token}`
      };
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/gamedocs/${data._id}`, { headers: headers });
      return {success: response.status == 200, id: data._id};
    }
    
    export const deleteGamedocAsync = createAppAsyncThunk(
        'gamedoc/deleteGamedocAsync',
        async (payload: any) => {
          try{
            const response = await doDeleteGamedoc(payload);
            return response;
          } catch(e){
            console.log(e);
            toast('deleteAssetAsync-Failure');
          }
          return {success: false, id: payload._id};
        }
      )