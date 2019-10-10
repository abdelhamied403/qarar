import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import './client.css';

const propTypes = {
  isAuthentcated: PropTypes.bool
};

const defaultProps = {};

const ClientFooter = ({ isAuthentcated }) => (
  <div
    className={isAuthentcated ? 'client-footer user-loggedin' : 'client-footer'}
  >
    <img src="/static/img/brand/logo-footer.svg" alt="qarar" />
    <h3>قرار - وزارة العمل</h3>
    <div className="footer-links">
      <Link href="/about">
        <a>عن قرار</a>
      </Link>
      <Link href="/faqs">
        <a>أسئلة شائعة</a>
      </Link>
      <Link href="/contact-us">
        <a> اتصل بنا</a>
      </Link>
    </div>
  </div>
);

ClientFooter.propTypes = propTypes;
ClientFooter.defaultProps = defaultProps;

export default ClientFooter;
