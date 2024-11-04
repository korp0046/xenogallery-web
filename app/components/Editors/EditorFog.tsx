
import _ from 'lodash';
import styles from './editor.module.css';
import EditorNumberSimple from './EditorNumberSimple';
import EditorGroupDiv from './EditorGroupDiv';
import ToggleBinary from '../Toggle/ToggleBinary';

export function EditorFog(props: any) {

    const updateFog = (key: string, value: any) => {
        let tempDoc = _.cloneDeep(props.doc);
        tempDoc.system.fog[key] = value;
        props.setDoc(tempDoc);
    }


    if(props.doc.system && props.doc.system.fog){
      return (
        <EditorGroupDiv label={'Fog'}>
          <ToggleBinary value={props.doc.system.fog.enabled} checked={props.doc.system.fog.enabled} actionData={props.doc.system.fog.enabled} action={(value: number)=>updateFog('enabled', !value)}/>
          <ToggleBinary value={props.doc.system.fog.preview} checked={props.doc.system.fog.preview} actionData={props.doc.system.fog.preview} action={(value: number)=>updateFog('preview', !value)}/>
        </EditorGroupDiv>
      )
    } else {
      return <span>No Fog</span>;
    }

}

export default EditorFog;
