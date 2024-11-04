/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import axios from 'axios';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { reduxStore } from '../../store';

export const doGetGame = async (
    payload: any
  ): Promise<any> => {
    const token = reduxStore.getState().user.token;
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`
    }
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/games/${payload}`, { headers: headers });
    const result = response.data;
  
    return result
}

export const getGameAsync = createAppAsyncThunk(
    'game/getGameAsync',
    async (payload: any) => {
      const response = await doGetGame(payload);
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  )

  export const doUpsertGame = async (
    payload: any
  ): Promise<any> => {
    const token = reduxStore.getState().user.token;
    let data = _.cloneDeep(payload);
    if(data.meta){
      data.meta['dirty'] = false;
    }
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`
    };
    const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/games`, data, { headers: headers });
    return response.data;
  }
  
  export const upsertGameAsync = createAppAsyncThunk(
      'game/upsertGameAsync',
      async (payload: any) => {
        try{
          const response = await doUpsertGame(payload);
          return response;
        } catch(e){
          console.log(e);
          toast('upsertGameAsync-Failure');
        }
        return null;
      }
    )