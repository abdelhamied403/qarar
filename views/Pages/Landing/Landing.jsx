import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, Col, Row, Media, ButtonGroup } from 'reactstrap';
import Link from 'next/link';
import renderHTML from 'react-render-html';

import CardPoints from '../components/card-points/cards-points';
import CardInfo from '../components/card-info/card-info';
import CardDescription from '../components/card-description/card-description';
import CardBlog from '../components/card-blog/card-blog';

import Api from '../../../api';

const Landing = () => {
  const uid = useSelector(state => state.auth.uid);
  const [mostActiveUserComment, setMAUC] = useState({});
  const [mostActiveUserAword, setMAUA] = useState({});
  const [mostActiveUserLike, setMAUL] = useState({});
  const [userCount, setUserCount] = useState('');
  const [draftCount, setDraftCount] = useState('');
  const [drafts, setDrafts] = useState([]);
  const [activeDrafts, setActiveDrafts] = useState([]);
  const [soonCloseDrafts, setSoonCloseDrafts] = useState([]);
  const [news, setNews] = useState([]);
  const [activeBtn, setActiveBtn] = useState(1);
  const [activeBtnNews, setActiveBtnNews] = useState(0);

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
          src="/static/img/Assets/visual-5.svg"
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
                    src="/static/img/Assets/user.svg"
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
                    src="/static/img/Assets/like.svg"
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
                    src="/static/img/Assets/chat-bubble.svg"
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
                    src="/static/img/Assets/document.svg"
                  />
                </div>
                <p>4</p>
                <h5>يتم اتخاذ القرار بشأن المسودة</h5>
              </div>
            </div>
            {!uid && (
              <div>
                <Link href="/register">
                  <a className="opactiy-8 scale-hover header-button btn btn-primary">
                    انشاء حساب
                    <img src="/static/img/interactive/whiteArrow.svg" alt="" />
                  </a>
                </Link>
              </div>
            )}
          </section>
        </Container>
      </div>

      <section className="activities">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-5">
            <h2 className="text-center header">نشاط المسودات</h2>
            <ButtonGroup>
              <Button
                onClick={() => setActiveBtn(0)}
                className={activeBtn === 0 ? 'active' : ''}
              >
                اكثر نشاطا هذا الاسبوع
              </Button>
              <Button
                className={activeBtn === 1 ? 'active' : ''}
                onClick={() => setActiveBtn(1)}
              >
                نشرت حديثا
              </Button>
              <Button
                className={activeBtn === 2 ? 'active' : ''}
                onClick={() => setActiveBtn(2)}
              >
                تغلق قريبا
              </Button>
            </ButtonGroup>
          </div>
          <Row
            style={activeBtn === 0 ? { display: 'flex' } : { display: 'none' }}
          >
            {activeDrafts
              .filter((item, index) => index < 7)
              .map(item => (
                <Col key={item.key} xs="12" md="6" lg="3">
                  <Link href={`/draft-details/${item.id}`}>
                    <a>
                      <div className="oneActivity">
                        <h4>{item.title}</h4>
                        <p>
                          <img
                            src="/static/img/interactive/calendar.svg"
                            alt=""
                          />
                          يغلق التصويت بتاريخ {item.end_date}
                        </p>
                      </div>
                    </a>
                  </Link>
                </Col>
              ))}
          </Row>
          <Row
            style={activeBtn === 1 ? { display: 'flex' } : { display: 'none' }}
          >
            {drafts
              .filter((item, index) => index < 7)
              .map(item => (
                <Col key={item.key} xs="12" md="6" lg="3">
                  <Link href={`/draft-details/${item.id}`}>
                    <a>
                      <div className="oneActivity">
                        <h4>{item.title}</h4>
                        <p>
                          <img
                            src="/static/img/interactive/calendar.svg"
                            alt=""
                          />
                          يغلق التصويت بتاريخ {item.end_date}
                        </p>
                      </div>
                    </a>
                  </Link>
                </Col>
              ))}
          </Row>
          <Row
            style={activeBtn === 2 ? { display: 'flex' } : { display: 'none' }}
          >
            {soonCloseDrafts
              .filter((item, index) => index < 7)
              .map(item => (
                <Col key={item.key} xs="12" md="6" lg="3">
                  <Link href={`/draft-details/${item.id}`}>
                    <a>
                      <div className="oneActivity">
                        <h4>{item.title}</h4>
                        <p>
                          <img
                            src="/static/img/interactive/calendar.svg"
                            alt=""
                          />
                          يغلق التصويت بتاريخ {item.end_date}
                        </p>
                      </div>
                    </a>
                  </Link>
                </Col>
              ))}
          </Row>
          <div className="text-center">
            <Link href="/drafts">
              <Button outline color="primary" size="md">
                كل المسودات
                <img src="/static/img/interactive/greenArrow.svg" alt="" />
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
                  src={
                    mostActiveUserComment.picture ||
                    '/static/img/interactive/user.svg'
                  }
                  alt=""
                  className="avatar"
                />
                <div className="singleName">
                  <p>{mostActiveUserComment.name}</p>
                  <span> {mostActiveUserComment.points} نقطة</span>
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
                  src={
                    mostActiveUserAword.picture ||
                    '/static/img/interactive/user.svg'
                  }
                  alt=""
                  className="avatar"
                />
                <div className="singleName">
                  <p>{mostActiveUserAword.name}</p>
                  <span> {mostActiveUserAword.points} نقطة</span>
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
                  src={
                    mostActiveUserLike.picture ||
                    '/static/img/interactive/user.svg'
                  }
                  alt=""
                  className="avatar"
                />
                <div className="singleName">
                  <p>{mostActiveUserLike.name}</p>
                  <span> {mostActiveUserLike.points} نقطة</span>
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
                    <img src="/static/img/Assets/userGreen.svg" alt="" />
                  </Col>
                  <Col xs="8">
                    <h4>{userCount}</h4>
                    <p>مستخدم للمنصة حاليا</p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="4">
              <div className="singleConnectInfo">
                <Row>
                  <Col xs="4">
                    <img src="/static/img/Assets/documentGreen.svg" alt="" />
                  </Col>
                  <Col xs="8">
                    <h4>{draftCount}</h4>
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
              <Button
                onClick={() => setActiveBtnNews(0)}
                className={activeBtnNews === 0 ? 'active' : ''}
              >
                أخر الأخبار
              </Button>
              <Button
                onClick={() => setActiveBtnNews(1)}
                className={activeBtnNews === 1 ? 'active' : ''}
              >
                أهم الأخبار
              </Button>
            </ButtonGroup>
          </div>
          <>
            <Row
              style={
                activeBtnNews === 0 ? { display: 'flex' } : { display: 'none' }
              }
            >
              <Col md="6">
                {news
                  .filter((item, index) => index < 1)
                  .map(item => (
                    <div key={item.id} className="newsSingle rightSide">
                      <img src={item.image} alt="" />
                      <Link href={`/news-details/${item.id}`}>
                        <a>
                          <div className="newsInfo">
                            <h3>{item.title}</h3>
                            <p>{renderHTML(item.body.substr(0, 200) || '')}</p>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
              </Col>
              <Col md="6">
                <Row>
                  {news
                    .filter((item, index) => index > 0 && index < 5)
                    .map(item => (
                      <Col key={item.id} md="6">
                        <div className="newsSingle leftSide">
                          <img src={item.image} alt="" />
                          <Link href={`/news-details/${item.id}`}>
                            <a>
                              <div className="newsInfo">
                                <h3>{item.title}</h3>
                                <p>
                                  {renderHTML(item.body.substr(0, 200) || '')}
                                </p>
                              </div>
                            </a>
                          </Link>
                        </div>
                      </Col>
                    ))}
                </Row>
              </Col>
            </Row>

            <Row
              style={
                activeBtnNews === 1 ? { display: 'flex' } : { display: 'none' }
              }
            >
              <Col md="6">
                {news
                  .filter((item, index) => index < 1)
                  .map(item => (
                    <div key={item.id} className="newsSingle rightSide">
                      <img src={item.image} alt="" />
                      <Link href={`/news-details/${item.id}`}>
                        <a>
                          <div className="newsInfo">
                            <h3>{item.title}</h3>
                            <p>{renderHTML(item.body.substr(0, 200) || '')}</p>
                          </div>
                        </a>
                      </Link>
                    </div>
                  ))}
              </Col>
              <Col md="6">
                <Row>
                  {news
                    .filter((item, index) => index > 0 && index < 5)
                    .map(item => (
                      <Col key={item.id} md="6">
                        <div className="newsSingle leftSide">
                          <img src={item.image} alt="" />
                          <Link href={`/news-details/${item.id}`}>
                            <a>
                              <div className="newsInfo">
                                <h3>{item.title}</h3>
                                <p>
                                  {renderHTML(item.body.substr(0, 200) || '')}
                                </p>
                              </div>
                            </a>
                          </Link>
                        </div>
                      </Col>
                    ))}
                </Row>
              </Col>
            </Row>
          </>
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
          <div className="text-center">
            <Link href="/news">
              <Button outline color="primary" size="md">
                كل الاخبار
                <img src="/static/img/interactive/greenArrow.svg" alt="" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      <section className="args">
        <img src="/static/img/Assets/visual-5.svg" alt="" className="bg1" />
        <img src="/static/img/Assets/visual-5.svg" alt="" className="bg2" />

        <Container>
          <p className="content">رأيك يهمنا .. صوتك يهمنا </p>
          <Link href="/drafts">
            <Button color="primary" outline size="md">
              اكتشف قائمة المسودات
              <img src="/static/img/interactive/whiteArrow.svg" alt="" />
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
};
export default Landing;
