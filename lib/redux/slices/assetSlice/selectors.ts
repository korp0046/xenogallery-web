/* Instruments */
import type { ReduxState } from '@/lib/redux';
import { Assets } from './assetSlice';

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAssetQueryStatus = (state: ReduxState) => state.asset.status;
export const selectItems = (state: ReduxState) => state.asset.data.items;
export const selectDataLite = (state: ReduxState) => state.asset.dataLite;
export const selectDataModalLite = (state: ReduxState) => state.asset.dataModalLite;
export const selectExploremaps = (state: ReduxState) => state.asset.data.exploremaps;
export const selectBattlemaps = (state: ReduxState) => state.asset.data.battlemaps;
export const selectBasicscenes = (state: ReduxState) => state.asset.data.basicscenes;
export const selectOpponents = (state: ReduxState) => state.asset.data.opponents;
export const selectPowers = (state: ReduxState) => state.asset.data.powers;
export const selectPersonas = (state: ReduxState) => state.asset.data.personas;
export const selectCharacters = (state: ReduxState) => state.asset.data.characters;
export const selectEvents = (state: ReduxState) => state.asset.data.events;
export const selectImages = (state: ReduxState) => state.asset.data.images;
export const selectWork = (state: ReduxState) => state.asset.work;
export const selectAssetView = (state: ReduxState) => state.asset.assetView;
export const selectActiveCollection = (state: ReduxState) => state.asset.activeCollection;
export const selectModeSelect = (state: ReduxState) => state.asset.modeSelect;
export const selectDevMode = (state: ReduxState) => state.asset.devMode;
export const selectQueryCount = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].queryCount : 0;
}
export const selectQueryLimit = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].queryLimit : 20;
}
export const selectQueryStart = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].queryStart : 0;
}
export const selectQueryFind = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].queryFind : '/.*/';
}
export const selectQueryFindKey = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].queryFindKey : 'name';
}
export const selectQuerySort = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].querySort : -1;
}
export const selectQuerySortKey = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].querySortKey : "name";
}
export const selectAllFlags = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.flags[state.asset.activeCollection as keyof Assets] : [];
}
export const selectAllTags = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.tags[state.asset.activeCollection as keyof Assets] : [];
}

export const selectQueryTags = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].tags : [];
}

export const selectQueryTagsx = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].tagsx : [];
}

export const selectQueryFlags = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].flags : [];
}
export const selectQueryFlagsx = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].flagsx : [];
}
export const selectQueryElement = (state: ReduxState) => {
    return state.asset.activeCollection ? state.asset.queryHistory[state.asset.activeCollection as keyof Assets].queryElement : 'any';
}



export const selectQueryHistory = (state: ReduxState) => {
    return state.asset.queryHistory;
}


export const selectAssetDebug = (state: ReduxState) => {
    return state.asset;
}