import React, { Component } from 'react';
import './user-info.css';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Media
} from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import avatar from '../../../assets/img/avatar.png';

class UserInfo extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="user-info">
          <Container>
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody className="card-not">
                    <div className="flex flex-justifiy-sp">
                      <div className="userinfo flex flex-align-center">
                        <Media object src={avatar} className="image-avatar" />
                        <div className="felx flex-col">
                          <h3>كامل حمد</h3>
                          <span className="sub-header">@kamelA</span>
                          <div className="flex">
                            <div className="m-30-l">
                              12345 <span className="sub-header">صوت</span>
                            </div>
                            <div className="m-30-l">
                              12345 <span className="sub-header">تعليق</span>
                            </div>
                            <div className="m-30-l">
                              12345 <span className="sub-header">متابع</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button color="primary" outline>
                        الغاء المتابعة{' '}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="6">
                <Card>
                  <CardBody className="card-not">
                    <div className="flex flex-justifiy-sp m-25-b">
                      <h6 className="sub-header">
                        الافكار التي قام بالتصويت عليها
                      </h6>
                      <Button
                        exact
                        to="/client/landing"
                        tag={RRNavLink}
                        color="primary"
                        outline
                      >
                        عرض الكل
                      </Button>
                    </div>
                    <div className="flex flex-col">
                      <p>فكرة تطوير المناطق السياحية</p>
                      <p>فكرة تطوير المناطق السياحية</p>
                      <p>فكرة تطوير المناطق السياحية</p>
                      <p>فكرة تطوير المناطق السياحية</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" md="6">
                <Card>
                  <CardBody className="card-not">
                    <div className="flex flex-justifiy-sp m-25-b">
                      <h6 className="sub-header">
                        الافكار التي قام بالتصويت عليها
                      </h6>
                      <Button
                        exact
                        to="/client/landing"
                        tag={RRNavLink}
                        color="primary"
                        outline
                      >
                        عرض الكل
                      </Button>
                    </div>
                    <div className="flex flex-col">
                      <p>فكرة تطوير المناطق السياحية</p>
                      <p>فكرة تطوير المناطق السياحية</p>
                      <p>فكرة تطوير المناطق السياحية</p>
                      <p>فكرة تطوير المناطق السياحية</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" md="6">
                <Card>
                  <CardBody className="card-not">
                    <div className="flex flex-justifiy-sp m-25-b">
                      <h6 className="sub-header">الأوسمة</h6>
                      <Button
                        exact
                        to="/client/landing"
                        tag={RRNavLink}
                        color="primary"
                        outline
                      >
                        عرض الكل
                      </Button>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-nowrap flex-align-base">
                        <span className="icon-primary">
                          <i className="fa fa-money fa-lg "></i>
                        </span>
                        <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                      </div>
                      <div className="flex flex-nowrap flex-align-base">
                        <span className="icon-primary">
                          <i className="fa fa-money fa-lg "></i>
                        </span>
                        <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                      </div>
                      <div className="flex flex-nowrap flex-align-base">
                        <span className="icon-primary">
                          <i className="fa fa-money fa-lg "></i>
                        </span>
                        <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                      </div>
                      <div className="flex flex-nowrap flex-align-base">
                        <span className="icon-primary">
                          {' '}
                          <i className="fa fa-money fa-lg "></i>{' '}
                        </span>
                        <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="6">
                <Card>
                  <CardBody className="card-not">
                    <div className="flex flex-justifiy-sp m-25-b">
                      <h6 className="sub-header">الجوائز</h6>
                      <Button
                        exact
                        to="/client/landing"
                        tag={RRNavLink}
                        color="primary"
                        outline
                      >
                        عرض الكل
                      </Button>
                    </div>
                    <div className="flex flex-col">
                      <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                      <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                      <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                      <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                      <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default UserInfo;
