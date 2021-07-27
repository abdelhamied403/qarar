import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { create } from 'apisauce';
import Api from '../api';

// define the api

import './client.css';
import { translate } from '../utlis/translation';
import axios from 'axios';

const propTypes = {
  isAuthentcated: PropTypes.bool
};
const defaultProps = {};

const ClientFooter = ({ isAuthentcated }) => {
  // state
  const [footer, setFooter] = useState([]);

  // getters
  const getFooter = () => {
    let lang = localStorage.getItem('LANG');
    axios
      .get(
        'https://qarar-backend.sharedt.com/qarar_api/footer-menu?lang=' + lang
      )
      .then(res => {
        setFooter(res.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getFooter();
  }, []);
  return (
    <div className={isAuthentcated ? ' user-loggedin' : 'newFooter'}>
      <footer className="footer">
        <Container className="mb-0">
          <div className="top-footer">
            <Row>
              <Col md={6}>
                <a className="footer-logo" href="#">
                  <img alt="رؤية ٢٠٣٠" src="/static/img/vision-w.svg" />
                </a>
              </Col>
              <Col md={6}>
                <div className="direct-num">
                  <h3>{translate('footer.number')}</h3>
                  <a href="tel:+199099">199099 </a>
                </div>
              </Col>
            </Row>
          </div>
          <div className="mid-footer">
            <Row>
              {footer?.map(foot => (
                <Col md={3}>
                  <h4> {foot.label}</h4>
                  {foot.children.map(child => (
                    <a href={child.href}>{child.label}</a>
                  ))}
                </Col>
              ))}
            </Row>
          </div>
          <div className="bot-footer">
            <div className="container">
              <div className="d-flex">
                <div className="copyright">
                  {translate('footer.copyrights')}
                </div>
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="https://balady.gov.sa/Services/SiteMap"
                      target="_blank"
                    >
                      {' '}
                      {translate('footer.websiteMap')}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

ClientFooter.propTypes = propTypes;
ClientFooter.defaultProps = defaultProps;

export default ClientFooter;
