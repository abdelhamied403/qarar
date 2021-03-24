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
import { translate } from '../../../utlis/translation';


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
        <div className="aboutheader"></div>
        <div className="aboutpage">
          <Container>
            <UncontrolledAlert color="primary">
              <img src="/static/img/notice.png" alt="" className="mr-1" />
              {translate('aboutProfile.hello')}
            </UncontrolledAlert>
            <div className="flex flex-justifiy-sp m-50-b">
              <h2>
              {translate('aboutProfile.aboutInfo')}
              </h2>

              <Link href="/me/update">
                <Button color="primary" outline>
                  {translate('aboutProfile.editInfo')}
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
                    {user.likes || 0} <span className="sub-header">
                    {translate('aboutProfile.vote')}
                      </span>
                  </div>
                  <div className="m-20-lr">
                    {user.comments || 0}{' '}
                    <span className="sub-header">
                    {translate('aboutProfile.comment')}
                    </span>
                  </div>
                  <div className="m-20-lr">
                    {user.followers || 0}{' '}
                    <span className="sub-header">
                    {translate('aboutProfile.follower')}
                      </span>
                  </div>
                </div>
              </div>
            </div>
            <Row>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">
                  {translate('aboutProfile.email')}</h6>
                  <h4>{user.mail || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">
                  {translate('aboutProfile.country')}
                     </h6>
                  <h4>{(user.country && user.country.name) || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">
                  {translate('aboutProfile.city')}</h6>
                  <h4>{(user.city && user.city.name) || '--'}</h4>
                </div>
              </Col>

              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">
                  {translate('aboutProfile.area')}</h6>
                  <h4>{user.neighborhood || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">
                  {translate('aboutProfile.education')}</h6>
                  <h4>{user.educational_level || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">
                  {translate('aboutProfile.job')}</h6>
                  <h4>{user.job || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">
                  {translate('aboutProfile.work')}</h6>
                  <h4>{user.labor_sector || '--'}</h4>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">
                  {translate('aboutProfile.socialStatus')}</h6>
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
const mapStateToProps = ({ auth: { uid } }) => ({ uid });
export default connect(mapStateToProps)(About);
