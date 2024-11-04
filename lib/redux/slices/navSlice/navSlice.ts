/* Core */
import { createSlice } from '@reduxjs/toolkit';

/* Instruments */

const initialState: NavSlice = {
  isOpen: false,
  isInnerOpen: false,
  trayOpen: false,
  trayVisible: true,
  navTabOpen: null,
  innerNavTab: 'chat',
  rightNavOpen: false,
  rightNavTab: 'chat',
  arrowsEnabled: true,
  page: 'main',
  trayPage: 'default',
  history: [],
  trayHistory: []
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setNavState: (state, action) => {
      state.isOpen = action.payload;
    },
    setInnerNavState: (state, action) => {
      state.isInnerOpen = action.payload;
    },
    setRightNavState: (state, action) => {
      state.rightNavOpen = action.payload;
    },
    setTrayState: (state, action) => {
      state.trayOpen = action.payload;
    },
    setNavTabOpen: (state, action) => {
      state.navTabOpen = action.payload;
    },
    setInnerNavTab: (state, action) => {
      state.innerNavTab = action.payload;
    },
    setRightNavTab: (state, action) => {
      state.rightNavTab = action.payload;
    },
    setPage: (state, action) => {
      state.history.push(state.page);
      state.page = action.payload;
    },
    setPageBack: (state, action) => {
      if(state.history.length > 0){
        const lastPage = state.history.pop();
        state.page = lastPage;
      }
    },
    setTrayPage: (state, action) => {
      state.trayHistory.push(state.page);
      state.trayPage = action.payload;
      if(action.payload == 'default'){
        state.trayVisible = false;
      } else {
        state.trayVisible = true;
      }
    },
    setTrayPageBack: (state, action) => {
      if(state.trayHistory.length > 0){
        const lastPage = state.trayHistory.pop();
        state.trayPage = lastPage;
      }
    },
    setArrowsEnabled: (state, action) => {
      state.arrowsEnabled = action.payload;
    }
  }
})

/* Types */
export interface NavSlice {
  isOpen: boolean,
  innerNavTab: string,
  isInnerOpen: boolean,
  trayOpen: boolean,
  trayVisible: boolean,
  navTabOpen: null | string;
  page: any,
  history: any,
  trayHistory: any,
  trayPage: any,
  rightNavOpen: boolean,
  rightNavTab: string,
  arrowsEnabled: boolean
}
