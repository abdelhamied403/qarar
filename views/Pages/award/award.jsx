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
import { connect } from 'react-redux';
import ClientSidebar from '../../../layout/ClientSidebar';
import Api from '../../../api';
import './award.css';

class Award extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      awards: [],
      badges: []
    };
  }

  componentDidMount() {
    this.getAwards();
    this.getBadges();
  }

  getAwards = async () => {
    const { uid } = this.props;
    const { page } = this.state;
    const response = await Api.get(
      `/qarar_api/profile/${uid}/awards/user_award/5/DESC/${page}?_format=json`
    );
    if (response.ok) {
      this.setState({ awards: response.data });
    }
  };

  getBadges = async () => {
    const { uid } = this.props;
    const { page } = this.state;
    const response = await Api.get(
      `/qarar_api/profile/${uid}/awards/user_badge/5/DESC/${page}?_format=json`
    );
    if (response.ok) {
      this.setState({ badges: response.data });
    }
  };

  render() {
    const { awards, badges } = this.state;
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
                      {badges.map(badge => (
                        <div className="flex flex-nowrap flex-align-base">
                          <span className="icon-primary">
                            <Media
                              object
                              src="/static/img/reward placeholder.svg"
                              className="icon-media"
                            />
                          </span>
                          <p>{badge.title}</p>
                        </div>
                      ))}
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
                      {awards.map(award => (
                        <p>{award.title}</p>
                      ))}
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
const mapStateToProps = ({ uid, token }) => ({ uid, token });
export default connect(mapStateToProps)(Award);
