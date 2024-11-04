'use client'

/* Core */
import useWindowSize from '@/app/hooks/useWindowSize';
import { useEffect, useRef, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import _ from 'lodash';

/* Instruments */
import {
  assetSlice,
    getAssetAsync,
    selectActiveCollection,
    selectAssetQueryStatus,
    selectQueryCount,
    selectQueryFind,
    selectQueryHistory,
    selectQueryLimit,
    selectQuerySort,
    selectQueryStart,
    selectQueryFlags,
    selectQueryFlagsx,
    selectQueryTags,
    selectQueryTagsx,
    useDispatch,
    useSelector,
    selectAllFlags,
    selectAllTags,
    selectQueryElement,
    selectQueryFindKey,
    selectQuerySortKey
} from '@/lib/redux';
import styles from './assetbrowser.module.css';
import EditorSearchSortDir from '../Editors/EditorSearchSortDir';
import EditorSearchField from '../Editors/EditorSearchField';
import EditorStringClassic from '../Editors/EditorSearchFind';
import EditorDummy from '../Editors/EditorDummy';
import EditorSearchTagsnFlags from '../Editors/EditorSearchTagsnFlags';
import EditorSearchPublic from '../Editors/EditorSearchPublic';
import EditorSearchType from '../Editors/EditorSearchType';
import EditorSearchElement from '../Editors/EditorSearchElement';

export function AssetBrowserSearch(props: any) {
  const dispatch = useDispatch();
  const assetQueryStatus = useSelector(selectAssetQueryStatus);
  const queryCount = useSelector(selectQueryCount);
  const queryLimit = useSelector(selectQueryLimit);
  const queryStart = useSelector(selectQueryStart);
  const queryFind = useSelector(selectQueryFind);
  const queryFindKey = useSelector(selectQueryFindKey);
  const querySort = useSelector(selectQuerySort);
  const querySortKey = useSelector(selectQuerySortKey);
  const queryHistory = useSelector(selectQueryHistory);
  const queryFlags = useSelector(selectQueryFlags);
  const queryFlagsx = useSelector(selectQueryFlagsx);
  const queryTags = useSelector(selectQueryTags);
  const queryTagsx = useSelector(selectQueryTagsx);
  const allFlags = useSelector(selectAllFlags);
  const allTags = useSelector(selectAllTags);
  const queryElement = useSelector(selectQueryElement);
  const [localQueryFindField, setLocalQueryFindField] = useState(queryFindKey);
  const [localQueryFindValue, setLocalQueryFindValue] = useState(queryFind); //negative /^(?!.*webp$)/
  const [localQuerySortField, setLocalQuerySortField] = useState(querySortKey);
  const [localQuerySortDir, setLocalQuerySortDir] = useState(querySort);
  const [localQueryElement, setLocalQueryElement] = useState(queryElement);
  const [flags, setFlags]: any = useState(queryHistory[props.collection].flagsInclude);
  const [flagsx, setFlagsx]: any = useState(queryHistory[props.collection].flagsExclude);
  const [tags, setTags]: any = useState(queryHistory[props.collection].tagsInclude);
  const [tagsx, setTagsx]: any = useState(queryHistory[props.collection].tagsExclude);
  const [queryPublic, setQueryPublic]: any = useState(queryHistory[props.collection].public);
  const [queryType, setQueryType]: any = useState(queryHistory[props.collection].queryType);

  
  const addRemoveValue = (value: string, category: string, remove = false) => {
    if(category == 'flags'){
      if(remove){
        setFlagsx(flagsx.filter((el:string)=>el != value));
        setFlags(flags.filter((el:string)=>el != value));
        return;
      }
      setFlagsx(flagsx.filter((el:string)=>el != value));
      if(!flags.includes(value)){
        const newFlags: any = _.cloneDeep(flags);
        newFlags.push(value);
        setFlags(newFlags);
      }

    } else if (category == 'flagsx'){
      if(remove){
        setFlagsx(flagsx.filter((el:string)=>el != value));
        setFlags(flags.filter((el:string)=>el != value));
        return;
      }
      setFlags(flags.filter((el:string)=>el != value));
      if(!flagsx.includes(value)){
        const newFlagsx: any = _.cloneDeep(flagsx);
        newFlagsx.push(value);
        setFlagsx(newFlagsx);
      }

    } else if (category == 'tags'){
      if(remove){
        setTagsx(tagsx.filter((el:string)=>el != value));
        setTags(tags.filter((el:string)=>el != value));
        return;
      }
      setTagsx(tagsx.filter((el:string)=>el != value));
      if(!tags.includes(value)){
        const newTags: any = _.cloneDeep(tags);
        newTags.push(value);
        setTags(newTags);
      }
    } else if (category == 'tagsx'){
      if(remove){
        setTagsx(tagsx.filter((el:string)=>el != value));
        setTags(tags.filter((el:string)=>el != value));
        return;
      }
      setTags(tags.filter((el:string)=>el != value));
      if(!tagsx.includes(value)){
        const newTagsx: any = _.cloneDeep(tagsx);
        newTagsx.push(value);
        setTagsx(newTagsx);
      }
    }
  }

  const setPage = (x: number) => {
    if(assetQueryStatus == 'idle'){
        let nextVal = Math.min(Math.max(queryHistory[props.collection].queryStart + x, 0), Math.max(0, queryHistory[props.collection].queryCount - 20));
        dispatch(getAssetAsync({collection: props.collection, queryStart: nextVal, queryLimit: queryHistory[props.collection].queryLimit, queryFind: queryHistory[props.collection].queryFind, queryFindKey: queryHistory[props.collection].queryFindKey, querySort: queryHistory[props.collection].querySort, querySortKey: queryHistory[props.collection].querySortKey, tagsInclude: queryHistory[props.collection].tagsInclude, tagsExclude: queryHistory[props.collection].tagsExclude, flagsInclude: queryHistory[props.collection].flagsInclude, flagsExclude: queryHistory[props.collection].flagsExclude, public: queryHistory[props.collection].public, queryType: queryHistory[props.collection].queryType, queryElement: queryHistory[props.collection].queryElement}));
    }
  }

  const goSearch = () => {
    dispatch(getAssetAsync({collection: props.collection, queryStart: queryHistory[props.collection].queryStart, queryLimit: queryHistory[props.collection].queryLimit, queryFind: localQueryFindValue, queryFindKey: localQueryFindField, querySort: localQuerySortDir, querySortKey: localQuerySortField, tagsInclude: tags, tagsExclude: tagsx, flagsInclude: flags, flagsExclude: flagsx, public: queryPublic, queryType: queryType, queryElement: localQueryElement}));
  }

  return (
    <div className={styles.statsflex}>
      <EditorDummy value={props.collection} field='Collection' />
      <button disabled={assetQueryStatus != 'idle'} onClick={()=>setPage(-20)}>{assetQueryStatus == 'idle' ? '<<<' : 'BUSY'}</button>
      <EditorDummy value={`${queryStart}/${queryStart+queryLimit} (${queryCount})`} field='page' />
      <button disabled={assetQueryStatus != 'idle'} onClick={()=>setPage(20)}>{assetQueryStatus == 'idle' ? '>>>' : 'BUSY'}</button>
      <EditorSearchField type='sort' collection={props.collection} action={setLocalQuerySortField} value={localQuerySortField}/>
      <EditorSearchSortDir action={setLocalQuerySortDir} value={localQuerySortDir}/>
      <EditorSearchField type='find' collection={props.collection} action={setLocalQueryFindField} value={localQueryFindField}/>
      <EditorStringClassic value={localQueryFindValue} action={setLocalQueryFindValue} />
      <EditorSearchType  collection={props.collection} action={setQueryType}/>
      <EditorSearchPublic action={setQueryPublic} value={queryPublic}/>
      <EditorSearchTagsnFlags valueFlags={queryFlags} valueFlagsx={queryFlagsx} valueTags={queryTags} valueTagsx={queryTagsx} allFlags={allFlags} allTags={allTags} addRemoveValue={addRemoveValue} tags={tags} flags={flags} tagsx={tagsx} flagsx={flagsx}/>
      <EditorSearchElement collection={props.collection} action={setLocalQueryElement} value={localQueryElement} />
      <button disabled={assetQueryStatus != 'idle'} onClick={()=>goSearch()}>{assetQueryStatus == 'idle' ? 'GO' : 'BUSY'}</button>
    </div>
  );


}

export default AssetBrowserSearch;
