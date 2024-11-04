import axios from 'axios';
import AssetTable from '../../components/AssetTable/AssetTable';
import pagestyles from '../../styles/page.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { assetSlice, selectDataLite, selectDataModalLite, selectToken } from '@/lib/redux';

export default function AssetTableModalAdapter(props: any) {
  const dispatch = useDispatch();
  const data = useSelector(selectDataModalLite);
  const token = useSelector(selectToken);
  const setData = (data: any)=> {
    dispatch(assetSlice.actions.setDataModalLite(data));
  };

  useEffect(()=> {
      (async function() {
        try {
            if(props.collection == 'images'){
              let headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer: ${token}`
              };
              const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/${props.collection}`, { headers: headers });
              setData(res.data.data);
            } else {
              const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/${props.collection}`);
              setData(res.data.data);
            }
        } catch (e) {
            console.error(e);
        }
      })();
  }, []);

  const collection = (props.collection && props.collection.charAt(props.collection.length - 1) == 's') ? props.collection.substring(0, props.collection.length - 1) : props.collection;

  return(
    <div className={pagestyles.root}>
      <AssetTable docs={data} type={collection} modal={true}/>
    </div>
  );
}
