/* Instruments */
import type { ReduxState } from '@/lib/redux'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectGame = (state: ReduxState) => state.game.gameState;
export const selectActiveGame = (state: ReduxState) => {
  if(state.game.gameState){
    return String(state.game.gameState._id);
  } else {
    return null;
  }
};
export const selectActiveSceneId = (state: ReduxState) => state.game.gameState?.system.activeScene;
export const selectActiveScene = (state: ReduxState) => {
    if(state.game.gameState){
        let activeSceneId = state.game.gameState.system.activeScene;
        for(let i = 0; i<state.livescene.list.length; i++){
            let targetSceneId = state.livescene.list[i]._id;
            if(targetSceneId == activeSceneId){
              return state.livescene.list[i];
            }
          }
    }
    return null;
}

export const selectAutoSave = (state: ReduxState) => {
  return state.game.autoSave;
}

export const selectLastSave = (state: ReduxState) => {
  return state.game.lastSave;
}