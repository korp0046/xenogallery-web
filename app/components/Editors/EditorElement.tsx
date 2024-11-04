
import _ from 'lodash';
import styles from './editor.module.css';

export function EditorElement(props: any) {

    const updateElements = (e: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        console.log(e);
        tempDoc.system.element[e.target.name] = Boolean(e.target.checked);
        props.setDoc(tempDoc);
    }
    if(props.doc.system && props.doc.system.element){
      return (
        <div className={styles.editdiv}>
          <div className={styles.inputstrheaderfixed}>Elements</div>
          <input type="checkbox" id="light" name="light" checked={props.doc.system.element.light} onChange={updateElements} /><label htmlFor="light">Light</label>
          <input type="checkbox" id="fire" name="fire" checked={props.doc.system.element.fire} onChange={updateElements} /><label htmlFor="fire">Fire</label>
          <input type="checkbox" id="air" name="air" checked={props.doc.system.element.air} onChange={updateElements} /><label htmlFor="air">Air</label>
          <input type="checkbox" id="earth" name="earth" checked={props.doc.system.element.earth} onChange={updateElements} /><label htmlFor="earth">Earth</label>
          <input type="checkbox" id="water" name="water" checked={props.doc.system.element.water} onChange={updateElements} /><label htmlFor="water">Water</label>
          <input type="checkbox" id="wood" name="wood" checked={props.doc.system.element.wood} onChange={updateElements} /><label htmlFor="wood">Wood</label>
          <input type="checkbox" id="metal" name="metal" checked={props.doc.system.element.metal} onChange={updateElements} /><label htmlFor="metal">Metal</label>
          <input type="checkbox" id="shadow" name="shadow" checked={props.doc.system.element.shadow} onChange={updateElements} /><label htmlFor="shadow">Shadow</label>
          <input type="checkbox" id="universal" name="universal" checked={props.doc.system.element.universal} onChange={updateElements} /><label htmlFor="universal">Universal</label>
        </div>
      );
    } else {
      return null;
    }

}

export default EditorElement;
