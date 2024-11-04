/* Core */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: ScratchSliceState = {
  data: null,
}

export const scratchSlice = createSlice({
  name: 'scratch',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setScratch: (state, action) => {
      state.data = action.payload;
    }
  }
})

/* Types */
export interface ScratchSliceState {
  data: any
}
