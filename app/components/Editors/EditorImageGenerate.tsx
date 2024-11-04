import { useState, useEffect } from "react";
import axios from 'axios';
import styles from './editor.module.css';
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { genSlice, selectHeight, selectImgData, selectLastNegPrompt, selectLastPrompt, selectNumImages, selectPreset, selectToken, selectWidth } from "@/lib/redux";

function EditorImageGenerate(props: any) {
    const dispatch = useDispatch();
    const [imagePrompts, setImagePrompts]: any = useState([]); //'b826ccfb-76bc-4fa0-841b-456c0b09f4d7'
    const [working, setWorking] = useState(false);
    const token = useSelector(selectToken);

    const [imgStyles, setImgStyles]: any = useState([]);

    const negative = useSelector(selectLastNegPrompt);
    const setNegative = (value: string) => dispatch(genSlice.actions.setLastNegPrompt(value));
    const prompt = useSelector(selectLastPrompt);
    const setPrompt = (value: string) => dispatch(genSlice.actions.setLastPrompt(value));
    const preset = useSelector(selectPreset);
    const setPreset = (value: string) => dispatch(genSlice.actions.setPreset(value));
    const height = useSelector(selectHeight);
    const setHeight = (value: number) => dispatch(genSlice.actions.setHeight(value));
    const width = useSelector(selectWidth);
    const setWidth = (value: number) => dispatch(genSlice.actions.setWidth(value));
    const numImages = useSelector(selectNumImages);
    const setNumImages = (value: number) => dispatch(genSlice.actions.setNumImages(value));
    const data = useSelector(selectImgData);
    const setData = (value: any) => dispatch(genSlice.actions.setImgData(value));

    useEffect(()=> {
        if(imgStyles.length == 0){
            (async function() {
                try {
                    let headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer: ${token}`
                    };
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/imgstyles`, { headers: headers });
                    setImgStyles(res.data.data);
                } catch (e) {
                    console.error(e);
                }
              })();
        }
    }, []);


    const generateImage = async () => {
        if(!working && prompt.length > 10){
            setWorking(true);
            try{
                let headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${token}`
                };
                let leopayload = {prompt: prompt, numImages: numImages, negative: negative, preset: preset, imagePrompts: imagePrompts, height: height, width: width};
                let res = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/generate/image`, leopayload, {headers: headers});
                setData(res.data);
            } catch (e){
                console.log('generateImage', e);
            }
            setWorking(false);
        }
    }

    return (
        <div style={{position: 'relative', paddingTop: '40px', display: props.hidden ? 'none': 'block'}}>
            <div>
                <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>GenerativeTools</div>
                <div>
                    <div className={styles.editdiv}>
                        <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Prompt</div>
                        <input className={styles.inputstr} type="text" value={prompt} onChange={(e)=>setPrompt(e.target.value)} />
                    </div>
                    <div className={styles.editdiv}>
                        <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Negative</div>
                        <input className={styles.inputstr} type="text" value={negative} onChange={(e)=>setNegative(e.target.value)} />
                    </div>
                    <div className={styles.statsflex}>
                        <div className={styles.editdiv}>
                            <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Preset</div>
                            <select className={styles.inputstr} value={preset} onChange={(e)=>setPreset(e.target.value)}>
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
                        </div>
                        <div className={styles.editdiv}>
                            <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Battlemap Preset</div>
                            <select 
                                className={styles.inputstr} 
                                value={imagePrompts.length == 0 ? 'NONE' : imagePrompts[0]}
                                onChange={(e)=>{
                                    if(e.target.value){
                                        if(e.target.value == "NONE"){
                                            setImagePrompts([]);
                                        } else {
                                            setImagePrompts([String(e.target.value)]);
                                        }
                                    }
                                }}>
                                    <option value="NONE">NONE</option>
                                    {
                                        imgStyles.map((el: any, idx: number)=> {
                                            return(
                                                <option key={idx} value={el.system.image_id}>
                                                    {el.name}
                                                </option>
                                            )
                                        })
                                    }
                                    {
                                        /*
                                        <option value="e572347e-0788-47c8-8d23-34de2dd9a9e0">BADLANDS</option>
                                        <option value="3d7912c4-daa7-4d52-807d-3f0a8c0af3ef">FOREST</option>
                                        <option value="24e81641-42ae-4cb7-b6b3-11c79e85f5a5">SWAMP</option>
                                        <option value="a2692c89-6cb7-4f40-bb1c-0cd2391a0210">FOREST ROAD</option>
                                        <option value="ede6804d-6f0e-45e7-ba8a-b40f9e4d04c4">LAKESHORE</option>
                                        */
                                    }
                            </select>
                        </div>
                        <div className={styles.editdiv}>
                            <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Height</div>
                            <input className={styles.inputnum} type="number" value={height} min={512} max={1536} onChange={(e)=>setHeight(Number(e.target.value))}/>
                        </div>
                        <div className={styles.editdiv}>
                            <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Width</div>
                            <input className={styles.inputnum} type="number" value={width} min={512} max={1536} onChange={(e)=>setWidth(Number(e.target.value))}/>
                        </div>
                        <div className={styles.editdiv}>
                            <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Num Images</div>
                            <input className={styles.inputnum} type="number" value={numImages} min={1} max={4} onChange={(e)=>setNumImages(Number(e.target.value))}/>
                        </div>
                        <button onClick={()=>generateImage()}>{working ? 'WORKING' : 'GO'}</button>
                    </div>
                </div>
                <div className={styles.imagedivcontainer}>
                    <div className={styles.imagedivpreview}>
                    {
                        data.map((el: any, idx: number)=> {
                            return(<div className={styles.imgdivsmall} onClick={()=>props.updateImageFromDoc(el)} key={idx}><img className={styles.imgimgsmall} src={el.img} /></div>);
                        })
                    }
                    </div>
                    {
                        data.map((el: any, idx: number)=> {
                            return(<div className={styles.imgdiv} onClick={()=>props.updateImageFromDoc(el)} key={idx}><img className={styles.imgimg} src={el.system.img} /></div>);
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default EditorImageGenerate;
