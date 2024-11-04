/* Core */
import { defaultBasicScene, defaultBattleScene, defaultExploreScene } from '@/lib/gamedata/defaultScenes';
import { MapNode } from '@/lib/util/assetTypes';
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState: SceneSlice = {
  viewBox: {x: 0, y: 0, h: 1024, w: 1024},
  data: null,
  droppable: null,
  selectedNode: null
}

export const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    newScene: (state, action) => {
      if(action.payload == 'battlemap'){
        state.data = _.cloneDeep(defaultBattleScene);
      } else if (action.payload == 'exploremap') {
        state.data = _.cloneDeep(defaultExploreScene);
      } else {
        state.data = _.cloneDeep(defaultBasicScene);
      }
    },
    setDroppable: (state, action) => {
      state.droppable = action.payload;
    },
    updateScene: (state, action) => {
      state.data = action.payload;
    },
    updateViewBox: (state, action) => {
      state.viewBox = action.payload;
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    }
  }
})

/* Types */
export interface SceneSlice {
  data: any,
  droppable: any
  viewBox: ViewBox,
  selectedNode: string | null
}

export interface ViewBox {
  x: number,
  y: number,
  h: number,
  w: number
}
