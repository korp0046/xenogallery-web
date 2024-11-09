/* Core */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import _ from 'lodash';

const initialState: GenSlice = {
  lastPrompt: "",
  lastNegPrompt: 'logo, decal, emblem, symbol, sign, stamp, insignia, crest, seal, badge, trademark, border, stamp, monogram, out of focus, rough sketch, low resolution, JPEG artifacts, visible signature, prominent watermark, username distraction, artist name overshadowing',
  preset: "DYNAMIC",
  height: 720,
  width: 1280,
  numImages: 4,
  imgData: [],
  models: [],
  controlnets: [],
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
    setModels: (state, action) => {
        state.models = action.payload;
    },
    setControlnets: (state, action) => {
        state.controlnets = action.payload;
    },
    pushControlnet: (state, action) => {
        let controlnetdoc = _.cloneDeep(action.payload);
        let foundInitImage = controlnetdoc.tags.find((el: any)=>el.Key == "initImage");
        let foundId = controlnetdoc.tags.find((el: any)=>el.Key == "id");
        if(foundId){
          controlnetdoc["initImageId"] = foundId.Value;
          controlnetdoc["initImageType"] =  "GENERATED";
        }
        if(foundInitImage){
          controlnetdoc["initImageId"] = foundInitImage.Value;
          controlnetdoc["initImageType"] = "UPLOADED";
        }
        if(!controlnetdoc["initImageId"]){
          toast("Not initialized for AI.");
          return;
        }
        controlnetdoc["preprocessorId"] = 67;
        controlnetdoc["preprocessorIdStr"] = 'style';
        controlnetdoc["strengthType"] = "High";
        controlnetdoc["strengthTypeStr"] = "high";
        controlnetdoc["influence"] = 0.5;
        state.controlnets.push(controlnetdoc);
    },
    popControlnet: (state, action) => {
        state.controlnets = state.controlnets.filter((el: any)=> el.name != action.payload);
    },
    updateControlnet: (state, action) => {
      console.log(state, action.payload);
      state.controlnets = state.controlnets.map((el: any, idx: number)=>{
        if(el.name == action.payload.name){
          return {...el, ...action.payload};
        } else {
          return el;
        }
      });
    }
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
  models: Array<any>,
  imgData: Array<any>,
  controlnets: Array<any>,
  status: 'idle' | 'loading' | 'failed'
}