import { createSlice } from '@reduxjs/toolkit';
import { upsertGameObject, upsertLiveAsset } from '@/lib/util/util';
import { deleteGalleryObjectsAsync, getGalleryListAsync, getGalleryObjectsAsync, moveGalleryObjectsAsync, postGalleryAsync, updateObjectTagsAsync } from './thunks';
import { AssetActor, MinioBucketType } from '@/lib/util/assetTypes';

const initialState: GallerySliceState = {
  selectedlist: [],
  scratch: null,
  editor: false,
  moveTarget: 'public',
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
    },
    setEditor: (state, action) => {
      state.editor = action.payload;
    },
    setScratch: (state, action) => {
      state.scratch = action.payload;
    },
    updateLocalItem: (state, action) => {
      state.objects = state.objects.map((el: any, idx: number)=>{
        if(el.name == action.payload.name){
          return {...el, ...action.payload};
        } else {
          return el;
        }
      });
    },
    deleteLocalItem: (state, action) => {
      let nameArr = action.payload.map((el: any)=>el.name);
      state.objects = state.objects.filter((el: any, idx: number)=>{
        return(!nameArr.includes(el.name))
      });
    },
    toggleSelected: (state, action) => {
      let temp = [];
      let done = false;
      for(let item of state.selectedlist){
        if(item.name != action.payload.name){
          temp.push(item);
        } else {
          done = true;
        }
      }
      if(!done){
        temp.push(action.payload);
      }
      state.selectedlist = temp;
    },
    clearSelectedList: (state, action) => {
      state.selectedlist = [];
    },
    setMoveTarget: (state, action) => {
      state.moveTarget = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(getGalleryListAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getGalleryListAsync.fulfilled, (state, action) => {
          if(action.payload){
            state.gallerylist = action.payload.response.map((el: any, idx: number)=>{
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
            state.gallerylist = action.payload.response.map((el: any, idx: number)=>{
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
              if(action.payload.request.more){
                for(let item of action.payload.response){
                  state.objects.push(item);
                }
              } else {
                state.objects = action.payload.response.map((el: any, idx: number)=>{
                  return el;
                });
              }

            }
            state.status = 'idle';
        })
        builder
        .addCase(deleteGalleryObjectsAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteGalleryObjectsAsync.fulfilled, (state, action) => {
            if(action.payload.response.length > 0){
              let names = action.payload.response.map((el: any)=> el.name);
              state.objects = state.objects.filter((el: any, idx: number)=>{
                return !names.includes(el.name);
              });
              state.selectedlist = state.selectedlist.filter((el: any, idx: number)=>{
                return !names.includes(el.name);
              });
            }
            state.status = 'idle';
        })
        builder
        .addCase(moveGalleryObjectsAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(moveGalleryObjectsAsync.fulfilled, (state, action) => {
            if(action.payload.response.length > 0){
              let names = action.payload.response.map((el: any)=> el.name);
              state.objects = state.objects.filter((el: any, idx: number)=>{
                return !names.includes(el.name);
              });
              state.selectedlist = state.selectedlist.filter((el: any, idx: number)=>{
                return !names.includes(el.name);
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
  selectedlist: Array<any>,
  scratch: any,
  editor: boolean,
  gallerylist: Array<MinioBucketType>,
  objects: Array<any>,
  moveTarget: string,
  status: 'idle' | 'loading' | 'failed'
}
