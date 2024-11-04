'use client'
import styles from '../../styles/table.module.css';

export default function AssetTableFlagSelect(props: any){
    let docs = props.docs;
    let allFlagsSet = new Set();
    for(let doc of docs){
        let docFlags = Object.keys(doc.system.flags);
        for(let Flag of docFlags){
            allFlagsSet.add(Flag);
        }
    }
    let allFlags: any = [...allFlagsSet].sort((a: any, b: any)=> a.localeCompare(b));

    const setFlagFilter = (newFlag: string) => {
        if(props.filter.incFlags.includes(newFlag)){
            props.setFilter({...props.filter, incFlags: props.filter.incFlags.filter((el: string)=>el != newFlag), excFlags: [...props.filter.excFlags, newFlag]});
        } else if (props.filter.excFlags.includes(newFlag)) {
            props.setFilter({...props.filter, incFlags: props.filter.incFlags.filter((el: string)=>el != newFlag), excFlags: props.filter.excFlags.filter((el: string)=>el != newFlag)});
        } else {
            props.setFilter({...props.filter, incFlags: [...props.filter.incFlags, newFlag]});

        }
    }

    return(
        <>
        {
            allFlags.map((el: string, idx: number)=>{
                return(
                    <div key={idx} className={`${styles.filteritem} ${props.filter.incFlags.includes(el) ? styles.positive : props.filter.excFlags.includes(el) ? styles.negative : ''}`} onClick={()=>setFlagFilter(el)}>{el}</div>
                )
            })
        }
        </>
    )

 
}
