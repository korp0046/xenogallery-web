import Rules, { Brief, RuleBody, RuleEntry, RuleEntrySolo, Title } from "../../components/Rules/Rules";
import axios from 'axios';
import getGlobalData from "@/lib/build/getGlobalData";
import { gameDocMapper, linearizeDocs } from "@/lib/util/util";

const fetchfunc = async ()=> await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/gamedocs`);

export async function generateStaticParams() {
    const globalData = await getGlobalData(fetchfunc, 'rules');
    const posts = globalData;
    let ids = posts.map((el: any, idx: number)=>{
      return { id: el._id };
    });
    return ids;
}

async function idToData(id: any) {
    const globalData = await getGlobalData(fetchfunc, 'rules');
    const item = globalData.find((el: any)=>el._id == id);
    const mappedItems = gameDocMapper(globalData);
    const linearItems = linearizeDocs(mappedItems);
    return {item: item, linear: linearItems, mapped: mappedItems};
}

export default async function Page({ params }: any) {
  const data = await idToData(params.id);
  return( 
    <RuleEntrySolo data={data.item} linear={data.linear} mapped={data.mapped}/>
  );
}