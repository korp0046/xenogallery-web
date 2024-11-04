/* Core */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
import { upsertLiveSceneAsync, getLiveSceneAsync } from './thunks'
import { upsertGameObject, upsertLiveAsset } from '@/lib/util/util';
import { deleteLivesceneAsync } from '.';
import { AssetScene } from '@/lib/util/assetTypes';

const initialState: LiveSceneSliceState = {
  scratch: null,
  scratchId: null,
  list: [],
  status: 'idle'
}

export const livesceneSlice = createSlice({
  name: 'livescene',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    receiveScene: (state, action) => {
      const scene: AssetScene = action.payload;
      console.log('receiveScene', scene);
      if(scene.meta.trash){
        const newList = state.list.filter((el: any)=>el._id != scene._id);
        state.list = newList;
      } else {
        upsertLiveAsset(action.payload, state.list);
      }
    },
    updateScene: (state, action) => {
      upsertLiveAsset(action.payload, state.list);
      console.log(action.payload);
    },
    receiveSceneDelete: (state, action) => {
      if(action.payload){
        const newList = action.payload.data.filter((el: any)=>el._id != action.payload._id);
        state.list = newList;
      }
    },
    setScratch: (state, action) => {
      state.scratch = action.payload.data;
      state.scratchId = action.payload.id;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(upsertLiveSceneAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(upsertLiveSceneAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            if(action.payload){
              let updatedScene = action.payload;
              upsertGameObject(updatedScene, state.list);
              console.log(updatedScene);
            }
        })
    builder
        .addCase(getLiveSceneAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getLiveSceneAsync.fulfilled, (state, action) => {
          state.list = action.payload.data.map((el: any, idx: number)=>{
            el.meta['dirty'] = false;
            return el;
          });
          state.status = 'idle';
        });
        builder
        .addCase(deleteLivesceneAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteLivesceneAsync.fulfilled, (state, action) => {
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
export interface LiveSceneSliceState {
  scratch: any,
  scratchId: string | null,
  list: Array<any>,
  status: 'idle' | 'loading' | 'failed'
}
