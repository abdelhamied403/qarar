import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button, Col, Row, Media, ButtonGroup } from 'reactstrap';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import { PieChart } from 'react-minimal-pie-chart';

import CardPoints from '../components/card-points/cards-points';
import CardInfo from '../components/card-info/card-info';
import CardDescription from '../components/card-description/card-description';
import CardBlog from '../components/card-blog/card-blog';

import Api from '../../../api';

const colors = [
  '#ee5253',
  '#feca57',
  '#0abde3',
  '#85bd48',
  '#1dd1a1',
  '#341f97'
];
const Landing = () => {
  const uid = useSelector(state => state.auth.uid);
  const [mostActiveUsersAword, setMAUA] = useState([]);
  const [userCount, setUserCount] = useState('');
  const [draftCount, setDraftCount] = useState('');
  const [aboutData, setAboutData] = useState({});
  const [drafts, setDrafts] = useState([]);
  const [activeDrafts, setActiveDrafts] = useState([]);
  const [soonCloseDrafts, setSoonCloseDrafts] = useState([]);
  const [news, setNews] = useState([]);
  const [activeBtn, setActiveBtn] = useState(1);
  const [activeBtnNews, setActiveBtnNews] = useState(0);
  const [likePercentage, setLikePercentage] = useState(0);
  const [dislikePercentage, setDislikePercentage] = useState(0);
  const [cityPercentage, setCityPercentage] = useState([]);
  const getActiveUsers = async () => {
    const userAAResponse = await Api.get(
      '/qarar_api/top/10/user/awards?_format=json'
    );
    if (userAAResponse.ok) {
      setMAUA(
        userAAResponse.data
          ? userAAResponse.data
              .filter(item => item.name !== 'admin')
              .filter((item, index) => index < 2)
          : []
      );
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
  const getAbout = async () => {
    const response = await Api.get('/qarar_api/load/node/904?_format=json');
    if (response.ok) {
      setAboutData(response.data);
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
  const getLikesPercentage = async () => {
    const response = await Api.get(
      '/qarar_api/count/voting_stats?_format=json'
    );
    console.log(response);
    if (response.ok) {
      setLikePercentage(
        parseFloat(
          (response.data.like /
            (parseInt(response.data.like, 10) +
              parseInt(response.data.dislike, 10))) *
            100
        ).toFixed(1)
      );
      setDislikePercentage(
        parseFloat(
          (response.data.dislike /
            (parseInt(response.data.like, 10) +
              parseInt(response.data.dislike, 10))) *
            100
        ).toFixed(1)
      );
    }
  };
  const getCityData = async () => {
    const response = await Api.get('/qarar_api/count/city_stats?_format=json');
    if (response.ok) {
      setCityPercentage(response.data.data);
    }
  };
  useEffect(() => {
    getActiveUsers();
    getUserCount();
    getDraftCount();
    getDrafts();
    getNews();
    getAbout();
    getLikesPercentage();
    getCityData();
  }, []);
  return (
    <div className="rtl newUILanding">
      <div className="header header-image-bg">
        <Container>
          <section className="section-flex">
            <h2 animation="fadeIn">شارك بصنع القرار</h2>
            <h3>ارفع صوتك</h3>
            <div className="icons-group">
              <div>
                <div className="icon-border">
                  <Media
                    className="image-icon"
                    object
                    src="/static/img/interactive/user-2.svg"
                  />
                </div>
                <div>
                  <p>1</p>
                  <h5> أنشئ حساب</h5>
                </div>
              </div>

              <div>
                <div className="icon-border">
                  <Media
                    className="image-icon"
                    object
                    src="/static/img/interactive/like-2.svg"
                  />
                </div>
                <div>
                  <p>2</p>
                  <h5>صوت للمسودة التي تهمك</h5>
                </div>
              </div>

              <div>
                <div className="icon-border">
                  <Media
                    className="image-icon"
                    object
                    src="/static/img/interactive/chat-bubble-2.svg"
                  />
                </div>
                <div>
                  <p>3</p>
                  <h5> تتم مناقشة المسودة</h5>
                </div>
              </div>

              <div>
                <div className="icon-border">
                  <Media
                    className="image-icon"
                    object
                    src="/static/img/interactive/document-2.svg"
                  />
                </div>
                <div>
                  <p>4</p>
                  <h5>يتم اتخاذ القرار بشأن المسودة</h5>
                </div>
              </div>
            </div>
            {!uid && (
              <div>
                <Link href="/register">
                  <a className="mx-3 opactiy-8 scale-hover header-button btn btn-primary">
                    انشاء حساب
                    <img src="/static/img/interactive/headerArrow.svg" alt="" />
                  </a>
                </Link>
                <Link href="/login">
                  <a className="mx-3 opactiy-8 scale-hover header-button btn btn-primary">
                    دخول
                    <img src="/static/img/interactive/headerArrow.svg" alt="" />
                  </a>
                </Link>
              </div>
            )}
          </section>
        </Container>
      </div>
      <section className="activities about">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="text-center header">عن قرار</h3>
          </div>
          <Row>
            <Col className="mb-3 about-qarar" xs="12">
              <p>{aboutData.data ? aboutData.data.summary : ''}</p>
            </Col>
          </Row>
          <div className="text-center">
            <Link href="/about">
              <Button outline color="primary" size="md">
                المزيد
                <img src="/static/img/interactive/greenArrow.svg" alt="" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      <section className="activities">
        <Container>
          <Row>
            {/* <div className="d-flex justify-content-between align-items-center mb-5">
         
            {/* <ButtonGroup>
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
            </ButtonGroup> */}

            <Col xs="12" md="6" lg="6">
              <h2 className="header"> مسودات نشرت حديثاً</h2>

              <Row
                style={
                  activeBtn === 0 ? { display: 'flex' } : { display: 'none' }
                }
              >
                {activeDrafts
                  .filter((item, index) => index < 6)
                  .map(item => (
                    <Col className="mb-3" key={item.key} xs="12">
                      <Link href={`/draft-details/${item.id}`}>
                        <a>
                          <div className="oneActivity">
                            <h4>{item.title}</h4>
                            <p>
                              <img
                                src="/static/img/interactive/calendar-2.svg"
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
                style={
                  activeBtn === 1 ? { display: 'flex' } : { display: 'none' }
                }
              >
                {drafts
                  .filter((item, index) => index < 6)
                  .map(item => (
                    <Col className="mb-3" key={item.key} xs="12">
                      <Link href={`/draft-details/${item.id}`}>
                        <a>
                          <div className="oneActivity">
                            <h4>{item.title}</h4>
                            <p>
                              <img
                                src="/static/img/interactive/calendar-2.svg"
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
                style={
                  activeBtn === 2 ? { display: 'flex' } : { display: 'none' }
                }
              >
                {soonCloseDrafts
                  .filter((item, index) => index < 6)
                  .map(item => (
                    <Col key={item.key} className="mb-3" xs="12">
                      <Link href={`/draft-details/${item.id}`}>
                        <a>
                          <div className="oneActivity">
                            <h4>{item.title}</h4>
                            <p>
                              <img
                                src="/static/img/interactive/calendar-2.svg"
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

              <div className="text-right">
                <Link href="/drafts">
                  <Button outline color="primary" size="md">
                    كل المسودات
                    <img src="/static/img/interactive/greenArrow.svg" alt="" />
                  </Button>
                </Link>
              </div>
            </Col>

            <Col xs="12" md="6" lg="6" className="chart-section">
              <h2 className="header"> نسبة إعجاب المشاركين</h2>
              <div className="chart">
                {/* <Media
                  className="chart-image"
                  object
                  src="/static/img/interactive/pie-chart.svg"
                /> */}
                <PieChart
                  data={[
                    {
                      title: 'One',
                      value: parseInt(likePercentage, 10),
                      color: '#85bd48'
                    },
                    {
                      title: 'Two',
                      value: parseInt(dislikePercentage, 10),
                      color: '#07706d'
                    }
                  ]}
                />

                <div className="chart-item">
                  <Media
                    className="chart-icon"
                    object
                    src="/static/img/interactive/like.svg"
                  />
                  <div>
                    <h3>{likePercentage}%</h3>
                    <h5>إعجاب</h5>
                  </div>
                </div>
                <div className="chart-item">
                  <Media
                    className="chart-icon"
                    object
                    src="/static/img/interactive/unlike.svg"
                  />
                  <div>
                    <h3>{dislikePercentage}%</h3>
                    <h4>عدم إعجاب </h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="social-sharing">
        <Container>
          <Row>
            <Col md="8">
              <h2 className="header">المشاركة المجتمعية</h2>
              <h5>من الأكثر تأثيراً؟</h5>
              <Row>
                {mostActiveUsersAword.map(mostActiveUserAword => (
                  <Col md="6">
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
                        <Link href={`/user-profile/${mostActiveUserAword.id}`}>
                          <a>
                            <p>{mostActiveUserAword.name}</p>
                          </a>
                        </Link>
                        <span>{mostActiveUserAword.points} نقطة</span>
                      </div>
                      <div className="trophy d-flex align-items-center">
                        <img src="/static/img/interactive/trophy.svg" alt="" />
                        <span>{mostActiveUserAword.total_awards}</span>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row>
                <Col md="6">
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
                <Col md="6">
                  <div className="singleConnectInfo">
                    <Row>
                      <Col xs="4">
                        <img
                          src="/static/img/Assets/documentGreen.svg"
                          alt=""
                        />
                      </Col>
                      <Col xs="8">
                        <h4>{draftCount}</h4>
                        <p>مسودة تمت مناقشتها</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col xs="12" md="4" lg="4">
              <h2 className="header">التوزيع الجغرافي للمشاركين</h2>
              <div className="chart">
                {/* <Media
                  className="chart-image"
                  object
                  src="/static/img/interactive/pie-chart.svg"
                /> */}
                <PieChart
                  data={cityPercentage
                    .sort((a, b) => a.percentage < b.percentage)
                    .filter((item, index) => index < 6)
                    .map((item, index) => ({
                      title: item.name,
                      value: item.percentage,
                      color: colors[index]
                    }))}
                />

                <div className="flex">
                  {cityPercentage
                    .sort((a, b) => a.percentage < b.percentage)
                    .filter((item, index) => index < 6)
                    .map((item, index) => (
                      <div className="chart-item">
                        <span
                          className="dot"
                          style={{ backgroundColor: colors[index] }}
                        />
                        <h3>{parseInt(item.percentage, 10)}%</h3>
                        <h5>{item.name}</h5>
                      </div>
                    ))}
                </div>
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
        <Container>
          <h2 className="content">رأيك يهمنا .. صوتك يهمنا </h2>

          <Link href="/drafts">
            <Button outline color="primary" size="md">
              اكتشف قائمة المسودات
              <img src="/static/img/interactive/greenArrow.svg" alt="" />
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
};
export default Landing;
