import React from 'react';

const CommentType = props => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column',
        padding: '0 30px 0 30px'
      }}
    >
      <h4>{translate('draftDetails.shareIdeasModal.stepThree')}</h4>
      <div className="action-items-modal">
        <div>
          <Button
            color={commentType === 1 && 'primary'}
            onClick={() => {
              setCommentType(1);
              modState <= 3 && setModState(3);
            }}
          >
            {translate('draftDetails.shareIdeasModal.stepThreeOption1')}
          </Button>
        </div>
        <div>
          <Button
            color={commentType === 2 && 'primary'}
            onClick={() => {
              setCommentType(2);
              modState <= 3 && setModState(3);
            }}
          >
            {translate('draftDetails.shareIdeasModal.stepThreeOption2')}
          </Button>
        </div>
        <div>
          <Button
            color={commentType === 3 && 'primary'}
            onClick={() => {
              setCommentType(3);
              modState <= 3 && setModState(3);
            }}
          >
            {translate('draftDetails.shareIdeasModal.stepThreeOption3')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentType;
