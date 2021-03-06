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
import { translate } from '../../../utlis/translation';
import moment from 'moment';
import UpdatedItemsModal from './updatedModalItems';

import Api from '../../../api';
import axios from 'axios';

import './homeChart.css';

const colors = [
  '#ee5253',
  '#feca57',
  '#0abde3',
  '#85bd48',
  '#1dd1a1',
  '#341f97'
];

// Todo: remove with api response
const items = [
  {
    updatedAt: '1611569816',
    title: 'عنوان هنااااااا',
    id: 12
  },
  {
    updatedAt: '1611569816',
    title: 'عنوان هنااااااا',
    id: 12
  },
  {
    updatedAt: '1611569816',
    title: 'عنوان هنااااااا',
    id: 12
  },
  {
    updatedAt: '1611569816',
    title: 'عنوان هنااااااا',
    id: 12
  },
  {
    updatedAt: '1611569816',
    title: 'عنوان هنااااااا',
    id: 12
  },
  {
    updatedAt: '1611569816',
    title: 'عنوان هنااااااا',
    id: 12
  }
];
const Landing = () => {
  const uid = useSelector(state => state.auth.uid);
  const [mostActiveUsersAword, setMAUA] = useState([]);
  const [userCount, setUserCount] = useState('');
  const [draftCount, setDraftCount] = useState('');
  const [aboutData, setAboutData] = useState({});
  const [drafts, setDrafts] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [selectedDecision, setSelectedDecision] = useState();
  const [activeDrafts, setActiveDrafts] = useState([]);
  const [soonCloseDrafts, setSoonCloseDrafts] = useState([]);
  const [news, setNews] = useState([]);
  const [activeBtn, setActiveBtn] = useState(1);
  const [activeBtnNews, setActiveBtnNews] = useState(0);
  const [likePercentage, setLikePercentage] = useState(0);
  const [dislikePercentage, setDislikePercentage] = useState(0);
  const [cityPercentage, setCityPercentage] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [satPercentages, setSatPercentages] = useState(null);
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
  const updateModal = async selectedItem => {
    setSelectedDecision(selectedItem);
    setToggle(true);
  };

  const getAbout = async () => {
    const response = await Api.get('/qarar_api/load/node/904?_format=json');
    if (response.ok) {
      setAboutData(response.data);
    }
  };
  const getDrafts = async () => {
    const draftsResponse = await Api.get(
      '/qarar_api/data/draft/4/DESC/1?_format=json'
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

  const getDecisions = async () => {
    const decisionsResponse = await Api.get(
      '/qarar_api/latest-decisions?limit=4'
    );
    if (decisionsResponse.ok) {
      setDecisions(decisionsResponse.data);
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
    if (response.ok) {
      setLikePercentage(
        Math.round(
          (response.data.like /
            (parseInt(response.data.like, 10) +
              parseInt(response.data.dislike, 10))) *
            100
        )
      );
      setDislikePercentage(
        Math.round(
          (response.data.dislike /
            (parseInt(response.data.like, 10) +
              parseInt(response.data.dislike, 10))) *
            100
        )
      );
    }
  };
  const getCityData = async () => {
    const response = await Api.get('/qarar_api/count/city_stats?_format=json');
    if (response.ok) {
      setCityPercentage(response.data.data);
    }
  };

  const getSatPercents = () => {
    Api.get('/qarar_api/all-drafts-avg?_format=json')
      .then(res => {
        setSatPercentages(Object.values(res.data));
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getActiveUsers();
    getUserCount();
    getDraftCount();
    getDrafts();
    getDecisions();
    getNews();
    getAbout();
    getLikesPercentage();
    getCityData();
    getSatPercents();
  }, []);
  return (
    <div className="rtl newUILanding">
      <div className="header header-image-bg">
        <Container>
          <section className="section-flex">
            <h2 animation="fadeIn">
              {translate('landingPage.decisionMaking')}
            </h2>
            <h3>{translate('landingPage.speakUp')}</h3>
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
                  <h5>{translate('landingPage.createAccount')}</h5>
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
                  <h5>{translate('landingPage.voteForDraft')}</h5>
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
                  <h5>{translate('landingPage.draftDiscuss')}</h5>
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
                  <h5>{translate('landingPage.draftDecision')}</h5>
                </div>
              </div>
            </div>
            {/* {!uid && (
              <div>
                <Link href="/register">
                  <a className="mx-3 opactiy-8 scale-hover header-button btn btn-primary">
                    {translate('landingPage.createAccount')}
                    <img src="/static/img/interactive/headerArrow.svg" alt="" />
                  </a>
                </Link>
                <Link href="/login">
                  <a className="mx-3 opactiy-8 scale-hover header-button btn btn-primary">
                    
                    {translate('landingPage.login')}
                    <img src="/static/img/interactive/headerArrow.svg" alt="" />
                  </a>
                </Link>
              </div>
            )} */}
          </section>
        </Container>
      </div>
      <section className="activities about">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="header width-fit">
              {translate('landingPage.aboutQarar')}
            </h3>
          </div>
          <Row>
            <Col className="mb-3 about-qarar" xs="12">
              <p>{aboutData.data ? aboutData.data.summary : ''}</p>
            </Col>
          </Row>
          <div className="text-center">
            <Link href="/about">
              <Button outline color="primary" size="md">
                {translate('landingPage.more')}
                <img
                  dir={translate('dir')}
                  src="/static/img/interactive/whiteArrow.svg"
                  alt=""
                />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      <section className="activities green recently-qarars">
        <Container>
          <Row>
            <Col xs="12" md="12" lg="12">
              <h2 className="header">{translate('decisionsLibPage.title')}</h2>

              <Row
                style={
                  activeBtn === 1 ? { display: 'flex' } : { display: 'none' }
                }
              >
                {decisions &&
                  decisions
                    .filter((item, index) => index < 4)
                    .map(item => (
                      <Col
                        className="mb-6"
                        key={item.key}
                        xs="12"
                        md="6"
                        lg="6"
                      >
                        <Link href={`/decision-details/${item.id}`}>
                          <a>
                            <div className="oneActivity">
                              <h4>{item.title}</h4>
                            </div>
                          </a>
                        </Link>
                        <p className="oneActivityRow">
                          <img
                            dir={translate('dir')}
                            src="/static/img/interactive/calendar-2.svg"
                            alt=""
                          />
                          {translate('landingPage.votingStart')}{' '}
                          {item.publishDate}
                          {item.modificationsCount > 0 && (
                            <span
                              className="modalUpdate"
                              onClick={() => updateModal(item)}
                            >
                              <img
                                dir={translate('dir')}
                                src="/static/img/decision/Path 2925.svg"
                                alt=""
                              />
                              {item.modificationsCount}{' '}
                              {translate('landingPage.update')}
                            </span>
                          )}
                        </p>
                      </Col>
                    ))}
              </Row>

              <div className="text-right d-flex">
                <Link href="/decisions-library">
                  <Button outline color="primary" size="md">
                    {translate('decisionsLibPage.title')}
                    <img
                      dir={translate('dir')}
                      src="/static/img/interactive/greenArrow.svg"
                      alt=""
                    />
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="activities green">
        <Container>
          <Row>
            <Col
              className="flex flex-column justify-center"
              xs="12"
              md="6"
              lg="6"
            >
              <h2 className="header">
                {translate('landingPage.recentlyDrafts')}
              </h2>
              <Row
                style={
                  activeBtn === 0 ? { display: 'flex' } : { display: 'none' }
                }
              >
                {activeDrafts
                  .filter((item, index) => index < 4)
                  .map(item => (
                    <Col className="mb-3" key={item.key} xs="12">
                      <Link href={`/draft-details/${item.id}`}>
                        <a>
                          <div className="oneActivity">
                            <h4>{item.title}</h4>
                            <p>
                              <img
                                dir={translate('dir')}
                                src="/static/img/interactive/calendar-2.svg"
                                alt=""
                              />
                              {translate('landingPage.votingCloses')}{' '}
                              {item.end_date}
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
                  .filter((item, index) => index < 2)
                  .map(item => (
                    <Col className="mb-3" key={item.key} xs="12">
                      <Link href={`/draft-details/${item.id}`}>
                        <a>
                          <div className="oneActivity">
                            <h4>{item.title}</h4>
                            <p>
                              <img
                                dir={translate('dir')}
                                src="/static/img/interactive/calendar-2.svg"
                                alt=""
                              />
                              {translate('landingPage.votingCloses')}{' '}
                              {item.end_date}
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
                                dir={translate('dir')}
                                src="/static/img/interactive/calendar-2.svg"
                                alt=""
                              />
                              {translate('landingPage.votingCloses')}{' '}
                              {item.end_date}
                            </p>
                          </div>
                        </a>
                      </Link>
                    </Col>
                  ))}
              </Row>

              <div className="text-right d-flex">
                <Link href="/drafts">
                  <Button outline color="primary" size="md">
                    {translate('draftsUnderVotePage.title')}
                    <img
                      dir={translate('dir')}
                      src="/static/img/interactive/greenArrow.svg"
                      alt=""
                    />
                  </Button>
                </Link>
              </div>
            </Col>

            <Col xs="12" md="6" lg="6" className="chart-section">
              <div className="satisfaction">
                {/* satisfaction percentage charts */}
                <Container className="homeChartContainer">
                  <h2 className="header">
                    {translate('draftDetails.generalVote')}
                  </h2>

                  <Row>
                    <Col md="4">
                      <div>
                        {[
                          {
                            name: translate('draftDetails.chartTypeOne'),
                            color: '#81BD41'
                          },
                          {
                            name: translate('draftDetails.chartTypeTwo'),
                            color: '#40C2CC'
                          },
                          {
                            name: translate('draftDetails.chartTypeThree'),
                            color: '#006C68'
                          },
                          {
                            name: translate('draftDetails.chartTypeFour'),
                            color: '#F3F3F3'
                          },
                          {
                            name: translate('draftDetails.chartTypeFive'),
                            color: '#FF4A4A'
                          }
                        ].map(val => (
                          <div className="d-flex flex-row align-items-center">
                            <span
                              style={{
                                backgroundColor: val.color,
                                height: '20px',
                                width: '20px',
                                borderRadius: '50%',
                                display: 'inline-block'
                              }}
                            />
                            <p
                              style={{
                                margin: '0 10px 0 10px',
                                color: '#006C68'
                              }}
                            >
                              {val.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </Col>
                    <Col md="8" className="satpiechart">
                      <PieChart
                        data={[
                          {
                            title: translate('draftDetails.chartTypeOne'),
                            value: parseInt(
                              satPercentages
                                ? satPercentages[4].replace('%', '')
                                : 0
                            ),
                            color: '#81BD41'
                          },
                          {
                            title: translate('draftDetails.chartTypeTwo'),
                            value: parseInt(
                              satPercentages
                                ? satPercentages[3].replace('%', '')
                                : 0
                            ),
                            color: '#40C2CC'
                          },
                          {
                            title: translate('draftDetails.chartTypeThree'),
                            value: parseInt(
                              satPercentages
                                ? satPercentages[2].replace('%', '')
                                : 0
                            ),
                            color: '#006C68'
                          },
                          {
                            title: translate('draftDetails.chartTypeFour'),
                            value: parseInt(
                              satPercentages
                                ? satPercentages[1].replace('%', '')
                                : 0
                            ),
                            color: '#F3F3F3'
                          },
                          {
                            title: translate('draftDetails.chartTypeFive'),
                            value: parseInt(
                              satPercentages
                                ? satPercentages[0].replace('%', '')
                                : 0
                            ),
                            color: '#FF4A4A'
                          }
                        ]}
                      />
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="social-sharing">
        <Container>
          <Row>
            <Col md="8">
              <h2 className="header width-fit">
                {translate('landingPage.socialParticipation')}
              </h2>
              <h5 className="width-fit">
                {translate('landingPage.influential')}
              </h5>
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
                        <span>
                          {mostActiveUserAword.points}{' '}
                          {translate('landingPage.point')}
                        </span>
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
                        <p>{translate('landingPage.users')}</p>
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
                        <p>{translate('landingPage.draftDiscussed')}</p>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>

            <Col xs="12" md="4" lg="4">
              <h2 className="header">
                {translate('landingPage.participantsGeographical')}
              </h2>
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
            <h2 className="header">{translate('landingPage.platformNews')}</h2>
            <ButtonGroup>
              <Button
                onClick={() => setActiveBtnNews(0)}
                className={activeBtnNews === 0 ? 'active' : ''}
              >
                {translate('landingPage.latestNews')}
              </Button>
              <Button
                onClick={() => setActiveBtnNews(1)}
                className={activeBtnNews === 1 ? 'active' : ''}
              >
                {translate('landingPage.importantNews')}
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
          <div className="text-center">
            <Link href="/news">
              <Button outline color="primary" size="md">
                {translate('landingPage.allNews')}
                <img
                  dir={translate('dir')}
                  src="/static/img/interactive/greenArrow.svg"
                  alt=""
                />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      <section className="args" dir={translate('dir')}>
        <Container>
          <h2 className="content width-fit">
            {' '}
            {translate('landingPage.opinion')}{' '}
          </h2>

          <Link href="/drafts">
            <Button className="d-flex" outline color="primary" size="md">
              {translate('landingPage.exploreDrafts')}
              <img
                dir={translate('dir')}
                src="/static/img/interactive/greenArrow.svg"
                alt=""
              />
            </Button>
          </Link>
        </Container>
      </section>
      <UpdatedItemsModal
        title={selectedDecision && selectedDecision?.title}
        items={selectedDecision && selectedDecision?.modifications}
        toggle={toggle}
        setToggle={() => setToggle(!toggle)}
      />
    </div>
  );
};
export default Landing;
