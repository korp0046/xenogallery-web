/* Core */
import { createSlice } from '@reduxjs/toolkit';

/* Instruments */

const initialState: ModalSlice = {
  isOpen: false,
  page: null,
  trayOpen: false,
  trayVisible: false,
  trayPage: null,
  history: []
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    openModal: (state, action) => {
      state.history.push(state.page);
      state.page = action.payload;
      state.isOpen = true;
    },
    openTray: (state, action) => {
      state.trayOpen = action.payload;
    },
    setTrayPage: (state, action) => {
      state.trayPage = action.payload;
      if(action.payload == 'default'){
        state.trayVisible = false;
      } else {
        state.trayVisible = true;
      }
    },
    closeModal: (state, action) => {
      if(state.history.length <= 1){
        state.isOpen = false;
        state.history = [];
      } else {
        let prevPage = state.history.pop();
        state.page = prevPage;
      }
    }
  }
})

/* Types */
export interface ModalSlice {
  isOpen: any,
  page: any,
  trayOpen: boolean,
  trayVisible: boolean,
  trayPage: string | null,
  history: Array<any>
}
