import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Media } from 'reactstrap';
import './card-info-icon.css';
import { translate } from '../../../../utlis/translation';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class CardInfoIcon extends Component {
  render() {
    // eslint-disable-next-line
    const { description, info, icon, number, type, isDarkCard } = this.props;

    return (
      <div className="card-info-container">
        {type ? (
          <Card className={isDarkCard ? 'dark-card-info-card' : ''}>
            <CardBody className="card-small">
              <div className="col-type">
                <span className="number">{number}</span>
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
          <Card className="card-info-icon">
            <CardHeader>
              <div className="flex-header">
                <div className="user-info">
                  <span className="description">{description}</span>
                </div>
                <div className="col-about">
                  <span className="num red">{number}</span>
                  <span className="info">{info}</span>
                </div>
              </div>
            </CardHeader>
            <CardBody>
              <span dir={translate('dir')} className="icon">
                <Media object src={icon} className="icon-media" />
              </span>
            </CardBody>
          </Card>
        )}
      </div>
    );
  }
}

CardInfoIcon.propTypes = propTypes;
CardInfoIcon.defaultProps = defaultProps;

export default CardInfoIcon;
