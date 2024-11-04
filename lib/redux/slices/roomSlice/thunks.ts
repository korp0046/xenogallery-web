/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import type { ReduxThunkAction } from '@/lib/redux';
import { reduxStore } from '../../store';
import axios from 'axios';
import { toast } from 'react-toastify';

export const doGetRooms = async (
    payload: any
  ): Promise<any> => {
    const token = reduxStore.getState().user.token;
    let headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`
    }
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/rooms/list`, { headers: headers });
    const result = response.data;
  
    return result
}

export const getRoomsAsync = createAppAsyncThunk(
    'room/getRoomsAsync',
    async (payload: any) => {
      const response = await doGetRooms(payload);
      //toast('Updated Rooms List');
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  )

  export const doGetRoom = async (
      payload: any
    ): Promise<any> => {
      const token = reduxStore.getState().user.token;
      let headers = { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${token}`
      }
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/rooms/${payload}`, { headers: headers });
      const result = response.data;
    
      return result
  }
  
  export const getRoomAsync = createAppAsyncThunk(
      'game/getRoomAsync',
      async (payload: any) => {
        const response = await doGetRoom(payload);
        // The value we return becomes the `fulfilled` action payload
        return response;
      }
    )