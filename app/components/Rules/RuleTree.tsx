"use client";
import { docBodyProcessor, gameDocMapper, md2html } from '@/lib/util/util';
import styles from './rules.module.css';
import corestyles from '../../styles/layout.module.css';
import buttonstyles from '../../styles/button.module.css';
import { useRouter } from 'next/navigation';
import { Gamedoc } from '@/lib/util/assetTypes';
import _ from 'lodash';
import { useState } from 'react';
import SimpleIconButtonXS from '../SimpleLabel/SimpleIconButtonXS';
import { uiIcons } from '@/lib/gamedata/imgAssets';
import { useSelector } from 'react-redux';
import { selectAssetView } from '@/lib/redux';

export function RuleTree(props: any) {
    const router = useRouter();
    const assetView: any = useSelector(selectAssetView);
    const doc = assetView.system.doc;
    const treedocs = assetView.system.treedocs;
    const lineardocs = assetView.system.lineardocs;
    const hierarchy = assetView.system.hierarchy;
    const inHierarchy = hierarchy.find((tDoc: Gamedoc)=> String(tDoc._id) == String(doc._id)) ? true : false;
    let rows = [];
    for(let item of hierarchy){
        let row = lineardocs.filter((el: Gamedoc)=>el.system.parent == item.system.parent);
        rows.push(row);
    }
    let lastRow = lineardocs.filter((tDoc: Gamedoc)=> String(tDoc.system.parent) == String(doc._id));
    if(lastRow.length > 0){
        rows.unshift(lastRow);
    }
    const diamonds = [];
    if(doc.depth){
        for(let i=0; i<doc.depth; i++){
            diamonds.push('&#8900; ');
        }
    }
    let diamondsjsx = diamonds.map((el: any, idx: any)=>{
        return(<span key={idx} dangerouslySetInnerHTML={{__html: el}}></span>);
    })
    return(
        <div className={`${styles.accordionblock}`}>
            {
                rows.reverse().map((arr0: Array<Gamedoc>, idx: number)=> {
                    return(
                        <div key={idx} className={`${styles.navrow}`}>
                        {
                            arr0.map((subdoc: Gamedoc, idx: number)=> {
                                const inHierarchy = hierarchy.find((tDoc: Gamedoc)=> String(tDoc._id) == String(subdoc._id)) ? true : false;
                                return(
                                    <div key={idx} className={`${styles.navcell} ${inHierarchy ? styles.highlight: ''}`}  onClick={() => router.push(`/rule/${subdoc?._id}`)}>
                                        {subdoc.name}
                                    </div>
                                )
                            })
                        }
                        </div>
                    )
                })
            }
        </div>
    )
}