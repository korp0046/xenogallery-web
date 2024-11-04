import axios from 'axios';
import Rules from '../../components/Rules/Rules';
import { docBodyProcessor, gameDocMapper } from '@/lib/util/util';
import { Gamedoc } from '@/lib/util/assetTypes';
   
async function getAllGamedocs() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/gamedocs`);
    const posts = response.data;
    const mappedDocs = gameDocMapper(posts);
    return mappedDocs;
}

export default async function RulesPage() {
  const data = await getAllGamedocs();
  const data2 = data.filter((el: Gamedoc)=>el.name.includes("Player"));
  return( 
    <Rules data={data2}/> 
  );
}

export const metadata = {
  title: 'Element Rogue App',
}
