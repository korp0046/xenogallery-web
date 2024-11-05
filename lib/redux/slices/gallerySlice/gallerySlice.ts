import { createSlice } from '@reduxjs/toolkit';
import { upsertGameObject, upsertLiveAsset } from '@/lib/util/util';
import { getGalleryListAsync, getGalleryObjectsAsync, postGalleryAsync, updateObjectTagsAsync } from './thunks';
import { AssetActor } from '@/lib/util/assetTypes';

const initialState: GallerySliceState = {
  gallerylist: [],
  objects: [],
  status: 'idle'
}

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    recieveGalleryList: (state, action) => {
      console.log('recieveGalleryList', action);
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(getGalleryListAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getGalleryListAsync.fulfilled, (state, action) => {
          if(action.payload){
            state.gallerylist = action.payload.map((el: any, idx: number)=>{
              return el;
            });
          }
            state.status = 'idle';
        })
    builder
        .addCase(postGalleryAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(postGalleryAsync.fulfilled, (state, action) => {
            if(action.payload){
            state.gallerylist = action.payload.map((el: any, idx: number)=>{
                return el;
            });
            }
            state.status = 'idle';
      })
    builder
        .addCase(getGalleryObjectsAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getGalleryObjectsAsync.fulfilled, (state, action) => {
            if(action.payload){
            state.objects = action.payload.map((el: any, idx: number)=>{
                return el;
            });
            }
            state.status = 'idle';
        })
    builder
        .addCase(updateObjectTagsAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateObjectTagsAsync.fulfilled, (state, action) => {
            if(action.payload){
              console.log('updateObjectTagsAsync', action.payload);
            state.objects = state.objects.map((el: any, idx: number)=>{
              if(el.name == action.payload.request.object){
                return {...el, tags: action.payload.response};
              } else {
                return el;
              }
            });
          }
        state.status = 'idle';
        })
  },
})

/* Types */
export interface GallerySliceState {
  gallerylist: Array<any>,
  objects: Array<any>,
  status: 'idle' | 'loading' | 'failed'
}