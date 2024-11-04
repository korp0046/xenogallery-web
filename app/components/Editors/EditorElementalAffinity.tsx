
import _ from 'lodash';
import { elementThumbs } from '../../../lib/gamedata/imgAssets';
import styles from './editor.module.css';

export function SingleElementEditor(props: any){

    return(
        <div className={styles.vertgrid}>
            <img src={elementThumbs[props.name]} />
            <select className={`${styles.inputnum} ${props.name == 'universal' ? styles.disabled : ''}`} value={props.doc.system.affinity[props.name]} onChange={(e)=>props.updateElements(e, props.name)}>
            {
              _.range(0, 5+1).map((el: number, idx: number) => {
                return(
                  <option id={props.name} key={idx} value={el}>{String(el)}</option>
                );

              })
            }
        </select>
        </div>
    );
}

export function EditorElementalAffinity(props: any) {

    const updateElements = (e: any, name: string) => {
      let targetName = e.target.name || name;
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.affinity[targetName] = Number(e.target.value);

        props.setDoc(tempDoc);
    }
    if(props.doc.system && props.doc.system.affinity){
      return (
        <div className={styles.editdivlarge}>
          <div className={styles.inputstrheaderfixed}>Elemental Affinity</div>
          {
          ['light', 'fire', 'air', 'earth', 'water', 'wood', 'metal', 'shadow'].map((el: string, idx: number)=> {
            return <SingleElementEditor key={idx} type="number" id={el} name={el} doc={props.doc} updateElements={updateElements} /> 
          })
          }
        </div>
      );
    } else {
      return null;
    }

}

export default EditorElementalAffinity;
