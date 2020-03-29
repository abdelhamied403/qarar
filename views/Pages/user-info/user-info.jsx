import React, { Component } from 'react';
import { Container, Card, CardBody, Button, Row, Col, Media } from 'reactstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import './user-info.css';
import Api from '../../../api';

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      followed: false,
      voted: [],
      commented: [],
      awards: [],
      badges: []
    };
  }

  componentDidMount() {
    this.getProfile();
    this.getIsFollowed();
    this.getVoted();
    this.getCommented();
    this.getBadges();
    this.getAwards();
  }

  getProfile = async () => {
    const { profileId } = this.props;
    const response = await Api.get(
      `/qarar_api/load/user/${profileId}?_format=json`
    );
    if (response.ok) {
      this.setState({ profile: response.data });
    }
  };

  getIsFollowed = async () => {
    const { profileId, uid } = this.props;
    const response = await Api.post(`/qarar_api/isflagged?_format=json`, {
      type: 'follow_user',
      id: profileId,
      uid
    });
    if (response.ok) {
      this.setState({ followed: response.data.data.flagged });
    }
  };

  getVoted = async () => {
    const { profileId } = this.props;
    const response = await Api.get(
      `/qarar_api/flag/entities/${profileId}/like/draft/5/DESC/1?_format=json`
    );
    if (response.ok) {
      this.setState({ voted: response.data });
    }
  };

  getCommented = async () => {
    const { profileId } = this.props;
    const response = await Api.get(
      `/qarar_api/flag/entities/${profileId}/like_comment/comment/5/DESC/1?_format=json`
    );

    if (response.ok) {
      this.setState({ commented: response.data });
    }
  };

  getBadges = async () => {
    const { profileId } = this.props;
    const response = await Api.get(
      `/qarar_api/profile/${profileId}/awards/badge/0/DESC/0?_format=json`
    );
    if (response.ok) {
      this.setState({ badges: response.data });
    }
  };

  getAwards = async () => {
    const { profileId } = this.props;
    const response = await Api.get(
      `/qarar_api/profile/${profileId}/awards/award/0/DESC/0?_format=json`
    );

    if (response.ok) {
      this.setState({ awards: response.data });
    }
  };

  follow = async () => {
    const { uid, profileId } = this.props;
    const response = await Api.post(`/qarar_api/flag?_format=json`, {
      type: 'follow_user',
      action: 'flag',
      id: profileId,
      uid
    });
    if (response.ok) {
      this.getIsFollowed();
    }
  };

  unFollow = async () => {
    const { uid, profileId } = this.props;
    const response = await Api.post(`/qarar_api/flag?_format=json`, {
      type: 'follow_user',
      action: 'unflag',
      id: profileId,
      uid
    });
    if (response.ok) {
      this.getIsFollowed();
    }
  };

  render() {
    const { profile, followed, voted, commented, awards, badges } = this.state;
    const { uid } = this.props;
    return (
      <>
        <div className="newHeaderProfile" />
        <div className="user-profile">
          <Container>
            <Row>
              <Col xs="12">
                <Card>
                  <CardBody className="card-not">
                    <div className="flex flex-justifiy-sp">
                      <div className="userinfo flex flex-align-center">
                        <Media
                          object
                          src="/static/img/avatar.png"
                          className="image-avatar"
                        />
                        <div className="felx flex-col">
                          <h3>{profile.full_name}</h3>
                          <span className="sub-header">@{profile.name}</span>
                          <div className="flex">
                            <div className="m-30-l">
                              {profile.likes || 0}{' '}
                              <span className="sub-header">صوت</span>
                            </div>
                            <div className="m-30-l">
                              {profile.comments || 0}{' '}
                              <span className="sub-header">تعليق</span>
                            </div>
                            <div className="m-30-l">
                              {profile.followers || 0}{' '}
                              <span className="sub-header">متابع</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {uid && followed && (
                        <Button onClick={this.unFollow} color="primary" outline>
                          الغاء المتابعة
                        </Button>
                      )}
                      {uid && !followed && (
                        <Button onClick={this.follow} color="primary" outline>
                          تابع
                        </Button>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="6">
                <Card>
                  <CardBody className="card-not">
                    <div className="flex flex-justifiy-sp m-25-b">
                      <h6 className="sub-header">مسودات تم التصويت عليها</h6>
                      <Link href="/">
                        <Button color="primary" outline>
                          عرض الكل
                        </Button>
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      {voted.length > 0 ? (
                        voted.map(item => <p key={item.nid}>{item.title}</p>)
                      ) : (
                        <p>لم يقم بالتصويت علي أي فكرة</p>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" md="6">
                <Card>
                  <CardBody className="card-not">
                    <div className="flex flex-justifiy-sp m-25-b">
                      <h6 className="sub-header">تعليقات تم الاعجاب عليها</h6>
                      <Link href="/">
                        <Button color="primary" outline>
                          عرض الكل
                        </Button>
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      {commented.length > 0 ? (
                        commented.map(item => (
                          <p key={item.nid}>{item.title}</p>
                        ))
                      ) : (
                        <p>لم يقم بالتعليق علي أي فكرة</p>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col xs="12" md="6">
                <Card>
                  <CardBody className="card-not">
                    <div className="flex flex-justifiy-sp m-25-b">
                      <h6 className="sub-header">الأوسمة</h6>
                      <Link href="/">
                        <Button color="primary" outline>
                          عرض الكل
                        </Button>
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      {badges.length > 0 ? (
                        badges.map(item => (
                          <div
                            key={item.nid}
                            className="flex flex-nowrap flex-align-base"
                          >
                            <span className="icon-primary">
                              <i className="fa fa-money fa-lg " />
                            </span>
                            <p>{item.title}</p>
                          </div>
                        ))
                      ) : (
                        <p>لم يحصل علي جوائز</p>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xs="12" md="6">
                <Card>
                  <CardBody className="card-not">
                    <div className="flex flex-justifiy-sp m-25-b">
                      <h6 className="sub-header">الجوائز</h6>
                      <Link href="/">
                        <Button color="primary" outline>
                          عرض الكل
                        </Button>
                      </Link>
                    </div>
                    <div className="flex flex-col">
                      {awards.length > 0 ? (
                        awards.map(item => <p key={item.nid}>{item.title}</p>)
                      ) : (
                        <p>لم يحصل علي جوائز</p>
                      )}
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

const mapStateToProps = ({ auth: { uid } }) => ({ uid });
export default connect(mapStateToProps)(UserInfo);
