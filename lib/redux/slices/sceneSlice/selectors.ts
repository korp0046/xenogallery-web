/* Instruments */
import type { ReduxState } from '@/lib/redux'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectSceneData = (state: ReduxState) => state.scene.data;
export const selectDroppable = (state: ReduxState) => state.scene.droppable;
export const selectViewBox = (state: ReduxState) => state.scene.viewBox;
export const selectSelectedNode = (state: ReduxState) => state.scene.selectedNode;
