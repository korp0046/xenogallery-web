'use client';
import { useState, useEffect } from "react";
import axios from 'axios';
import styles from './editor.module.css';
import stylesgen from './generate.module.css';
import _ from 'lodash';
import { useDispatch, useSelector } from "react-redux";
import { genSlice, selectControlnets, selectHeight, selectImgData, selectLastNegPrompt, selectLastPrompt, selectModels, selectNumImages, selectPreset, selectToken, selectWidth } from "@/lib/redux";
import { toast } from "react-toastify";

function ControlNetCard(props: any){
    const data = props.data;
    const dispatch = useDispatch();

    const setPreprocessor = (keyString:string) => {
        let keyInt = 67; //default to style
        switch (keyString) {
            case 'style':
                keyInt = 67;
                break;
            case 'character':
                keyInt = 133;
                break;
            case 'content':
                keyInt = 100;
                break;
            case 'edge':
                keyInt = 19;
                break;
            case 'depth':
                keyInt = 20;
                break;
            case 'pose':
                keyInt = 21;
                break;
            case 'text':
                keyInt = 22;
                break;
            default:
                keyInt = 67;
                toast("Preprocessor defaulting to 67");

        }
        dispatch(genSlice.actions.updateControlnet({...data, preprocessorId: keyInt, preprocessorIdStr: keyString}));
    }

    const setStrength = (keyString: string) => {
        let keyOutput = "Mid"; //default to style
        switch (keyString) {
            case 'low':
                keyOutput = "Low";
                break;
            case 'mid':
                keyOutput = "Mid";
                break;
            case 'high':
                keyOutput = "High";
                break;
            default:
                keyOutput = "Mid";
                toast("Preprocessor defaulting to Mid strength.");
        }
        dispatch(genSlice.actions.updateControlnet({...data, strengthType: keyOutput, strengthTypeStr: keyString}));
    }

    console.log(data);

    return(
    <div className={stylesgen.controlnetcard}>
        <button onClick={()=>dispatch(genSlice.actions.popControlnet(data.name))}>X</button>
        <div className={stylesgen.controlnetcardgrid}>
            <img src={data.url} />
            <div className={stylesgen.controlnetcontrols}>
                <select className={styles.inputnum} value={data.preprocessorIdStr} onChange={(e)=>setPreprocessor(e.target.value)}>
                    <option value="style">Style</option>
                    <option value="character">Character</option>
                    <option value="content">Content</option>
                    <option value="edge">Edge</option>
                    <option value="depth">Depth</option>
                    <option value="pose">Pose</option>
                    <option value="text">Text</option>
                </select>
                <select className={styles.inputnum} value={data.strengthTypeStr} onChange={(e)=>setStrength(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="mid">Mid</option>
                    <option value="high">High</option>
                </select>
            </div>
        </div>
    </div>
    )
}


function EditorImageGenerate(props: any) {
    const dispatch = useDispatch();
    const [imagePrompts, setImagePrompts]: any = useState([]); //'b826ccfb-76bc-4fa0-841b-456c0b09f4d7'
    const [working, setWorking] = useState(false);
    const token = useSelector(selectToken);

    const [imgStyles, setImgStyles]: any = useState([]);

    const [useModel, setUseModel]: any = useState({
        "id": "2067ae52-33fd-4a82-bb92-c2c55e7d2786",
        "name": "AlbedoBase XL",
        "description": "A great generalist model that tends towards more CG artistic outputs. By albedobond.",
        "nsfw": false,
        "featured": true,
        "generated_image": {
            "id": "2590401b-a844-4b79-b0fa-8c44bb54eda0",
            "url": "https://cdn.leonardo.ai/users/384ab5c8-55d8-47a1-be22-6a274913c324/generations/6a441e3f-594d-442f-b70b-0d867a09e589/AlbedoBase_XL_A_sleek_and_menacing_dwarf_his_metallic_body_gle_3.jpg"
        }
    });


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
    const models = useSelector(selectModels);
    const setModels = (value: any) => dispatch(genSlice.actions.setModels(value));
    const controlnets = useSelector(selectControlnets);
    const setControlnets = (value: any) => dispatch(genSlice.actions.setControlnets(value));

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

    useEffect(()=> {
        if(models.length == 0){
            (async function() {
                try {
                    let headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer: ${token}`
                    };
                    const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/generate/models`, { headers: headers });
                    const models = res?.data?.data?.custom_models || [];
                    dispatch(genSlice.actions.setModels(models));
                } catch (e) {
                    console.error(e);
                }
              })();
        }
    }, []);

    const cleanControlnets = (controlnetsArr: Array<any>) => {
        return controlnetsArr.map((el: any)=>{
            return({
                initImageId: el.initImageId,
                initImageType: el.initImageType,
                preprocessorId: el.preprocessorId,
                strengthType: el.strengthType,
                influence: el.influence
            });
        })

    }


    const generateImage = async () => {
        if(!working && prompt.length > 10){
            setWorking(true);
            try{
                let headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${token}`
                };
                let mappedcn = controlnets.map((el: any)=> {
                    return({
                        initImageId: el.initImageId,
                        initImageType: el.initImageType,
                        preprocessorId: el.preprocessorId,
                        strengthType: el.strengthType,
                    })
                })
                let leopayload = {prompt: prompt, numImages: numImages, negative: negative, preset: preset, imagePrompts: imagePrompts, height: height, width: width, model: useModel, controlnets: cleanControlnets(mappedcn)};
                let res = await axios.post(`${process.env.NEXT_PUBLIC_SERVICE_HOST}/api/generate/image`, leopayload, {headers: headers});
                setData(res.data);
            } catch (e){
                console.log('generateImage', e);
            }
            setWorking(false);
        }
    }

    return (
        <div style={{position: 'relative', paddingTop: '40px', display: 'block'}}>
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
                    <div className={stylesgen.controlnetdiv}>
                            <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Controlnets</div>
                            <div>
                                {
                                    controlnets.map((el: any, idx: number)=> {
                                        return(<ControlNetCard data={el} idx={idx}/>)
                                    })
                                }
                            </div>
                        </div>
                    <div className={styles.statsflex}>
                        <div className={styles.editdiv}>
                            <div className={styles.inputstrheader + ' ' + styles.inputstrheaderselect}>Model</div>
                            <select className={styles.inputstr} value={useModel.name} onChange={(e)=>{
                                let model = models.find((el:any)=>el.name == e.target.value);
                                if(model){
                                    setUseModel(model);
                                }}
                            }>
                                {
                                    models.map((el: any, idx: number)=> {
                                        return(
                                            <option key={idx} value={el.name}>{el.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
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
                            return(<div className={styles.imgdivsmall} key={idx}><img className={styles.imgimgsmall} src={el.urlThumb} /></div>);
                        })
                    }
                    </div>
                    {
                        data.map((el: any, idx: number)=> {
                            return(<div className={styles.imgdiv} key={idx}><img className={styles.imgimg} src={el.url} /></div>);
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default EditorImageGenerate;
