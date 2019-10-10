import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import CardDescription from '../components/card-description/card-description';
import CardIcon from '../components/card-icon/card-icon';

import './awards-system.css';

class About extends Component {
  render() {
    return (
      <>
        <div className="primary-header">
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
                <Button outline color="primary" size="md">
                  عرض الكل{' '}
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="6" lg="4">
                <CardDescription
                  header="اسم الجائزة"
                  type="social"
                  points="1500 نقطة"
                  arrayOfContnt={[
                    {
                      header:
                        'وصف الجائزة لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيم. لوريم ايبسوم دولار سيت .',
                      social: []
                    }
                  ]}
                />
              </Col>
              <Col xs="12" md="6" lg="4">
                <CardDescription
                  header="اسم الجائزة"
                  type="social"
                  points="1500 نقطة"
                  arrayOfContnt={[
                    {
                      header:
                        'وصف الجائزة لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيم. لوريم ايبسوم دولار سيت .',
                      social: []
                    }
                  ]}
                />
              </Col>
              <Col xs="12" md="6" lg="4">
                <CardDescription
                  header="اسم الجائزة"
                  type="social"
                  points="1500 نقطة"
                  arrayOfContnt={[
                    {
                      header:
                        'وصف الجائزة لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيم. لوريم ايبسوم دولار سيت .',
                      social: []
                    }
                  ]}
                />
              </Col>
              <Col xs="12" md="6" lg="4">
                <CardDescription
                  header="اسم الجائزة"
                  type="social"
                  points="1500 نقطة"
                  arrayOfContnt={[
                    {
                      header:
                        'وصف الجائزة لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيم. لوريم ايبسوم دولار سيت .',
                      social: []
                    }
                  ]}
                />
              </Col>
              <Col xs="12" md="6" lg="4">
                <CardDescription
                  header="اسم الجائزة"
                  type="social"
                  points="1500 نقطة"
                  arrayOfContnt={[
                    {
                      header:
                        'وصف الجائزة لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيم. لوريم ايبسوم دولار سيت .',
                      social: []
                    }
                  ]}
                />
              </Col>
              <Col xs="12" md="6" lg="4">
                <CardDescription
                  header="اسم الجائزة"
                  type="social"
                  points="1500 نقطة"
                  arrayOfContnt={[
                    {
                      header:
                        'وصف الجائزة لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيم. لوريم ايبسوم دولار سيت .',
                      social: []
                    }
                  ]}
                />
              </Col>
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
                <Button outline color="primary" size="md">
                  عرض الكل{' '}
                </Button>
              </Col>
            </Row>

            <Row>
              <Col xs="12" md="6" lg="3">
                <CardIcon
                  image="/static/img/Most Likes.svg"
                  header="اسم الجائزة"
                  content="فكرة ذات جدوى"
                />
              </Col>
              <Col xs="12" md="6" lg="3">
                <CardIcon
                  image="/static/img/Most Likes.svg"
                  header="اسم الجائزة"
                  content="فكرة ذات جدوى"
                />
              </Col>
              <Col xs="12" md="6" lg="3">
                <CardIcon
                  image="/static/img/Most Likes.svg"
                  header="اسم الجائزة"
                  content="فكرة ذات جدوى"
                />
              </Col>
              <Col xs="12" md="6" lg="3">
                <CardIcon
                  image="/static/img/Most Likes.svg"
                  header="اسم الجائزة"
                  content="فكرة ذات جدوى"
                />
              </Col>
            </Row>
          </div>
        </Container>
      </>
    );
  }
}

export default About;
