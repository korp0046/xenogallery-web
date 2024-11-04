import axios from 'axios';
import Rules from '../../components/Rules/Rules';
import { docBodyProcessor, gameDocMapper } from '@/lib/util/util';
import getGlobalData from '@/lib/build/getGlobalData';
import AssetTable from '../../components/AssetTable/AssetTable';
import pagestyles from '../../styles/page.module.css';

const fetchfunc = async ()=> await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/quests`);
   
async function getAllAssets() {
    const globalData = await getGlobalData(fetchfunc, 'quests');
    return globalData;
}

export default async function Page() {
  const data = await getAllAssets();
  return(
    <div className={pagestyles.root}>
      <AssetTable docs={data.data} type='quest'/>
    </div>
  );
}

export const metadata = {
  title: 'Element Rogue App',
}
