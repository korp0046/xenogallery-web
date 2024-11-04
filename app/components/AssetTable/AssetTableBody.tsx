'use client'
import { assetToCollection } from '@/lib/util/util';
import styles from '../../styles/table.module.css';
import { StaticAsset } from '@/lib/util/assetTypes';
import AssetTableRow from './AssetTableRow';
import useKeypress from 'react-use-keypress';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { assetSlice, modalSlice, navSlice, selectArrowsEnabled, selectDevMode } from '@/lib/redux';

export default function AssetTableBody(props: any){
    const dispatch = useDispatch();
    const isLive = useSelector(selectDevMode);
    const arrowsEnabled = useSelector(selectArrowsEnabled);
    const docs = props.docs;

    const viewAssetByIdx = (ridx: number) => {
        let doc = docs[ridx];
        if(props.modal){
            dispatch(assetSlice.actions.setAssetView(doc));
        } else {
            if(isLive){
                dispatch(assetSlice.actions.setWork(doc));
                dispatch(assetSlice.actions.setAssetView(doc));
            } else {
                dispatch(assetSlice.actions.setAssetView(doc));
            }
        }
    }

    useKeypress(['ArrowLeft', 'ArrowRight'], (event: any) => {
        if(arrowsEnabled){
            event.preventDefault();
            event.stopImmediatePropagation();
            if (event.key === 'ArrowLeft') {
                if(props.tidx - 1 >= 0){
                    let newVal = props.tidx - 1;
                    props.setTidx(newVal);
                    viewAssetByIdx(newVal);
                } else if (props.tidx < 0 || props.tidx > docs.length){
                    props.tidx = 0;
                }
            } else if (event.key === 'ArrowRight') {
                if(docs.length >= props.tidx + 2){
                    let newVal = props.tidx + 1;
                    props.setTidx(newVal);
                    viewAssetByIdx(newVal);
                } else if (props.tidx < 0 || props.tidx > docs.length){
                    props.tidx = docs.length;
                }
            }
        }
      });


    

    return(
        <tbody className={styles.table}>
        {
            docs.map((doc: StaticAsset, idx: number)=> {
                return(<AssetTableRow key={idx} ridx={idx} doc={doc} type={props.type} modal={props.modal} tidx={props.tidx} setTidx={props.setTidx}/>);
            })
        }
        </tbody>

    )

 
}
