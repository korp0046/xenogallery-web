'use client'

/* Core */
import styles from './gamedoceditor.module.css';

import {
    EditorGroupDiv,
    EditorImage,
    EditorMeta,
    EditorName,
    EditorNumber,
    EditorNumberClassic,
    EditorString,
    EditorTextarea
} from '../Editors';

/* Instruments */
import {
    assetSlice,
    deleteGamedocAsync,
    gamedocSlice,
    modalSlice,
    selectGamedocs,
    selectGamedocWork,
    upsertGamedocAsync,
    useDispatch,
    useSelector
} from '@/lib/redux';
import { assetToCollection } from '@/lib/util/util';
import { useEffect } from 'react';
import _ from 'lodash';
import EditorDynamicSelect from '../Editors/EditorDynamicSelect';
import ObjectID from 'bson-objectid';
import { Gamedoc } from '@/lib/util/assetTypes';

export default function GamedocEditor(props: any){
    const dispatch = useDispatch();
    const work = useSelector(selectGamedocWork);
    const docs = useSelector(selectGamedocs);


    const setDoc = (newValue: any) => {
        dispatch(gamedocSlice.actions.setWork(newValue));
    }

    const setParent = (parentId: any) => {
        if(work){
            let newDoc = _.cloneDeep(work);
            if(parentId){
                newDoc.system.parent = String(parentId);
            } else {
                newDoc.system.parent = "";
            }
            dispatch(gamedocSlice.actions.setWork(newDoc));
        }
    }

    useEffect(()=> {
        setTimeout(()=>{
            if(!work){
                dispatch(modalSlice.actions.closeModal(null));
            }
        },250);
    }, [work]);

    const flatmaprecursive = (doc: Gamedoc) => {
        let list = [doc];
        if(doc.children){
            for(let subdoc of doc.children){
                let docs = flatmaprecursive(subdoc);
                let list2 = [...list, ...docs];
                list = list2;
            }
        }
        return list;

    }

    const docsListFlat: Array<Gamedoc> = [];

    props.allDocs.forEach((el: any) => {
        let res = flatmaprecursive(el);
        for(let item of res){
            docsListFlat.push(item);
        }
    });
    
    if(work){
        return(
            <div className={styles.main}>
                <div className={styles.savebutton}>
                    <button className={styles.save} onClick={()=>dispatch(upsertGamedocAsync(work))}>SAVE</button>
                    <button className={styles.save} onClick={()=>dispatch(gamedocSlice.actions.setWork(null))}>CLOSE</button>
                    {
                        work && work.meta && work.meta.trash ? 
                            <button className={styles.delete} onClick={()=>dispatch(deleteGamedocAsync(work))}>DELETE</button>
                        :  null
                    }
                </div>
                <EditorName setDoc={setDoc} doc={work}/>
                <EditorGroupDiv label="Admin">
                    <EditorDynamicSelect list={docsListFlat} value={work.system.parent} label='Parent Page' funcvalue={(el: any)=>el._id} funcstring={(el: any)=>el.name} action={(parentId: any)=>setParent(parentId)} />
                    <EditorNumberClassic doc={work} field={'sort'} setDoc={setDoc}/>
                    <EditorString doc={work} field={'directpath'} setDoc={setDoc}/>
                    <EditorString doc={work} field={'tags'} setDoc={setDoc} grow={true}/>
                </EditorGroupDiv>
                    <EditorString doc={work} field={'brief'} setDoc={setDoc}/>
                    <EditorTextarea setDoc={setDoc} doc={work} field='text'/>
                    <EditorString doc={work} field={'tagsalt'} setDoc={setDoc}/>
                    <EditorMeta doc={work} setDoc={setDoc} />

                    <EditorImage doc={work} setDoc={setDoc} />
            </div>
        );
        } else {
            return null;
        }
}
