'use client';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import styles from './editor.module.css';
import { useEffect, useRef } from 'react';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
  },
  {
    ssr: false
  }
);

export function EditorTextareaOld(props: any) {
  const quillRef = useRef(null);

  const updateEditorField = (newText: any) => {
    let tempDoc = _.cloneDeep(props.doc);
    tempDoc.system[props.field] = newText;
    props.setDoc(tempDoc);
}

  return (
    <div className={styles.textareadiv}>
      <div className={styles.inputstrheaderfixed}>Description</div>
      <ReactQuill forwardedRef={quillRef} theme="snow" value={props.doc.system[props.field]} onChange={updateEditorField}/>
    </div>
  );
}

export default EditorTextareaOld;
