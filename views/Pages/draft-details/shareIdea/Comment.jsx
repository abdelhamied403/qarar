import React, { useState } from 'react';
import { translate } from '../../../../utlis/translation';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);

const AddComment = props => {
  const [editorState, setEditorState] = useState();

  return (
    <div style={{ display: 'flex', flexFlow: 'column' }}>
      <Editor
        placeholder={translate(
          'draftDetails.shareIdeasModal.stepFourPlaceholder'
        )}
        toolbar={{
          options: ['inline', 'image'],
          inline: {
            options: ['bold', 'underline']
          },
          image: {
            alignmentEnabled: false,
            uploadCallback: () => {},
            alt: { present: true, mandatory: false },
            previewImage: true
          }
        }}
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="editor-class"
        onEditorStateChange={val => {
          props.setEditorState(val);
          setEditorState(val);
        }}
      />
    </div>
  );
};

export default AddComment;
