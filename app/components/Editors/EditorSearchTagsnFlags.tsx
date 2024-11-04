
import _ from 'lodash';
import styles from './editor.module.css';
import { useState } from 'react';

export function EditorSearchTagsnFlagsMultiselect(props: any) {
  return(
    <div className={styles.editdiv}>
    <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>{props.label}</div>
    <select className={styles.inputnum} value={'Select a Value'} onChange={(e)=>props.action(e.target.value, props.category)}>
      <option>Select an option</option>
      {
          props.list.map((el: string, idx: number)=>{
            return(
              <option key={idx} value={el}>{el}</option>
            )
          })
        }
    </select>
  </div>
  );
}

export function EditorSearchTagsnFlags(props: any) {
  const [exclude, setExclude] = useState(0);

  const allFlags = props.allFlags || [];
  const allTags = props.allTags || [];

    return (
        <div className={styles.dynamicflex}>
        <div className={styles.editdiv}>
          <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Include/Exclude</div>
          <select className={styles.inputnum} value={String(exclude)} onChange={(e)=>setExclude(Number.parseInt(e.target.value))}>
              <option value={0}>Include Tag/Flag</option>
              <option value={1}>Exclude Tag/Flag</option>
        </select>
        </div>
          {
            allFlags && allFlags.length > 0 ? 
            <EditorSearchTagsnFlagsMultiselect value={props.value} label={exclude ? 'Exclude Flags' : 'Include Flags'} category={exclude ? 'flagsx' : 'flags'} list={allFlags} action={props.addRemoveValue}/>
            : null
          }
          <EditorSearchTagsnFlagsMultiselect value={props.value} label={exclude ? 'Exclude Tags' : 'Include Tags'} category={exclude ? 'tagsx' : 'tags'} list={allTags} action={props.addRemoveValue}/>
          <div>
            {
              props.tags.map((el: string, idx: number)=> {
                return <span className={styles.tagwrapper + ' ' + styles.positive} key={idx} onClick={()=>props.addRemoveValue(el, 'tags', true)}>{el}</span>
              })
            }
            {
              props.tagsx.map((el: string, idx: number)=> {
                return <span className={styles.tagwrapper + ' ' + styles.negative} key={idx} onClick={()=>props.addRemoveValue(el, 'tagsx', true)}>{el} <span></span></span>
              })
            }
            {
              allFlags && allFlags.length > 0 ? 
              <>
              {
                props.flags.map((el: string, idx: number)=> {
                  return <span className={styles.tagwrapper + ' ' + styles.positive} key={idx} onClick={()=>props.addRemoveValue(el, 'flags', true)}>{el}</span>
                })
              }
              {
                props.flagsx.map((el: string, idx: number)=> {
                  return <span className={styles.tagwrapper + ' ' + styles.negative} key={idx} onClick={()=>props.addRemoveValue(el, 'flagsx', true)}>{el}</span>
                })
              }
              </>
              : null
            }

          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
      );

}

export default EditorSearchTagsnFlags;
