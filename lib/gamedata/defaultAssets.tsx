import ObjectID from "bson-objectid";
import _ from 'lodash';
import { actorToLiveactor, addMetaTags } from '../util/util';
import { AssetActorProto, AssetItem, AssetPower, Gamedoc, TrackType } from "../util/assetTypes";

export const defaultCharacter: AssetActorProto = {
    name: "CharacterName",
    img: "https://s3.elementrogue.com/otherworlder-static/ow-logo-400.webp",
    type: "actor",
        system: {
            img: "https://s3.elementrogue.com/otherworlder-static/ow-logo-400.webp",
            foundrytype: "character",
            size: 2,
            speed: 6,
            armor: 8,
            reflex: 0,
            stamina: 8,
            will: 0,
            fortitude: 0,
            pb: 0,
            pp: 4,
            ap: 2,
            ad: 2,
            ab: 2,
            hp: 15,
            type: "humanoid",
            role: "unique",
            level: 2,
            resist: "",
            traits: "",
            tags: "player",
            flags: {},
            description: "TODO",
            appearance: "TODO",
            brief: "Catchy Phrase",
            profile: "unique",
            gear: 1,
            provisions: 1
        },
    items: [],
    meta: {
        created: 0,
        modified: 0,
        createdUser: "",
        modifiedUser: "",
        public: true,
        trash: false
    }
}

export const defaultTrack: TrackType = {
    _id: "",
    visualize: "default",
    zone: "default",
    valueMax: 12,
    threshold: 9,
    value: 1,
    title: "A New Track",
    publicDesc: "Public Track Details",
    hiddenDesc: "Private Track Details",
    hide: false
}

export const defaultPower: any = {
    name: "Power Name",
    type: "item",
    img: "https://s3.elementrogue.com/otherworlder-static/ow-logo-400.webp",
    system: {
        foundrytype: "power",
        description: "TODO",
        limit: "",
        time: "1 action",
        duration: "Instant",
        range: "melee",
        recharge: 'n/a',
        attack: "harmless",
        defense: "harmless",
        miss: "harmless",
        prereq: "",
        img: "",
        build: 2,
        element: {
            light: false,
            fire: false,
            air: false,
            water: false,
            wood: false,
            earth: false,
            metal: false,
            shadow: false,
            universal: true
        },
        level: 0,
        flags: {
            aoe: false,
            dot: false,
            damage: false,
            melee: false,
            ranged: false,
            projectile: false,
            passive: false,
            ritual: false,
            buff: false,
            debuff: false,
            multihit: false,
            control: false,
            mobility: false,
            basicattack: false,
            recovery: false,
            summon: false,
            utility: false,
            reserve: false,
            heritage: false,
            keystone: false,
            defense: false,
            concentration: false,
            divine: false,
            string: false,
            metapower: false,
            npc: false
          },
        tags: "new",
        subclass: "new"
    },
    meta: {
        created: 0,
        modified: 0,
        createdUser: "",
        modifiedUser: "",
        public: true,
        trash: false
    }
}

export const defaultItem: any = {
    name: "New Item",
    type: "item",
    img: "https://s3.elementrogue.com/otherworlder-static/ow-logo-400.webp",
    system: {
        foundrytype: "equipment",
        description: "TODO",
        recharge: 'n/a',
        bulk: 0,
        type: "default",
        subtype: "default",
        limit: "",
        time: "",
        duration: "",
        range: "",
        attack: "harmless",
        defense: "harmless",
        bonus_damage: "",
        miss: "harmless",
        img: "",
        element: {
            light: false,
            fire: false,
            air: false,
            water: false,
            wood: false,
            earth: false,
            metal: false,
            shadow: false,
            universal: true
          },
        level: 0,
        tags: "new"
    },
    meta: {
        created: 0,
        modified: 0,
        createdUser: "",
        modifiedUser: "",
        public: true,
        trash: false
    }
}

export const defaultGamedoc: Gamedoc = {
    name: "New Gamedoc",
    type: "gamedoc",
    img: "",
    system: {
        img: "",
        parent: "",
        brief: "",
        text: "This is a brand new document.",
        tags: "new",
        tagsalt: "",
        sort: 0,
        directpath: ""
    },
    meta: {
        created: 0,
        modified: 0,
        createdUser: "",
        modifiedUser: "",
        public: true,
        trash: false
    }
}

export const getDefaultPlayerCharacter = (live: boolean = false) => {
    let newAsset: any = null;
    newAsset = _.cloneDeep(defaultCharacter);
    newAsset._id = String(ObjectID());
    addMetaTags(newAsset);
    if(live){
        actorToLiveactor(newAsset)
    }
    return newAsset;
}

export const getDefaultPower = () => {
    let newAsset: any = null;
    newAsset = _.cloneDeep(defaultPower);
    newAsset._id = String(ObjectID());
    addMetaTags(newAsset);
    return newAsset;
}

export const getDefaultItem = () => {
    let newAsset: any = null;
    newAsset = _.cloneDeep(defaultItem);
    newAsset._id = String(ObjectID());
    addMetaTags(newAsset);
    return newAsset;
}

export const getDefaultGamedoc = () => {
    let newAsset: any = null;
    newAsset = _.cloneDeep(defaultGamedoc);
    let objectId = String(ObjectID());
    newAsset._id = objectId;
    newAsset.system.directpath = objectId;
    addMetaTags(newAsset);
    return newAsset;
}

export const getDefaultTrack = () => {
    let newAsset: TrackType = _.cloneDeep(defaultTrack);
    let objectId = String(ObjectID());
    newAsset._id = objectId;
    return newAsset;
}