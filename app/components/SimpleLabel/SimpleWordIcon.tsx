import { elementThumbs, sheetIcons, uiIcons } from '@/lib/gamedata/imgAssets';
import styles from './simplelabel.module.css';
import SimpleTinyImg from './SimpleTinyImg';

export default function SimpleWordIcon(props: any) {
    const word = props.data;
    if(word){
        if(word == 'versatile'){
            return(<SimpleTinyImg src={sheetIcons.versatile} />);
        } else if (word == 'melee'){
            return(<SimpleTinyImg src={sheetIcons.melee} />);
        } else if (word == 'ranged'){
            return(<SimpleTinyImg src={sheetIcons.ranged} />);
        } else if (word == 'spell'){
            return(<SimpleTinyImg src={sheetIcons.mystic} />);
        } else if (word == 'complex'){
            return(<SimpleTinyImg src={sheetIcons.complex} />);
        } else if (word == 'will'){
            return(<SimpleTinyImg src={sheetIcons.will} />);
        } else if (word == 'armor'){
            return(<SimpleTinyImg src={sheetIcons.armor} />);
        } else if (word == 'fortitude'){
            return(<SimpleTinyImg src={sheetIcons.fortitude} />);
        } else if (word == 'reflex'){
            return(<SimpleTinyImg src={sheetIcons.reflex} />);
        } else if (['1 full action', '1 full-round action', '1 full round action', '1 round', 'a3', 'b3'].includes(word.toLowerCase())){
            return(<SimpleTinyImg src={sheetIcons.actionFull} />);
        } else if (['1 standard action', '1 action', 'a2', 'b2'].includes(word.toLowerCase())){
            return(<SimpleTinyImg src={sheetIcons.actionStandard} />);
        } else if (['1 bonus action', 'bonus action', 'a1', 'b1'].includes(word.toLowerCase())){
            return(<SimpleTinyImg src={sheetIcons.actionBonus} />);
        } else if (['1 move action', '1 move', 'a1', 'b1'].includes(word.toLowerCase())){
            return(<SimpleTinyImg src={sheetIcons.actionMove} />);
        } else if (['1 free action', 'free action', '1 free', 'free', 'a0'].includes(word.toLowerCase())){
            return(<SimpleTinyImg src={sheetIcons.actionFree} />);
        } else if (['1 reaction', 'reaction', 'r1'].includes(word.toLowerCase())){
            return(<SimpleTinyImg src={sheetIcons.actionReaction} />);
        } else if (['1 minute', 'up to 1 minute', 'c1m'].includes(word.toLowerCase())){
            return(<SimpleTinyImg src={sheetIcons.action1m} />);
        } else if (['10 minutes', 'up to 10 minutes', 'c10m'].includes(word.toLowerCase())){
            return(<SimpleTinyImg src={sheetIcons.action10m} />);
        } else if (['1 hour', 'up to 1 hour', 'c1h'].includes(word.toLowerCase())){
            return(<SimpleTinyImg src={sheetIcons.action1h} />);
        } else if (['24 hours', '1 day', 'up to 24 hours', 'up to 1 day', "c24h"].includes(word.toLowerCase())){
            return(<SimpleTinyImg src={sheetIcons.action1h} />);
        } else if (['8 hours', 'up to 8 hours', 'C8H'].includes(word.toLowerCase())){
            return(<SimpleTinyImg src={sheetIcons.action1h} />);
        } else if (word == 'basicscene'){
            return(<SimpleTinyImg src={uiIcons.basicscene} />);
        } else if (word == 'exploremap'){
            return(<SimpleTinyImg src={uiIcons.nodemap} />);
        } else if (word == 'battlemap'){
            return(<SimpleTinyImg src={uiIcons.battlemap} />);
        } else if (word == 'harmless' || word.length == 0){
            return <span>-</span>;
        } else {
            return <span>{word}</span>;
        }
    } else {
        return <span>{word}</span>;
    }

}
