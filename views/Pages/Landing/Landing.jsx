import React from 'react';
import { Container, Button, Col, Row, Media } from 'reactstrap';
import Link from 'next/link';

import CardPoints from '../components/card-points/cards-points';
import CardInfo from '../components/card-info/card-info';
import CardDescription from '../components/card-description/card-description';
import CardBlog from '../components/card-blog/card-blog';

import './Landing.css';

const Landing = () => (
  <div className="rtl">
    <div className="header header-image-bg">
      <Container>
        <section className="section-flex">
          <h2>شارك بصنع القرار…ارفع صوتك</h2>
          <div className="icons-group">
            <div>
              <div className="icon-border">
                <Media
                  className="image-icon"
                  object
                  src="/static/img/value-1.svg"
                />
              </div>
              <h3>١. أنشئ حساب</h3>
            </div>
            <div>
              <div className="icon-border">
                <Media
                  className="image-icon"
                  object
                  src="/static/img/value-4.svg"
                />
              </div>
              <h3>٢. صوّت للمسودة التي تهمك</h3>
            </div>
            <div>
              <div className="icon-border">
                <Media
                  className="image-icon"
                  object
                  src="/static/img/value-2.svg"
                />
              </div>
              <h3>٣. تتم مناقشة المسودة</h3>
            </div>
            <div>
              <div className="icon-border">
                <Media
                  className="image-icon"
                  object
                  src="/static/img/value-3.svg"
                />
              </div>
              <h3>٤. يتم اتخاذ القرار بشأن المسودة</h3>
            </div>
          </div>
          <div>
            <Link href="/register">
              <a className="opactiy-8 scale-hover header-button btn btn-primary">
                انشاء حساب
              </a>
            </Link>
          </div>
        </section>
      </Container>
    </div>
    <section className="social-sharing p100">
      <Container>
        <h2 className="text-center header">
          المشاركة المجتمعية…من الأكثر تأثيراً؟
        </h2>
        <Row>
          <Col xs="12" md="6" lg="3">
            <CardPoints
              avatar="/static/img/avatar.png"
              name="كامل حمد"
              points="1200"
              number="2000"
              icon="/static/img/trophy-icon.svg"
            />
          </Col>
          <Col xs="12" md="6" lg="3">
            <CardPoints
              avatar="/static/img/avatar.png"
              name="كامل حمد"
              points="1200"
              number="2000"
              icon="/static/img/Icon - most active - views Copy 2.svg"
            />
          </Col>
          <Col xs="12" md="6" lg="3">
            <CardPoints
              avatar="/static/img/avatar.png"
              name="كامل حمد"
              points="1200"
              number="2000"
              icon="/static/img/Icon - most active - views Copy.svg"
            />
          </Col>
          <Col xs="12" md="6" lg="3">
            <CardPoints
              avatar="/static/img/avatar.png"
              name="كامل حمد"
              points="1200"
              number="2000"
              icon="/static/img/Icon - most active - views Copy 2.svg"
            />
          </Col>

          <Col xs="12" md="6">
            <CardInfo
              description="عدد مستخدمي المنصة الحالي"
              info="مستخدم"
              number="3200"
              icon="/static/img/Icon - draft activity - users.svg"
            />
          </Col>
          <Col xs="12" md="6">
            <CardInfo
              description="عدد المسودات التي تمت مناقشتها"
              info="مسودة"
              number="5523"
              icon="/static/img/discussed drafts card.svg"
            />
          </Col>
        </Row>
      </Container>
    </section>

    <section className="activities">
      <Container>
        <h2 className="text-center header">نشاط المسودات</h2>
        <Row>
          <Col xs="12" md="6" lg="4">
            <CardDescription
              header="المسودات الاكثر نشاطا هذا الاسبوع"
              type="social"
              arrayOfContnt={[
                {
                  header: 'تقليل حوادث السير في الرياض',
                  link: '/draft-details/draftId',
                  social: [
                    {
                      icon: '/static/img/Icon - most active - views Copy 2.svg',
                      number: 2000
                    },
                    {
                      icon: '/static/img/Icon - most active - views Copy.svg',
                      number: 2000
                    },
                    {
                      icon: '/static/img/Icon - most active - views.svg',
                      number: 2000
                    }
                  ]
                },
                {
                  header: 'تقليل حوادث السير في الرياض',
                  link: '/draft-details/draftId',
                  social: [
                    {
                      icon: '/static/img/Icon - most active - views Copy 2.svg',
                      number: 2000
                    },
                    {
                      icon: '/static/img/Icon - most active - views Copy.svg',
                      number: 2000
                    },
                    {
                      icon: '/static/img/Icon - most active - views.svg',
                      number: 2000
                    }
                  ]
                }
              ]}
            />
          </Col>
          <Col xs="12" md="6" lg="4">
            <CardDescription
              header="مسودات نشرت حديثاً"
              type="b"
              arrayOfContnt={[
                {
                  header: 'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدا…',
                  link: '/draft-details/draftId',
                  description: [
                    {
                      icon: '/static/img/Icon - most active - views Copy 3.svg',
                      text: 'يغلق التصويت بتاريخ 23/8/2019'
                    }
                  ]
                },
                {
                  header: 'السماح باستيراد السيارات الكهربائية',
                  link: '/draft-details/draftId',
                  description: [
                    {
                      icon: '/static/img/Icon - most active - views Copy 3.svg',
                      text: 'يغلق التصويت بتاريخ 23/8/2019'
                    }
                  ]
                }
              ]}
            />
          </Col>
          <Col xs="12" md="6" lg="4">
            <CardDescription
              header="مسودات تغلق قريباً"
              type="b"
              arrayOfContnt={[
                {
                  header: 'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدا…',
                  link: '/draft-details/draftId',
                  description: [
                    {
                      icon: '/static/img/Icon - most active - views Copy 3.svg',
                      text: 'يغلق التصويت بتاريخ 23/8/2019'
                    }
                  ]
                },
                {
                  header: 'السماح باستيراد السيارات الكهربائية',
                  link: '/draft-details/draftId',
                  description: [
                    {
                      icon: '/static/img/Icon - most active - views Copy 3.svg',
                      text: 'يغلق التصويت بتاريخ 23/8/2019'
                    }
                  ]
                }
              ]}
            />
          </Col>
        </Row>
        <div className="text-center">
          <Link href="/drafts">
            <Button outline color="primary" size="md">
              كل المسودات
            </Button>
          </Link>
        </div>
      </Container>
    </section>

    <section className="blogger">
      <Container>
        <h2 className="text-center header">أخبار المنصة</h2>
        <Row>
          <Col xs="12" md="6" lg="4">
            <CardBlog
              image="/static/img/bg.jpg"
              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
              tagId="1"
              blogId="1"
              header="تم إقرار مسودة تصاريح العمل للوا…"
              date="12/4/2019"
              content="لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج ,سيت دو أيوسمود"
              tag="عمالةـوافدة"
            />
          </Col>
          <Col xs="12" md="6" lg="4">
            <CardBlog
              image="/static/img/news-image-2.jpg"
              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
              tagId="1"
              blogId="1"
              header="تم إقرار مسودة تصاريح العمل للوا…"
              date="12/4/2019"
              content="لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا  أليايت,سيت دو أيوسمود"
              tag="عمالةـوافدة"
            />
          </Col>
          <Col xs="12" md="6" lg="4">
            <CardBlog
              image="/static/img/news-image-3.jpg"
              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
              tagId="1"
              blogId="1"
              header="تم إقرار مسودة تصاريح العمل للوا…"
              date="12/4/2019"
              content="لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور  يسكينج أليايت,سيت دو أيوسمود"
              tag="عمالةـوافدة"
            />
          </Col>
        </Row>
        <div className="text-center">
          <Link href="/news">
            <Button outline color="primary" size="md">
              كل الاخبار
            </Button>
          </Link>
        </div>
      </Container>
    </section>
    <section className="args">
      <Container>
        <p className="content">رأيك يهمنا…ارفع صوتك</p>
        <Link href="/drafts">
          <Button className="scale-hover" color="primary" outline size="md">
            اكتشف قائمة المسودات
          </Button>
        </Link>
      </Container>
    </section>
  </div>
);

export default Landing;
