
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorPowerFlags(props: any) {

  const updateFlags = (e: any) => {
      let tempDoc = _.cloneDeep(props.doc);
      tempDoc.system.flags[e.target.name] = Boolean(e.target.checked);
      props.setDoc(tempDoc);
  }

  if(props.doc && props.doc.system && props.doc.system.flags && props.doc.system.foundrytype && props.doc.system.foundrytype == 'power'){
    return (
      <div className={styles.editdiv + ' ' + styles.dynamicflex}>
        <div className={styles.inputstrheaderfixed}>Power Flags</div>
        <div className={styles.check}><input  type="checkbox" id="aoe" name="aoe" checked={props.doc.system.flags.aoe} onChange={updateFlags} /><label htmlFor="aoe">AOE</label></div>
        <div className={styles.check}><input  type="checkbox" id="dot" name="dot" checked={props.doc.system.flags.dot} onChange={updateFlags} /><label htmlFor="dot">DOT</label></div>
        <div className={styles.check}><input  type="checkbox" id="damage" name="damage" checked={props.doc.system.flags.damage} onChange={updateFlags} /><label htmlFor="damage">Damage</label></div>
        <div className={styles.check}><input  type="checkbox" id="melee" name="melee" checked={props.doc.system.flags.melee} onChange={updateFlags} /><label htmlFor="melee">Melee</label></div>
        <div className={styles.check}><input  type="checkbox" id="ranged" name="ranged" checked={props.doc.system.flags.ranged} onChange={updateFlags} /><label htmlFor="ranged">Ranged</label></div>
        <div className={styles.check}><input  type="checkbox" id="projectile" name="projectile" checked={props.doc.system.flags.projectile} onChange={updateFlags} /><label htmlFor="projectile">Projectile</label></div>
        <div className={styles.check}><input  type="checkbox" id="passive" name="passive" checked={props.doc.system.flags.passive} onChange={updateFlags} /><label htmlFor="passive">Passive</label></div>
        <div className={styles.check}><input  type="checkbox" id="ritual" name="ritual" checked={props.doc.system.flags.ritual} onChange={updateFlags} /><label htmlFor="ritual">Ritual</label></div>
        <div className={styles.check}><input  type="checkbox" id="buff" name="buff" checked={props.doc.system.flags.buff} onChange={updateFlags} /><label htmlFor="buff">Buff</label></div>
        <div className={styles.check}><input  type="checkbox" id="debuff" name="debuff" checked={props.doc.system.flags.debuff} onChange={updateFlags} /><label htmlFor="debuff">Debuff</label></div>
        <div className={styles.check}><input  type="checkbox" id="multihit" name="multihit" checked={props.doc.system.flags.multihit} onChange={updateFlags} /><label htmlFor="multihit">Multihit</label></div>
        <div className={styles.check}><input  type="checkbox" id="control" name="control" checked={props.doc.system.flags.control} onChange={updateFlags} /><label htmlFor="control">Control</label></div>
        <div className={styles.check}><input  type="checkbox" id="mobility" name="mobility" checked={props.doc.system.flags.mobility} onChange={updateFlags} /><label htmlFor="mobility">Mobility</label></div>
        <div className={styles.check}><input  type="checkbox" id="recovery" name="recovery" checked={props.doc.system.flags.recovery} onChange={updateFlags} /><label htmlFor="recovery">Recovery</label></div>
        <div className={styles.check}><input  type="checkbox" id="basicattack" name="basicattack" checked={props.doc.system.flags.basicattack} onChange={updateFlags} /><label htmlFor="recovery">BasicAttack</label></div>
        <div className={styles.check}><input  type="checkbox" id="summon" name="summon" checked={props.doc.system.flags.summon} onChange={updateFlags} /><label htmlFor="summon">Summon</label></div>
        <div className={styles.check}><input  type="checkbox" id="utility" name="utility" checked={props.doc.system.flags.utility} onChange={updateFlags} /><label htmlFor="utility">Utility</label></div>
        <div className={styles.check}><input  type="checkbox" id="reserve" name="reserve" checked={props.doc.system.flags.reserve} onChange={updateFlags} /><label htmlFor="reserve">Reserve</label></div>
        <div className={styles.check}><input  type="checkbox" id="heritage" name="heritage" checked={props.doc.system.flags.heritage} onChange={updateFlags} /><label htmlFor="heritage">Heritage</label></div>
        <div className={styles.check}><input  type="checkbox" id="keystone" name="keystone" checked={props.doc.system.flags.keystone} onChange={updateFlags} /><label htmlFor="keystone">Keystone</label></div>
        <div className={styles.check}><input  type="checkbox" id="defense" name="defense" checked={props.doc.system.flags.defense} onChange={updateFlags} /><label htmlFor="defense">Defense</label></div>
        <div className={styles.check}><input  type="checkbox" id="concentration" name="concentration" checked={props.doc.system.flags.concentration} onChange={updateFlags} /><label htmlFor="defense">Concentration</label></div>
        <div className={styles.check}><input  type="checkbox" id="divine" name="divine" checked={props.doc.system.flags.divine} onChange={updateFlags} /><label htmlFor="divine">Divine</label></div>
        <div className={styles.check}><input  type="checkbox" id="string" name="string" checked={props.doc.system.flags.string} onChange={updateFlags} /><label htmlFor="string">String</label></div>
        <div className={styles.check}><input  type="checkbox" id="metapower" name="metapower" checked={props.doc.system.flags.metapower} onChange={updateFlags} /><label htmlFor="metapower">Metapower</label></div>
        <div className={styles.check}><input  type="checkbox" id="npc" name="npc" checked={props.doc.system.flags.npc} onChange={updateFlags} /><label htmlFor="npc">NPC</label></div>
      </div>
    );
  } else {
    return null;
  }

}

export default EditorPowerFlags;
