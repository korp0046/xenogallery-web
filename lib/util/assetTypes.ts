import ObjectID from "bson-objectid";

export interface MinioBucketType {
    name: string;
    creationDate: Date;
}

export interface MinioObjectType {
    name: string;
    lastModified: Date;
    etag: string;
    size: number;
    tags: ObjectTagsItemType[];
    url: string;
    urlThumb: string;
    gallery: string;
}

export interface MoveObjectsPayloadType {
    objects: Array<MinioObjectType>;
    bucket: string;
}

export interface ObjectTagsItemType {
    Key: string;
    Value: string;
}

export interface AssetSceneSystemGrid {
    x: number,
    y: number,
    scale: number,
    enabled: boolean
}

export interface AssetSceneSystemFog {
    preview: boolean,
    enabled: boolean
}

export interface AssetGame {
    _id: string | ObjectID,
    type: string,
    name: string,
    img: string,
    meta: AssetMeta,
    system: AssetSceneSystem
}

export interface TrackType {
    _id: string | ObjectID,
    visualize: string,
    zone: string,
    valueMax: number,
    value: number,
    threshold: number,
    title: string,
    publicDesc: string,
    hiddenDesc: string,
    hide: boolean
}

export interface AssetMeta {
    created: number,
    modified: number,
    createdUser: string,
    modifiedUser: string,
    public: boolean,
    trash: boolean,
    gameFrom?: string,
    cloneFrom?: string,
    tags?: Array<string>
}

export interface AssetSceneSystem {
        foundrytype: string,
        img: string,
        grid: AssetSceneSystemGrid,
        fog: AssetSceneSystemFog,
        description: string,
        tags: string,
        brief: string,
        nodes: Array<MapNode>,
        edges: Array<MapEdge>,
        icon: string,
        size: number
}

export interface ElementalAffinityBoolean {
    light: boolean,
    fire: boolean,
    air: boolean,
    earth: boolean,
    water: boolean,
    wood: boolean,
    metal: boolean,
    shadow: boolean,
    universal: boolean
}

export interface AssetActorSystem {
    img: string,
    foundrytype: string,
    skills: ActorSkills,
    speed: number,
    size: number,
    armor: number,
    reflex: number,
    will: number,
    fortitude: number,
    pb: number,
    pp: number,
    ab: number,
    ad: number,
    ap: number,
    hp: number,
    type: string,
    role: string,
    level: number,
    resist: string,
    traits: string,
    tags: string,
    flags: any,
    description: string,
    appearance: string,
    brief: string,
    profile: string,
    stamina: number,
    icon?: string,
    gear: number,
    provisions: number,
    origin: string,
    guild: string
}

export interface AssetScene {
    _id: string | ObjectID,
    type: string,
    name: string,
    img: string,
    meta: AssetMeta,
    items: Array<any>,
    system: AssetSceneSystem,
    packed?: Array<any>
}

export interface AssetSceneProto {
    _id?: string | ObjectID,
    type: string,
    name: string,
    img: string,
    meta?: AssetMeta,
    items: Array<any>,
    system: AssetSceneSystem,
    packed?: Array<any>
}
  
export interface AssetActor {
    _id: string | ObjectID,
    name: string,
    type: string,
    img: string,
    meta: AssetMeta,
    items: Array<any>,
    system: AssetActorSystem,
    live?: ActorLive,
    packed?: Array<any>
}

export interface AssetActorProto {
    _id?: string | ObjectID,
    name: string,
    type: string,
    img: string,
    meta?: AssetMeta,
    items: Array<any>,
    live?: ActorLive,
    system: AssetActorSystem,
    packed?: Array<any>
}

export interface AssetItem {
    _id: string | ObjectID,
    name: string,
    type: string,
    img: string,
    meta: AssetMeta,
    system: AssetItemSystem
}

export interface AssetItemSystem {
    bulk: number,
    description: string,
    tags: string,
    type: string,
    level: number,
    foundrytype: string,
    img: string,
    subtype: string,
    recharge: string,
    element: ElementalAffinityBoolean,
    limit: string,
    time: string,
    duration: string,
    range: string,
    miss: string,
    attack: string,
    defense: string,
    bonus_damage: string
}

export interface PowerFlagsBoolean {
    aoe: boolean,
    dot: boolean,
    damage: boolean,
    melee: boolean,
    ranged: boolean,
    projectile: boolean,
    passive: boolean,
    ritual: boolean,
    buff: boolean,
    debuff: boolean,
    multihit: boolean,
    control: boolean,
    mobility: boolean,
    basicattack: boolean,
    recovery: boolean,
    summon: boolean,
    utility: boolean,
    reserve: boolean,
    heritage: boolean,
    keystone: boolean,
    defense: boolean,
    concentration: boolean,
    divine: boolean,
    string: boolean,
    metapower: boolean,
    npc: boolean
}

export interface AssetPower {
    _id: string | ObjectID,
    name: string,
    type: string,
    img: string,
    meta?: AssetMeta,
    system: AssetPowerSystem
}

export interface AssetPowerSystem {
    flags: PowerFlagsBoolean,
    build: number,
    recharge: string,
    description: string,
    element: ElementalAffinityBoolean,
    level: number,
    time: string,
    duration: string,
    range: string,
    tags: string,
    foundrytype: string,
    limit: string,
    attack: string,
    defense: string,
    miss: string,
    prereq: string,
    img: string,
    subclass: string
}

export interface AssetQuest {
    _id: string | ObjectID,
    name: string,
    type: string,
    img: string,
    meta?: AssetMeta,
    system: AssetQuestSystem
}

export interface AssetQuestSystem {
    flags: PowerFlagsBoolean,
    description: string,
    tags: string,
    origin: string,
    foundrytype: string,
    type: string,
    level: string
}

export interface MapNodeOffset {
    x: number,
    y: number
}
  
export interface MapNode {
    id: string,
    linkedObject: string | null,
    name: string,
    x: number,
    y: number,
    active: boolean,
    icon: string,
    size: number,
    offset: MapNodeOffset,
    descPriv?: string,
    descPub?: string,
    fog: number
}

export interface MapEdge {
    id: string,
    id_start: string,
    id_end: string
}

export interface GenerateImagePayload {
    prompt: string,
    numImages: number,
    preset: string,
    height: number,
    width: number
}

export interface GamedocSystem {
    img: string,
    text: string,
    brief: string,
    directpath: string,
    tagsalt: string,
    tags: string,
    parent: string | ObjectID,
    sort: number
    
}

export interface Gamedoc {
    _id?: string | ObjectID,
    name: string,
    type: string,
    system: GamedocSystem,
    img: string,
    meta?: AssetMeta,
    children?: Array<Gamedoc>,
    depth?: number
}

/* Types */
export interface SendActorPayload {
    data: any,
    timestamp?: number
}

export interface ReceiveCanvasPayload {
    payload: ReceiveCanvasData,
    username: string,
    timestamp?: number
}

export interface ReceiveCanvasData {
    type: string,
    id: string,
    version: number,
    els: any,
    appState: any
}

export interface SendChatPayload {
    text: string,
    actorName?: string,
    title?: string,
    rolls?: Array<any>
}

export interface SendChatData {
    text: string,
    actorName?: string,
    title?: string,
    rolls: Array<any>
}

export interface ReceiveChatPayload {
    payload: SendChatData,  //transformed from SendChatPayload
    timestamp: number, // generated by server
    username: string // generated by server
}

export interface UserMeta {
    created: number,
    modified: number,
    createdUser: string,
    modifiedUser: string
}

export interface UserObject {
    _id?: string | ObjectID,
    username: string, 
    email: string,
    role: string,
    type: string,
    meta: UserMeta
}

export interface ChatStoredObject {
    payload: string | number,
    type: string
}

export interface ActorSkills {
    strike: number,
    strength: number,
    survival: number,
    guard: number,
    tactics: number,
    marksmanship: number,

    stealth: number,
    mobility: number,
    lore: number,
    dexterity: number,
    healing: number,
    society: number,

    draconic: number,
    elven: number,
    aura: number,
    protean: number,
    pact: number,
    imperial: number,
}

export interface ActorLive {
    hp: number,
    tempHp: number,
    currentHp: number,
    currentStamina: number,
    currentGear: number,
    currentProvisions: number,
    prestigeLevel?: number,
    stamina: number,
    gear: number,
    skulls: number,
    provisions: number,
    wealth: number,
    armor: number,
    size: number,
    reflex: number,
    will: number,
    fortitude: number,
    pb: number,
    ab: number,
    ad: number,
    ap: number,
    initiative: number,
    conditions: Array<any>,
    afflictions: Array<any>,
    stress: number,
    wounds: number,
    evasion: number,
    dr: number,
    es: number
}

export interface QuestFlagsBoolean {
    fetch: boolean,
    delivery: boolean,
    travel: boolean,
    protect: boolean,
    activate: boolean,
    disrupt: boolean,
    kill: boolean,
    destroy: boolean,
    investigate: boolean,
    scout: boolean,
    delve: boolean,
    negotiate: boolean,
    survive: boolean,
    covert: boolean,
    sensitive: boolean,
    urgent: boolean,
    puzzle: boolean,
    criminal: boolean
}

export type StaticAsset = AssetActor | AssetPower | AssetScene | AssetItem | AssetPower;