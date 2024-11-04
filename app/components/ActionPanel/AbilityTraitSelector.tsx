import React, { useEffect, useRef, useState } from 'react';
import EditorSearchTagsnFlags, { EditorSearchTagsnFlagsMultiselect } from '../Editors/EditorSearchTagsnFlags';

import styles from './actionpanel.module.css';


export default function AbilityTraitSelector(props: any) {
    const traits = props.doc.system.traits ? props.doc.system.traits.split(',') : [];
    
  return (
    <div className={styles.elementselectormain}>
        <EditorSearchTagsnFlagsMultiselect label="Select Traits" list={traits} action={props.toggleTrait}/>
    </div>
  );
}
