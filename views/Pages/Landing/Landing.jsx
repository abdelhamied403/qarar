import React, { useEffect, useState } from 'react';
import { Container, Button, Col, Row, Media } from 'reactstrap';
import Link from 'next/link';
import moment from 'moment';

import CardPoints from '../components/card-points/cards-points';
import CardInfo from '../components/card-info/card-info';
import CardDescription from '../components/card-description/card-description';
import CardBlog from '../components/card-blog/card-blog';

import './Landing.css';

import Api from '../../../api';

const Landing = () => {
  const [userCount, setUserCount] = useState('');
  const [draftCount, setDraftCount] = useState('');
  const [drafts, setDrafts] = useState([]);
  const [activeDrafts, setActiveDrafts] = useState([]);
  const [soonCloseDrafts, setSoonCloseDrafts] = useState([]);
  const [news, setNews] = useState([]);
  const getUserCount = async () => {
    const userCountResponse = await Api.get(
      '/qarar_api/count/users?_format=json'
    );
    if (userCountResponse.ok) {
      setUserCount(userCountResponse.data);
    }
  };
  const getDraftCount = async () => {
    const draftCountResponse = await Api.get(
      '/qarar_api/count/draft?_format=json'
    );
    if (draftCountResponse.ok) {
      setDraftCount(draftCountResponse.data);
    }
  };
  const getDrafts = async () => {
    const draftsResponse = await Api.get(
      '/qarar_api/data/draft/2/DESC/1?_format=json'
    );
    if (draftsResponse.ok) {
      setDrafts(draftsResponse.data);
    }
    const activeDraftsResponse = await Api.get(
      '/qarar_api/top/10/draft/comments?_format=json'
    );
    if (activeDraftsResponse.ok) {
      setActiveDrafts(activeDraftsResponse.data);
    }
    const soonCloseDraftsResponse = await Api.get(
      '/qarar_api/draft/closes?_format=json'
    );
    if (soonCloseDraftsResponse.ok) {
      setSoonCloseDrafts(soonCloseDraftsResponse.data);
    }
  };
  const getNews = async () => {
    const newsResponse = await Api.get(
      '/qarar_api/data/news/3/DESC/1?_format=json'
    );
    if (newsResponse.ok) {
      setNews(newsResponse.data);
    }
  };
  useEffect(() => {
    getUserCount();
    getDraftCount();
    getDrafts();
    getNews();
  }, []);
  return (
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
                number={userCount}
                icon="/static/img/Icon - draft activity - users.svg"
              />
            </Col>
            <Col xs="12" md="6">
              <CardInfo
                description="عدد المسودات التي تمت مناقشتها"
                info="مسودة"
                number={draftCount}
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
                arrayOfContnt={activeDrafts.slice(0, 2).map(draft => ({
                  header: draft.title,
                  link: `/draft-details/${draft.id}`,
                  social: [
                    {
                      icon: '/static/img/Icon - most active - views Copy 2.svg',
                      number: draft.comments
                    },
                    {
                      icon: '/static/img/Icon - most active - views Copy.svg',
                      number: draft.likes
                    },
                    {
                      icon: '/static/img/Icon - most active - views.svg',
                      number: 2000
                    }
                  ]
                }))}
              />
            </Col>
            <Col xs="12" md="6" lg="4">
              <CardDescription
                header="مسودات نشرت حديثاً"
                type="b"
                arrayOfContnt={drafts.map(draft => ({
                  header: draft.title,
                  link: `/draft-details/${draft.id}`,
                  description: [
                    {
                      icon: '/static/img/Icon - most active - views Copy 3.svg',
                      text: `يغلق التصويت بتاريخ ${draft.end_date}`
                    }
                  ]
                }))}
              />
            </Col>
            <Col xs="12" md="6" lg="4">
              <CardDescription
                header="مسودات تغلق قريباً"
                type="b"
                arrayOfContnt={soonCloseDrafts.slice(0, 2).map(draft => ({
                  header: draft.title,
                  link: `/draft-details/${draft.id}`,
                  description: [
                    {
                      icon: '/static/img/Icon - most active - views Copy 3.svg',
                      text: `يغلق التصويت بتاريخ ${draft.end_date}`
                    }
                  ]
                }))}
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
            {news.map(newsItem => (
              <Col key={newsItem.id} xs="12" md="6" lg="4">
                <CardBlog
                  image={newsItem.image}
                  subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                  tagId="1"
                  blogId={newsItem.id}
                  header={newsItem.title}
                  date={moment(newsItem.creatednode * 1000).format(
                    'DD/MM/YYYY'
                  )}
                  content={newsItem.body.substr(0, 60)}
                  tag="عمالةـوافدة"
                />
              </Col>
            ))}
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
};
export default Landing;
