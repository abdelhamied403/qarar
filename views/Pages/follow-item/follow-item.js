import React, { Component } from 'react';
import './follow-item.css';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  PaginationItem,
  PaginationLink,
  Pagination
} from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
const ClientSidebar = React.lazy(() =>
  import('../../../containers/ClientLayout/ClientSidebar')
);

const ListItem = React.lazy(() => import('../components/list-item/list-item'));
class FollowItem extends Component {
  render() {
    return (
      <React.Fragment>
        <ClientSidebar />
        <div className="follow-item">
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link exact to="/client/landing" tag={RRNavLink}>
                  لوحة التحكم
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>المسودات</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-25-b">
              <h2>المسودات التي أتابعها</h2>
            </div>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-col">
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                  <ListItem
                    header="سياسة السماح باستيراد السيارات الكهربائية"
                    btnText="ايقاف المتابعة"
                    btnColor="danger"
                    isWide="true"
                  />
                </div>
              </CardBody>
            </Card>
            <div className="pagination-container">
              <Pagination>
                <PaginationItem>
                  <PaginationLink previous tag="button" />
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink tag="button">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink tag="button">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next tag="button" />
                </PaginationItem>
              </Pagination>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default FollowItem;
