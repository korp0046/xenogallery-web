
import _ from 'lodash';
import { useState } from "react";
import styles from './editor.module.css';
import EditorImageGenerate from './EditorImageGenerate';
import { useDispatch } from 'react-redux';
import { assetSlice, modalSlice } from '@/lib/redux';
import EditorGroupDiv from './EditorGroupDiv';
import EditorString from './EditorString';
import EditorIcon2 from './EditorIcon2';

export function EditorImage(props: any) {
    const dispatch = useDispatch();
    const [prompt, setPrompt] = useState(props.doc?.system?.appearance ? props.doc?.system?.appearance : props.doc.name);
    const [thumbTab, setThumbTab] = useState(true);
    const [generateTab, setGenerateTab] = useState(false);
    const [selected, setSelected] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState(false);

    const updateImageFromDoc = (imageDoc: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.img = imageDoc.img;
        tempDoc.system.img = imageDoc.system.img;
        props.setDoc(tempDoc);
    }

    const updateImageManual = (imageUrl: string) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.img = imageUrl;
        props.setDoc(tempDoc);
    }

    const updateSystemImageManual = (imageUrl: string) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.img = imageUrl;
        props.setDoc(tempDoc);
    }

    const openSelectImageModal = () => {
        dispatch(modalSlice.actions.openModal('images'));
        dispatch(assetSlice.actions.setModeSelect(true));
    }

    const hasText = props.doc.img != "";
    const hasTextSystem = props.doc.system.img != "";

    if(Object.hasOwn(props.doc, "img")){
        return (
            <EditorGroupDiv label="Images">
                <div className={styles.controls}>
                    <button onClick={()=>openSelectImageModal()}>SELECT IMAGE</button>
                    <button onClick={()=>setGenerateTab(!generateTab)}>GENERATE IMAGE</button>
                    <button onClick={()=>setThumbTab(!thumbTab)}>TOGGLE IMAGES</button>
                    <div className={styles.editdiv + ' ' + (props.grow ? styles.grow : '')}>
                        <input className={styles.inputstr} type="text" value={props.doc.img} onChange={(e: any)=>updateImageManual(e.target.value)} onFocus={()=>setSelected(true)} onBlur={()=>setSelected(false)} />
                        <div className={styles.inputstrheader + ' ' + (selected || hasText ? styles.inputstrheaderselect : '')}>Small Image</div>
                    </div>
                    <div className={styles.editdiv + ' ' + (props.grow ? styles.grow : '')}>
                        <input className={styles.inputstr} type="text" value={props.doc.system.img} onChange={(e: any)=>updateSystemImageManual(e.target.value)} onFocus={()=>setSelected(true)} onBlur={()=>setSelected(false)} />
                        <div className={styles.inputstrheader + ' ' + (selected || hasText ? styles.inputstrheaderselect : '')}>Large Image</div>
                    </div>
                    <EditorIcon2 doc={props.doc} setDoc={props.setDoc}/>
                    <EditorImageGenerate hidden={!generateTab} doc={props.doc} updateImageFromDoc={updateImageFromDoc}/>
                </div>
                <div className={styles.imgdiv}>
                {
                    thumbTab ? 
                    <img src={props.doc.img}/>
                    :
                    <img src={props.doc.system.img}/>
                }
                    
                </div>
            </EditorGroupDiv>
          );
    } else {
      return null;
    }

}

export default EditorImage;

/*
        <div className={props.isDesktop ? props.menuState ? styles.wrapperOpenD : styles.wrapperClosedD : props.menuState ? styles.wrapperOpenM : styles.wrapperClosedM}>
            <div className={styles.wrapperRight}>
                <div>
                    <div className="inputheader">Prompt</div>
                    <input className="inputstr" type="text" value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
                    <div className="inputheader">Negative</div>
                    <input className="inputstr" type="text" value={negative} onChange={(e)=>setNegative(e.target.value)} />
                    <div className="inputheader">Preset</div>
                    <select className="inputselect" value={preset} onChange={(e)=>setPreset(e.target.value)}>
                            <option value="NONE">NONE</option>
                            <option value="ANIME">ANIME</option>
                            <option value="CREATIVE">CREATIVE</option>
                            <option value="DYNAMIC">DYNAMIC</option>
                            <option value="ENVIRONMENT">ENVIRONMENT</option>
                            <option value="GENERAL">GENERAL</option>
                            <option value="ILLUSTRATION">ILLUSTRATION</option>
                            <option value="PHOTOGRAPHY">PHOTOGRAPHY</option>
                            <option value="RAYTRACED">RAYTRACED</option>
                            <option value="RENDER_3D">RENDER_3D</option>
                            <option value="SKETCH_BW">SKETCH_BW</option>
                            <option value="SKETCH_COLOR">SKETCH_COLOR</option>
                    </select>
                    <button onClick={()=>generateImage()}>{working ? 'WORKING' : 'GO'}</button>
                </div>
                <div className={styles.imagedivcontainer}>
                    <div className={styles.imagedivpreview}>
                    {
                        data.map((el, idx)=> {
                            return(<div className={styles.imgdivsmall} key={idx}><img className={styles.imgimgsmall} src={el.img} /></div>);
                        })
                    }
                    </div>
                    {
                        data.map((el, idx)=> {
                            return(<div className={styles.imgdiv} key={idx}><img className={styles.imgimg} src={el.img} /></div>);
                        })
                    }
                </div>
            </div>
        </div>
*/