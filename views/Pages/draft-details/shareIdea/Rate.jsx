import React, { useState } from 'react';
import { translate } from '../../../../utlis/translation';

import './shareIdea.css';

const Rate = props => {
  const [stars, setStars] = useState(1);
  const [hoverIndex, setHoverIndex] = useState(1);

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        padding: '0 30px 0 30px'
      }}
    >
      <h4 className="">{translate('draftDetails.shareIdeasModal.stepOne')}</h4>
      <div
        className="action-items-modal"
        onMouseLeave={e => setHoverIndex(stars)}
      >
        <div
          style={{ width: '10px' }}
          onMouseOver={e => setHoverIndex(0)}
        ></div>
        {new Array(5).fill(0).map((_, i) => (
          <div className="star">
            <img
              src={
                hoverIndex > i
                  ? '/static/img/Assets/star (-3.svg'
                  : '/static/img/Assets/star.svg'
              }
              alt=""
              onMouseOver={e => setHoverIndex(i + 1)}
              onClick={() => {
                props.setStars(i + 1);
                setStars(i + 1);
              }}
            />
            <span>
              {translate('draftDetails.shareIdeasModal.stepOneOptionnew' + i)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rate;
