/* Core */
import { createSlice } from '@reduxjs/toolkit';

/* Instruments */
import { getGamedocAsync, upsertGamedocAsync } from './thunks';
import { upsertGameObject } from '@/lib/util/util';
import { Gamedoc } from '@/lib/util/assetTypes';
import { deleteGamedocAsync } from '.';



const initialState: GamedocSlice = {
  list: [],
  work: null,
  status: 'idle'
}

export const gamedocSlice = createSlice({
  name: 'gamedoc',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setWork: (state, action) => {
      state.work = action.payload;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
        .addCase(getGamedocAsync.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(getGamedocAsync.fulfilled, (state, action) => {
            state.list = action.payload;
            state.status = 'idle';
        });
        builder
        .addCase(upsertGamedocAsync.pending, (state) => {
                state.status = 'loading'
        })
        .addCase(upsertGamedocAsync.fulfilled, (state, action) => {
            if(action.payload){
              upsertGameObject(action.payload, state.list);
            }
            state.status = 'idle';
        });
        builder
          .addCase(deleteGamedocAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteGamedocAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            let data: any = action.payload;
            let success = data.success;
            let id = data.id;
            if(success){
              let newData = state.list.filter((el: any) => el._id != id);
              state.list = newData;
              if(state.work && state.work._id && state.work._id == id){
                state.work = null;
              }
            }
            //todo
          });
},
});

/* Types */
export interface GamedocSlice {
  list: Array<Gamedoc>,
  work: Gamedoc | null,
  status: 'idle' | 'loading' | 'failed'
}