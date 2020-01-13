import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Container, Button, Col, Row } from 'reactstrap';
import Iframe from 'react-iframe';

import './client.css';

const propTypes = {
  isAuthentcated: PropTypes.bool
};

const defaultProps = {};

const ClientFooter = ({ isAuthentcated }) => (
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
          <Col md="2" sm="6" className="d-flex flex-column">
            <h5>خدمات الوزارة</h5>
            <Link>
              <a href="">نبذة عن الوزارة</a>
            </Link>
            <Link>
              <a href="">كلمة عن الوزير</a>
            </Link>
            <Link>
              <a href="">الهيكل التنظيمي</a>
            </Link>
            <Link>
              <a href="">الوكالات</a>
            </Link>
            <Link>
              <a href="">المساهمة في 2030</a>
            </Link>
          </Col>
          <Col md="2" sm="6" className="d-flex flex-column">
            <h5>المركز الأعلامي</h5>
            <Link>
              <a href="">اخر الأخبار</a>
            </Link>
            <Link>
              <a href="">الفاعاليات</a>
            </Link>
            <Link>
              <a href="">الإعلانات</a>
            </Link>
            <Link>
              <a href="">الوسائط</a>
            </Link>
            <Link>
              <a href="">التعاميم</a>
            </Link>
          </Col>
          <Col md="2" sm="6" className="d-flex flex-column">
            <h5>البيانات المفتوحة</h5>
            <Link>
              <a href="">الأمانات و البلديات</a>
            </Link>
            <Link>
              <a href="">البيانات المفتوحة</a>
            </Link>
            <Link>
              <a href="">برامج الوزارة</a>
            </Link>
            <Link>
              <a href="">الأنظمة و اللوائح</a>
            </Link>
            <Link>
              <a href="">التقارير و الأحصائات</a>
            </Link>
            <Link>
              <a href="">الأسئلة الشائعة</a>
            </Link>
          </Col>
          <Col md="2" sm="6" className="d-flex flex-column">
            <h5>تواصل معنا</h5>
            <p>:الهاتف +966114569999</p>
            <p>:البريد الإلكتروني p.r@momra.gov.sa</p>
          </Col>
          <Col md="2" sm="6" className="d-flex flex-column">
            <h5>طريق الملك عبدالله - الرياض</h5>
            <p>
              الذهاب للموقع
              <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
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
          <p>©جميع الحقوق محفوظة وزارة الشئون البلدية والقروية - 2019</p>
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

ClientFooter.propTypes = propTypes;
ClientFooter.defaultProps = defaultProps;

export default ClientFooter;
