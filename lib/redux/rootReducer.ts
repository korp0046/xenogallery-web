/* Instruments */
import { counterSlice, gamedocSlice, chatSlice, userSlice, roomSlice, gameSlice, modalSlice, navSlice, assetSlice, sceneSlice, liveactorSlice, livesceneSlice, genSlice, scratchSlice, gallerySlice } from './slices';

export const reducer = {
  counter: counterSlice.reducer,
  chat: chatSlice.reducer,
  user: userSlice.reducer,
  room: roomSlice.reducer,
  game: gameSlice.reducer,
  modal: modalSlice.reducer,
  nav: navSlice.reducer,
  asset: assetSlice.reducer,
  scene: sceneSlice.reducer,
  liveactor: liveactorSlice.reducer,
  livescene: livesceneSlice.reducer,
  gamedoc: gamedocSlice.reducer,
  gen: genSlice.reducer,
  scratch: scratchSlice.reducer,
  gallery: gallerySlice.reducer
}
