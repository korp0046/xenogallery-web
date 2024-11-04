import _ from 'lodash';
import ObjectID from "bson-objectid";
import { addMetaTags } from '../util/util';
import { AssetSceneProto } from '../util/assetTypes';
import exploreAssets from './exploreAssets';

export const defaultBasicScene:AssetSceneProto = {
    _id: "",
    name: "DefaultBasicScene",
    type: "scene",
    img: "https://s3.elementrogue.com/otherworlder-static/ow-logo-400.webp",
    system: {
        grid: {x: 0, y: 0, scale: 45, enabled: false},
        img: "https://s3.elementrogue.com/otherworlder-static/basicscenes/dark_forest_campfire_01.jpg",
        foundrytype: "basicscene",
        tags: "scene",
        nodes: [],
        edges: [],
        description: "TODO",
        brief: "TODO",
        fog: {enabled: false, preview: false},
        icon: exploreAssets.nodeIcons.QUESTION,
        size: 2
    },
    items: []
}

export const defaultBattleScene:AssetSceneProto = {
    _id: "",
    name: "DefaultBattleScene",
    type: "scene",
    img: "https://s3.elementrogue.com/otherworlder-static/ow-logo-400.webp",
    system: {
        grid: {x: 0, y: 0, scale: 45, enabled: true},
        img: "https://s3.elementrogue.com/otherworlder-static/battlemaps/wilderness_encounter_01.webp",
        foundrytype: "battlemap",
        tags: "scene",
        nodes: [],
        edges: [],
        description: "TODO",
        brief: "TODO",
        fog: {enabled: false, preview: false},
        icon: exploreAssets.nodeIcons.QUESTION,
        size: 2
    },
    items: []
}

export const defaultExploreScene:AssetSceneProto = {
    _id: "",
    name: "DefaultExploreScene",
    type: "scene",
    img: "https://s3.elementrogue.com/otherworlder-static/ow-logo-400.webp",
    system: {
        grid: {x: 0, y: 0, scale: 45, enabled: false},
        img: "https://s3.elementrogue.com/otherworlder-static/exploremaps/jotnars_rift.webp",
        foundrytype: "exploremap",
        nodes: [],
        edges: [],
        tags: "scene",
        description: "TODO",
        brief: "TODO",
        fog: {enabled: false, preview: false},
        icon: exploreAssets.nodeIcons.QUESTION,
        size: 2
    },
    items: []
}

export const getDefaultScene = (req: string) => {
    let newScene = null;
    if(req == 'battlemap' || req == 'battlemaps'){
        newScene = _.cloneDeep(defaultBattleScene);
        newScene._id = String(ObjectID());
      } else if (req == 'exploremap' || req == 'exploremaps') {
        newScene = _.cloneDeep(defaultExploreScene);
        newScene._id = String(ObjectID());
      } else {
        newScene = _.cloneDeep(defaultBasicScene);
        newScene._id = String(ObjectID());
      }
    addMetaTags(newScene);
    return newScene;
}