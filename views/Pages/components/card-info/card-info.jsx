import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Media } from 'reactstrap';
import './card-info.css';
import { translate } from '../../../../utlis/translation';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

const CardInfo = ({ description, info, icon, number, type, isDarkCard }) => (
  <div className="cards-info">
    {type ? (
      <Card className={isDarkCard ? 'dark-card-info' : ''}>
        <CardBody className="card-small">
          <div className="col-type">
            <h3 className="number">{number}</h3>
            <span className="type">{type}</span>
          </div>
          {icon ? (
            <span dir={translate('dir')} className="icon">
              <Media object src={icon} className="icon-media" />

              {/* <i className={icon + " icons d-block"}></i> */}
            </span>
          ) : (
            ''
          )}
        </CardBody>
      </Card>
    ) : (
      <Card className="card-info">
        <CardHeader>
          <div className="flex-header">
            <div className="user-info">
              <h4 className="description">{description}</h4>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <span dir={translate('dir')} className="icon">
            {/* <i className={icon + " icons d-block"}></i> */}
            <Media object src={icon} className="icon-media" />
          </span>
          <div className="about">
            <div className="col-about">
              <h3 className="num red">{number}</h3>
              <span className="info">{info}</span>
            </div>
          </div>
        </CardBody>
      </Card>
    )}
  </div>
);
CardInfo.propTypes = propTypes;
CardInfo.defaultProps = defaultProps;

export default CardInfo;
