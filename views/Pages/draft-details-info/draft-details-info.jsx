import React, { Component } from 'react';
import '../draft-details/draft-details.css';
import './draft-details-info.css';

import {
  Container,
  Col,
  Row,
  Button,
  Media,
  Card,
  CardBody,
  CardHeader,
  DropdownItem,
  Alert,
  Badge
} from 'reactstrap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import moment from 'moment';
import renderHTML from 'react-render-html';
import {
  Link as ScrollLink,
  Events,
  animateScroll as scroll,
  scroller
} from 'react-scroll';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton
} from 'react-share';
import Skeleton from '../components/skeleton/skeleton';
import InsideComment from '../components/InsideComment';
import Api from '../../../api';
import { translate } from '../../../utlis/translation';
import { PieChart } from 'react-minimal-pie-chart';
import Rate from '../draft-details/shareIdea/Rate';
import CommentType from '../draft-details/shareIdea/CommentType';
import AddComment from '../draft-details/shareIdea/Comment';
import Job from '../draft-details/shareIdea/Job';
import ArticleComment from '../components/ArticleComment';
import Chart from '../components/chart/chart';
import CommentForm from '../components/CommentForm/commentForm';

moment.locale('ar');
class DraftDetailsInfo extends Component {
  constructor() {
    super();

    this.jobRef = React.createRef();

    this.state = {
      draft: {
        tags: []
      },
      items: [],
      comments: [],
      breadcrumbs: [],
      commentPage: 1,
      flagged: false,
      voting: {
        up: false,
        down: false
      },
      successComment: false,
      loadingDraft: true,
      selected: false,
      tab1: true,
      tab2: false,
      tab3: false,
      editorState: EditorState.createEmpty(),
      img1: '/static/img/interactive/greenArrow.svg',
      img2: '/static/img/interactive/greenArrow.svg',
      img3: '/static/img/interactive/greenArrow.svg',
      parentDraft: null,
      // rate
      stars: 1,

      // job
      allLegalCapacity: null,
      allCity: null,
      allInvestmentField: null,
      selectedLegalCapacity: null,
      selectedCity: null,
      selectedInvestmentField: null,

      // commentType
      comtype: 1,

      // editor
      editorState: EditorState.createEmpty(),
      legalCapError: false,

      draftErrMessage: null,
      draftSuccess: false
    };
  }

  getLegalCapacity = async () => {
    const itemResponse = await Api.get(
      `/qarar_api/load/vocabulary/legal_capacity?_format=json`,
      {}
    );
    if (itemResponse.ok) {
      return itemResponse.data;
    }
  };

  getCity = async () => {
    const itemResponse = await Api.get(
      `/qarar_api/load/vocabulary/city?_format=json`,
      {}
    );
    if (itemResponse.ok) {
      return itemResponse.data;
    }
  };

  getInvestmentField = async () => {
    const itemResponse = await Api.get(
      `/qarar_api/load/vocabulary/investment_field?_format=json`,
      {}
    );
    if (itemResponse.ok) {
      return itemResponse.data;
    }
  };

  saveDraftComment = async draft => {
    if (
      !this.state.editorState.getCurrentContent().hasText() &&
      draft.comment_required
    ) {
      this.setState({
        draftErrMessage: translate('draftDetails.plzEnterComment')
      });
      setTimeout(() => {
        this.setState({
          draftErrMessage: null
        });
      }, 3000);
    } else if (
      !this.state.selectedLegalCapacity ||
      !this.state.selectedCity ||
      (this.state.selectedLegalCapacity === 65 &&
        !this.state.selectedInvestmentField)
    ) {
      this.jobRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      this.setState({ legalCapError: true });

      setTimeout(() => {
        this.setState({ legalCapError: false });
      }, 3000);
    } else {
      const data = {
        entity_id: [{ target_id: draft.id }],
        subject: [{ value: '' }],
        comment_body: [
          {
            value: draftToHtml(
              convertToRaw(this.state.editorState.getCurrentContent())
            )
          }
        ],
        field_legal_capacity: this.state.selectedLegalCapacity,
        field_city: this.state.selectedCity,
        field_investment_field: this.state.selectedInvestmentField,
        field_draft_opinion: this.state.stars,
        comment_type: this.state.comtype
      };
      const response = await Api.post(
        `/qarar_api/post-comment?_format=json`,
        data,
        {
          headers: { Authorization: `Bearer ${this.props.accessToken}` }
        }
      );

      if (response.ok) {
        this.setState({ draftSuccess: true });
        setTimeout(() => {
          this.setState({ draftSuccess: false });
        }, 3000);
      }
    }
  };

  async componentDidMount() {
    this.getDraft();
    this.getComments();
    this.isFollowed();
    this.getIsFlagged();
    Events.scrollEvent.register('begin', function() {});

    Events.scrollEvent.register('end', function() {});

    this.setState({ allLegalCapacity: await this.getLegalCapacity() });
    this.setState({ allCity: await this.getCity() });
    this.setState({ allInvestmentField: await this.getInvestmentField() });
  }

  getIsFlagged = async () => {
    const { id, uid, accessToken } = this.props;
    const { voting } = this.state;
    const response = await Api.post(`/qarar_api/isflagged?_format=json`, {
      type: 'like',
      uid,
      id
    });
    const response2 = await Api.post(`/qarar_api/isflagged?_format=json`, {
      type: 'dislike',
      uid,
      id
    });
    if (response.ok && response2.ok) {
      this.setState({
        voting: {
          ...voting,
          up:
            response.data && response.data.data
              ? response.data.data.flagged
              : false,
          down:
            response2.data && response2.data.data
              ? response2.data.data.flagged
              : false
        }
      });
    }
  };

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
    const itemResponse = await Api.get(
      `/qarar_api/load/node/${draftId}?_format=json`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (itemResponse.ok) {
      const { items, data } = itemResponse.data;
      this.setState({ draft: data, items, loadingDraft: false });
      this.getParent(data.parent_id);
    }
  };

  getParent = async id => {
    const { accessToken } = this.props;
    const { breadcrumbs } = this.state;
    const itemResponse = await Api.get(
      `/qarar_api/load/node/${id}?_format=json`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (itemResponse.ok) {
      const { data } = itemResponse.data;
      this.setState({ parentDraft: itemResponse.data });
      this.setState({
        breadcrumbs: [...breadcrumbs, { id: data.id, title: data.title }]
      });
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
              key={item.nid}
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
    const { editorState } = this.state;
    if (!editorState.getCurrentContent().hasText()) {
      this.setState({ errorComment: 'لم تقم بكتابة أي تعليق' });
      setTimeout(() => this.setState({ errorComment: false }), 3000);
      return;
    }
    const data = {
      entity_id: [{ target_id: draftId }],
      subject: [{ value: 'comment' }],
      comment_body: [
        { value: draftToHtml(convertToRaw(editorState.getCurrentContent())) }
      ],
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
      this.setState({
        comment: '',
        successComment: true,
        editorState: EditorState.createEmpty()
      });
      this.getDraft();
      this.getComments();
      setTimeout(() => this.setState({ successComment: false }), 3000);
    } else {
      this.setState({ errorComment: 'من فضلك حاول مرة أخري' });
      setTimeout(() => this.setState({ errorComment: false }), 3000);
    }
  };

  vote = async (type, id) => {
    const { uid, accessToken } = this.props;
    const { voting } = this.state;
    const item = {
      type,
      action: voting[type === 'like' ? 'up' : 'down'] ? 'unflag' : 'flag',
      id,
      uid
    };
    const item2 = {
      type: type === 'like' ? 'dislike' : 'like',
      action: 'unflag',
      id,
      uid
    };
    await Api.post(`/qarar_api/flag?_format=json`, item2, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const response = await Api.post(`/qarar_api/flag?_format=json`, item, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      this.getIsFlagged();
    }
  };

  likeComment = async (id, callback) => {
    const { uid, accessToken } = this.props;
    const item2 = {
      type: 'dislike_comment',
      action: 'unflag',
      id,
      uid
    };
    await Api.post(`/qarar_api/flag?_format=json`, item2, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const item = {
      type: 'like_comment',
      action: 'flag',
      id,
      uid
    };
    const response = await Api.post(`/qarar_api/flag?_format=json`, item, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      this.getComments();
      if (callback) {
        callback();
      }
    }
  };

  dislikeComment = async (id, callback) => {
    const { uid, accessToken } = this.props;
    const item2 = {
      type: 'like_comment',
      action: 'unflag',
      id,
      uid
    };
    await Api.post(`/qarar_api/flag?_format=json`, item2, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const item = {
      type: 'dislike_comment',
      action: 'flag',
      id,
      uid
    };
    const response = await Api.post(`/qarar_api/flag?_format=json`, item, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      this.getComments();
      if (callback) {
        callback();
      }
    }
  };

  render() {
    const {
      draft,
      items,
      editorState,
      comments,
      flagged,
      successComment,
      errorComment,
      loadingDraft,
      breadcrumbs,
      selectedLegalCapacity,
      selectedCity,
      selectedInvestmentField,
      parentDraft
    } = this.state;
    const { uid } = this.props;
    const statusColor = {
      archived: 'light',
      applied: 'info',
      voting: 'success'
    };
    const draftUrls = {
      archived: '/archived-drafts',
      applied: '/drafts-applied',
      voting: '/drafts-under-vote'
    };
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
                      <li>
                        <Link
                          href={
                            draftUrls[parentDraft?.data.qarar_status] || '/'
                          }
                        >
                          <a>
                            {' '}
                            {translate(
                              `draftDetails.breadcrumb.${parentDraft?.data.qarar_status}`
                            )}
                          </a>
                        </Link>
                      </li>
                      {breadcrumbs.map(item => (
                        <li key={item.id}>
                          <Link href={`/draft-details/${item.id}`}>
                            <a>{item.title}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <h2>{draft.title}</h2>
                    <Badge color={statusColor[parentDraft?.data.qarar_status]}>
                      {translate(
                        `draftDetails.${parentDraft?.data.qarar_status}`
                      )}
                    </Badge>
                    <div className="sub-header">
                      <Media
                        object
                        src="/static/img/calendarWhite.svg"
                        className="icon-small"
                        dir={translate('dir')}
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
                      <p>{draft.followers}</p>
                      <h5> {translate('draftDetails.user')}</h5>
                    </div>
                    <div>
                      <div className="icon-border">
                        <Media
                          className="image-icon"
                          object
                          src="/static/img/interactive/draft1 (2).svg"
                        />
                      </div>
                      <p>{draft.comments}</p>
                      <h5> {translate('draftDetails.comment')}</h5>
                    </div>
                    <div>
                      <div className="icon-border">
                        <Media
                          className="image-icon"
                          object
                          src="/static/img/interactive/draft1 (3).svg"
                        />
                      </div>
                      <p>{draft.satisfaction_percentage}%</p>
                      <h5> {translate('draftDetails.generalVote')}</h5>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className="draftContainer drafInfo">
          <Container>
            <Card className="cardDraft">
              <CardHeader>{draft.title}</CardHeader>
              <CardBody>
                <Row>
                  <Col md="12" className="draftBodyRt">
                    <div
                      className="body"
                      dangerouslySetInnerHTML={{ __html: draft.body }}
                    ></div>
                    <div className="dateDraft d-flex align-items-center">
                      <img
                        src="/static/img/interactive/calendar (2).svg"
                        alt=""
                      />
                      <p>
                        {moment(draft.end_date).format('dddd, D MMMM YYYY')}
                      </p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <div className="draftInfoShare d-flex justify-content-between mb-4">
              <div className="shareInfoRight">
                {uid && (
                  <Button
                    color="primary"
                    className="infoFollow"
                    onClick={() => this.follow()}
                    outline={!flagged}
                  >
                    {flagged ? 'إلغاء المتابعة' : 'متابعة'}
                  </Button>
                )}
              </div>
              <div className="shareInfoLeft d-flex align-items-center">
                <p>شارك هذه المادة</p>
                <LinkedinShareButton url={window && window.location}>
                  <img src="/static/img/interactive/linkedinDraft.svg" alt="" />
                </LinkedinShareButton>
                <TwitterShareButton url={window && window.location}>
                  <img src="/static/img/interactive/twitterDraft.svg" alt="" />
                </TwitterShareButton>
                <FacebookShareButton url={window && window.location}>
                  <img src="/static/img/interactive/facebookDraft.svg" alt="" />
                </FacebookShareButton>
              </div>
            </div>
            {items &&
              items.map(item => (
                <Card key={item.nid} className="cardDraft collapseDraftCard">
                  <CardHeader
                    className="d-flex justify-content-between"
                    onClick={() =>
                      this.setState({ [item.nid]: !this.state[item.nid] })
                    }
                  >
                    <p>{item.title}</p>
                    <div className="dratCartTitlelt d-flex">
                      <div className="manyComments d-flex align-items-center">
                        <img src="/static/img/interactive/chat.svg" alt="" />
                        <span>
                          {item.comments}
                          {translate('draftDetails.comment')}
                        </span>
                      </div>
                      <img
                        src="/static/img/interactive/whiteTabs.svg"
                        alt=""
                        className={this.state[item.nid] ? 'rotated' : ''}
                      />
                    </div>
                  </CardHeader>
                  <CardBody
                    style={
                      this.state[item.nid]
                        ? { display: 'block' }
                        : { display: 'none' }
                    }
                  >
                    <Row className="mt-3">
                      <Col md="7" className="draftBodyRt">
                        <p>{renderHTML(item.body_value)}</p>
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
                          {translate('draftDetails.more')}
                          <img src={this.state.img2} alt="" />
                        </Button>
                      </Col>
                      <Col md="5">
                        <div className="d-flex justify-content-end draftLikeDislike">
                          <img
                            onClick={() => this.vote('like', item.nid)}
                            src="/static/img/interactive/dislikeGreen.svg"
                            alt=""
                          />
                          <img
                            onClick={() => this.vote('dislike', item.nid)}
                            src="/static/img/interactive/likeGreen.svg"
                            alt=""
                          />
                        </div>

                        <InsideComment
                          likeComment={this.likeComment}
                          dislikeComment={this.dislikeComment}
                          itemId={item.nid}
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              ))}
            {(Object.values(draft.voting_percentage).some(
              x => +x.replace('%', '') !== 0
            ) ||
              draft.most_featured_items?.length > 0 ||
              draft.most_featured_users?.length > 0) && (
              <Card className="cardDraft">
                <CardHeader>{translate('draftDetails.charts')}</CardHeader>
                <CardBody>
                  <Row className="qcharts">
                    {Object.values(draft.voting_percentage).some(
                      x => +x.replace('%', '') !== 0
                    ) && (
                      <Col
                        md="6"
                        className="qchart flex flex-1 f-column max-100 line-left"
                      >
                        <p
                          style={{
                            color: '#81BD41',
                            fontWeight: 'bold',
                            lineHeight: '16px'
                          }}
                        >
                          {translate('draftDetailsInfo.chartTitle')}
                        </p>
                        <Row>
                          <Col md="6" style={{ width: 'max-content' }}>
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
                                  name: translate(
                                    'draftDetails.chartTypeThree'
                                  ),
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
                          <Col md="6" className="qpiechart">
                            <Chart data={draft.voting_percentage} />
                          </Col>
                        </Row>
                      </Col>
                    )}
                    {draft.most_featured_users?.length > 0 && (
                      <Col
                        md="6"
                        className="qchart flex flex-1 f-column max-100"
                        dir={translate('dir')}
                      >
                        <p
                          style={{
                            color: '#81BD41',
                            fontWeight: 'bold',
                            lineHeight: '16px'
                          }}
                        >
                          {translate('draftDetails.mostVoted')}
                        </p>
                        <Row style={{ justifyContent: 'center' }}>
                          {draft.most_featured_users?.map(el => (
                            <div
                              className="p-2"
                              style={{ 'max-width': '120px' }}
                            >
                              <div className="user-card">
                                <img
                                  src={
                                    el.user_picture
                                      ? `${el.user_picture}`
                                      : '/static/img/Group 991.svg'
                                  }
                                />
                                <p className="user-card-name">
                                  {el.name || 'مجهول'}
                                </p>
                                <span className="user-card-points">
                                  {el.comment_count}{' '}
                                  {translate('draftDetails.points')}
                                </span>
                              </div>
                            </div>
                          ))}
                        </Row>
                      </Col>
                    )}
                  </Row>
                </CardBody>
              </Card>
            )}
            {draft.allow_comment && (
              <div className="job" ref={this.jobRef}>
                {this.state.legalCapError && (
                  <Alert color="danger">
                    {translate('draftDetails.plzPickLegalCapacity')}
                  </Alert>
                )}
                <h4>
                  {translate('draftDetails.shareIdeasModal.legalCapacity')}
                </h4>
                <Job
                  selectLegalCapacity={val =>
                    this.setState({ selectedLegalCapacity: val })
                  }
                  selectCity={val => this.setState({ selectedCity: val })}
                  selectInvestmentField={val =>
                    this.setState({ selectedInvestmentField: val })
                  }
                  id={this.state.draft.parent_id}
                />
              </div>
            )}

            {draft.allow_comment && (
              <div>
                <CommentForm
                  {...draft}
                  job={{
                    selectedLegalCapacity,
                    selectedCity,
                    selectedInvestmentField
                  }}
                  jobRef={this.jobRef}
                  setStars={val => this.setState({ stars: val })}
                  setEditorState={val => this.setState({ editorState: val })}
                  saveComment={() => this.saveDraftComment(draft)}
                />
                {/* alerts */}
                {this.state.draftSuccess && (
                  <Alert color="success">
                    {translate('draftDetails.commentAdded')}
                  </Alert>
                )}
              </div>
            )}

            {draft.comments > 0 && (
              <div className="artcomments">
                <h4>{translate('draftDetails.comments')}</h4>
                <div className="collapseDraftCard draftNewComments">
                  <ArticleComment
                    enableCommentForm={false}
                    enableVote
                    itemId={draft.id}
                    draft={draft}
                  />
                </div>
              </div>
            )}
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(DraftDetailsInfo);
