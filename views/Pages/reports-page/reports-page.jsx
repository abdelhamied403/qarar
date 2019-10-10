import React, { Component } from 'react';
import { Container, Row, Col, CardBody, CardHeader, Card } from 'reactstrap';
import CardInfoIcon from '../components/card-info-icon/card-info-icon';
import CardPoints from '../components/card-points/cards-points';
import './reports-page.css';

class About extends Component {
  render() {
    return (
      <>
        <div className="primary-header">
          <Container>
            <h3>تقارير المشاركة المجتمعية</h3>
          </Container>
        </div>
        <Container className="reports-page">
          <div>
            <Row>
              <Col xs="12" md="6">
                <CardInfoIcon
                  description="عدد مستخدمي المنصة الحالي"
                  info="مستخدم"
                  number="3200"
                  icon="/static/img/Icon - draft activity - users.svg"
                />
              </Col>
              <Col xs="12" md="6">
                <CardInfoIcon
                  description="عدد المسودات التي تمت مناقشتها"
                  info="مسودة"
                  number="5523"
                  icon="/static/img/Report Icon.svg"
                />
              </Col>
            </Row>
          </div>

          <div>
            <Card className="card-users-part">
              <CardHeader>
                <div className="flex-header">
                  <h6 className="name">المستخدمين الاكثر نشاطا</h6>
                </div>
              </CardHeader>
              <CardBody>
                <Row className="active-users">
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                    />
                  </Col>
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                    />
                  </Col>{' '}
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                    />
                  </Col>{' '}
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                    />
                  </Col>
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                    />
                  </Col>
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                    />
                  </Col>{' '}
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                    />
                  </Col>{' '}
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>

          <div>
            <Card className="card-users-part">
              <CardHeader>
                <div className="flex-header">
                  <h6 className="name">المسودات الاكثر نشاطا</h6>
                </div>
              </CardHeader>
              <CardBody>
                <Row className="active-users">
                  <Col sm="12" md="6">
                    <div className="active-drafts-card">
                      <div className="flex flex-justifiy-sp flex-align-center">
                        <h6 className="break">سيسات تسمح باستيراد السيارات</h6>
                        <span className="sub-header">
                          <i className="fa fa-thumbs-up" /> 274 صوت
                        </span>
                      </div>
                      <div className="flex flex-justifiy-sp">
                        <span className="sub-header">22/2/2002</span>
                        <span className="sub-header">
                          <i className="fa fa-comment" /> 274 تعليق
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="6">
                    <div className="active-drafts-card">
                      <div className="flex flex-justifiy-sp flex-align-center">
                        <h6 className="break">سيسات تسمح باستيراد السيارات</h6>
                        <span className="sub-header">
                          <i className="fa fa-thumbs-up" /> 274 صوت
                        </span>
                      </div>
                      <div className="flex flex-justifiy-sp">
                        <span className="sub-header">22/2/2002</span>
                        <span className="sub-header">
                          <i className="fa fa-comment" /> 274 تعليق
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="6">
                    <div className="active-drafts-card">
                      <div className="flex flex-justifiy-sp flex-align-center">
                        <h6 className="break">سيسات تسمح باستيراد السيارات</h6>
                        <span className="sub-header">
                          <i className="fa fa-thumbs-up" /> 274 صوت
                        </span>
                      </div>
                      <div className="flex flex-justifiy-sp">
                        <span className="sub-header">22/2/2002</span>
                        <span className="sub-header">
                          <i className="fa fa-comment" /> 274 تعليق
                        </span>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12" md="6">
                    <div className="active-drafts-card">
                      <div className="flex flex-justifiy-sp flex-align-center">
                        <h6 className="break">سيسات تسمح باستيراد السيارات</h6>
                        <span className="sub-header">
                          <i className="fa fa-thumbs-up" /> 274 صوت
                        </span>
                      </div>
                      <div className="flex flex-justifiy-sp">
                        <span className="sub-header">22/2/2002</span>
                        <span className="sub-header">
                          <i className="fa fa-comment" /> 274 تعليق
                        </span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>

          <div>
            <Card className="card-users-part">
              <CardHeader>
                <div className="flex-header">
                  <h6 className="name">المستخدمين الاكثر نشاطا</h6>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                      content="اسم الجائزة"
                    />
                  </Col>
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                      content="اسم الجائزة"
                    />
                  </Col>
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                      content="اسم الجائزة"
                    />
                  </Col>
                  <Col sm="12" md="3">
                    <CardPoints
                      isDarkCard="true"
                      avatar="/static/img/avatar.png"
                      name="كامل حمد"
                      points="1200"
                      content="اسم الجائزة"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Container>
      </>
    );
  }
}

export default About;
