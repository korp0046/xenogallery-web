/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk';
import axios from 'axios';
import ObjectID from 'bson-objectid';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { reduxStore } from '../../store';

export const doGetGalleryList = async (
    payload: any
  ): Promise<any> => {
    const token = reduxStore.getState().user.token;
    if(token){
      let headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${token}`
      };
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/gallery`, { headers: headers });
      return response.data;
    }
  return null;
}

export const doGetGalleryObjects = async (
  payload: any
): Promise<any> => {
  const token = reduxStore.getState().user.token;
  if(token){
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`
    };
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/gallery/${payload.gallery}`, payload, { headers: headers });
    return response.data;
  }
return null;
}

export const doPostGallery = async (
    payload: any
  ): Promise<any> => {
    const token = reduxStore.getState().user.token;
    if(token){
      let headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer: ${token}`
      };
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/gallery`, payload, { headers: headers });
      return response.data;
    }
  return null;
}


export const doUpdateObjectTags = async (
  payload: any
): Promise<any> => {
  const token = reduxStore.getState().user.token;
  if(token){
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`
    };
    const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/gallery/${payload.gallery}/tag`, payload, { headers: headers });
    return response.data;
  }
return null;
}

export const doDeleteObjects = async (
  payload: any
): Promise<any> => {
  const token = reduxStore.getState().user.token;
  if(token){
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer: ${token}`
    };
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/gallery`, { headers: headers, data: payload });
    return response.data;
  }
return null;
}

export const getGalleryListAsync = createAppAsyncThunk(
    'gallery/getGalleryListAsync',
    async (payload: any) => {
        const response = await doGetGalleryList(payload);
      // The value we return becomes the `fulfilled` action payload
      return {request: payload, response: response};
    }
  )


  export const postGalleryAsync = createAppAsyncThunk(
    'gallery/postGalleryAsync',
    async (payload: any) => {
        const response = await doPostGallery(payload);
      // The value we return becomes the `fulfilled` action payload
      return {request: payload, response: response};
    }
  )

  export const getGalleryObjectsAsync = createAppAsyncThunk(
    'gallery/getGalleryObjectsAsync',
    async (payload: any) => {
        const response = await doGetGalleryObjects(payload);
      // The value we return becomes the `fulfilled` action payload
      return {request: payload, response: response};
    }
  )

  export const updateObjectTagsAsync = createAppAsyncThunk(
    'gallery/updateObjectTagsAsync',
    async (payload: any) => {
        const response = await doUpdateObjectTags(payload);
      // The value we return becomes the `fulfilled` action payload
      return {request: payload, response: response};
    }
  )

  export const deleteGalleryObjectsAsync = createAppAsyncThunk(
    'gallery/deleteGalleryObjectsAsync',
    async (payload: any) => {
        const response = await doDeleteObjects(payload);
      // The value we return becomes the `fulfilled` action payload
      return {request: payload, response: response};
    }
  )