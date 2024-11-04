'use client'
import AssetTileScene from './AssetTileScene';
import AssetTileImage from './AssetTileImage';
import AssetTilePower from './AssetTilePower';
import AssetTileItem from './AssetTileItem';
import AssetTileActor from './AssetTileActor';
import { assetToCollection } from '@/lib/util/util';

export default function AssetTile(props: any){
    const collection = assetToCollection(props.data);

    if(collection == 'battlemaps' || collection == 'basicscenes' || collection == 'exploremaps'){
        return <AssetTileScene data={props.data} size={props.size} collection={collection} breakpoints={props.breakpoints} clone={props.clone} edit={props.edit}/>;
    } else if (collection == 'powers') {
        return <AssetTilePower data={props.data} size={props.size} collection={collection} breakpoints={props.breakpoints} clone={props.clone} edit={props.edit}/>;

    } else if (collection == 'images') {
        return <AssetTileImage data={props.data} size={props.size} collection={collection} breakpoints={props.breakpoints} clone={props.clone} edit={props.edit}/>;

    } else if (collection == 'items') {
        return <AssetTileItem data={props.data} size={props.size} collection={collection} breakpoints={props.breakpoints} clone={props.clone} edit={props.edit}/>;

    } else if ((collection == 'characters' || collection == 'opponents' || collection == 'personas')) {
        return <AssetTileActor data={props.data} size={props.size} collection={collection} breakpoints={props.breakpoints} clone={props.clone} edit={props.edit}/>;

    }

 
}
