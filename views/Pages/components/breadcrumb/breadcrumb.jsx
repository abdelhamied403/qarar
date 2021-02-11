import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Media } from 'reactstrap';
import Link from 'next/link';

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
            <Link href={link || '/'}>
              <a className="sub-header">
                <Media
                  className="image-icon"
                  object
                  src="/static/img/breadcrumbs-icon.svg"
                />
                {title}
              </a>
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
