import React, { Component } from 'react';
import { Container, Row, Col, CardBody, CardHeader, Card } from 'reactstrap';
import CardInfoIcon from '../components/card-info-icon/card-info-icon';
import CardPoints from '../components/card-points/cards-points';
import './reports-page.css';
import Skeleton from '../components/skeleton/skeleton';
import Api from '../../../api';
import Link from 'next/link';

class About extends Component {
  constructor() {
    super();
    this.state = {
      userCount: 0,
      draftCount: 0,
      awardedUsers: [],
      awardedUsers2: [],
      activeDrafts: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getUserCount();
    this.getDraftCount();
    this.getUsersTop();
    this.getDrafts();
  }

  getUserCount = async () => {
    const userCountResponse = await Api.get(
      '/qarar_api/count/users?_format=json'
    );
    if (userCountResponse.ok) {
      this.setState({ userCount: userCountResponse.data });
    }
  };

  getDraftCount = async () => {
    const draftCountResponse = await Api.get(
      '/qarar_api/count/draft?_format=json'
    );
    if (draftCountResponse.ok) {
      this.setState({
        draftCount: draftCountResponse.data
      });
    }
  };

  getUsersTop = async () => {
    const userAAResponse = await Api.get(
      '/qarar_api/top/10/user/awards?_format=json'
    );
    if (userAAResponse.ok) {
      this.setState({
        awardedUsers: userAAResponse.data.filter((item, index) => index < 4),
        awardedUsers2: userAAResponse.data.filter((item, index) => index < 8)
      });
    }
  };

  getDrafts = async () => {
    const activeDraftsResponse = await Api.get(
      '/qarar_api/top/10/draft/comments?_format=json'
    );
    if (activeDraftsResponse.ok) {
      this.setState({
        loading: false,
        activeDrafts: activeDraftsResponse.data.filter(
          (item, index) => index < 4
        )
      });
    }
  };

  render() {
    const {
      userCount,
      draftCount,
      awardedUsers,
      awardedUsers2,
      activeDrafts,
      loading
    } = this.state;
    if (loading) {
      return <Skeleton />;
    }
    return (
      <>
        <div className="draftHeader">
          <Container>
            <h3>تقارير المشاركة المجتمعية</h3>
          </Container>
        </div>
        <Container className="reports-page">
          <div>
            <Row>
              <Col xs="12" md="6">
                <CardInfoIcon
                  description="عدد مستخدمي المنصة الحالي"
                  info="مستخدم"
                  number={userCount}
                  icon="/static/img/Icon - draft activity - users.svg"
                />
              </Col>
              <Col xs="12" md="6">
                <CardInfoIcon
                  description="عدد المسودات التي تمت مناقشتها"
                  info="مسودة"
                  number={draftCount}
                  icon="/static/img/Report Icon.svg"
                />
              </Col>
            </Row>
          </div>

          <div>
            <Card className="card-users-part">
              <CardHeader>
                <div className="flex-header">
                  <h6 className="name">المستخدمين الاكثر نشاطا</h6>
                </div>
              </CardHeader>
              <CardBody>
                <Row className="active-users">
                  {awardedUsers2.map(user => (
                    <Col key={user.uid} sm="12" md="3">
                      <CardPoints
                        isDarkCard="true"
                        avatar={user.picture}
                        name={user.full_name || user.name}
                        points={user.points}
                        uid={user.uid}
                      />
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </div>

          <div>
            <Card className="card-users-part">
              <CardHeader>
                <div className="flex-header">
                  <h6 className="name">المسودات الاكثر نشاطا</h6>
                </div>
              </CardHeader>
              <CardBody>
                <Row className="active-users">
                  {activeDrafts.map(draft => (
                    <Col key={draft.id} sm="12" md="6">
                      <div className="active-drafts-card">
                        <div className="flex flex-justifiy-sp flex-align-center">
                          <h6 className="break">
                            <Link
                              href="/draft-details/[draftId]"
                              as={`/draft-details/${draft.id}`}
                            >
                              <a>{draft.title}</a>
                            </Link>
                          </h6>
                          <span className="sub-header">
                            <i className="fa fa-thumbs-up" /> {draft.likes} صوت
                          </span>
                        </div>
                        <div className="flex flex-justifiy-sp">
                          <span className="sub-header">{draft.end_date}</span>
                          <span className="sub-header">
                            <i className="fa fa-comment" /> {draft.comments}{' '}
                            تعليق
                          </span>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </div>

          <div>
            <Card className="card-users-part">
              <CardHeader>
                <div className="flex-header">
                  <h6 className="name">المستخدمين الحاصلين على جوائز</h6>
                </div>
              </CardHeader>
              <CardBody>
                <Row>
                  {awardedUsers.map(user => (
                    <Col key={user.uid} sm="12" md="3">
                      <CardPoints
                        isDarkCard="true"
                        avatar={user.picture}
                        name={user.full_name || user.name}
                        points={user.awards_count}
                        uid={user.uid}
                        suffix="جائزة"
                        content={
                          user.awards && user.awards.length
                            ? user.awards[0].title
                            : ''
                        }
                      />
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </div>
        </Container>
      </>
    );
  }
}

export default About;
