/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import type { ReduxThunkAction } from '@/lib/redux';
import axios from 'axios';
import { toast } from 'react-toastify';

export const doLogin = async (
    payload: any
  ): Promise<any> => {
    let username = payload.username;
    let password = payload.password;
    let headers = { 
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
      }
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/users/login`, { headers: headers });
    const result = response.data;
  
    return result
}

export const doRegister = async (
    payload: any
  ): Promise<any> => {
    let username = payload.username;
    let password = payload.password;
    let email = 'placeholder';
    let headers = { 
        'Content-Type': 'application/json'
      }
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/users/register`, {username: username, password: password, email: email}, { headers: headers });
    const result = response.data;
    return result
}

export const loginAsync = createAppAsyncThunk(
    'user/loginAsync',
    async (payload: any) => {
      const response = await doLogin(payload);
      toast(JSON.stringify(response.message));
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  )

export const registerAsync = createAppAsyncThunk(
    'user/registerAsync',
    async (payload: any) => {
        const response = await doRegister(payload);
        toast(JSON.stringify(response.message));
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  )

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

  

const counterAsync = createAppAsyncThunk(
  'user/doLogin',
  async (message: string) => {
    const response = {data: message};

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
)

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*
export const incrementIfOddAsync = (amount: number): ReduxThunkAction =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState())

    if (currentValue % 2 === 1) {
      dispatch(counterSlice.actions.incrementByAmount(amount))
    }
  }
*/