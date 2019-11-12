import React, { Component } from 'react';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Media,
  Row,
  Col,
  UncontrolledAlert
} from 'reactstrap';
import { connect } from 'react-redux';
import Link from 'next/link';
import ClientSidebar from '../../../layout/ClientSidebar';

import Api from '../../../api';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const { uid } = this.props;
    const response = await Api.get(`/qarar_api/load/user/${uid}?_format=json`);
    if (response.ok) {
      this.setState({ user: response.data });
    }
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <ClientSidebar />
        <div className="aboutpage">
          <Container>
            <Breadcrumb className="px-0" listClassName="px-0">
              <BreadcrumbItem>
                <Link href="/me/about">
                  <a> لوحة التحكم</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>معلوماتي الشخصية</BreadcrumbItem>
            </Breadcrumb>
            <UncontrolledAlert color="primary">
              مرحبا بك في ملفك الشخصي
            </UncontrolledAlert>
            <div className="flex flex-justifiy-sp m-50-b">
              <h2>معلوماتي الشخصية</h2>

              <Link href="/me/update">
                <Button exact color="primary" outline>
                  تعديل المعلومات
                </Button>
              </Link>
            </div>
            <div className="userinfo flex flex-align-center m-50-b">
              <Media
                object
                src={user.picture || '/static/img/avatar.png'}
                className="image-avatar"
              />
              <div className="felx flex-col">
                <h3>{user.full_name}</h3>
                <span className="sub-header">@{user.name}</span>
                <div className="flex">
                  <div className="m-20-lr">
                    {user.likes || 0} <span className="sub-header">صوت</span>
                  </div>
                  <div className="m-20-lr">
                    {user.comments || 0}{' '}
                    <span className="sub-header">تعليق</span>
                  </div>
                  <div className="m-20-lr">
                    {user.followers || 0}{' '}
                    <span className="sub-header">متابع</span>
                  </div>
                </div>
              </div>
            </div>
            <Row>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">البريد الالكتروني</h6>
                  <h4>{user.mail || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">البلد </h6>
                  <h4>{user.country || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">المدينة</h6>
                  <h4>{user.city || '--'}</h4>
                </div>
              </Col>

              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">منطقة السكن</h6>
                  <h4>{user.neighborhood || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">أعلى مستوى تعليمي</h6>
                  <h4>{user.educational_level || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">الوظيفة</h6>
                  <h4>{user.job || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">قطاع العمل</h6>
                  <h4>{user.labor_sector || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">الحالة الاجتماعية</h6>
                  <h4>{user.social_status || '--'}</h4>
                </div>
              </Col>
              {/* <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">كلمة المرور</h6>
                  <h4>********j8</h4>
                </div>
    </Col> */}
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ uid }) => ({ uid });
export default connect(mapStateToProps)(About);
