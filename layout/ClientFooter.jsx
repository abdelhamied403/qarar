import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { create } from 'apisauce';

// define the api

import './client.css';

const api = create({
  baseURL: 'https://momragov.sharedt.com/ar/'
});

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
                <Col md sm="6" className="d-flex flex-column">
                  <a href={link.url}>
                    <h5>{link.name}</h5>
                  </a>
                  {Object.keys(link.child).map(keyC => (
                    <a href={link.child[keyC].url}>{link.child[keyC].name}</a>
                  ))}
                </Col>
              );
            })}
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
