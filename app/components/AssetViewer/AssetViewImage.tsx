'use client'

import { assetToCollection, cloneAsset, md2html } from '@/lib/util/util';
/* Core */
import SimpleLabel from '../SimpleLabel/SimpleLabel';
import SimpleTagWrapper from '../SimpleTagWrapper/SimpleTagWrapper';
import styles from './assetview.module.css';
import stylesbutton from '../../styles/button.module.css';

/* Instruments */
import {
    assetSlice,
    modalSlice,
    selectAssetView,
    selectIsSuperuser,
    selectModeSelect,
    selectWork,
    useDispatch,
    useSelector
} from '@/lib/redux';
import _ from 'lodash';
import { factions } from '@/lib/gamedata/contentAssets';
import AssetFlags from '../AssetTile/AssetFlags';
import AssetElements from '../AssetTile/AssetElements';

export default function AssetViewImage(props: any){
    const dispatch = useDispatch();
    const isSelectMode = useSelector(selectModeSelect);
    const assetView: any = useSelector(selectAssetView);
    const work: any = useSelector(selectWork);
    const isSuperuser = useSelector(selectIsSuperuser);
    const assetViewCollection = assetToCollection(assetView);
    const type = assetView.type;
    const tags = assetView.system.tags ? assetView.system.tags.split(',') : [];
    const clone = (props.clone && isSuperuser) || false;
    const edit = (props.edit && isSuperuser) || false;

    return(
        <div className={styles.tileinner}>
            <div className={styles.toprow}>
                <div className={styles.name}><span>{assetView.name}</span></div>
            </div>
            <div>
                <div>{assetView.system.img} </div>
            </div>
            <div>
                <div className={styles.description} dangerouslySetInnerHTML={{__html: md2html(assetView.system.description)}} />
            </div>
            <div>
                <img src={assetView.system.img} />
            </div>
            <div className={styles.tagblock}>
                <SimpleTagWrapper data={tags}/>
            </div>
        </div>
    );
}
