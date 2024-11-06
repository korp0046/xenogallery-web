/* Instruments */
import type { ReduxState } from '@/lib/redux'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLastPrompt = (state: ReduxState) => state.gen.lastPrompt;
export const selectLastNegPrompt = (state: ReduxState) => state.gen.lastNegPrompt;
export const selectPreset = (state: ReduxState) => state.gen.preset;
export const selectHeight = (state: ReduxState) => state.gen.height;
export const selectWidth = (state: ReduxState) => state.gen.width;
export const selectNumImages = (state: ReduxState) => state.gen.numImages;
export const selectImgData = (state: ReduxState) => state.gen.imgData;
export const selectModels = (state: ReduxState) => state.gen.models;
export const selectControlnets = (state: ReduxState) => state.gen.controlnets;