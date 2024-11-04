/* Core */
import { createSlice } from '@reduxjs/toolkit';

const initialState: GenSlice = {
  lastPrompt: "",
  lastNegPrompt: 'cartoony, border, extremely poor quality, subpar quality, average quality, awkward cropping, out of focus, rough sketch, low resolution, excessive JPEG artifacts, visible signature, prominent watermark, username distraction, artist name overshadowing',
  preset: "DYNAMIC",
  height: 1024,
  width: 1024,
  numImages: 4,
  imgData: [],
  status: 'idle'
}

export const genSlice = createSlice({
  name: 'gen',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLastPrompt: (state, action) => {
      state.lastPrompt = action.payload;
    },
    setLastNegPrompt: (state, action) => {
        state.lastNegPrompt = action.payload;
    },
    setPreset: (state, action) => {
        state.preset = action.payload;
    },
    setHeight: (state, action) => {
        state.height = action.payload;
    },
    setWidth: (state, action) => {
        state.width = action.payload;
    },
    setNumImages: (state, action) => {
        state.numImages = action.payload;
    },
    setImgData: (state, action) => {
        state.imgData = action.payload;
    },
  }
});

/* Types */
export interface GenSlice {
  lastPrompt: string,
  lastNegPrompt: string,
  preset: string,
  height: number,
  width: number,
  numImages: number,
  imgData: Array<any>,
  status: 'idle' | 'loading' | 'failed'
}