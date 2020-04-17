import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import CardDescription from '../components/card-description/card-description';
import CardIcon from '../components/card-icon/card-icon';
import Api from '../../../api';
import Skeleton from '../components/skeleton/skeleton';

import './awards-system.css';

class About extends Component {
  constructor() {
    super();
    this.state = {
      awards: [],
      badges: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getAwards();
  }

  getAwards = async () => {
    const badgesResponse = await Api.get(
      `/qarar_api/data/badge/0/DESC/1?_format=json`
    );
    if (badgesResponse.ok) {
      this.setState({ badges: badgesResponse.data });
    }
    const awardsResponse = await Api.get(
      `/qarar_api/data/award/0/DESC/1?_format=json`
    );
    if (awardsResponse.ok) {
      this.setState({ awards: awardsResponse.data, loading: false });
    }
  };

  render() {
    const { awards, badges, showAllBadges, showAll, loading } = this.state;
    if (loading) {
      return <Skeleton />;
    }
    return (
      <>
        <div className="draftHeader">
          <Container>
            <h3> نظام الجوائز</h3>
          </Container>
        </div>
        <Container>
          <section>
            <div className="awards-description">
              <h4>وصف نظام الجوائز:</h4>
              <p>
                ١. لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج
                أليايت,سيت دو أيوسمود تيم.
                <br />
                ٢. أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد
                مينيم فينايم,كيواس نوستري.
                <br />
                ٣. أكسير سيتاشن يللأمكو لابورأس نيسي. دولار ماجنا أليكيوا . يوت
                انيم أد مينيم فينايلي.
              </p>
            </div>
          </section>

          <div className="activities award-section p75">
            <Row style={{ margin: '0 0 16px' }}>
              <Col xs="12" md="4">
                <div className=" awards-header">
                  <h4>
                    {' '}
                    جوائز عامة <div className="title-color">
                      {' '}
                      (حسب النقاط){' '}
                    </div>{' '}
                  </h4>
                </div>
              </Col>
              <Col xs="12" md="4" className="text-center">
                <Button
                  onClick={() =>
                    this.setState({ showAllBadges: !showAllBadges })
                  }
                  outline
                  color="primary"
                  size="md"
                >
                  عرض الكل
                  <img src="/static/img/interactive/greenArrow.svg" alt="" />
                </Button>
              </Col>
            </Row>
            <Row>
              {badges
                .map(badge => (
                  <Col key={badge.id} xs="12" md="6" lg="4">
                    <CardDescription
                      header={badge.title}
                      type="social"
                      points={`${badge.target} نقطة`}
                      arrayOfContnt={[
                        {
                          header: badge.body.substr(0, 100),
                          social: []
                        }
                      ]}
                    />
                  </Col>
                ))
                .filter((item, index) => {
                  if (!showAllBadges) {
                    return index < 3;
                  }
                  return true;
                })}
            </Row>
          </div>

          <div className="activities award-section p75">
            <Row style={{ margin: '0 0 16px' }}>
              <Col xs="12" md="4">
                <div className="header">
                  <h4> جوائز خاصة </h4>
                </div>
              </Col>
              <Col xs="12" md="4" className="text-center">
                <Button
                  outline
                  onClick={() => this.setState({ showAll: !showAll })}
                  color="primary"
                  size="md"
                >
                  عرض الكل
                  <img src="/static/img/interactive/greenArrow.svg" alt="" />
                </Button>
              </Col>
            </Row>

            <Row>
              {awards
                .map(award => (
                  <Col key={award.id} xs="12" md="6" lg="3">
                    <CardIcon
                      image={award.image}
                      header="اسم الجائزة"
                      content={award.title}
                    />
                  </Col>
                ))
                .filter((item, index) => {
                  if (!showAll) {
                    return index < 4;
                  }
                  return true;
                })}
            </Row>
          </div>
        </Container>
      </>
    );
  }
}

export default About;
