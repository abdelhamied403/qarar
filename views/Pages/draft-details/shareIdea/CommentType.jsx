import { Button } from 'reactstrap';
import React from 'react';
import { translate } from '../../../../utlis/translation';

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
            color={props.type === 1 && 'primary'}
            onClick={() => {
              props.setType(1);
            }}
          >
            {translate('draftDetails.shareIdeasModal.stepThreeOption1')}
          </Button>
        </div>
        <div>
          <Button
            color={props.type === 2 && 'primary'}
            onClick={() => {
              props.setType(2);
            }}
          >
            {translate('draftDetails.shareIdeasModal.stepThreeOption2')}
          </Button>
        </div>
        <div>
          <Button
            color={props.type === 3 && 'primary'}
            onClick={() => {
              props.setType(3);
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
