import React, { Component } from 'react';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Button
} from 'reactstrap';
import Link from 'next/link';
import ClientSidebar from '../../../layout/ClientSidebar';
import './notifications.css';

class Notifications extends Component {
  render() {
    return (
      <>
        <ClientSidebar />
        <div className="aboutheader"></div>
        <div className="notifications">
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/me/about">
                  <a>لوحة التحكم</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>اشعاراتي</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-50-b">
              <h2>اشعاراتي</h2>
              <Button color="primary" outline>
                حذف الكل
              </Button>
            </div>

            <Card>
              <CardBody className="card-not">
                <h5>اشعارات جديدة</h5>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة
                    <Link href="/client/landing">
                      <a className="d-inline-block mx-1" color="link">
                        وسام ذهبي
                      </a>
                    </Link>
                    حوادث السير في الشارع العام
                  </div>
                  <span className="sub-header">17/6/2019</span>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة
                    <Link href="/client/landing">
                      <a className="d-inline-block mx-1" color="link">
                        وسام ذهبي
                      </a>
                    </Link>
                    حوادث السير في الشارع العام
                  </div>
                  <span className="sub-header">17/6/2019</span>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة
                    <Link href="/client/landing">
                      <a className="d-inline-block mx-1" color="link">
                        وسام ذهبي
                      </a>
                    </Link>
                    حوادث السير في الشارع العام
                  </div>
                  <span className="sub-header">17/6/2019</span>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة
                    <Link href="/client/landing">
                      <a className="d-inline-block mx-1" color="link">
                        وسام ذهبي
                      </a>
                    </Link>
                    حوادث السير في الشارع العام
                  </div>
                  <span className="sub-header">17/6/2019</span>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not">
                <h5> سابقاً</h5>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة
                    <Link href="/client/landing">
                      <a className="d-inline-block mx-1" color="link">
                        وسام ذهبي
                      </a>
                    </Link>
                    حوادث السير في الشارع العام
                  </div>
                  <span className="sub-header">17/6/2019</span>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة
                    <Link href="/client/landing">
                      <a className="d-inline-block mx-1" color="link">
                        وسام ذهبي
                      </a>
                    </Link>
                    حوادث السير في الشارع العام
                  </div>
                  <span className="sub-header">17/6/2019</span>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة
                    <Link href="/client/landing">
                      <a className="d-inline-block mx-1" color="link">
                        وسام ذهبي
                      </a>
                    </Link>
                    حوادث السير في الشارع العام
                  </div>
                  <span className="sub-header">17/6/2019</span>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة
                    <Link href="/client/landing">
                      <a className="d-inline-block mx-1" color="link">
                        وسام ذهبي
                      </a>
                    </Link>
                    حوادث السير في الشارع العام
                  </div>
                  <span className="sub-header">17/6/2019</span>
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
      </>
    );
  }
}

export default Notifications;
