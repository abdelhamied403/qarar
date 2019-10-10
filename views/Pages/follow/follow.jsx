import React, { Component } from 'react';
import './follow.css';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Button,
  Media
} from 'reactstrap';
import Link from 'next/link';

import ClientSidebar from '../../../layout/ClientSidebar';
import CardPointsEdit from '../components/card-points-edit/cards-points-edit';
import TagItem from '../components/tag-item/tag-item';
import ListItem from '../components/list-item/list-item';

class Follow extends Component {
  render() {
    return (
      <>
        <ClientSidebar />
        <div className="follow">
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/me/about">
                  <a>لوحة التحكم</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>متابعاتي</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-25-b">
              <h2>متابعاتي</h2>
            </div>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-25-b">
                  <h6>المسودات</h6>
                  <Button
                    exact
                    to="/client/me/follow-item"
                    color="primary"
                    outline
                  >
                    عرض و تعديل
                  </Button>
                </div>
                <div className="flex flex-col">
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                  />
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-25-b">
                  <h6>المستخدمين</h6>
                  <Button
                    exact
                    to="/client/me/follow-item"
                    color="primary"
                    outline
                  >
                    عرض و تعديل
                  </Button>
                </div>
                <div className="flex flex-users-card-edit">
                  <CardPointsEdit
                    avatar="/static/img/avatar.png"
                    name="كامل حمد"
                    points="1200"
                  />
                  <CardPointsEdit
                    avatar="/static/img/avatar.png"
                    name="كامل حمد"
                    points="1200"
                  />
                  <CardPointsEdit
                    avatar="/static/img/avatar.png"
                    name="كامل حمد"
                    points="1200"
                  />
                  <CardPointsEdit
                    avatar="/static/img/avatar.png"
                    name="كامل حمد"
                    points="1200"
                  />
                  <CardPointsEdit
                    avatar="/static/img/avatar.png"
                    name="كامل حمد"
                    points="1200"
                  />
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-25-b">
                  <h6>الكلمات الدلالية</h6>
                  <Button
                    exact
                    to="/client/me/follow-item"
                    color="primary"
                    outline
                  >
                    عرض و تعديل
                  </Button>
                </div>
                <div className="tags-container flex flex-aligen-center">
                  <TagItem tag="طاقة" />
                  <TagItem tag="طاقة" />
                  <TagItem tag="طاقة" />
                  <TagItem tag="طاقة" />
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
      </>
    );
  }
}

export default Follow;
