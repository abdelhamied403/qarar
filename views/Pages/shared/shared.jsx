import React, { Component } from 'react';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody
} from 'reactstrap';
import Link from 'next/link';
import ClientSidebar from '../../../layout/ClientSidebar';

import './shared.css';

class Shared extends Component {
  render() {
    return (
      <>
        <ClientSidebar />
        <div className="shared">
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/client/landing">
                  <a>لوحة التحكم</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>مشاركاتي</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-50-b">
              <h2>مشاركاتي</h2>
            </div>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-50-b">
                  <h6>المسودات التي قمت بالتصويت عليها</h6>
                  <Link href="/me/shared">
                    <a color="primary" outline>
                      عرض الكل
                    </a>
                  </Link>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-50-b">
                  <h6>المسودات التي قمت بالتعليق عليها</h6>
                  <Link href="/me/shared">
                    <a color="primary" outline>
                      عرض الكل
                    </a>
                  </Link>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-50-b">
                  <h6>تعليقات أعجبتني</h6>
                  <Link href="/me/shared">
                    <a color="primary" outline>
                      عرض الكل
                    </a>
                  </Link>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
      </>
    );
  }
}

export default Shared;
