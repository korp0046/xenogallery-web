'use client';
import _ from 'lodash';
import dynamic from 'next/dynamic';
import styles from './editor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { navSlice, selectDark } from '@/lib/redux';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView, ViewUpdate } from '@codemirror/view';

const MarkdownEditor = dynamic(
  () => import("@uiw/react-markdown-editor").then((mod) => mod.default),
  { ssr: false }
);

export const scrollerStyle = EditorView.theme({
  '&.cm-editor, & .cm-scroller': {
    borderBottomRightRadius: '3px',
    borderBottomLeftRadius: '3px',
  },
});

export function EditorTextarea(props: any) {
  const dispatch = useDispatch();

  const updateEditorField = (newText: any) => {
    dispatch(navSlice.actions.setArrowsEnabled(false));
    let tempDoc = _.cloneDeep(props.doc);
    tempDoc.system[props.field] = newText;
    props.setDoc(tempDoc);
}

  return (
    <div className={styles.textareadiv + " wmde-markdown-var"} data-color-mode="light">
        <MarkdownEditor
        value={props.doc.system[props.field]}
        onChange={(value, viewUpdate) => updateEditorField(value)}
        reExtensions={[markdown({ base: markdownLanguage, codeLanguages: languages }), scrollerStyle, EditorView.contentAttributes.of({ spellcheck: 'true' })]}
      />
      </div>
  );
}

export default EditorTextarea;
