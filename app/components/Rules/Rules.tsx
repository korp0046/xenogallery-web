"use client";
import { docBodyProcessor, gameDocMapper, md2html } from '@/lib/util/util';
import styles from './rules.module.css';
import corestyles from '../../styles/layout.module.css';
import pagestyles from '../../styles/page.module.css';
import { useRouter } from 'next/navigation';
import { Gamedoc } from '@/lib/util/assetTypes';
import RulesNav from './RulesNav';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { assetSlice, navSlice } from '@/lib/redux';

export function Title(props: any) {
    let depthstyle = styles.title0;
    if(Object.hasOwn(props.data, "depth")){
        depthstyle = styles[`title${props.data.depth}`]
    }
    const diamonds = [];
    if(props.data.depth){
        for(let i=0; i<props.data.depth; i++){
            diamonds.push('&#8900;');
        }
    }

    return(
        <div id={props.data.system.directpath} className={depthstyle}>
            <span>
            { diamonds.map((el: any, idx: any)=>{
                return(<span key={idx} dangerouslySetInnerHTML={{__html: el}}></span>);
            })}
            </span>
            <span>
            {props.data.name}
            </span>
            <span>
            { diamonds.map((el: any, idx: any)=>{
                return(<span key={idx} dangerouslySetInnerHTML={{__html: el}}></span>);
            })}
            </span>
        </div>
    )
}

export function Brief(props: any) {
    let depthstyle = styles.brief0;
    if(Object.hasOwn(props.data, "depth")){
        depthstyle = styles[`brief${props.data.depth}`];
    }
    return(
        <div className={depthstyle}>{props.data.system.brief}</div>
    )
}

export function RuleBody(props: any) {
    let depthstyle = "";
    if(Object.hasOwn(props.data, "depth")){
        depthstyle = styles[`depth${props.data.depth}`];
    }
    return(
        <div className={styles.rulebody + " " + depthstyle} dangerouslySetInnerHTML={{__html: md2html(props.data.system.text)}} />
    )
}

export function DynamicImg(props: any) {
    const tagsalt = props.data.system.tagsalt.split(',');
    const hasImg = props.data.system.img && props.data.system.img.length > 0;
    if(hasImg){
        return(
            <div className={`${styles.dynamicimg} ${tagsalt.includes('webimgbottom') ? styles.flexend : ''}`}>
                <img src={props.data.system.img} />
            </div>
        )
    } else {
        return null;
    }
}

export function RuleEntry(props: any) {
    const tagsalt = props.data.system.tagsalt.split(',');
    "webimgbefore"
    return(
        <div id={props.data._id} className={styles.sectionwrapper}>
            <div className={styles.parentwrapper}>
                { tagsalt.includes("webimgbefore") ? <DynamicImg data={props.data}/> : null}
                <Title data={props.data}/>
                <Brief data={props.data}/>
                <RuleBody data={props.data}/>
                { tagsalt.includes("webimgafter") ? <DynamicImg data={props.data}/> : null}
            </div>
            {
                props.data.children ? 
                <div className={styles.childrenwrapper}>
                    {
                        props.data.children.map((el: any, idx: any)=> {
                            return <RuleEntry key={idx} data={el} />
                        })
                    }
                </div>
                :  null
            }
        </div>
    )
}

export function RuleEntrySolo(props: any) {
    const router = useRouter();
    const lineardocs: Array<Gamedoc> = props.linear;
    const idx = props.data ? lineardocs.findIndex((el: Gamedoc)=> String(el._id) == String(props.data._id)): -1;
    const doc: Gamedoc = lineardocs[idx] || props.data;
    const mappeddocs: Array<Gamedoc> = props.mapped;
    return(
        <div className={pagestyles.root}>
            <RulesNav doc={doc} linear={lineardocs} mapped={mappeddocs} />
            <div className={styles.rulemain}>
                <RuleEntry data={doc}/>
            </div>
        </div>
    )
}

export default function Rules(props: any) {
    const router = useRouter();
    const dispatch = useDispatch();
    const data = props.data;

    useEffect(()=> {
        dispatch(navSlice.actions.setTrayPage('default'));
    }, []);
    
    return (
        <div className={pagestyles.root}>
            <div className={styles.rulemain}>
            {
                data.map((el: any, idx: number)=> {
                    return(<RuleEntry key={idx} data={el} />);
                })
            }
            </div>
        </div>
    )
}