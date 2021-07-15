import React from 'react';

const AddComment = props => {
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
        onEditorStateChange={setEditorState}
      />
      <Button
        className="button-comment w-min mr-0 ml-auto flex flex-end"
        onClick={() => saveComment()}
      >
        {translate('draftDetails.shareIdeasModal.stepFourComment')}
        <img
          dir={translate('dir')}
          src="/static/img/interactive/whiteArrow.svg"
          alt=""
        />
      </Button>
    </div>
  );
};

export default AddComment;
