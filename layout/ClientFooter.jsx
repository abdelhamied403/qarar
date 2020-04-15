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
      {/* <div className="upperFooter">
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
  </div> */}
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
                  <h3>الرقم المباشر</h3>
                  <a href="tel:+199099">199099 </a>
                </div>
              </Col>
            </Row>
          </div>
          <div className="mid-footer">
            <Row>
              <Col md={3}>
                <h4> بلدي</h4>
                <a href="https://balady.gov.sa/About">عن بلدي</a>
                <a href="https://balady.gov.sa/UserGuide">أدلة المستخدمين</a>
              </Col>
              <Col md={3}>
                <h4> خدمات بلدي</h4>
                <a href="https://balady.gov.sa/Services"> خدمات إلكترونية</a>
                <a href="https://balady.gov.sa/Informative">
                  {' '}
                  الاستعلام الإلكتروني
                </a>
                <a href="https://balady.gov.sa/Services?id=6">
                  {' '}
                  بوابة الفرص الاستثمارية
                </a>
              </Col>
              <Col md={3}>
                <h4> سياسة بلدي</h4>
                <a
                  href="https://momra.gov.sa/files/privacy.pdf"
                  target="_blank"
                >
                  سياسة الخصوصية
                </a>
                <a href="https://momra.gov.sa/files/Policy.pdf" target="_blank">
                  سياسة إدارة المحتوى
                </a>
                <a href="https://balady.gov.sa/Terms" target="_blank">
                  الشروط والأحكام
                </a>
              </Col>
              <Col md={3}>
                <h4 className="loader-label">روابط هامه</h4>
                <a
                  href="https://balady.gov.sa/CenteralServices"
                  target="_blank"
                >
                  {' '}
                  بوابة الموظفين{' '}
                </a>
                <a
                  href="https://ebalady.momra.gov.sa/EnOffice/faces/Applyorlogin"
                  target="_blank"
                >
                  {' '}
                  بوابة المكاتب الهندسية{' '}
                </a>
              </Col>
            </Row>
          </div>
          <div className="bot-footer">
            <div className="container">
              <div className="d-flex">
                <div className="copyright">
                  {' '}
                  جميع الحقوق محفوظة – البوابة الوطنية الداعمة للمجتمع البلدي ©
                  <script>document.write((new Date()).getFullYear())</script>
                  2020{' '}
                </div>
                <ul className="list-unstyled">
                  <li>
                    <a
                      href="https://balady.gov.sa/Services/SiteMap"
                      target="_blank"
                    >
                      خريطة الموقع
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
