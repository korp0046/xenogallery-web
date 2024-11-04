'use client'
import styles from '../../styles/table.module.css';

export default function AssetTableTagSelect(props: any){
    let docs = props.docs;
    let allTagsSet = new Set();
    for(let doc of docs){
        let docTags = doc.system.tags.split(',');
        for(let tag of docTags){
            if(tag.length < 15 && tag.trim().length > 0){
                allTagsSet.add(tag);
            }
        }
    }
    let allTags: any = [...allTagsSet].sort((a: any, b: any)=> a.localeCompare(b));

    const setTagFilter = (newTag: string) => {
        if(props.filter.incTags.includes(newTag)){
            props.setFilter({...props.filter, incTags: props.filter.incTags.filter((el: string)=>el != newTag), excTags: [...props.filter.excTags, newTag]});
        } else if (props.filter.excTags.includes(newTag)) {
            props.setFilter({...props.filter, incTags: props.filter.incTags.filter((el: string)=>el != newTag), excTags: props.filter.excTags.filter((el: string)=>el != newTag)});
        } else {
            props.setFilter({...props.filter, incTags: [...props.filter.incTags, newTag]});

        }
    }

    return(
        <>
        {
            allTags.map((el: string, idx: number)=>{
                return(
                    <div key={idx} className={`${styles.filteritem} ${props.filter.incTags.includes(el) ? styles.positive : props.filter.excTags.includes(el) ? styles.negative : ''}`} onClick={()=>setTagFilter(el)}>{el}</div>
                )
            })
        }
        </>
    )

 
}
