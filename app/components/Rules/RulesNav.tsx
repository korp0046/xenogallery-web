"use client";
import { docBodyProcessor, gameDocMapper, md2html } from '@/lib/util/util';
import styles from './rules.module.css';
import corestyles from '../../styles/layout.module.css';
import buttonstyles from '../../styles/button.module.css';
import { useRouter } from 'next/navigation';
import { Gamedoc } from '@/lib/util/assetTypes';
import _ from 'lodash';
import { useEffect } from 'react';
import { assetSlice, navSlice } from '@/lib/redux';
import { useDispatch } from 'react-redux';



export default function RulesNav(props: any) {
    const dispatch = useDispatch();
    const router = useRouter();
    const lineardocs: Array<Gamedoc> = props.linear;
    const treedocs: Array<Gamedoc> = props.mapped;
    const idx = props.doc ? lineardocs.findIndex((el: Gamedoc)=> String(el._id) == String(props.doc._id)): -1;
    const doc: Gamedoc = lineardocs[idx] || props.doc;
    const hierarchy: Array<Gamedoc> = [doc];
    let tempDoc: Gamedoc | undefined | null = _.cloneDeep(doc);
    while(tempDoc && tempDoc.system.parent){
        let parent = lineardocs.find((el: Gamedoc)=> String(el._id) == String(tempDoc?.system.parent));
        if(parent){
            hierarchy.push(parent);
        }
        tempDoc = parent;
    }
    let previousDoc: Gamedoc | null = null;
    let nextDoc: Gamedoc | null = null;
    if(idx > 0){
        previousDoc = lineardocs[idx-1];
    }
    if(idx < lineardocs.length -1){
        nextDoc = lineardocs[idx+1];
    }

    useEffect(()=>{
        dispatch(navSlice.actions.setTrayPage('ruletree'));
        dispatch(assetSlice.actions.setAssetView({name: 'rules', img: null, type: 'rules', system: { foundrytype: 'rules', doc: doc, hierarchy: hierarchy, treedocs: treedocs, lineardocs: lineardocs}}));
    }, [doc]);

    return(
        <div className={styles.nav}>
            <div className={styles.quickwrapper}>
                {previousDoc ? <button className={buttonstyles.left} disabled={!previousDoc} onClick={() => router.push(`/rule/${previousDoc?._id}`)}>{`\u00AB${previousDoc?.name}`}</button> : <div/> }
                <div></div>
                {nextDoc ? <button className={buttonstyles.right} onClick={() => router.push(`/rule/${nextDoc?._id}`)}>{`${nextDoc?.name}\u00BB`}</button> : <div/> }
            </div>
        </div>
    )
}