import { createSlice } from '@reduxjs/toolkit';
import { upsertGameObject, upsertLiveAsset } from '@/lib/util/util';
import { getLiveActorAsync, upsertLiveActorAsync } from './thunks';
import { deleteLiveactorAsync } from '.';
import { AssetActor } from '@/lib/util/assetTypes';

const initialState: LiveActorSliceState = {
  scratch: null,
  scratchId: null,
  list: [],
  status: 'idle'
}

export const liveactorSlice = createSlice({
  name: 'liveactor',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    receiveActor: (state, action) => {
      const actor: AssetActor = action.payload;
      if(actor.meta.trash){
        const newList = state.list.filter((el: any)=>el._id != actor._id);
        state.list = newList;
      } else {
        upsertLiveAsset(action.payload, state.list);
      }
    },
    updateActor: (state, action) => {
      upsertLiveAsset(action.payload, state.list);
      console.log(action.payload);
    },
    setScratch: (state, action) => {
      state.scratch = action.payload.data;
      state.scratchId = action.payload.id;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(upsertLiveActorAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(upsertLiveActorAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            let updatedActor = action.payload;
            upsertGameObject(updatedActor, state.list);
            console.log(updatedActor);
        })
    builder
        .addCase(getLiveActorAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getLiveActorAsync.fulfilled, (state, action) => {
          if(action.payload){
            state.list = action.payload.data.map((el: any, idx: number)=>{
              el.meta['dirty'] = false;
              return el;
            });
          }
            state.status = 'idle';
        })
        builder
        .addCase(deleteLiveactorAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteLiveactorAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          if(action.payload){
            const newList = state.list.filter((el: any)=>el._id != action.payload._id);
            state.list = newList;
            console.log(action.payload);
          }
        })
  },
})

/* Types */
export interface LiveActorSliceState {
  scratch: any,
  scratchId: string | null,
  list: Array<any>,
  status: 'idle' | 'loading' | 'failed'
}
