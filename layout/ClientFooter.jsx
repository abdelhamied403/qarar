import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Container, Button, Col, Row } from 'reactstrap';
import Iframe from 'react-iframe';

import './client.css';

import api from '../api';

const propTypes = {
  isAuthentcated: PropTypes.bool
};

const defaultProps = {};

const ClientFooter = ({ isAuthentcated }) => {
  const [links, setLinks] = useState({});
  const getLinks = async () => {
    // api.setBaseURL('https://www.momra.gov.sa/');
    const response = await api.get('/momragov_api/menu/footer?_format=json');
    // console.log(response);

    if (response.ok) {
      if (response.data && response.data.contents) {
        setLinks(response.data.contents);
      }
    }
  };
  useEffect(() => {
    getLinks();
  }, []);
  return (
    <div className={isAuthentcated ? ' user-loggedin' : 'newFooter'}>
      <div className="upperFooter">
        <a href="">
          <img src="/static/img/interactive/fb.svg" alt="" />
        </a>
        <a href="">
          <img src="/static/img/interactive/twitter.svg" alt="" />
        </a>
        <a href="">
          <img src="/static/img/interactive/linkedin.svg" alt="" />
        </a>
        <a href="">
          <img src="/static/img/interactive/instagram.svg" alt="" />
        </a>
      </div>
      <div className="footer">
        <Container>
          <Row>
            {Object.keys(links).map(key => {
              const link = links[key];
              return (
                <Col md="2" sm="6" className="d-flex flex-column">
                  <a href={link.url}>
                    <h5>{link.name}</h5>
                  </a>
                  {link.child.map(child => (
                    <a href={child.url}>{child.name}</a>
                  ))}
                </Col>
              );
            })}
            <Col md="2" sm="6" className="d-flex flex-column">
              <h5>تواصل معنا</h5>
              <p>:الهاتف +966114569999</p>
              <p>:البريد الإلكتروني p.r@momra.gov.sa</p>
            </Col>
            <Col md="2" sm="6" className="d-flex flex-column">
              <h5>طريق الملك عبدالله - الرياض</h5>
              <p>
                الذهاب للموقع
                <i className="fa fa-long-arrow-left" aria-hidden="true" />
              </p>
            </Col>
            <Col md="2" sm="6" className="d-flex flex-column newMap">
              <Iframe
                url="https://www.google.com/maps/embed?pb=!1m17!1m8!1m3!1d7247.823198314918!2d46.665416!3d24.729915!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m3!3m2!1d24.729915!2d46.665416!4m0!5e0!3m2!1sen!2seg!4v1578950123098!5m2!1sen!2seg"
                width="100%"
                height="200px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
              />
            </Col>
          </Row>
          <div className="bottomFooter d-flex justify-content-between align-items-center">
            <p>
              ©جميع الحقوق محفوظة وزارة الشئون البلدية والقروية -{' '}
              {new Date().getFullYear()}
            </p>
            <div className="d-flex align-items-center">
              <p>
                لتصفح الموقع بشكل جيد الرجاء استخدام الإصدارات الاخيرة من
                المتصفحات التالية
              </p>
              <img src="/static/img/interactive/browser1.svg" alt="" />
              <img src="/static/img/interactive/browser2.svg" alt="" />
              <img src="/static/img/interactive/browser3.svg" alt="" />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

ClientFooter.propTypes = propTypes;
ClientFooter.defaultProps = defaultProps;

export default ClientFooter;
