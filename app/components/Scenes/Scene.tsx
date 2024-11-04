'use client'

/* Core */
import ObjectID from "bson-objectid";
import _ from 'lodash';
import { useEffect, useRef, useState } from "react";
import useContextMenu from '../../hooks/useContextMenu';
import { SceneContextMenu } from "./SceneContextMenu";
/* Instruments */
import {
  ViewBox,
  livesceneSlice,
  sceneSlice,
  selectActiveScene,
  selectDroppable,
  selectGame,
  selectLiveActors,
  selectLiveScenes,
  selectSelectedNode,
  selectUsername,
  selectViewBox,
  useDispatch,
  useSelector
} from '@/lib/redux';

import assets from "../../../lib/gamedata/exploreAssets";
import { MapEdge, MapNode } from "@/lib/util/assetTypes";
import { isGMFunc, lookupLiveAny } from "@/lib/util/util";
import Loading from "../Loading/Loading";
import { toast } from "react-toastify";

let lastSvgCoordState: any = {x: 0, y: 0};
let touchStartCoords: any = {x: 0, y: 0};
let mobile: boolean = false;
let justmoved: boolean = false;
let updateIdx = 0;

const getNewEdge = (uuid_1: string, uuid_2: string):MapEdge => {
  return {
    id: String(ObjectID()),
    id_start: uuid_1,
    id_end: uuid_2
  }
}

const getNewNode = (coords: any):MapNode => {
  const newX = coords.x || 100;
  const newY = coords.y || 100;
  return {
    id: String(ObjectID()),
    linkedObject: null,
    name: "Placeholder",
    x: newX,
    y: newY,
    active: false,
    icon: assets.nodeIcons.CIRCLE,
    size: 2,
    offset: { x: 0, y: 0 },
    descPriv: "",
    descPub: "",
    fog: 0
  }
}

const Line = (props: any) => {

  if(props.visible){
    return (
      <line
      x1={props.edgeCoords[0]}
      y1={props.edgeCoords[1]}
      x2={props.edgeCoords[2]}
      y2={props.edgeCoords[3]}
      stroke="url(#linear)"
      strokeWidth="3px"
    />
    );

  } else {
    return null;
  }
};

const sizeMapper = (intSize: any, scale: number) => {
  if(typeof intSize == 'number'){
    if(intSize <= 0){
      return Math.floor(scale * 0.5);
    } else if (intSize == 1){
      return Math.floor(scale * 0.75);
    } else if (intSize == 2){
      return scale;
    } else if (intSize == 3){
      return scale * 2;
    } else if (intSize == 4) {
      return scale * 3;
    } else if (intSize >= 5) {
      return scale * 4;
    } else {
      return scale;
    }
  }
  return scale;
}
const LightEmitter = (props: any) => {
  const liveactors = useSelector(selectLiveActors);
  const livescenes = useSelector(selectLiveScenes);
  let liveObject = props.data.linkedObject ? lookupLiveAny(props.data.linkedObject, liveactors, livescenes) : null;
  let tempSize = liveObject ? liveObject.system.size : props.data.size;
  let size = sizeMapper(tempSize, props.grid.scale);
  return (
    <g
    transform={"translate(" + String(props.data.x) + " " +  String(props.data.y) + ")"}
    >
      <circle
        r={Math.round(size * 3)}
        fill="black"
        x={props.data.x}
        y={props.data.y}
      />
    </g>
  );
}

const Circle = (props: any) => {
  const selectedNode = useSelector(selectSelectedNode);
  const { clicked, setClicked, points, setPoints } = useContextMenu();
  const [lastTouch, setLastTouch] = useState(0);
  const liveactors = useSelector(selectLiveActors);
  const livescenes = useSelector(selectLiveScenes);
  let liveObject = props.data.linkedObject ? lookupLiveAny(props.data.linkedObject, liveactors, livescenes) : null;
  let icon = props.data.icon;
  let fog = props.data.fog;
  let useImg = false;
  if(!fog){
    if(liveObject && Object(liveObject.system).hasOwnProperty('icon') && liveObject.system.icon){
      icon = liveObject.system.icon;
    } else if (liveObject && Object(liveObject).hasOwnProperty('img') && liveObject.img){
      icon = liveObject.img;
      useImg = true;
    }
  } else {
    icon = assets.nodeIcons.QUESTION;
  }
  let tempSize = liveObject ? liveObject.system.size : props.data.size;
  let name = liveObject ? liveObject.name : props.data.name;

  let size = sizeMapper(tempSize, props.grid.scale);
  let sizeImg = useImg ? size * Math.sqrt(2) : size;

  const handlePointerDown = (e: any) => {
    if(!mobile){
      const bbox = e.target.getBoundingClientRect();
      const x = e.clientX - bbox.left;
      const y = e.clientY - bbox.top;
      if (e.which === 3 || e.button === 2){
        setClicked(true);
        setPoints({x: x, y: y});
      } else {
        const el = e.target;
        el.setPointerCapture(e.pointerId);
        props.updateNode({
          ...props.data,
          active: true,
          offset: {
            x,
            y
          }
        });
  }}};

  const handlePointerMove = (e: any) => {
    if(!mobile && updateIdx%2 == 0){
    const bbox = e.target.getBoundingClientRect();
    const x = e.clientX - bbox.left;
    const y = e.clientY - bbox.top;
    if (props.data.active) {
      props.updateNode({
        active: true,
        ...props.data,
        x: props.data.x - (props.data.offset.x - x),
        y: props.data.y - (props.data.offset.y - y)
      });
    }
  }
    updateIdx = updateIdx + 1;
  };

  const handlePointerUp = (e: any) => {
    if(!mobile){
    props.updateNode({
      ...props.data,
      active: false
    });
  };
};

  const handleTouchDown = (e: any) => {
    mobile = true;
    setLastTouch(Date.now());
    props.setMovingCircle(true);
    const bbox = e.target.getBoundingClientRect();
    const x = e.changedTouches[0].clientX - bbox.left;
    const y = e.changedTouches[0].clientY - bbox.top;
    const el = e.target;
    el.setPointerCapture(e.pointerId);
    props.updateNode({
      ...props.data,
      active: true,
      offset: {
        x,
        y
      }
    });
  };

  const handleTouchMove = (e: any) => {
    mobile = true;
    const bbox = e.target.getBoundingClientRect();
    const x = e.changedTouches[0].clientX - bbox.left;
    const y = e.changedTouches[0].clientY - bbox.top;
    if (props.data.active) {
      props.updateNode({
        active: true,
        ...props.data,
        x: props.data.x - (props.data.offset.x - x),
        y: props.data.y - (props.data.offset.y - y)
      });
    }
  };

  const handleTouchUp = (e: any) => {
    mobile = true;
    props.updateNode({
      ...props.data,
      active: false
    });
    props.setMovingCircle(false);
    if(lastTouch >= Date.now() - 400){
      toast('EditNode TODO');
    }
  };

  const highlight = props.data.active || selectedNode == props.id;

  return (
    <g
    transform={"translate(" + String(props.data.x) + " " +  String(props.data.y) + ")"}
    onContextMenu={(e)=>e.preventDefault()}
    onPointerDown={handlePointerDown}
    onPointerUp={handlePointerUp}
    onPointerMove={handlePointerMove}
    onTouchStart={handleTouchDown}
    onTouchEnd={handleTouchUp}
    onTouchMove={handleTouchMove}
    >
      <text x='0' y={-(Math.round(size/2)+15)} className="nodeName" dominantBaseline="middle" textAnchor="middle">{fog ? '?' :name}</text>
      <circle
        r={props.type == 'node' ? Math.round(size/2)+5 : Math.round(size/2)}
        fill="rgba(0,0,0,0.8)"
        x={props.data.x}
        y={props.data.y}
        id={props.id}
        strokeWidth={highlight ? 5 : 0}
        stroke="blue"
      />
      <image clipPath={`url(#${props.data.id})`} x={-Math.round(sizeImg/2)} y={-(Math.round(sizeImg/2))} width={sizeImg} height={sizeImg} href={icon} style={{userSelect: 'none', pointerEvents: 'none'}}/>
    </g>
  );
};

function SceneExploreInner(props: any) {
  const dispatch = useDispatch();
  const { clicked, setClicked, points, setPoints, clickObj, setClickObj, clickId, setClickId, svgPoints, setSvgPoints } = useContextMenu();
  const liveactors = useSelector(selectLiveActors);
  const livescenes = useSelector(selectLiveScenes);
  const [scrolling, setScrolling] = useState(false);
  const [moving, setMoving] = useState(false);
  const [movingCircle, setMovingCircle] = useState(false);
  const [mouseCoords, setMouseCoords] = useState({x: 0, y: 0});
  const [viewDims, setViewDims] = useState({w: window.innerWidth, h: window.innerHeight})
  const droppable = useSelector(selectDroppable);
  let isGM = isGMFunc();

  const viewBox = useSelector(selectViewBox);
  const setViewBox = (vb: ViewBox)=>dispatch(sceneSlice.actions.updateViewBox(vb))

  const getEdgeCoords = (edge: any) => {
    const edgeCoords = [];
    for(let i=0; i<props.mapState.system.nodes.length; i++){
      const node = props.mapState.system.nodes[i];
      if(node.id == edge.id_end || node.id == edge.id_start){
        edgeCoords.push(node.x);
        edgeCoords.push(node.y);
      }
    }
    return edgeCoords;
  }

  const getVisible = (edge: any) => {
    let fogSum = 0;
    for(let i=0; i<props.mapState.system.nodes.length; i++){
      const node = props.mapState.system.nodes[i];
      if(node.id == edge.id_end || node.id == edge.id_start){
        if(node.fog){
          fogSum += node.fog;
        }
      }
    }
    return fogSum <= 1;
  }

  return (
    <div style={{position: 'absolute', overflow: 'hidden', height: window.innerHeight + 'px', width: window.innerWidth + 'px', zIndex: 1, top: '0px', left: '0px'}}>
      <svg
        ref={props.svgRef}
        overflow="scroll"
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        onContextMenu={(e)=>e.preventDefault()}
        onWheel={(e) => {
          let w = viewBox.w;
          let h = viewBox.h;
          let mx = e.nativeEvent.offsetX;//mouse x  
          let my = e.nativeEvent.offsetY;    
          let dw = w*Math.sign(e.deltaY)*0.05;
          let dh = h*Math.sign(e.deltaY)*0.05;
          let dx = dw*mx/(props.svgRef.current.clientWidth);
          let dy = dh*my/(props.svgRef.current.clientHeight);
          let newViewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w-dw,h:viewBox.h-dh};
          let scale = props.svgRef.current.clientWidth/newViewBox.w;
          setViewDims({w: newViewBox.w, h: newViewBox.h});
          setViewBox(newViewBox);
       }}
        onTouchMove={(e: any)=>{
          mobile = true;
          if(!moving && !movingCircle){
            let touchEndCoords = {x: 0, y: 0};
            if(e && e.changedTouches && e.changedTouches.length){
              touchEndCoords = {x: e.changedTouches[0].pageX ,y: e.changedTouches[0].pageY};
              let tempX = (touchStartCoords.x - touchEndCoords.x) / 10;
              let tempY = (touchStartCoords.y - touchEndCoords.y) / 10;
              let targetX = viewBox.x + tempX;
              let targetY = viewBox.y + tempY;
              let newX = Math.min(Math.max(targetX, -window.innerWidth), props.imageDimensions.width - window.innerWidth + window.innerWidth);
              let newY = Math.min(Math.max(targetY, -window.innerHeight), props.imageDimensions.height - window.innerHeight + window.innerHeight);
              const newCoordsFinal = {x: newX, y: newY};
              setViewBox({...viewBox, ...newCoordsFinal});
            }
          }

        }}
        onTouchStart={(e: any)=>{
          if(!movingCircle){
            mobile = true;
            if(e && e.changedTouches && e.changedTouches.length){
              touchStartCoords = {x: e.changedTouches[0].pageX ,y: e.changedTouches[0].pageY};
            }
          }

        }}
        onTouchEnd={(e: any)=>{
          mobile = true;
        }}
        onPointerDown={(e: any)=>{
          if (e.which === 3 || e.button === 2){
            setClicked(true);
            const el = e.target;
            const maybeX = el.getAttribute("x");
            const maybeY = el.getAttribute("y");
            const nodeName = el.nodeName;
            const id = el.getAttribute("id");
            let x = 0;
            let y = 0;
            if(maybeX && maybeY && nodeName != 'image'){
              x = maybeX;
              y = maybeY;
              setMouseCoords({x: e.clientX, y: e.clientY});
              setClickObj('node');
              setClickId(id);
              setMoving(true);
            } else {
              let pt = props.svgRef.current.createSVGPoint();
              pt.x = e.clientX;
              pt.y = e.clientY;
              let cursorpt =  pt.matrixTransform(props.svgRef.current.getScreenCTM().inverse());
              const bbox = e.target.getBoundingClientRect();
              x = e.clientX - bbox.left;
              y = e.clientY - bbox.top;
              setMouseCoords({x: e.clientX, y: e.clientY});
              setSvgPoints({x: cursorpt.x, y: cursorpt.y});
              setClickObj('map');
              setClickId(null);
            }
            
            setPoints({x: x, y: y});
          } else if (e.button === 1){
            setScrolling(true);
            document.documentElement.style.cursor = 'grab';
          } else if (e.button === 0){
            if(e.target.getAttribute("id") == "background"){
              if(droppable){
                //drop item
                let pt = props.svgRef.current.createSVGPoint();
                pt.x = e.clientX;
                pt.y = e.clientY;
                let cursorpt =  pt.matrixTransform(props.svgRef.current.getScreenCTM().inverse());
                props.addActorToken(cursorpt, droppable);
              } else {
                document.documentElement.style.cursor = 'grab';
                let pt = props.svgRef.current.createSVGPoint();
                pt.x = e.clientX;
                pt.y = e.clientY;
                setScrolling(true);
                setMoving(false);
              }
            }
          }
        }}
        onPointerUp={(e)=>{
          document.documentElement.style.cursor = 'auto';
          setScrolling(false);
          setMoving(false);
        }}
        onMouseMove={(e: any)=>{
          if(!justmoved){
            if (e.buttons === 4){
              const bbox: any = e.target.getBoundingClientRect();
              let x = e.clientX - bbox.left;
              let y = e.clientY - bbox.top;
              setMouseCoords({x: x, y: y});
              let pt = props.svgRef.current.createSVGPoint();
              pt.x = e.clientX;
              pt.y = e.clientY;
              let cursorpt =  pt.matrixTransform(props.svgRef.current.getScreenCTM().inverse());
              setSvgPoints({x: cursorpt.x, y: cursorpt.y});
            } else if (!moving && scrolling){
              let targetX = viewBox.x - e.movementX;
              let targetY = viewBox.y - e.movementY;
              //let newX = Math.min(Math.max(targetX, -400), props.imageDimensions.width - window.innerWidth + 400);
              //let newY = Math.min(Math.max(targetY, -400), props.imageDimensions.height - window.innerHeight + 400);
              let newX = Math.min(Math.max(targetX, -window.innerWidth), props.imageDimensions.width - window.innerWidth + window.innerWidth);
              let newY = Math.min(Math.max(targetY, -window.innerHeight), props.imageDimensions.height - window.innerHeight + window.innerHeight);
              let newCoordsFinal = {x: newX, y: newY};
              setViewBox({...viewBox, ...newCoordsFinal});
            }
          }

          justmoved = true;
          let temp = setTimeout(()=>{
            justmoved = false;
          }, 50);
        }}
      >
        <defs>
          <radialGradient  id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff"/>
            <stop offset="50%" stopColor="#000000"/>
            <stop offset="100%" stopColor="#ffffff"/>
          </radialGradient >
            {
              props.mapState.system.grid.enabled ?
              <pattern id="grid" width={props.mapState.system.grid.scale} height={props.mapState.system.grid.scale} patternUnits="userSpaceOnUse" x={props.mapState.system.grid.x} y={props.mapState.system.grid.y}>
                  <path d={`M ${props.mapState.system.grid.scale} 0 L 0 0 0 ${props.mapState.system.grid.scale}`} fill="none" stroke="url(#linear)" strokeWidth="1"/>
              </pattern>
              :null
            }
            {
              props.mapState.system?.fog?.enabled ?
              <mask id="fog" width={props.mapState.system.grid.scale} height={props.mapState.system.grid.scale} patternUnits="userSpaceOnUse" x={props.mapState.system.grid.x} y={props.mapState.system.grid.y}>

                {
                    props.mapState.system?.fog?.enabled ?
                    <rect width={props.imageDimensions.width} height={props.imageDimensions.height} fill="white"/>
                    :null
                }
                {
                  props.mapState.system.nodes.filter((el: any)=>(!el.fog || el.fog == 0)).map((el: any, idx: any)=> {
                    return(<LightEmitter key={idx} data={el} id={el.id} grid={props.mapState.system.grid} selectedNode={props.selectedNode}/>)
                  })
                }
              </mask>
              :null
            }
            {
              props.mapState.items.map((el: any, idx: any)=> {
                let liveObject = el.linkedObject ? lookupLiveAny(el.linkedObject, liveactors, livescenes) : null;
                let tempSize = liveObject ? liveObject.system.size : 0;
              return(
                <clipPath key={idx} id={el.id}>
                  <circle 
                    r={sizeMapper(tempSize, props.mapState.system.grid.scale)/2 + 5}
                    x={el.x}
                    y={el.y}
                  />
                </clipPath>
                )
              })
            }
            {
              props.mapState.system.nodes.map((el: any, idx: any)=> {
              let liveObject = el.linkedObject ? lookupLiveAny(el.linkedObject, liveactors, livescenes) : null;
              let tempSize = liveObject ? liveObject.system.size : 0;
              return(
                <clipPath key={idx} id={el.id}>
                  <circle 
                    r={sizeMapper(tempSize, props.mapState.system.grid.scale)/2 + 5}
                    x={el.x}
                    y={el.y}
                  />
                </clipPath>
                )
              })
            }
        </defs>
        <style>
                { `.nodeName { 
                  font-family: Verdana;
                  font-size:  20px;
                  font-weight: 800;
                  stroke:white; 
                  stroke-width:0.4em;
                  fill:black; 
                  paint-order:stroke; 
                  stroke-linejoin:round
                  }` }
        </style>

        <image id="background" onDragStart={(e)=>e.preventDefault()} href={props.imageUrl} height={props.imageDimensions.height + 'px'} width={props.imageDimensions.width + 'px'} x="0" y="0" />
        {
            props.mapState.system.grid.enabled ?
            <rect width={props.imageDimensions.width} height={props.imageDimensions.height} fill="url(#grid)" style={{userSelect: 'none', pointerEvents: 'none'}}/>
            :null
        }
        {
            props.mapState.system?.fog?.enabled ?
            <rect width={props.imageDimensions.width} height={props.imageDimensions.height} fill={isGM ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,1)"} mask="url(#fog)" style={{userSelect: 'none', pointerEvents: 'none'}}/>
            :null
        }
        {
          props.mapState.system.edges.map((el: any, idx: any)=> {
            return(<Line key={idx} data={el} updateEdge={props.updateEdge} pushEdge={props.pushEdge} edgeCoords={getEdgeCoords(el)} visible={getVisible(el)}/>)
          })
        }
        {
          props.mapState.system.nodes.map((el: any, idx: any)=> {
            return(<Circle key={idx} data={el} id={el.id} grid={props.mapState.system.grid} type='node' setMovingCircle={setMovingCircle} updateNode={props.updateNode} pushEdge={props.pushEdge} selectedNode={props.selectedNode}/>)
          })
        }
        {
          /*
          props.mapState.items.map((el: any, idx: any)=> {
            return(<Circle key={idx} data={el} id={el.id} grid={props.mapState.system.grid} type='token' updateNode={props.updateNode} selectedNode={props.selectedNode} setMovingCircle={setMovingCircle}/>)
          })
          */
        }
      </svg>
        {clicked ?
          <SceneContextMenu top={mouseCoords.y} linkNode={props.linkNode} left={mouseCoords.x} clickObj={clickObj} clickId={clickId} svgPoints={svgPoints} selectedNode={props.selectedNode} deleteNode={props.deleteNode} updateNode={props.updateNode} addNode={props.addNode}>
            <ul>
              <li>Edit</li>
              <li>Copy</li>
              <li>Delete</li>
            </ul>
          </SceneContextMenu>
          :
          null
        }
    </div>
  );
}

export default function Scene() {
  const sceneRef: any = useRef(null);
  const dispatch = useDispatch();
  const selectedNode = useSelector(selectSelectedNode);
  const [imageDimensions, setImageDimensions]: any = useState(null);
  const [loading, setLoading] = useState(false);
  const svgRef = useRef(null);

  const mapState = useSelector(selectActiveScene);

  useEffect(()=>{
    if(sceneRef && sceneRef.current){
      sceneRef.current.addEventListener("contextmenu", (e: any) => {
        e.preventDefault()
        e.stopImmediatePropagation();
      });
      sceneRef.current.addEventListener("touchmove", (e: any) => {
        e.preventDefault()
        e.stopImmediatePropagation();
      });
      sceneRef.current.addEventListener("touchstart", (e: any) => {
        e.preventDefault()
        e.stopImmediatePropagation();
      });
      sceneRef.current.addEventListener("touchend", (e: any) => {
        e.preventDefault()
        e.stopImmediatePropagation();
      });
    }
  }, [])
  


  const setMapState = (mapData: any) => {
    dispatch(livesceneSlice.actions.updateScene(mapData));
  }

  const addNode = (coords: any) => {
    const node: any = getNewNode(coords);
    const newMapState: any = _.cloneDeep(mapState);
    newMapState.system.nodes.push(node);
    setMapState(newMapState);
  }

  const addActorToken = (coords: any, actor: any) => {
    const newMapState: any = _.cloneDeep(mapState);
    const newX = coords.x || 100;
    const newY = coords.y || 100;
    let update = false;
    for(let i = 0; i<newMapState.items.length; i++){
      let mapItem = newMapState.items[i];
      if(actor._id == mapItem.linkedObject){
        newMapState.items[i].x = newX;
        newMapState.items[i].y = newY;
        update = true;
      }
    }
    if(!update){
      let linkedObject = actor._id;
      const objectId = String(ObjectID());
      const newNode: any = {
        id: objectId,
        linkedObject: linkedObject,
        name: "Placeholder",
        x: newX,
        y: newY,
        active: false,
        icon: assets.nodeIcons.CIRCLE,
        size: 2,
        descPriv: "",
        descPub: "",
        offset: { }
      }
      newMapState.system.nodes.push(newNode);
    }
    dispatch(sceneSlice.actions.setDroppable(null));
    setMapState(newMapState);
  }

  const deleteNode = (nodeId: any) => {
    const newMapState = _.cloneDeep(mapState);
    const newEdges: any = [];
    const newItems: any = [];
    const newNodes: any = [];
    for(let i=0; i<newMapState.items.length; i++){
      const targetNode: any = newMapState.items[i];
      if(targetNode.id != nodeId){
        newItems.push(targetNode);
      }
    }
    for(let i=0; i<newMapState.system.nodes.length; i++){
      const targetNode: any = newMapState.system.nodes[i];
      if(targetNode.id != nodeId){
        newNodes.push(targetNode);
      }
    }
    for(let i=0; i<newMapState.system.edges.length; i++){
      const targetEdge: any = newMapState.system.edges[i];
      if(!(targetEdge.id_start == nodeId || targetEdge.id_end == nodeId)){
        newEdges.push(targetEdge);
      }
    }
    newMapState.system.edges = newEdges;
    newMapState.system.nodes = newNodes;
    newMapState.items = newItems;
    setMapState(newMapState);
  }

  const updateNode = (node2Update: any) => {
    const newMapState: any = _.cloneDeep(mapState);
    for(let i=0; i<newMapState.items.length; i++){
      const targetNode: any = newMapState.items[i];
      if(targetNode.id == node2Update.id){
        newMapState.items[i] = node2Update;
        break;
      }
    }
    for(let i=0; i<newMapState.system.nodes.length; i++){
      const targetNode: any = newMapState.system.nodes[i];
      if(targetNode.id == node2Update.id){
        newMapState.system.nodes[i] = node2Update;
        break;
      }
    }
    setMapState(newMapState);
  }

  const linkNode = (edgeId: any) => {
    if(selectedNode && selectedNode != edgeId){
      const newMapState: any = _.cloneDeep(mapState);
      const newEdgeList: any = [];
      for(let i=0; i<newMapState.system.edges.length; i++){
        const targetEdge = newMapState.system.edges[i];
        if(!((targetEdge.id_start == edgeId || targetEdge.id_end == edgeId) && (targetEdge.id_start == selectedNode || targetEdge.id_end == selectedNode))){
          newEdgeList.push(targetEdge);
        }
      }
      if(newEdgeList.length != mapState.system.edges.length){
        newMapState.system.edges = newEdgeList;
        setMapState(newMapState);
      } else {
        const newEdge: any = getNewEdge(selectedNode, edgeId);
        newMapState.system.edges.push(newEdge);
        setMapState(newMapState);
        dispatch(sceneSlice.actions.setSelectedNode(null));
      }
    }
  }

  const imageUrl = mapState && mapState.system ? mapState.system.img : null;

  const loadImage = (imageUrl: string) => {
    setLoading(true);
    const img = new Image();
    img.src = imageUrl;
  
    img.onload = () => {
      setImageDimensions({
        height: img.height,
        width: img.width
      });
      setLoading(false);
    };
    img.onerror = (err) => {
      console.log("img error");
      console.error(err);
    };
  };

  useEffect(() => {
    if(imageUrl){
        loadImage(imageUrl);
    }
  }, [imageUrl]);

  return (
    <div>
      {
        loading ? <Loading /> : null
      }
      {
        imageDimensions ? 
        <SceneExploreInner ref={sceneRef} svgRef={svgRef} mapState={mapState} imageDimensions={imageDimensions} updateNode={updateNode} linkNode={linkNode} addActorToken={addActorToken} imageUrl={imageUrl} deleteNode={deleteNode} addNode={addNode}/>
        :
        null
      }
    </div>
  )
}
