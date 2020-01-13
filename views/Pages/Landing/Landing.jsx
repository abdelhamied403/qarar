import React, { useEffect, useState } from 'react';
import { Container, Button, Col, Row, Media, ButtonGroup } from 'reactstrap';
import Link from 'next/link';
import moment from 'moment';

import CardPoints from '../components/card-points/cards-points';
import CardInfo from '../components/card-info/card-info';
import CardDescription from '../components/card-description/card-description';
import CardBlog from '../components/card-blog/card-blog';
import './Landing.css';

import Api from '../../../api';

const Landing = () => {
  const [mostActiveUserComment, setMAUC] = useState({});
  const [mostActiveUserAword, setMAUA] = useState({});
  const [mostActiveUserLike, setMAUL] = useState({});
  const [userCount, setUserCount] = useState('');
  const [draftCount, setDraftCount] = useState('');
  const [drafts, setDrafts] = useState([]);
  const [activeDrafts, setActiveDrafts] = useState([]);
  const [soonCloseDrafts, setSoonCloseDrafts] = useState([]);
  const [news, setNews] = useState([]);
  const getActiveUsers = async () => {
    const userACResponse = await Api.get(
      '/api/users/comments?limit=1&_format=json'
    );
    if (userACResponse.ok) {
      setMAUC(userACResponse.data ? userACResponse.data[0] : {});
    }
    const userAAResponse = await Api.get(
      '/api/users/awards?limit=1&_format=json'
    );
    if (userAAResponse.ok) {
      setMAUA(userAAResponse.data ? userAAResponse.data[0] : {});
    }
    const userALResponse = await Api.get(
      '/api/users/likes?limit=1&_format=json'
    );
    if (userALResponse.ok) {
      setMAUL(userALResponse.data ? userALResponse.data[0] : {});
    }
  };
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
    getActiveUsers();
    getUserCount();
    getDraftCount();
    getDrafts();
    getNews();
  }, []);
  return (
    <div className="rtl newUILanding">
      <div className="header header-image-bg">
        <img
          src="/static/img/interactive/hero.svg"
          alt=""
          className="heroPattern"
        />
        <Container>
          <section className="section-flex">
            <h2>شارك بصنع القرار</h2>
            <h3>ارفع صوتك</h3>
            <div className="icons-group">
              <div>
                <div className="icon-border">
                  <Media
                    className="image-icon"
                    object
                    src="/static/img/interactive/one.svg"
                  />
                </div>
                <p>1</p>
                <h5> أنشئ حساب</h5>
              </div>
              <div>
                <div className="icon-border">
                  <Media
                    className="image-icon"
                    object
                    src="/static/img/interactive/like.svg"
                  />
                </div>
                <p>2</p>
                <h5>صوت للمسودة التي تهمك</h5>
              </div>
              <div>
                <div className="icon-border">
                  <Media
                    className="image-icon"
                    object
                    src="/static/img/interactive/comments.svg"
                  />
                </div>
                <p>3</p>
                <h5> تتم مناقشة المسودة</h5>
              </div>
              <div>
                <div className="icon-border">
                  <Media
                    className="image-icon"
                    object
                    src="/static/img/interactive/report.svg"
                  />
                </div>
                <p>4</p>
                <h5>يتم اتخاذ القرار بشأن المسودة</h5>
              </div>
            </div>
            <div>
              <Link href="/register">
                <a className="opactiy-8 scale-hover header-button btn btn-primary">
                  انشاء حساب
                  <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                </a>
              </Link>
            </div>
          </section>
        </Container>
      </div>

      <section className="activities">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="text-center header">نشاط المسودات</h2>
            <ButtonGroup>
              <Button>اكثر نشاطا هذا الاسبوع</Button>
              <Button className="active">نشرت حديثا</Button>
              <Button>تغلق قريبا</Button>
            </ButtonGroup>
          </div>
          <Row>
            <Col xs="12" md="6" lg="3">
              <div className="oneActivity">
                <h4>إشتراطات المباني التجارية</h4>
                <p>
                  <img src="/static/img/interactive/calendar.svg" alt="" />
                  يغلق التصويت بتاريخ 01-01-2020
                </p>
              </div>
            </Col>
            <Col xs="12" md="6" lg="3">
              <div className="oneActivity">
                <h4>إشتراطات المباني التجارية</h4>
                <p>
                  <img src="/static/img/interactive/calendar.svg" alt="" />
                  يغلق التصويت بتاريخ 01-01-2020
                </p>
              </div>
            </Col>
            <Col xs="12" md="6" lg="3">
              <div className="oneActivity">
                <h4>إشتراطات المباني التجارية</h4>
                <p>
                  <img src="/static/img/interactive/calendar.svg" alt="" />
                  يغلق التصويت بتاريخ 01-01-2020
                </p>
              </div>
            </Col>
            <Col xs="12" md="6" lg="3">
              <div className="oneActivity">
                <h4>إشتراطات المباني التجارية</h4>
                <p>
                  <img src="/static/img/interactive/calendar.svg" alt="" />
                  يغلق التصويت بتاريخ 01-01-2020
                </p>
              </div>
            </Col>
            <Col xs="12" md="6" lg="3">
              <div className="oneActivity">
                <h4>إشتراطات المباني التجارية</h4>
                <p>
                  <img src="/static/img/interactive/calendar.svg" alt="" />
                  يغلق التصويت بتاريخ 01-01-2020
                </p>
              </div>
            </Col>
            <Col xs="12" md="6" lg="3">
              <div className="oneActivity">
                <h4>إشتراطات المباني التجارية</h4>
                <p>
                  <img src="/static/img/interactive/calendar.svg" alt="" />
                  يغلق التصويت بتاريخ 01-01-2020
                </p>
              </div>
            </Col>
            <Col xs="12" md="6" lg="3">
              <div className="oneActivity">
                <h4>إشتراطات المباني التجارية</h4>
                <p>
                  <img src="/static/img/interactive/calendar.svg" alt="" />
                  يغلق التصويت بتاريخ 01-01-2020
                </p>
              </div>
            </Col>
          </Row>
          <div className="text-center">
            <Link href="/drafts">
              <Button outline color="primary" size="md">
                كل المسودات
                <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      <section className="social-sharing p100">
        <Container>
          <h2 className="header">المشاركة المجتمعية</h2>
          <h5>من الأكثر تأثيراً؟</h5>
          <Row>
            <Col md="4">
              <div className="topSingle  d-flex flex-row">
                <img
                  src="/static/img/interactive/user.svg"
                  alt=""
                  className="avatar"
                />
                <div className="singleName">
                  <p>اسم المستخدم</p>
                  <span> 1280 نقطة</span>
                </div>
                <div className="trophy d-flex align-items-center">
                  <img src="/static/img/interactive/trophy.svg" alt="" />
                  <span>1280</span>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="topSingle  d-flex flex-row">
                <img
                  src="/static/img/interactive/user.svg"
                  alt=""
                  className="avatar"
                />
                <div className="singleName">
                  <p>اسم المستخدم</p>
                  <span> 1280 نقطة</span>
                </div>
                <div className="trophy d-flex align-items-center">
                  <img src="/static/img/interactive/trophy.svg" alt="" />
                  <span>1280</span>
                </div>
              </div>
            </Col>
            <Col md="4" className="">
              <div className="topSingle  d-flex flex-row">
                <img
                  src="/static/img/interactive/user.svg"
                  alt=""
                  className="avatar"
                />
                <div className="singleName">
                  <p>اسم المستخدم</p>
                  <span> 1280 نقطة</span>
                </div>
                <div className="trophy d-flex align-items-center">
                  <img src="/static/img/interactive/trophy.svg" alt="" />
                  <span>1280</span>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <div className="singleConnectInfo">
                <Row>
                  <Col xs="4">
                    <img src="/static/img/interactive/one.svg" alt="" />
                  </Col>
                  <Col xs="8">
                    <h4>65</h4>
                    <p>مستخدم للمنصة حاليا</p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="4">
              <div className="singleConnectInfo">
                <Row>
                  <Col xs="4">
                    <img src="/static/img/interactive/report.svg" alt="" />
                  </Col>
                  <Col xs="8">
                    <h4>65</h4>
                    <p>مسودة تمت مناقشتها</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="blogger">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="text-center header">أخبار المنصة</h2>
            <ButtonGroup>
              <Button className="active">أخر الأخبار</Button>
              <Button>أهم الأخبار</Button>
            </ButtonGroup>
          </div>
          <Row>
            <Col md="6">
              <div className="newsSingle rightSide">
                <img src="/static/img/interactive/news2.png" alt="" />
                <div className="newsInfo">
                  <h3>وزارة الشئون البلدية و القرويه تطلق مبادرة</h3>
                  <p>
                    تطلق غدا فاعليات مبادرة التطوع البلدي التي تنفذها وزارة
                    الشؤون البلديه و القروية على مستوي جميع الأمانات بمختلف
                    المناطق و المحافظات و مدن المملكة.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="6">
              <Row>
                <Col md="6">
                  <div className="newsSingle leftSide">
                    <img src="/static/img/interactive/news2.png" alt="" />
                    <div className="newsInfo">
                      <h3>وزارة الشئون البلدية و القرويه تطلق مبادرة</h3>
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="newsSingle leftSide">
                    <img src="/static/img/interactive/news2.png" alt="" />
                    <div className="newsInfo">
                      <h3>وزارة الشئون البلدية و القرويه تطلق مبادرة</h3>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <div className="newsSingle leftSide">
                    <img src="/static/img/interactive/news2.png" alt="" />
                    <div className="newsInfo">
                      <h3>وزارة الشئون البلدية و القرويه تطلق مبادرة</h3>
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="newsSingle leftSide">
                    <img src="/static/img/interactive/news2.png" alt="" />
                    <div className="newsInfo">
                      <h3>وزارة الشئون البلدية و القرويه تطلق مبادرة</h3>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            {/* {news.map(newsItem => (
              <Col key={newsItem.id} xs="12" md="6" lg="4">
                <CardBlog
                  image={newsItem.image}
                  subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                  tagId={newsItem.tags.length > 0 && newsItem.tags[0].id}
                  blogId={newsItem.id}
                  header={newsItem.title}
                  date={moment(newsItem.creatednode * 1000).format(
                    'DD/MM/YYYY'
                  )}
                  content={newsItem.body.substr(0, 60)}
                  tag={newsItem.tags.length > 0 && newsItem.tags[0].name}
                />
              </Col>
            ))} */}
          </Row>
          <div className="text-center">
            <Link href="/news">
              <Button outline color="primary" size="md">
                كل الاخبار
                <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      <section className="args">
        <img src="/static/img/interactive/voice2.svg" alt="" className="bg1" />
        <img src="/static/img/interactive/voice2.svg" alt="" className="bg2" />

        <Container>
          <p className="content">رأيك يهمنا .. صوتك يهمنا </p>
          <Link href="/drafts">
            <Button className="scale-hover" color="primary" outline size="md">
              اكتشف قائمة المسودات
              <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
};
export default Landing;
