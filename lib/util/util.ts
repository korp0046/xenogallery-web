import { reduxStore } from '../redux/store';
import moment from 'moment';
import ObjectID from 'bson-objectid';
import _ from 'lodash';
import { assetSlice, deleteAssetAsync, deleteLiveactorAsync, deleteLivesceneAsync, gameSlice, liveactorSlice, livesceneSlice, selectActiveScene, upsertAssetAsync, upsertGameAsync, upsertLiveActorAsync, upsertLiveSceneAsync } from '../redux';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';
import { AssetActor, AssetScene, Gamedoc, MapNode, TrackType } from './assetTypes';
import { roleDefaultStats } from '../gamedata/defaultActorStats';
import { marked } from 'marked';
import { getTotalPowerPoints } from '../gamedata/characterFormula';
const { DiceRoller, DiceRoll, exportFormats } = require('@dice-roller/rpg-dice-roller');

const assetCollections = ['events', 'images', 'powers', 'items', 'basicscenes', 'exploremaps', 'battlemaps', 'personas', 'characters','opponents', 'quests'];
const liveCollections = ['liveactors', 'livescenes'];
  


const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const sizeList = ['tiny', 'small', 'medium', 'large', 'huge', 'gargantuan', 'colossal'];

export function decodeJWT(token: string){
    return jwt.decode(token);
}

export function addPlusMinus(num: number) {
    if(num != undefined && num != null){
        if(num < 0){
            return '-' + String(num);
        } else {
            return '+' + String(num);
        }
    }
    return "";
}

export function sizeMapper(num: number){
    if(num < 0){
        return sizeList[0];
    } else if (num >= sizeList.length){
        return 'Colossal'
    } else {
        return sizeList[num];
    }
}

export function getPowerPoints(actor: AssetActor){
    let total = 0;
    total = getTotalPowerPoints(actor.system.level);
    if(actor.live && actor.live.prestigeLevel){
        total += actor.live.prestigeLevel;
    }
    return total;
}

export function getCurrentBulk(actor: AssetActor){
    let total = 0;
    for(let item of actor.items){
        if(item.system && item.system.foundrytype == 'equipment'){
            total += item.system.bulk;
        }
    }
    return total;
}

export function getCurrentBulkString(actor: AssetActor){
    let total = getCurrentBulk(actor);
    let bulkMax = 14;
    return `${total} / ${bulkMax}`;
}

export function getPowerPointsString(actor: AssetActor){
    let total = getTotalPowerPoints(actor.system.level);
    if(actor.live && actor.live.prestigeLevel){
        total += actor.live.prestigeLevel;
    }
    let used = 0;
    for(let item of actor.items){
        if(item.system && item.system.foundrytype == 'power'){
            used += item.system.build;
        }
    }
    return `${used} / ${total}`;
}

export function assetToCollection(gameObject: any){
    if(gameObject){
        const type = gameObject.type;
        const foundrytype = gameObject.system.foundrytype;
        if(gameObject.hasOwnProperty('meta') && gameObject.meta.hasOwnProperty('gameFrom') && gameObject.meta.gameFrom != null){
            //live actor or scene
            if(type =='scene'){
                return 'livescenes';
            } else if (type == 'actor'){
                return 'liveactors';
            }
        }
        if(type == 'scene'){
            if(foundrytype == 'battlemap'){
                return 'battlemaps';
            } else if(foundrytype == 'basicscene'){
                return 'basicscenes';
            } else if(foundrytype == 'exploremap'){
                return 'exploremaps';
            }
        }
        if(type == 'actor'){
            if(foundrytype == 'character'){
                return 'characters';
            } else if(foundrytype == 'persona'){
                return 'personas';
            } else if(foundrytype == 'opponent'){
                return 'opponents';
            }
        }
        if(type == 'item'){
            if(foundrytype == 'equipment'){
                return 'items';
            } else if(foundrytype == 'power'){
                return 'powers';
            } else if(foundrytype == 'event'){
                return 'events';
            }
        }
        if(type == 'asset'){
            if(foundrytype == 'image'){
                return 'images';
            }
        }
        if(type == 'web'){
            if(foundrytype == 'game'){
                return 'games';
            }
            if(foundrytype == 'room'){
                return 'rooms';
            }
        }
        if(type == 'note'){
            if(foundrytype == 'quest'){
                return 'quests';
            }
        }
        if(type == 'user'){
            return 'users';
        }
    }
    return null;
}

export function debounce(fn: Function, time: number){
    let timer: any = null;
    return (evt: any) => {
       clearTimeout(timer);
       timer = setTimeout( () => fn(evt), time);
    };
  }

export function addMetaTags(gameObject: any){
    const username = reduxStore.getState().user.username;
    const gameId = reduxStore.getState().game.gameState?._id;
    const meta = { 
        created: moment().unix(),
        modified: moment().unix(),
        createdUser: username,
        modifiedUser: username,
        public: true, 
        trash: false,
        cloneFrom: null,
        gameFrom: gameId ? ObjectID(gameId): null
    };
    gameObject['meta'] = meta;
}

export function lookupLiveAny(id: string, liveactors: Array<AssetActor> = [], livescenes: Array<AssetScene> = []){
    if(liveactors.length == 0){
        liveactors = reduxStore.getState().liveactor.list;
    }
    if(liveactors.length == 0){
        livescenes = reduxStore.getState().livescene.list;
    }
    for(let scene of livescenes){
        if(scene._id == id){
            return scene;
        }
    }
    for(let actor of liveactors){
        if(actor._id == id){
            return actor;
        }
    }
    return null;
}

export function lookupLivescene(id: string, livescenesInput: any = null){
    let livescenes = livescenesInput;
    if(livescenes == null){
        livescenes = reduxStore.getState().livescene.list;
    }
    for(let scene of livescenes){
        if(scene._id == id){
            return scene;
        }
    }
    return null;
}

export function lookupLiveactor(id: string, liveactorsInput: any = null){
    let liveactors = liveactorsInput;
    if(liveactors == null){
        liveactors = reduxStore.getState().liveactor.list;
    }
    for(let scene of liveactors){
        if(scene._id == id){
            return scene;
        }
    }
    return null;
}

export function lookupSceneItem(id: string, scene: AssetScene){
    for(let item of scene.items){
        if(item.hasOwnProperty('id')){
            if(item.id == id){
                return item;
            }
        } else if(item.hasOwnProperty('_id')){
            if(item._id == id){
                return item;
            }
        }
    }
    for(let item of scene.system.nodes){
        if(item.hasOwnProperty('id')){
            if(item.id == id){
                return item;
            }
        }
    }
    return null;
}

export function actorToLiveactor(gameObject: any){
    if(!gameObject['live']){
        gameObject['live'] = {
            currentHp: gameObject.system.hp,
            currentStamina: 9,
            currentGear: 3,
            currentProvisions: 3,
            tempHp: 0,
            hp: 0,
            stamina: 0,
            skulls: 0,
            provisions: 1,
            gear: 1,
            wealth: 1,
            armor: 0,
            size: 0,
            reflex: 0,
            will: 0,
            fortitude: 0,
            pb: 0,
            pp: 0,
            acc: 2,
            ad: 2,
            ap: 2,
            initiative: 0,
            conditions: [],
            afflictions: []
        };
    }
    const itemsArr = gameObject.items;
    for(let i = 0; i< itemsArr.length; i++){
        let item = itemsArr[i];
        if(item.system.foundrytype == 'power'){
            if(!item['live']){
                item.live = {
                    ready: true
                }
            }
        }
        if(item.system.foundrytype == 'equipment'){
            if(!item['live']){
                item.live = {
                    count: 1
                }
            }
        }
    }
}

export function powerToLivePower(gameObject: any){
    gameObject['live'] = {
        ready: true
    };
}

export function upsertGameObject(gameObject: any, targetList: Array<any>) {
    let gameObjectId = gameObject._id;
    let updated = false;
    for(let i=0; i< targetList.length; i++){
        let targetId = targetList[i]._id;
        if(targetId == gameObjectId){
            targetList[i] = gameObject;
            updated = true;
            break;
        }
    }
    if(!updated){
        targetList.push(gameObject);
    }
}

export function upsertLiveAsset(gameObject: any, targetList: Array<any>, dirty = true) {
    let gameObjectId = gameObject._id;
    let updated = false;
    if(gameObject.type == 'actor'){
        actorToLiveactor(gameObject);
    }
    if(gameObject.hasOwnProperty('meta')){
        gameObject.meta['dirty'] = dirty;
    }
    for(let i=0; i< targetList.length; i++){
        let targetId = targetList[i]._id;
        if(targetId == gameObjectId){
            targetList[i] = gameObject;
            updated = true;
            break;
        }
    }
    if(!updated){
        targetList.push(gameObject);
    }
}

export function upsertGameAsset(gameObject: any, targetList: Array<any>) {
    let gameObjectId = gameObject._id;
    let updated = false;
    for(let i=0; i< targetList.length; i++){
        let targetId = targetList[i]._id;
        if(targetId == gameObjectId){
            targetList[i] = gameObject;
            updated = true;
            break;
        }
    }
    if(!updated){
        targetList.push(gameObject);
    }
}

export function saveAsset(gameObjectInit: any, dirty=true){
    let gameObject = _.cloneDeep(gameObjectInit);
    let collection = assetToCollection(gameObject);
    if(collection){
        if(assetCollections.includes(collection)){
            reduxStore.dispatch(upsertAssetAsync(gameObject)); //updates database
            return;
        } else if (liveCollections.includes(collection)){
            if(gameObject.hasOwnProperty('meta') && gameObject.meta.hasOwnProperty('dirty')){
                gameObject.meta.dirty = dirty;
            }
            if(collection == 'liveactors'){
                reduxStore.dispatch(liveactorSlice.actions.updateActor(gameObject));
                return;
            } else if (collection == 'livescenes'){
                reduxStore.dispatch(livesceneSlice.actions.updateScene(gameObject));
                return;
            }
        }
    }
    toast(`upsertAsset-failure: ${gameObject?.name}`);
}

export function importScene(scene: AssetScene){
    let mapDict: any = {};
    const gameState = reduxStore.getState().game.gameState;
    if(gameState){
        const newScene = _.cloneDeep(scene);
        if(newScene.hasOwnProperty('packed') && newScene.packed){
            for(let item of newScene.packed){
                if(item.type == 'actor'){
                    let newObjectId = ObjectID();
                    let oldObjectId = item._id;
                    mapDict[String(oldObjectId)] = String(newObjectId);
                    let newActor = {...item, _id: newObjectId }
                    reduxStore.dispatch(upsertLiveActorAsync({data: newActor, original: true}));
                } else if(item.type == 'scene'){
                    let newObjectId = ObjectID();
                    let oldObjectId = item._id;
                    mapDict[String(oldObjectId)] = String(newObjectId);
                    let newScene = {...item, _id: newObjectId }
                    reduxStore.dispatch(upsertLiveSceneAsync({data: newScene, original: true}));
                }
            }
            delete newScene.packed;
        }
        const newItems = [];
        const newNodes: any = [];
        for(let i = 0; i<scene.system.nodes.length; i++){
            let node = scene.system.nodes[i];
            let newItem: any = _.cloneDeep(node);
            if(Object.keys(mapDict).includes(newItem.linkedObject)){
                newItem.linkedObject = mapDict[newItem.linkedObject];
            }
            newNodes.push(newItem);
        }
        for(let i = 0; i<scene.items.length; i++){
            let node = scene.items[i];
            let newItem = _.cloneDeep(node);
            if(Object.keys(mapDict).includes(newItem.linkedObject)){
                newItem.linkedObject = mapDict[newItem.linkedObject];
            }
            newItems.push(newItem);
        }
        newScene.items = newItems;
        newScene.system.nodes = newNodes;
        newScene._id = ObjectID();
        reduxStore.dispatch(upsertLiveSceneAsync({data: newScene, original: true}));
        saveGame();
        return newScene;
    } else {
        return null;
    }
}

export function setNodeScene(activeSceneId: string, nodeId: string, linkedSceneId: string){
    const sceneList = reduxStore.getState().livescene.list;
    for(let scene of sceneList){
        if(String(activeSceneId) == String(scene._id)){
            const sceneToUpdate = _.cloneDeep(scene);
            for(let node of sceneToUpdate.system.nodes){
                if(String(node.id) == nodeId){
                    node.linkedObject = String(linkedSceneId);
                    sceneToUpdate.meta.dirty = true;
                    reduxStore.dispatch(livesceneSlice.actions.updateScene(sceneToUpdate));
                    saveGame();
                    return;
                }
            }
        }
    }
    toast('Failed to setNodeScene');
}

export function saveGame(){
    const gameState = reduxStore.getState().game.gameState;
    if(gameState){
        if(gameState.meta.dirty){
            reduxStore.dispatch(upsertGameAsync(reduxStore.getState().game.gameState));
        }
        for(let scene of reduxStore.getState().livescene.list){
            if(scene.meta.dirty){
                reduxStore.dispatch(upsertLiveSceneAsync({data: scene, original: true}));
            }
        }
        for(let actor of reduxStore.getState().liveactor.list){
            if(actor.meta.dirty){
                reduxStore.dispatch(upsertLiveActorAsync({data: actor, original: true}));
            }
        }
    }
    let timestamp = Date.now();
    reduxStore.dispatch(reduxStore.dispatch(gameSlice.actions.setLastSave(timestamp)));
    console.log('saveGame', timestamp);

}

export function cloneAsset(asset: any){
    const newAsset = _.cloneDeep(asset);
    newAsset._id = String(ObjectID());
    newAsset.name = newAsset.name + " (clone)";
    reduxStore.dispatch(upsertAssetAsync(newAsset));
}

export function deleteAsset(asset: any){
    let collection = assetToCollection(asset);
    if(collection){
        if(collection.startsWith('live')){
            if(collection == 'liveactors'){
                reduxStore.dispatch(deleteLiveactorAsync(asset));
            } else if (collection == 'livescenes'){
                reduxStore.dispatch(deleteLivesceneAsync(asset));
            }
        } else {
            reduxStore.dispatch(deleteAssetAsync(asset));
        }
    }
}

export function cloneLiveactor(actor: any){
    const newActor = _.cloneDeep(actor);
    newActor._id = String(ObjectID());
    let name = newActor.name;
    let baseName = name.split("|")[0];
    const liveactorList = reduxStore.getState().liveactor.list;
    let usedLetters = [];
    for(let item of liveactorList){
        let nameSplit = item.name.split("|");
        let nametemp = nameSplit[0];
        if(String(nametemp).startsWith(baseName)){
            if(nameSplit.length > 1){
                if(nametemp == baseName){
                    usedLetters.push(nameSplit[nameSplit.length-1]);
                }
            }
        }
    }
    for(let letter of alphabet){
        if(!usedLetters.includes(letter)){
            newActor.name = baseName + "|" + letter;
            break;
        }
    }
    newActor.meta['dirty'] = true;
    reduxStore.dispatch(liveactorSlice.actions.updateActor(newActor));
}

export function packScene(scene: AssetScene){
    const newScene = _.cloneDeep(scene);
    const liveactorList = reduxStore.getState().liveactor.list;
    const livesceneList = reduxStore.getState().livescene.list;
    newScene['packed'] = [];
    let nodeIds = scene.system.nodes.map((el: MapNode, idx: number)=> el.linkedObject);
    let itemIds = scene.items.map((el: MapNode, idx: number)=> el.linkedObject);

    for(let item of liveactorList){
        if(nodeIds.includes(String(item._id)) || itemIds.includes(String(item._id))){
            newScene.packed.push(item);
        }
    }
    for(let item of livesceneList){
        if(nodeIds.includes(String(item._id)) || itemIds.includes(String(item._id))){
            newScene.packed.push(item);
        }
    }
    return newScene;
}

export function normalizeActorStats(actor: any){
    let newActor = _.cloneDeep(actor);
    //normalize all stats based on level
    let role: any = newActor.system.role;
    let level: number = newActor.system.level;
    let defaultStats: any = roleDefaultStats;
    let stats: any = defaultStats[role];
    for(let key of Object.keys(stats)){
        let newValue: any = 0;
        if(level > 0 && level <=10){
            if(key == 'hp'){
                newValue = stats[key][level-1] + Math.max(0,(actor.system.size - 2) * 30);
            } else {
                newValue = stats[key][level-1];
            }
        } else if (level <= 0){
            newValue = typeof stats[key][0] == 'string' ? '1d4' : stats[key][0] >= 10 ? 10 : 0;
        } else if (level > 10){
            if(key == 'hp'){
                newValue = (stats[key][9] + ((level - 10) * 25)) + Math.max(0,actor.system.size * 30);
            } else if (typeof stats[key][0] == 'string') {
                newValue = '2d12';
            } else {
                let tempValue = stats[key][9] + ((level - 10))
                newValue = tempValue <= 20 ? tempValue : 20;
            }
        }
        newActor.system[key] = newValue;
    }
    return newActor;
}



export const gameDocMapper = (gamedocs: Array<Gamedoc>) => {
    let childrenobj: any = {};
    let gamedocsList: Array<Gamedoc> = _.cloneDeep(gamedocs).map((el: any, idx: number)=> {el['children'] = []; return el;});
    for(let i=0; i<gamedocsList.length; i++){
        let doc = gamedocsList[i];
        if(doc.system.parent && String(doc.system.parent).length > 0){
            let parent = gamedocsList.find((el: any)=> String(el._id) == doc.system.parent);
            if(parent){
                if(childrenobj.hasOwnProperty(String(parent._id))){
                    childrenobj[String(parent._id)].push(doc);
                } else {
                    childrenobj[String(parent._id)] = [doc];
                }
            }
        }
    }

    for(let i=0; i<gamedocsList.length; i++){
        if(Object.keys(childrenobj).includes(String(gamedocsList[i]._id))){
            gamedocsList[i].children = childrenobj[String(gamedocsList[i]._id)].sort(function (a: Gamedoc, b: Gamedoc) {
                return a.system.sort - b.system.sort || String(a.name).localeCompare(String(b.name));
            });;
        }
    }
    const chapterList = gamedocsList.filter((el: Gamedoc)=> el.system.parent == "" || el.system.parent == null).sort(function (a: Gamedoc, b: Gamedoc) {
        return a.system.sort - b.system.sort || String(a.name).localeCompare(String(b.name));
    });

    for(let item of chapterList){
        item.depth = 0;
        if(item.children){
            for(let item2 of item.children){
                item2.depth = 1;
                if(item2.children){
                    for(let item3 of item2.children){
                        item3.depth = 2;
                        if(item3.children){
                            for(let item4 of item3.children){
                                item4.depth = 3;
                                if(item4.children){
                                    for(let item5 of item4.children){
                                        item5.depth = 4;
                                    }
                                }
                            }
                        }

                    }
                }

            }
        }

    }

    return chapterList;
}

export const docBodyProcessor = (doc: Gamedoc) => {
    let text = doc.system.text;
    text = text.replaceAll('<p><br></p>', '');
    if(Object.hasOwn(doc, 'depth')){
        text = text.replaceAll('<h1>', '<h1>');
    }
    return text;
}

export const md2html = (text: string) => {
    if(typeof text == 'string'){
        let textTemp: any = marked.parse(text);
        textTemp = textTemp.replaceAll('<table>', '<table class="mdtable">');
        return(textTemp);
    }
    return text;
}

export const chatPower = (actor: AssetActor, power: any) => {
    let finalText = '';
    // build chat message for power
    // then set power to used
    let profBonus = actor.system.pb;
    let abilityPower = actor.system.ap;
    let attackDamage = actor.system.ad;
    let charLevel = actor.system.level;


    let newPowerDesc = String(power.system.description).replaceAll("AP", String(abilityPower));
    newPowerDesc = String(newPowerDesc).replaceAll("AD", String(attackDamage));
    newPowerDesc = String(newPowerDesc).replaceAll("LVL", String(charLevel));
    newPowerDesc = String(newPowerDesc).replaceAll("PB", String(profBonus));

    let diceRegex = /(d?[\\\[\]\d\+\-]*d[\\\[\]\d\+\-]+)/gi

    let matches = String(newPowerDesc).matchAll(diceRegex);
    for (const match of matches) {
        newPowerDesc = String(newPowerDesc).replace(match[1], `(${match[1]})`).replace("((", "(").replace("))", ")");
      }
      finalText += newPowerDesc;
      console.log({text: finalText, actorName: String(actor.name), title: power.name});
}

export function rollDieBasic(min: number = 1, max: number = 20) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }

export function rollDieAdvanced(input: string){
    try{
        let rollResult = new DiceRoll(input);
        return rollResult;
    } catch(e){
        toast(`Couldn't parse roll: ${input}`);
        return null;
    }
}

export function linearizeDocs(mappedDocs: Array<Gamedoc>){
    const finalDocs: Array<Gamedoc> = [];
    function recursiveExtract(docArr: Array<Gamedoc>, docs: Array<Gamedoc>){
        for(let doc of docArr){
            docs.push({...doc, children: []});
            if(doc.children){
                let sortedChildren = doc.children.sort((a: Gamedoc, b: Gamedoc)=> a.system.sort - b.system.sort || a.name.localeCompare(b.name))
                recursiveExtract(sortedChildren, docs);
            }
        }
    }
    recursiveExtract(mappedDocs, finalDocs);
    return finalDocs;
}

export function updateWorkwithScratch(scratch: any){
    const work = reduxStore.getState().asset.work;
    const newWork = _.cloneDeep(work);
    if(newWork.items && scratch._id){
        let merged = false;
        const newItems = [];
        for(let i = 0; i<newWork.items.length; i++){
            if(newWork.items[i]._id == scratch._id){
                newItems.push(scratch);
                merged = true;
            } else {
                newItems.push(newWork.items[i]);
            }
        }
        if(!merged){
            newItems.push(scratch);
            merged = true;
        }
        if(merged){
            newWork.items = newItems;
            reduxStore.dispatch(assetSlice.actions.setWork(newWork));
            return;
        }
        return;
    }
    toast(`updateWorkwithScratch-failure: ${scratch?.name}`);

}

export function arrayUpsert (arr: Array<any>, key: any, matchValue: any, newval: any) {
    let matchIdx = _.findIndex(arr, (el: any)=> { return el[key] == matchValue; });
    if(matchIdx >= 0){
        arr.splice(matchIdx, 1, newval);
    } else {
        arr.push(newval);
    }
};

export function isGMFunc() {
    let output = false;
    const username: string = String(reduxStore.getState().user.username);
    const id: string = String(reduxStore.getState().user.id);
    const gms = reduxStore.getState().game.gameState?.system.gms;
    if(gms && gms.length > 0){
        if(typeof gms[0] == 'string'){
            if(gms.includes(id)){
                output = true;
            }
        } else if (typeof gms[0] == 'object') {
            if(gms.map((el: any)=>String(el.name)).includes(username)){
                output = true;
            }
        }
    }
    return output;
};

export function updateTrack(newTrackData: TrackType) {
    let gameStateClone =  _.cloneDeep(reduxStore.getState().game.gameState);
    if(gameStateClone){
        let tracks = _.cloneDeep(gameStateClone.system.tracks);
        arrayUpsert(tracks, "_id", newTrackData._id, newTrackData);
        gameStateClone.system.tracks = tracks;
        reduxStore.dispatch(gameSlice.actions.updateGame(gameStateClone));
    }
}

export function removeTrack(trackId: string) {
    let gameStateClone =  _.cloneDeep(reduxStore.getState().game.gameState);
    if(gameStateClone){
        let tracks = _.cloneDeep(gameStateClone.system.tracks);
        let matchIdx = _.findIndex(tracks, (el: any)=> { return el["_id"] == trackId; });
        if(matchIdx >= 0 ){
            tracks.splice(matchIdx, 1);
            gameStateClone.system.tracks = tracks;
            reduxStore.dispatch(gameSlice.actions.updateGame(gameStateClone));
        }
    }
}

export function getActiveSceneActors() {
    let activeScene = selectActiveScene(reduxStore.getState());
    let linkedObjects = new Set(activeScene.system.nodes.map((node: any)=>node.linkedObject));
    if(linkedObjects.has(null)){
        linkedObjects.delete(null);
    }
    let activeSceneActors = reduxStore.getState().liveactor.list.filter((actor: AssetActor)=>{
        return linkedObjects.has(String(actor._id));
    });
    return activeSceneActors;
}