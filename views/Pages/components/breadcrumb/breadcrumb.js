import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import breadcrumb from '../../../../assets/img/breadcrumbs-icon.svg';

import './breadcrumb.css';
const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class Breadcrumb extends Component {
  render() {
    // eslint-disable-next-line
    const { title, link } = this.props;

    return (
      <div className="breadcrumb ">
        <Container>
          <div className="flex-bread">
            <Link className="sub-header" exact to={link || '/client/landing'}>
              <Media className="image-icon" object src={breadcrumb} />
              {title}
            </Link>
          </div>
        </Container>
      </div>
    );
  }
}

Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default Breadcrumb;
