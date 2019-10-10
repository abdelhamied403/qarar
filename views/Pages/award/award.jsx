import React, { Component } from 'react';
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
import Link from 'next/link';
import ClientSidebar from '../../../layout/ClientSidebar';

import './award.css';

class Award extends Component {
  render() {
    return (
      <>
        <ClientSidebar />
        <div className="award">
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/me/about">
                  <a>لوحة التحكم</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>اوسمتي</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-25-b">
              <h2>اوسمتي</h2>
            </div>

            <Row>
              <Col xs="12">
                <Card>
                  <CardBody className="card-not">
                    <div className="flex flex-justifiy-sp m-25-b">
                      <h6 className="sub-header">مجموع النقاط</h6>
                    </div>
                    <div className="flex flex-col flex-justifiy-end">
                      <h4>4562 نقطة </h4>
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
                        to="/client/me/award-item"
                        color="primary"
                        outline
                      >
                        عرض الكل
                      </Button>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-nowrap flex-align-base">
                        <span className="icon-primary">
                          <Media
                            object
                            src="/static/img/reward placeholder.svg"
                            className="icon-media"
                          />
                        </span>
                        <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                      </div>
                      <div className="flex flex-nowrap flex-align-base">
                        <span className="icon-primary">
                          <Media
                            object
                            src="/static/img/reward placeholder copy.svg"
                            className="icon-media"
                          />
                        </span>
                        <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                      </div>
                      <div className="flex flex-nowrap flex-align-base">
                        <span className="icon-primary">
                          {/* <i className="fa fa-trophy"></i> */}
                          <Media
                            object
                            src="/static/img/reward placeholder.svg"
                            className="icon-media"
                          />
                        </span>
                        <p>جائزة قرار تقليل حوادث السير في الشارع العام</p>
                      </div>
                      <div className="flex flex-nowrap flex-align-base">
                        <span className="icon-primary">
                          <Media
                            object
                            src="/static/img/reward placeholder copy.svg"
                            className="icon-media"
                          />
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
                        to="/client/me/award-item"
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
      </>
    );
  }
}

export default Award;
