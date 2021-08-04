import { Alert, Button } from 'reactstrap';
import React, { useState } from 'react';
import AddComment from '../../draft-details/shareIdea/Comment';
import Rate from '../../draft-details/shareIdea/Rate';
import { translate } from '../../../../utlis/translation';
import { EditorState } from 'draft-js';

const CommentForm = props => {
  const [stars, setStars] = useState(0);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // alerts state
  const [draftErrMessage, setDraftErrMessage] = useState(false);

  const sendError = msg => {
    setDraftErrMessage(msg);
    setTimeout(() => {
      setDraftErrMessage(null);
    }, 3000);
  };

  const saveComment = () => {
    // validation
    if (!editorState.getCurrentContent().hasText() && props.comment_required) {
      sendError(translate('draftDetails.errors.noComment'));
      return;
    }
    if (stars === 0) {
      sendError(translate('draftDetails.errors.noRate'));
      return;
    }

    props.saveComment();
  };

  return (
    <div className="comment-form">
      {/* rate */}
      <Rate
        setStars={val => {
          setStars(val);
          props.setStars(val);
        }}
      ></Rate>

      {/* comment input */}
      <AddComment
        setEditorState={val => {
          setEditorState(val);
          props.setEditorState(val);
        }}
      ></AddComment>

      {draftErrMessage && <Alert color="danger">{draftErrMessage}</Alert>}

      {/* button */}
      <Button
        className="button-comment w-min mr-0 ml-auto flex flex-end"
        onClick={saveComment}
      >
        {translate('draftDetails.shareIdeasModal.stepFourComment')}
        <img
          dir={translate('dir')}
          src="/static/img/interactive/greenArrow.svg"
          alt=""
        />
      </Button>
    </div>
  );
};

export default CommentForm;
