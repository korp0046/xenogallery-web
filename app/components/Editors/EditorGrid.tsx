
import _ from 'lodash';
import styles from './editor.module.css';
import EditorNumberSimple from './EditorNumberSimple';
import EditorGroupDiv from './EditorGroupDiv';
import ToggleBinary from '../Toggle/ToggleBinary';

export function EditorGrid(props: any) {

    const updateGrid = (key: string, value: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.grid[key] = value;
        props.setDoc(tempDoc);
    }


    if(props.doc.system && props.doc.system.grid){
      return (
        <EditorGroupDiv label={'Grid'}>
          <EditorNumberSimple label={'x'} min={0} max={100} value={props.doc.system.grid.x} action={(value: number)=>updateGrid('x', value)} />
          <EditorNumberSimple label={'y'} min={0} max={100} value={props.doc.system.grid.y} action={(value: number)=>updateGrid('y', value)} />
          <EditorNumberSimple label={'scale'} min={25} max={100} value={props.doc.system.grid.scale} action={(value: number)=>updateGrid('scale', value)} />
          <ToggleBinary value={props.doc.system.grid.enabled} checked={props.doc.system.grid.enabled} actionData={props.doc.system.grid.enabled} action={(value: number)=>updateGrid('enabled', !value)}/>
        </EditorGroupDiv>
      )
    } else {
      return <span>No Grid?</span>;
    }

}

export default EditorGrid;
