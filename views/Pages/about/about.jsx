import React, { Component } from 'react';
import './about.css';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Media,
  Row,
  Col,
  Alert
} from 'reactstrap';
import Link from 'next/link';
import ClientSidebar from '../../../layout/ClientSidebar';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
    this.onclose = this.onclose.bind(this);
  }

  onclose() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <>
        <ClientSidebar />
        <div className="aboutpage">
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/me/about">
                  <a> لوحة التحكم</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>معلوماتي الشخصية</BreadcrumbItem>
            </Breadcrumb>
            <Alert
              className="slide-right"
              color="primary"
              isOpen={this.state.isOpen}
              toggle={this.onclose}
            >
              مرحبا بك في ملفك الشخصي
            </Alert>
            <div className="flex flex-justifiy-sp m-50-b">
              <h2>معلوماتي الشخصية</h2>
              <Button exact color="primary" outline>
                <Link href="me/update">
                  <a>تعديل المعلومات</a>
                </Link>
              </Button>
            </div>
            <div className="userinfo flex flex-align-center m-50-b">
              <Media
                object
                src="/static/img/profile.jpg"
                className="image-avatar"
              />
              <div className="felx flex-col">
                <h3>كامل حمد</h3>
                <span className="sub-header">@kamelA</span>
                <div className="flex">
                  <div className="m-20-lr">
                    12345 <span className="sub-header">صوت</span>
                  </div>
                  <div className="m-20-lr">
                    12345 <span className="sub-header">تعليق</span>
                  </div>
                  <div className="m-20-lr">
                    12345 <span className="sub-header">متابع</span>
                  </div>
                </div>
              </div>
            </div>
            <Row>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">البريد الالكتروني</h6>
                  <h4>m234@gmail.com</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">البلد </h6>
                  <h4>المملكة العربية السعودية</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">المدينة</h6>
                  <h4>الرياض</h4>
                </div>
              </Col>

              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">منطقة السكن</h6>
                  <h4>-</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">أعلى مستوى تعليمي</h6>
                  <h4>بكالوريوس</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">الوظيفة</h6>
                  <h4>مهندس</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">قطاع العمل</h6>
                  <h4>القطاع الخاص</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">الحالة الاجتماعية</h6>
                  <h4>متزوج</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">كلمة المرور</h6>
                  <h4>********j8</h4>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default About;
