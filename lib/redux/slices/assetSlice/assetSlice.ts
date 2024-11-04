/* Core */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

/* Instruments */
import { getAssetAsync, upsertAssetAsync } from './thunks';
import { assetToCollection } from '@/lib/util/util';
import { upsertGameAsset } from '@/lib/util/util';
import { deleteAssetAsync } from '.';
import { AssetActor, AssetQuest, AssetScene, StaticAsset } from '@/lib/util/assetTypes';

const initialState: AssetSliceState = {
    dataLite: [],
    dataModalLite: [],
    devMode: false,
    data: {
        exploremaps: [],
        battlemaps: [],
        basicscenes: [],
        opponents: [],
        personas: [],
        powers: [],
        items: [],
        characters: [],
        events: [],
        images: [],
        quests: []
    },
    tags: {
      exploremaps: [],
      battlemaps: [],
      basicscenes: [],
      opponents: [],
      personas: [],
      powers: [],
      items: [],
      characters: [],
      events: [],
      images: [],
      quests: []
    },
    flags: {
      exploremaps: [],
      battlemaps: [],
      basicscenes: [],
      opponents: [],
      personas: [],
      powers: [],
      items: [],
      characters: [],
      events: [],
      images: [],
      quests: []
    },
    queryHistory: {
      exploremaps: {queryStart: 0, queryLimit: 20, queryCount: 0, queryFind: '/.*/', queryFindKey: "name", querySort: 1, querySortKey: "name", tagsInclude: [], flagsInclude: [], tagsExclude: [], flagsExclude: [], public: 'any', queryType: 'any', queryElement: 'any'},
      battlemaps: {queryStart: 0, queryLimit: 20, queryCount: 0, queryFind: '/.*/', queryFindKey: "name", querySort: 1, querySortKey: "name", tagsInclude: [], flagsInclude: [], tagsExclude: [], flagsExclude: [], public: 'any', queryType: 'any', queryElement: 'any'},
      basicscenes: {queryStart: 0, queryLimit: 20, queryCount: 0, queryFind: '/.*/', queryFindKey: "name", querySort: 1, querySortKey: "name", tagsInclude: [], flagsInclude: [], tagsExclude: [], flagsExclude: [], public: 'any', queryType: 'any', queryElement: 'any'},
      opponents: {queryStart: 0, queryLimit: 20, queryCount: 0, queryFind: '/.*/', queryFindKey: "name", querySort: 1, querySortKey: "name", tagsInclude: [], flagsInclude: [], tagsExclude: [], flagsExclude: [], public: 'any', queryType: 'any', queryElement: 'any'},
      personas: {queryStart: 0, queryLimit: 20, queryCount: 0, queryFind: '/.*/', queryFindKey: "name", querySort: 1, querySortKey: "name", tagsInclude: [], flagsInclude: [], tagsExclude: [], flagsExclude: [], public: 'any', queryType: 'any', queryElement: 'any'},
      powers: {queryStart: 0, queryLimit: 20, queryCount: 0, queryFind: '/.*/', queryFindKey: "name", querySort: 1, querySortKey: "name", tagsInclude: [], flagsInclude: [], tagsExclude: [], flagsExclude: ['npc'], public: 'any', queryType: 'any', queryElement: 'any'},
      items: {queryStart: 0, queryLimit: 20, queryCount: 0, queryFind: '/.*/', queryFindKey: "name", querySort: 1, querySortKey: "name", tagsInclude: [], flagsInclude: [], tagsExclude: [], flagsExclude: [], public: 'any', queryType: 'any', queryElement: 'any'},
      characters: {queryStart: 0, queryLimit: 20, queryCount: 0, queryFind: '/.*/', queryFindKey: "name", querySort: 1, querySortKey: "name", tagsInclude: [], flagsInclude: [], tagsExclude: [], flagsExclude: [], public: 'any', queryType: 'any', queryElement: 'any'},
      events: {queryStart: 0, queryLimit: 20, queryCount: 0, queryFind: '/.*/', queryFindKey: "name", querySort: 1, querySortKey: "name", tagsInclude: [], flagsInclude: [], tagsExclude: [], flagsExclude: [], public: 'any', queryType: 'any', queryElement: 'any'},
      images: {queryStart: 0, queryLimit: 20, queryCount: 0, queryFind: '/.*/', queryFindKey: "name", querySort: 1, querySortKey: "name", tagsInclude: [], flagsInclude: [], tagsExclude: [], flagsExclude: [], public: 'any', queryType: 'any', queryElement: 'any'},
      quests: {queryStart: 0, queryLimit: 20, queryCount: 0, queryFind: '/.*/', queryFindKey: "name", querySort: 1, querySortKey: "name", tagsInclude: [], flagsInclude: [], tagsExclude: [], flagsExclude: [], public: 'any', queryType: 'any', queryElement: 'any'}
  },
    work: null,
    assetView: null,
    activeCollection: null,
    modeSelect: false,
    status: 'idle'
}

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setWork: (state, action) => {
      state.work = action.payload;
    },
    setAssetView: (state, action) => {
      state.assetView = action.payload;
    },
    setModeSelect: (state, action) => {
      state.modeSelect = action.payload;
    },
    setDataLite: (state, action) => {
      state.dataLite = action.payload;
    },
    setDataModalLite: (state, action) => {
      state.dataModalLite = action.payload;
    },
    setDevMode: (state, action) => {
      state.devMode = action.payload;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(upsertAssetAsync.pending, (state: any) => {
        state.status = 'loading';
      })
      .addCase(upsertAssetAsync.fulfilled, (state: any, action: any) => {
        state.status = 'idle';
        let data: any = action.payload;
        let nameMinusClone = String(data.name).replace(" (clone)", "");
        let collection: string | null = assetToCollection(data);
        if(collection){
          const dataCopy = _.cloneDeep(state.data[collection]);
          const dataCopyLite = _.cloneDeep(state.dataLite);
          const index = _.findIndex(dataCopy, function(el: any) { return el._id == data._id});
          if (index > -1) {
            const newDataList = dataCopy.toSpliced(index, 1, data);
            state.data[collection] = newDataList;
          } else {
            const index = _.findIndex(dataCopy, function(el: any) {
                return el.name == nameMinusClone;
              });
            if(index > -1){
              const newDataList = dataCopy.toSpliced(index + 1, 0, data);
              state.data[collection] = newDataList;
            } else {
              dataCopy.push(data);
              state.data[collection] = dataCopy;
            }
          }
          let indexLite = _.findIndex(dataCopyLite, function(el: any) { return el._id == data._id});
          if (indexLite > -1) {
            const newDataList = dataCopyLite.toSpliced(indexLite, 1, data);
            state.dataLite = newDataList;
          } else {
            let indexLite = _.findIndex(dataCopyLite, function(el: any) {
                return el.name == nameMinusClone;
              });
            if(indexLite > -1){
              const newDataList = dataCopyLite.toSpliced(indexLite + 1, 0, data);
              state.dataLite = newDataList;
            } else {
              dataCopyLite.push(data);
              state.dataLite = dataCopyLite;
            }
          }
          //update work
          if(state.work && state.work._id && state.work._id == data._id){
            state.work = data;
          }
        }

      });
      builder
        .addCase(getAssetAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getAssetAsync.fulfilled, (state, action) => {
          state.status = 'idle';
          if(Array.isArray(action.payload.data) && action.payload.data.length > 0){
            let collection: string | null = assetToCollection(action.payload.data[0]);
            if(collection){
              state.data[collection as keyof Assets] = action.payload.data;
              state.queryHistory[collection as keyof Assets].queryCount = action.payload.count;
              state.queryHistory[collection as keyof Assets].queryLimit = action.payload.queryLimit;
              state.queryHistory[collection as keyof Assets].queryStart = action.payload.queryStart;
              state.queryHistory[collection as keyof Assets].queryFind = action.payload.queryFind;
              state.queryHistory[collection as keyof Assets].queryFindKey = action.payload.queryFindKey;
              state.queryHistory[collection as keyof Assets].querySort = action.payload.querySort;
              state.queryHistory[collection as keyof Assets].querySortKey = action.payload.querySortKey;
              state.queryHistory[collection as keyof Assets].tagsInclude = action.payload.tagsInclude;
              state.queryHistory[collection as keyof Assets].tagsExclude = action.payload.tagsExclude;
              state.queryHistory[collection as keyof Assets].flagsInclude = action.payload.flagsInclude;
              state.queryHistory[collection as keyof Assets].flagsExclude = action.payload.flagsExclude;
              state.queryHistory[collection as keyof Assets].public = action.payload.public;
              state.queryHistory[collection as keyof Assets].queryType = action.payload.queryType;
              state.queryHistory[collection as keyof Assets].queryElement = action.payload.queryElement;
              state.tags[collection as keyof Assets] = action.payload.alltags;
              state.flags[collection as keyof Assets] = action.payload.allflags;
            }
            state.activeCollection = collection;
          }

        });
        builder
          .addCase(deleteAssetAsync.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(deleteAssetAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            let data: any = action.payload;
            let success = data.success;
            let id = data.id;
            let collection = data.collection;
            if(success){
              let newData = state.data[collection as keyof Assets].filter((el: any) => el._id != id);
              state.data[collection as keyof Assets] = newData;
              if(state.work && state.work._id && state.work._id == id){
                state.work = null;
              }
            }
            //todo
          });
  },
})

/* Types */
export interface AssetSliceState {
  data: Assets,
  devMode: boolean,
  dataLite: any,
  dataModalLite: any,
  tags: TagsList,
  flags: FlagsList,
  work: any,
  assetView: StaticAsset | null,
  queryHistory: any,
  activeCollection: string | null,
  modeSelect: boolean,
  status: 'idle' | 'loading' | 'failed'
}

export interface Assets {
    exploremaps: Array<AssetScene>,
    battlemaps: Array<AssetScene>,
    basicscenes: Array<AssetScene>,
    opponents: Array<AssetActor>,
    personas: Array<AssetActor>,
    powers: Array<AssetActor>,
    items: Array<any>,
    characters: Array<AssetActor>,
    events: Array<any>,
    images: Array<any>,
    quests: Array<AssetQuest>
}

export interface TagsList {
  exploremaps: Array<string>,
  battlemaps: Array<string>,
  basicscenes: Array<string>,
  opponents: Array<string>,
  personas: Array<string>,
  powers: Array<string>,
  items: Array<string>,
  characters: Array<string>,
  events: Array<string>,
  images: Array<string>,
  quests: Array<string>
}

export interface FlagsList {
  exploremaps: Array<string>,
  battlemaps: Array<string>,
  basicscenes: Array<string>,
  opponents: Array<string>,
  personas: Array<string>,
  powers: Array<string>,
  items: Array<string>,
  characters: Array<string>,
  events: Array<string>,
  images: Array<string>,
  quests: Array<string>
}