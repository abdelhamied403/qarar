import React, { Component } from 'react';
import './draft-details.css';
import {
  Container,
  Col,
  Row,
  Button,
  Media,
  Card,
  CardBody,
  CardHeader,
  InputGroup,
  DropdownItem,
  InputGroupAddon,
  Input
} from 'reactstrap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Link as ScrollLink,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scroller
} from 'react-scroll';
import Skeleton from '../components/skeleton/skeleton';
import CardDraft from '../components/card-draft/card-draft';
import CardDraftItems from '../components/card-draft-items/card-draft-items';
import Breadcrumb from '../components/breadcrumb/breadcrumb';
import CardInfo from '../components/card-info/card-info';
import TextBox from '../components/text-box/text-box';
import CardComments from '../components/card-comments/card-comments';
import NoAccess from '../components/NoAccess';
import { EditorState, convertToRaw } from 'draft-js';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);
import './editor.css';
import Api from '../../../api';

moment.locale('ar');
class DraftDetailsInfo extends Component {
  constructor() {
    super();
    this.state = {
      draft: {
        tags: []
      },
      items: [],
      comments: [],
      commentPage: 1,
      flagged: false,
      successComment: false,
      loadingDraft: true,
      selected: false,
      tab1: true,
      tab2: false,
      tab3: false,
      editorState: EditorState.createEmpty(),
      img1: '/static/img/interactive/greenArrow.svg',
      img2: '/static/img/interactive/greenArrow.svg',
      img3: '/static/img/interactive/greenArrow.svg'
    };
  }

  componentDidMount() {
    this.getDraft();
    this.getComments();
    this.isFollowed();
    Events.scrollEvent.register('begin', function() {});

    Events.scrollEvent.register('end', function() {});
  }
  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  scrollToTop() {
    scroll.scrollToTop();
  }

  scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  }

  scrollToWithContainer() {
    const goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo('scroll-container', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    });

    goToContainer.then(() =>
      scroller.scrollTo('scroll-container-second-element', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'scroll-container'
      })
    );
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  getDraft = async () => {
    const { draftId, accessToken } = this.props;
    const draftResponse = await Api.get(
      `/qarar_api/load/node/${draftId}?_format=json`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (draftResponse.ok) {
      const { items, data } = draftResponse.data;
      this.setState({ draft: data, items, loadingDraft: false });
    }
  };

  getComments = async () => {
    const { draftId } = this.props;
    const { commentPage } = this.state;
    const response = await Api.get(
      `/qarar_api/comments/${draftId}/DESC?_format=json`
    );
    if (response.ok) {
      this.setState({ comments: response.data });
    }
  };

  renderList = (list, className = '') => (
    <ul className={`list-unstyled pb-0 mb-0 ${className}`}>
      {list.map(item => (
        <li>
          <>
            <DropdownItem
              className="border-bottom"
              onClick={() => this.setState({ selected: item })}
              key={item.id}
              value={item}
            >
              {item.title}{' '}
              <img
                width={30}
                height={30}
                alt="comments count"
                src="/static/img/draft activity - comments.svg"
              />
              {item.comments}
            </DropdownItem>
            {/* item.children && this.renderList(item.children) */}
          </>
        </li>
      ))}
    </ul>
  );

  isFollowed = async () => {
    const { uid, draftId } = this.props;
    const response = await Api.post(`/qarar_api/isflagged?_format=json`, {
      type: 'follow',
      uid,
      id: draftId
    });

    if (response.ok) {
      try {
        const {
          data: {
            data: { flagged }
          }
        } = response;
        this.setState({ flagged });
      } catch (error) {
        this.setState({ flagged: false });
      }
    }
  };

  follow = async () => {
    const { uid, accessToken, draftId } = this.props;
    const { flagged } = this.state;
    const data = {
      type: 'follow',
      action: flagged ? 'unflag' : 'flag',
      id: draftId,
      uid
    };
    const response = await Api.post(`/qarar_api/flag?_format=json`, data, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      this.isFollowed();
    }
  };

  saveComment = async () => {
    const { draftId, accessToken } = this.props;
    const { comment } = this.state;

    const data = {
      entity_id: [{ target_id: draftId }],
      subject: [{ value: 'comment' }],
      comment_body: [{ value: comment }],
      pid: [{ target_id: '0' }]
    };
    const response = await Api.post(
      `/qarar_api/post-comment?_format=json`,
      data,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (response.ok) {
      this.setState({ comment: '', successComment: true });
      this.getDraft();
      this.getComments();
      setTimeout(() => this.setState({ successComment: false }), 3000);
    }
  };

  render() {
    const {
      draft,
      items,
      editorState,
      comments,
      comment: commentText,
      flagged,
      successComment,
      loadingDraft,
      selected
    } = this.state;
    const { uid } = this.props;
    if (loadingDraft) {
      return <Skeleton details />;
    }
    return (
      <>
        <div className="dc-details-header">
          <div className="newHeader">
            <Container>
              <Row>
                <Col sm="12" md="6" lg="6">
                  <div className="header-content">
                    <ul>
                      <Link href="/">
                        <li>إشتراطات المباني التجارية</li>
                      </Link>
                      <Link href="/">
                        <li>5.1 الاشتراطات المعمارية</li>
                      </Link>
                    </ul>
                    <h2>{draft.title}</h2>
                    <div className="sub-header">
                      <Media
                        object
                        src="/static/img/calendarWhite.svg"
                        className="icon-small"
                      />

                      {draft.archived_date && (
                        <span>أغلق التصويت بتاريخ {draft.archived_date}</span>
                      )}
                      {draft.applied_date && (
                        <span>تم التطبيق بتاريخ {draft.applied_date}</span>
                      )}
                      {draft.end_date &&
                        !(draft.applied_date || draft.archived_date) && (
                          <span>يغلق التصويت بتاريخ {draft.end_date}</span>
                        )}
                    </div>
                    <div className="button-group">
                      <ScrollLink
                        activeClass="active"
                        className="test1"
                        to="test1"
                        spy
                        smooth
                        duration={500}
                      >
                        <Button color="primary">
                          شارك برأيك
                          <img
                            src="/static/img/interactive/whiteArrow.svg"
                            alt=""
                          />
                        </Button>
                      </ScrollLink>
                      {uid && (
                        <Button
                          color="primary"
                          onClick={() => this.follow()}
                          outline={!flagged}
                        >
                          {flagged ? 'إلغاء المتابعة' : 'متابعة'}
                        </Button>
                      )}
                    </div>
                  </div>
                </Col>
                <Col sm="12" md="6" lg="6">
                  <div className="icons-group">
                    <div>
                      <div className="icon-border">
                        <Media
                          className="image-icon"
                          object
                          src="/static/img/interactive/draft1 (1).svg"
                        />
                      </div>
                      <p>6</p>
                      <h5>مشترك</h5>
                    </div>
                    <div>
                      <div className="icon-border">
                        <Media
                          className="image-icon"
                          object
                          src="/static/img/interactive/draft1 (2).svg"
                        />
                      </div>
                      <p>12</p>
                      <h5>تعليق</h5>
                    </div>
                    <div>
                      <div className="icon-border">
                        <Media
                          className="image-icon"
                          object
                          src="/static/img/interactive/draft1 (3).svg"
                        />
                      </div>
                      <p>20</p>
                      <h5>صوت</h5>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className="draftContainer drafInfo">
          <img
            src="/static/img/interactive/draftsBg.svg"
            className="draftBg1"
            alt=""
          />
          <img
            src="/static/img/interactive/draftsBg.svg"
            className="draftBg2"
            alt=""
          />
          <Container>
            <Card className="cardDraft">
              <CardHeader>إشتراطات المباني التجارية</CardHeader>
              <CardBody>
                <Row>
                  <Col md="9" className="draftBodyRt">
                    <p>
                      يأتي هذا التحديث نتيجة العمل الذي تقوم به الوزارة حالياً
                      من إعادة تحديث جميع الأدلة والاشتراطات، لكي تتواكب وتتماشى
                      مع رؤية المملكة 2030 ، وتكون عنصراً محفزاً لتحقيق أهداف
                      الرؤية، في تشجيع الاستثمار، وتسهيل الاشتراطات امام
                      المستثمرين والمستفيدين. وذلك من خلال توفير البيئة النظامية
                      المناسبة للإستثمار التجاري، وضبط عملية التطوير، مما سيكون
                      له أثراً إيجابياً على البيئة العمرانية، والنسيج الحضري
                      للمدينة، والحد من التأثير السلبي على حركة المرور في
                      المدينة وتعزيز السلامة المرورية.
                    </p>
                    <div className="dateDraft d-flex align-items-center">
                      <img
                        src="/static/img/interactive/calendar (2).svg"
                        alt=""
                      />
                      <p>الإثنين، ٤ نوفمبر ٢٠١٩</p>
                    </div>
                  </Col>
                  <Col md="3">
                    <div className="d-flex flex-column justify-items-start draftCardLt">
                      <div className="d-flex justify-content-end">
                        <img src="/static/img/interactive/lock.svg" alt="" />
                        <span> التعليق مفتوح</span>
                      </div>
                      <div className="d-flex justify-content-end">
                        <img
                          src="/static/img/interactive/stopwatch.svg"
                          alt=""
                        />
                        <span> متبقي 23 يوم</span>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div className="draftInfoShare d-flex justify-content-between">
              <div className="shareInfoRight">
                <Button
                  onClick={() => {
                    this.setState({
                      tab1: true,
                      tab2: true,
                      tab3: true
                    });
                  }}
                >
                  <span>+</span>
                  فتح الكل
                </Button>
                <Button
                  onClick={() => {
                    this.setState({
                      tab1: false,
                      tab2: false,
                      tab3: false
                    });
                  }}
                >
                  <span>-</span>
                  اغلاق الكل
                </Button>
                <Button className="infoFollow">متابعة</Button>
              </div>
              <div className="shareInfoLeft d-flex align-items-center">
                <p>شارك هذه المادة</p>
                <img src="/static/img/interactive/linkedinDraft.svg" alt="" />
                <img src="/static/img/interactive/twitterDraft.svg" alt="" />
                <img src="/static/img/interactive/facebookDraft.svg" alt="" />
              </div>
            </div>
            <Card className="cardDraft collapseDraftCard">
              <CardHeader
                className="d-flex justify-content-between"
                onClick={() =>
                  this.setState(prevState => ({
                    tab1: !prevState.tab1
                  }))
                }
              >
                <p>
                  <span>5.1.1</span>
                  الموقع
                </p>
                <div className="dratCartTitlelt d-flex">
                  <div className="manyComments d-flex align-items-center">
                    <img src="/static/img/interactive/chat.svg" alt="" />
                    <span>2 تعليق</span>
                  </div>
                  <img
                    src="/static/img/interactive/whiteTabs.svg"
                    alt=""
                    className={this.state.tab1 ? 'rotated' : ''}
                  />
                </div>
              </CardHeader>
              <CardBody
                style={
                  this.state.tab1 ? { display: 'block' } : { display: 'none' }
                }
              >
                <Row className="mt-3">
                  <Col md="7" className="draftBodyRt">
                    <p>
                      ن اختيار الموقع المناسب يعتبر أساساً لنجاح النشاط التجاري
                      ودعم الجدوى الاقتصادية له، من حيث قدرته على جذب المرتادين
                      وما يقدمه لهم من مستوى مريح وآمن، وكذلك له
                      <br />
                      <br />
                      علاقة مباشرة وتأثير واضح على حركة المرور وشبكة الطرق.
                      تتضمن اشتراطات اختيار الموقع ما يلي:
                      <br />
                      <br />
                      تكون مواقع المجمعات والمراكز التجارية بناءً على المخططات
                      الهيكلية للمدن، حسب توزيع الاستخدامات المسموحة والغير
                      مسموحة. تكون مواقع الأسواق المركزية والمحلات التجارية ضمن
                      مباني مجمعات تجارية، أو مراكز تجارية، أو مباني استعمال
                      مختلط مرخص له باستعمال تجاري.
                      <br />
                      <br />
                      ج- لا يسمح بفتح المحلات التجارية على الارتدادات النظامية
                      الجانبية والخلفية.
                    </p>
                    <Button
                      onMouseOut={() => {
                        this.setState({
                          img2: '/static/img/interactive/greenArrow.svg'
                        });
                      }}
                      onMouseEnter={() =>
                        this.setState({
                          img2: '/static/img/interactive/whiteArrow.svg'
                        })
                      }
                    >
                      المزيد
                      <img src={this.state.img2} alt="" />
                    </Button>
                  </Col>
                  <Col md="5">
                    <div className="d-flex justify-content-end draftLikeDislike">
                      <img
                        src="/static/img/interactive/dislikeGreen.svg"
                        alt=""
                      />
                      <img src="/static/img/interactive/likeGreen.svg" alt="" />
                    </div>
                    <div className="insideComment d-flex align-items-start">
                      <img
                        src="/static/img/interactive/user.svg"
                        alt=""
                        className="avatarUser"
                      />
                      <div>
                        <h5>اسم المستخدم</h5>
                        <p>
                          من وجه نظري ان اهم من الموقع هو الالتزام بحدود المبني
                          التجاري و النشاط المرخص له
                        </p>
                      </div>
                      <div className="d-flex flex-row likeDiv">
                        <span>14</span>
                        <img
                          src="/static/img/interactive/bluelike.svg"
                          alt=""
                          className="likeImg"
                        />
                      </div>
                    </div>
                    <div className="insideComment d-flex align-items-start">
                      <img
                        src="/static/img/interactive/user.svg"
                        alt=""
                        className="avatarUser"
                      />
                      <div>
                        <h5>اسم المستخدم</h5>
                        <p>
                          من وجه نظري ان اهم من الموقع هو الالتزام بحدود المبني
                          التجاري و النشاط المرخص له
                        </p>
                      </div>
                      <div className="d-flex flex-row likeDiv">
                        <span>14</span>
                        <img
                          src="/static/img/interactive/bluelikeActive.svg"
                          alt=""
                          className="likeImg"
                        />
                      </div>
                    </div>
                    <InputGroup>
                      <Input placeholder="اضف تعليقك" />
                      <InputGroupAddon addonType="prepend">
                        <img
                          src="/static/img/interactive/whiteArrow.svg"
                          alt=""
                        />
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card className="cardDraft collapseDraftCard">
              <CardHeader
                className="d-flex justify-content-between"
                onClick={() =>
                  this.setState(prevState => ({
                    tab2: !prevState.tab2
                  }))
                }
              >
                <p>
                  <span>5.1.1</span>
                  الموقع
                </p>
                <div className="dratCartTitlelt d-flex">
                  <div className="manyComments d-flex align-items-center">
                    <img src="/static/img/interactive/chat.svg" alt="" />
                    <span>2 تعليق</span>
                  </div>
                  <img
                    src="/static/img/interactive/whiteTabs.svg"
                    alt=""
                    className={this.state.tab2 ? 'rotated' : ''}
                  />
                </div>
              </CardHeader>
              <CardBody
                style={
                  this.state.tab2 ? { display: 'block' } : { display: 'none' }
                }
              >
                <Row className="mt-3">
                  <Col md="7" className="draftBodyRt">
                    <p>
                      ن اختيار الموقع المناسب يعتبر أساساً لنجاح النشاط التجاري
                      ودعم الجدوى الاقتصادية له، من حيث قدرته على جذب المرتادين
                      وما يقدمه لهم من مستوى مريح وآمن، وكذلك له
                      <br />
                      <br />
                      علاقة مباشرة وتأثير واضح على حركة المرور وشبكة الطرق.
                      تتضمن اشتراطات اختيار الموقع ما يلي:
                      <br />
                      <br />
                      تكون مواقع المجمعات والمراكز التجارية بناءً على المخططات
                      الهيكلية للمدن، حسب توزيع الاستخدامات المسموحة والغير
                      مسموحة. تكون مواقع الأسواق المركزية والمحلات التجارية ضمن
                      مباني مجمعات تجارية، أو مراكز تجارية، أو مباني استعمال
                      مختلط مرخص له باستعمال تجاري.
                      <br />
                      <br />
                      ج- لا يسمح بفتح المحلات التجارية على الارتدادات النظامية
                      الجانبية والخلفية.
                    </p>
                    <Button
                      onMouseOut={() => {
                        this.setState({
                          img3: '/static/img/interactive/greenArrow.svg'
                        });
                      }}
                      onMouseEnter={() =>
                        this.setState({
                          img3: '/static/img/interactive/whiteArrow.svg'
                        })
                      }
                    >
                      المزيد
                      <img src={this.state.img3} alt="" />
                    </Button>
                  </Col>
                  <Col md="5">
                    <div className="d-flex justify-content-end draftLikeDislike">
                      <img
                        src="/static/img/interactive/dislikeGreen.svg"
                        alt=""
                      />
                      <img src="/static/img/interactive/likeGreen.svg" alt="" />
                    </div>
                    <div className="insideComment d-flex align-items-start">
                      <img
                        src="/static/img/interactive/user.svg"
                        alt=""
                        className="avatarUser"
                      />
                      <div>
                        <h5>اسم المستخدم</h5>
                        <p>
                          من وجه نظري ان اهم من الموقع هو الالتزام بحدود المبني
                          التجاري و النشاط المرخص له
                        </p>
                      </div>
                      <div className="d-flex flex-row likeDiv">
                        <span>14</span>
                        <img
                          src="/static/img/interactive/bluelike.svg"
                          alt=""
                          className="likeImg"
                        />
                      </div>
                    </div>
                    <div className="insideComment d-flex align-items-start">
                      <img
                        src="/static/img/interactive/user.svg"
                        alt=""
                        className="avatarUser"
                      />
                      <div>
                        <h5>اسم المستخدم</h5>
                        <p>
                          من وجه نظري ان اهم من الموقع هو الالتزام بحدود المبني
                          التجاري و النشاط المرخص له
                        </p>
                      </div>
                      <div className="d-flex flex-row likeDiv">
                        <span>14</span>
                        <img
                          src="/static/img/interactive/bluelikeActive.svg"
                          alt=""
                          className="likeImg"
                        />
                      </div>
                    </div>
                    <InputGroup>
                      <Input placeholder="اضف تعليقك" />
                      <InputGroupAddon addonType="prepend">
                        <img
                          src="/static/img/interactive/whiteArrow.svg"
                          alt=""
                        />
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card className="cardDraft collapseDraftCard">
              <CardHeader
                className="d-flex justify-content-between"
                onClick={() =>
                  this.setState(prevState => ({
                    tab3: !prevState.tab3
                  }))
                }
              >
                <p>
                  <span>5.1.1</span>
                  الموقع
                </p>
                <div className="dratCartTitlelt d-flex">
                  <div className="manyComments d-flex align-items-center">
                    <img src="/static/img/interactive/chat.svg" alt="" />
                    <span>2 تعليق</span>
                  </div>
                  <img
                    src="/static/img/interactive/whiteTabs.svg"
                    alt=""
                    className={this.state.tab3 ? 'rotated' : ''}
                  />
                </div>
              </CardHeader>
              <CardBody
                style={
                  this.state.tab3 ? { display: 'block' } : { display: 'none' }
                }
              >
                <Row className="mt-3">
                  <Col md="7" className="draftBodyRt">
                    <p>
                      ن اختيار الموقع المناسب يعتبر أساساً لنجاح النشاط التجاري
                      ودعم الجدوى الاقتصادية له، من حيث قدرته على جذب المرتادين
                      وما يقدمه لهم من مستوى مريح وآمن، وكذلك له
                      <br />
                      <br />
                      علاقة مباشرة وتأثير واضح على حركة المرور وشبكة الطرق.
                      تتضمن اشتراطات اختيار الموقع ما يلي:
                      <br />
                      <br />
                      تكون مواقع المجمعات والمراكز التجارية بناءً على المخططات
                      الهيكلية للمدن، حسب توزيع الاستخدامات المسموحة والغير
                      مسموحة. تكون مواقع الأسواق المركزية والمحلات التجارية ضمن
                      مباني مجمعات تجارية، أو مراكز تجارية، أو مباني استعمال
                      مختلط مرخص له باستعمال تجاري.
                      <br />
                      <br />
                      ج- لا يسمح بفتح المحلات التجارية على الارتدادات النظامية
                      الجانبية والخلفية.
                    </p>
                    <Button
                      onMouseOut={() => {
                        this.setState({
                          img1: '/static/img/interactive/greenArrow.svg'
                        });
                      }}
                      onMouseEnter={() =>
                        this.setState({
                          img1: '/static/img/interactive/whiteArrow.svg'
                        })
                      }
                    >
                      المزيد
                      <img src={this.state.img1} alt="" />
                    </Button>
                  </Col>
                  <Col md="5">
                    <div className="d-flex justify-content-end draftLikeDislike">
                      <img
                        src="/static/img/interactive/dislikeGreen.svg"
                        alt=""
                      />
                      <img src="/static/img/interactive/likeGreen.svg" alt="" />
                    </div>
                    <div className="insideComment d-flex align-items-start">
                      <img
                        src="/static/img/interactive/user.svg"
                        alt=""
                        className="avatarUser"
                      />
                      <div>
                        <h5>اسم المستخدم</h5>
                        <p>
                          من وجه نظري ان اهم من الموقع هو الالتزام بحدود المبني
                          التجاري و النشاط المرخص له
                        </p>
                      </div>
                      <div className="d-flex flex-row likeDiv">
                        <span>14</span>
                        <img
                          src="/static/img/interactive/bluelike.svg"
                          alt=""
                          className="likeImg"
                        />
                      </div>
                    </div>
                    <div className="insideComment d-flex align-items-start">
                      <img
                        src="/static/img/interactive/user.svg"
                        alt=""
                        className="avatarUser"
                      />
                      <div>
                        <h5>اسم المستخدم</h5>
                        <p>
                          من وجه نظري ان اهم من الموقع هو الالتزام بحدود المبني
                          التجاري و النشاط المرخص له
                        </p>
                      </div>
                      <div className="d-flex flex-row likeDiv">
                        <span>14</span>
                        <img
                          src="/static/img/interactive/bluelikeActive.svg"
                          alt=""
                          className="likeImg"
                        />
                      </div>
                    </div>
                    <InputGroup>
                      <Input placeholder="اضف تعليقك" />
                      <InputGroupAddon addonType="prepend">
                        <img
                          src="/static/img/interactive/whiteArrow.svg"
                          alt=""
                        />
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div>
              <Editor
                placeholder="اضف تعليقك هنا"
                toolbar={{
                  options: ['inline', 'image'], // This is where you can specify what options you need in
                  //the toolbar and appears in the same order as specified
                  inline: {
                    options: ['bold', 'underline'] // this can be specified as well, toolbar wont have
                    //strikethrough, 'monospace', 'superscript', 'subscript'
                  },
                  image: {
                    alignmentEnabled: false,
                    uploadCallback: this.UploadImageCallBack,
                    alt: { present: true, mandatory: false },
                    previewImage: true
                  }
                }}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={this.onEditorStateChange}
              />
            </div>
            <div className="commentsBtn d-flex justify-content-end align-items-center">
              <a href="">شروط المشاركة</a>
              <Button>
                اضف تعليقك
                <img src="/static/img/interactive/whiteArrow.svg" alt="" />
              </Button>
            </div>
            <div className="draftNewComments">
              <div className="insideComment d-flex align-items-start">
                <img
                  src="/static/img/interactive/user.svg"
                  alt=""
                  className="avatarUser"
                />
                <div className="mr-auto ml-0">
                  <h5>اسم المستخدم</h5>
                  <p>
                    من وجه نظري ان اهم من الموقع هو الالتزام بحدود المبني
                    التجاري و النشاط المرخص له
                  </p>
                </div>
                <div className="d-flex flex-row likeDiv">
                  <span>14</span>
                  <img
                    src="/static/img/interactive/bluelikeActive.svg"
                    alt=""
                    className="likeImg"
                  />
                </div>
              </div>
              <div className="insideComment d-flex align-items-start">
                <img
                  src="/static/img/interactive/user.svg"
                  alt=""
                  className="avatarUser"
                />
                <div className="mr-auto ml-0">
                  <h5>اسم المستخدم</h5>
                  <p>
                    من وجه نظري ان اهم من الموقع هو الالتزام بحدود المبني
                    التجاري و النشاط المرخص له
                  </p>
                </div>
                <div className="d-flex flex-row likeDiv">
                  <span>14</span>
                  <img
                    src="/static/img/interactive/bluelikeActive.svg"
                    alt=""
                    className="likeImg"
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
        {/*  <Container>
          <div className="description">
            <CardDraft
              header=""
              content={draft.body}
              tags={
                draft.tags
                  ? draft.tags.map(tag => ({
                      tag: tag.name.substr(0, 20),
                      id: tag.id
                    }))
                  : []
              }
              date={moment(new Date(draft.creatednode * 1000)).format(
                'dddd, MMMM Do YYYY'
              )}
            />
          </div>
          <div className="moaad-open">
            {items.map(item => (
              <ScrollLink
                activeClass="active"
                key={item.nid}
                to="item"
                smooth
                duration={500}
                offset={-90}
              >
                <Button
                  onClick={() => this.setState({ selected: item })}
                  className="text-right justify-content-start mb-2"
                  color="primary"
                  block
                >
                  {item.title}
                </Button>
              </ScrollLink>
            ))}
            <h6 className="flex flex-align-center no-p-m">
              {
                items.filter(
                  item =>
                    new Date(item.end_date).getTime() > new Date().getTime()
                ).length
              }{' '}
              مواد مفتوحة للنقاش
              <Link href="/client/landing">
                <Button color="link">من اصل {items.length} مادة</Button>
              </Link>
            </h6>
            <Element name="item">
              {items && items.length && (
                <CardDraftItems
                  date={
                    draft.applied_date
                      ? ''
                      : moment(draft.end_date).format('dddd, MMMM Do YYYY')
                  }
                  selected={selected || items[0]}
                  dropdownList={
                    (selected ? selected.children : items[0].children) || []
                  }
                  tags={[]}
                />
              )}
            </Element>
          </div>
          <Element name="test1" className="element">
            {successComment && (
              <Alert color="success">
                تم إضافة التعليق في إنتظار موافقة إدارة الموقع
              </Alert>
            )}
            {!uid ? (
              <NoAccess />
            ) : (
              <TextBox
                header="التعليقات على هذه المادة"
                alertMsg="يستطيع النظام ايجاد الكلمات المسيئة. اجعل تعليقك بناءً"
                placeholder="أضف تعليقك هنا"
                outline="شروط المشاركة"
                primary="إرسال التعليق"
                inputValue={commentText}
                onInputChange={e => this.setState({ comment: e.target.value })}
                onPrimaryButtonClick={() => this.saveComment()}
              />
            )}
          </Element>
          {comments && comments.length ? (
            <CardComments
              commentsArray={comments.map(comment => ({
                id: comment.cid,
                avatar: comment.owner_image,
                name: comment.full_name,
                like: comment.likes,
                share: '2',
                content: comment.comment_body,
                comments: comment.children
                  ? comment.children.map(childComment => ({
                      id: childComment.cid,
                      avatar: childComment.owner_image,
                      name: childComment.full_name,
                      like: childComment.likes,
                      share: '2',
                      content: childComment.comment_body
                    }))
                  : []
              }))}
            />
          ) : null}
        </Container> */}
      </>
    );
  }
}
const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(DraftDetailsInfo);
