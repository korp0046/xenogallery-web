import { AssetActor } from "./assetTypes";
import _ from 'lodash';
import { rollDieAdvanced, rollDieBasic } from './util';
import { toast } from 'react-toastify';

export const actionRelax = (actor: AssetActor) => {
    const newActor = _.cloneDeep(actor);
    //restores all health resources
    if(newActor.live){
        newActor.live.hp = actor.system.hp;
        newActor.live.stamina = newActor.system.stamina;
    }
    for(let i = 0; i<newActor.items.length; i++){
        newActor.items[i].live.ready = true;
    }
    return newActor;
}

//let roll = rollDieAdvanced(`${newActor.system.recoverydie.replace("1", String(actor.system.pb))}+${newActor.live.recoverydie}`);


export const actionShortRest = (actor: AssetActor) => {
    const newActor = _.cloneDeep(actor);
    //restores all health resources
    if(newActor.live){
        newActor.live.es = 0;
        newActor.live.hp = Math.max(Math.floor((newActor.system.hp / 2)), newActor.live.hp);
        newActor.live.stress = Math.max(newActor.live.stress - 2, 0);
    }
    return newActor;
}

export const actionLongRest = (actor: AssetActor) => {
    const newActor = _.cloneDeep(actor);
    if(newActor.live){
        newActor.live.es = 0;
        newActor.live.hp = Math.max(Math.floor((newActor.system.hp / 2)), newActor.live.hp);
        newActor.live.stress = Math.max(newActor.live.stress - 4, 0);
    }
    return newActor;
}

export const actionRefuge = (actor: AssetActor) => {
    const newActor = _.cloneDeep(actor);
    if(newActor.live){
        newActor.live.tempHp = 0;
        for(let i = 0; i<newActor.items.length; i++){
            if(!newActor.items[i].live.ready){
                let rechargeType = newActor.items[i].system.recharge;
                if(rechargeType != 'special'){
                    newActor.items[i].live.ready = true;
                }
            }
        }
        const hpBonus = newActor?.live?.hp ? newActor?.live?.hp : 0;
        newActor.live.currentHp = newActor.system.hp + hpBonus;
        newActor.live.tempHp = 0;
        newActor.live.stamina = Math.min(newActor.system.stamina, 9);
    }

    return newActor;
}