import React, { Component } from 'react';
import './draft-details.css';
import { Line, Doughnut } from 'react-chartjs-2';
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
  UncontrolledTooltip,
  Alert,
  Badge,
  TabContent,
  TabPane
} from 'reactstrap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import moment from 'moment';
import renderHTML from 'react-render-html';
import {
  Link as ScrollLink,
  DirectLink,
  Element,
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
import ReactLoading from 'react-loading';
import DraftTabs from './tabs';
import Skeleton from '../components/skeleton/skeleton';
import ArticleComment from '../components/ArticleComment';
import DecisionEdits from '../components/decision-edit/decision-edit';
import Api from '../../../api';
import PartcipantModal from './partcipantModal';
import CommentSteps from './comments-stetps';
import { translate } from '../../../utlis/translation';
import ShareIdeasModal from './shareIdeasModal';
import { PieChart } from 'react-minimal-pie-chart';
import Rate from './shareIdea/Rate';
import Job from './shareIdea/Job';
import CommentType from './shareIdea/CommentType';
import AddComment from './shareIdea/Comment';
import ReactTooltip from 'react-tooltip';
import Chart from '../components/chart/chart';
import CommentForm from '../components/CommentForm/commentForm';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);

moment.locale('ar');

class DraftDetailsInfo extends Component {
  constructor() {
    super();
    moment.locale(localStorage.getItem('LANG') || 'ar');

    this.jobRef = React.createRef();

    this.state = {
      activeTab: '1',
      draft: {
        tags: []
      },
      items: [],
      under_voting_items: [],
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
      commentsActions: {},
      selectedSubject: null,
      modalOpen: false,
      shareIdeasModalOpen: false,
      forced_adj_city_investemtn: '0',

      // rate
      stars: 1,

      // job
      lists: {
        allLegalCapacity: null,
        allCity: null,
        allInvestmentField: null
      },
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

  async componentDidMount() {
    this.getDraft();
    // this.getComments();
    this.isFollowed();
    // this.getIsFlagged();
    Events.scrollEvent.register('begin', function() {});

    Events.scrollEvent.register('end', function() {});

    this.setState({ allLegalCapacity: await this.getLegalCapacity() });
    this.setState({ allCity: await this.getCity() });
    this.setState({ allInvestmentField: await this.getInvestmentField() });
  }

  getIsFlagged = async () => {
    const { id, uid, accessToken } = this.props;
    const { voting } = this.state;
    const response = await Api.post(
      `/qarar_api/isflagged?_format=json`,
      {
        type: 'like',
        uid,
        id
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    const response2 = await Api.post(
      `/qarar_api/isflagged?_format=json`,
      {
        type: 'dislike',
        uid,
        id
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
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
    const { breadcrumbs } = this.state;
    const itemResponse = await Api.get(
      `/qarar_api/load/node/${draftId}?_format=json`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (itemResponse.ok) {
      const { items, data, under_voting_items } = itemResponse.data;
      const openArticle =
        new Date(data.end_date).getTime() > new Date().getTime();

      items.map(item => item.modified_id && this.getEdits(item.nid));

      under_voting_items.map(
        item => item.modified_id && this.getEdits(item.nid)
      );

      items.map((item, index) => {
        item.openArticle =
          new Date(item.end_date).getTime() > new Date().getTime();
        return item;
      });

      under_voting_items.map((item, index) => {
        item.openArticle =
          new Date(item.end_date).getTime() > new Date().getTime();
        return item;
      });
      this.setState(
        {
          draft: data,
          items,
          under_voting_items,
          loadingDraft: false,
          openArticle
        },
        () => {
          if (!breadcrumbs.length) {
            this.getParent(data.parent_id);
          }
        }
      );
    }
  };

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

  getParent = async id => {
    if (!id) return;
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
      this.setState({
        breadcrumbs: [...breadcrumbs, { id: data.id, title: data.title }]
      });
      if (data.parent_id) {
        this.getParent(data.parent_id);
      }
    }
  };

  getComments = async () => {
    const { draftId } = this.props;
    const { commentPage } = this.state;
    // alert("called")
    const response = await Api.get(
      `/qarar_api/comments/${draftId}/DESC?_format=json`
    );

    if (response.ok) {
      this.setState({ comments: response.data });
    }
    s;
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

  saveComment = async stars => {
    const { draftId, accessToken } = this.props;
    const { editorState } = this.state;
    if (!editorState.getCurrentContent().hasText() && !stars) {
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
      pid: [{ target_id: '0' }],
      field_draft_opinion: stars
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

  saveDraftDetailsComment = async () => {
    const { accessToken } = this.props;
    const { editorState, selectedSubject } = this.state;
    if (!editorState.getCurrentContent().hasText()) {
      this.setState({ errorComment: 'لم تقم بكتابة أي تعليق' });
      setTimeout(() => this.setState({ errorComment: false }), 3000);
      return;
    }
    const data = {
      entity_id: [{ target_id: selectedSubject }],
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

  saveDraftComment = async item => {
    if (
      !this.state.editorState.getCurrentContent().hasText() &&
      item.comment_required
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
      (this.state.selectedLegalCapacity === 48 &&
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
        entity_id: [{ target_id: item.nid }],
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

  vote = async (type, id) => {
    const { uid, accessToken, openArticle } = this.props;
    if (!uid || !openArticle) return;
    this.setState({ [type]: true, id });
    const item = {
      type,
      action: 'flag',
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
      this.setState({ [type]: false, id: false });
      this.getDraft();
    } else {
      this.setState({ [type]: false, id: false });
    }
  };

  getEdits = async editId => {
    const response = await Api.get(
      `/qarar_api/load/node/${editId}?_format=json`
    );
    if (response.ok) {
      this.setState({
        [`edit-${editId}`]: response.data.data
      });
    }
  };

  likeComment = async (id, callback) => {
    const { openArticle } = this.state;
    const { uid, accessToken } = this.props;
    if (!uid || !openArticle) return;
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
    const { openArticle } = this.state;
    const { uid, accessToken } = this.props;
    if (!uid || !openArticle) return;
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
      under_voting_items,
      editorState,
      flagged,
      successComment,
      errorComment,
      loadingDraft,
      breadcrumbs,
      openArticle,
      activeTab,
      selectedSubject,
      modalOpen,
      shareIdeasModalOpen,
      forced_adj_city_investemtn,
      selectedLegalCapacity,
      selectedCity,
      selectedInvestmentField
    } = this.state;
    const { uid, accessToken } = this.props;
    if (loadingDraft) {
      return <Skeleton details />;
    }
    const statusColor = {
      archived: 'light',
      applied: 'info',
      voting: 'success'
    };
    const statusName = {
      archived: 'archived',
      applied: 'applied',
      voting: 'voting'
    };
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
                        <Link href="/drafts/">
                          <a>{translate('draftDetails.votingDrafts')}</a>
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
                    <Badge color={statusColor[draft.qarar_status]}>
                      {translate(
                        `draftDetails.${statusName[draft.qarar_status]}`
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
                        <span>
                          {translate('draftDetails.voteClosed')}

                          {draft.archived_date}
                        </span>
                      )}
                      {draft.applied_date && (
                        <span>
                          {translate('draftDetails.application')}

                          {draft.applied_date}
                        </span>
                      )}
                      {draft.end_date &&
                        !(draft.applied_date || draft.archived_date) && (
                          <span>
                            {translate('draftDetails.votingCloses')}
                            {draft.end_date}
                          </span>
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
                      <h5>{translate('draftDetails.user')}</h5>
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
                      <h5>{translate('draftDetails.comment')}</h5>
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
                  <Col
                    md={draft?.related_project?.entity_logo ? '9' : '12'}
                    className={
                      'draftBodyRt text-justify' +
                      (draft?.pdf_url ? ' line-bottom' : '')
                    }
                  >
                    {' '}
                    <p className="line-clamp-3">
                      {renderHTML(draft.body || '')}
                    </p>
                    <div className="dates d-flex">
                      {' '}
                      <div className="date dateDraft d-flex align-items-center lf-10">
                        <img
                          src="/static/img/interactive/calendar (2).svg"
                          alt=""
                        />
                        <p className="bold">
                          <strong>
                            {translate('draftDetails.createDate')}
                          </strong>
                          :
                        </p>
                        <span>
                          {moment(draft.applied_date || new Date()).format(
                            'dddd, D MMMM YYYY'
                          )}
                        </span>
                      </div>
                      <div className="date dateDraft d-flex align-items-center">
                        <img
                          src="/static/img/interactive/calendar (2).svg"
                          alt=""
                        />
                        <p className="bold">
                          <strong>{translate('draftDetails.closeDate')}</strong>
                          :
                        </p>
                        <span>
                          {moment(draft.end_date).format('dddd, D MMMM YYYY')}
                        </span>
                      </div>
                    </div>
                  </Col>
                  {draft?.related_project && (
                    <Col md="3" className="qlogo line-right just-center">
                      {draft?.related_project?.entity_logo && (
                        <img
                          src={draft?.related_project?.entity_logo}
                          alt="qarar"
                        />
                      )}
                      {draft?.related_project ? (
                        <>
                          <p className="bold m-0">
                            {' '}
                            {draft?.related_project?.entity_name}
                          </p>
                          <p className="m-0">
                            {' '}
                            <span className="bold">
                              {translate('draftDetails.projectType')}
                            </span>
                            {draft?.related_project?.project_type}
                          </p>
                          {/*<p className="m-0"> <span className="bold">القطاع: </span>{draft?.related_project?.project_type}</p>*/}
                        </>
                      ) : null}
                    </Col>
                  )}
                </Row>
                <Row style={{ padding: '20px' }}>
                  {draft?.pdf_url && (
                    <div className="uploads">
                      <span style={{ marginLeft: '20px', fontWeight: 'bold' }}>
                        {translate('decisionDetails.attachments')}
                      </span>
                      <Button
                        className="btn-inline-block btn-ligh"
                        color="secondary"
                        size="sm"
                        // disabled={!draft?.pdf_url}
                        onClick={() => window.open(draft?.pdf_url)}
                      >
                        {draft.pdf_name}
                      </Button>
                    </div>
                  )}
                </Row>
              </CardBody>
            </Card>

            {draft?.related_project ? (
              <Card className="cardDraft">
                <CardBody>
                  <DraftTabs project={draft?.related_project} />
                </CardBody>
              </Card>
            ) : null}

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
                        md="4"
                        className="qchart flex flex-1 f-column max-100"
                      >
                        <p
                          style={{
                            color: '#81BD41',
                            fontWeight: 'bold',
                            lineHeight: '16px'
                          }}
                        >
                          {translate('draftDetails.chartTitle')}
                        </p>
                        <Row>
                          <Col md="6">
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
                    {draft.most_featured_items?.length > 0 && (
                      <Col
                        md="4"
                        className={
                          'qchart flex flex-1 f-column max-100' +
                          (Object.values(draft.voting_percentage).some(
                            x => +x.replace('%', '') !== 0
                          )
                            ? ' border-right-line'
                            : '')
                        }
                        dir={translate('dir')}
                      >
                        <p
                          style={{
                            color: '#81BD41',
                            fontWeight: 'bold',
                            lineHeight: '16px'
                          }}
                        >
                          {translate('draftDetails.mostDrafts')}
                        </p>

                        <Row>
                          {draft.most_featured_items?.map(el => (
                            <Col md="12" className="p-2 featured-article">
                              <div className="featured-article-card">
                                <p className="featured-article-card-name">
                                  {el.title}
                                </p>
                                <span className="featured-article-card-points">
                                  {el.comment_count}{' '}
                                  {translate('draftDetails.points')}
                                </span>
                              </div>
                            </Col>
                          ))}
                        </Row>
                      </Col>
                    )}
                    {draft.most_featured_users?.length > 0 && (
                      <Col
                        md="4"
                        className="qchart border-right-line flex flex-1 f-column max-100"
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
                        <Row style={{ 'justify-content': 'center' }}>
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

            <div className="draftInfoShare d-flex justify-content-between mb-4">
              <div className="shareInfoLeft d-flex align-items-center">
                <p>{translate('draftDetails.shareDraft')}</p>
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
            <div>
              <div className="job" ref={this.jobRef}>
                {this.state.legalCapError && (
                  <Alert color="danger">
                    {translate('draftDetails.plzPickLegalCapacity')}
                  </Alert>
                )}
                {draft.allow_comment &&
                  under_voting_items.every(el => el.allow_comment) &&
                  items.every(el => el.allow_comment) && (
                    <div>
                      <h4>
                        {translate(
                          'draftDetails.shareIdeasModal.legalCapacity'
                        )}
                      </h4>
                      <Job
                        selectLegalCapacity={val =>
                          this.setState({ selectedLegalCapacity: val })
                        }
                        selectCity={val => this.setState({ selectedCity: val })}
                        selectInvestmentField={val =>
                          this.setState({ selectedInvestmentField: val })
                        }
                        id={draft.id}
                      />
                    </div>
                  )}
              </div>
              <h4> {translate('draftDetails.votable')}</h4>
              {under_voting_items &&
                under_voting_items.map(item => this.subjectsList(item, true))}
              <hr style={{ borderColor: '#1e6f6d' }} />

              <h4>{translate('draftDetails.otherArticles')}</h4>
              {items && items.map(item => this.subjectsList(item, false))}
            </div>

            {draft.comments > 0 && (
              <div className="artcomments">
                <h4>{translate('draftDetails.comments')}</h4>
                <div className="collapseDraftCard draftNewComments">
                  <ArticleComment
                    enableCommentForm={false}
                    enableVote={openArticle}
                    likeComment={this.likeComment}
                    dislikeComment={this.dislikeComment}
                    itemId={draft.id}
                    draft={draft}
                  />
                </div>
              </div>
            )}
          </Container>
        </div>
        {draft.qarar_status === 'voting' && (
          <div class="container">
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
        <PartcipantModal
          open={modalOpen}
          id={draft.id}
          canVote={!!openArticle}
          uid={uid}
          getDraft={() => this.getDraft()}
          getComments={() => this.getComments()}
          accessToken={this.props.accessToken}
          close={() =>
            this.setState({
              modalOpen: false
            })
          }
        />

        <ShareIdeasModal
          open={shareIdeasModalOpen}
          id={this.state.selectedSubject}
          canVote={!!openArticle}
          uid={uid}
          forced_adj_city_investemtn={draft.forced_adj_city_investemtn !== '0'}
          getDraft={() => this.getDraft()}
          getComments={() => this.getComments()}
          accessToken={this.props.accessToken}
          getLegalCapacity={() => this.getLegalCapacity()}
          getCity={() => this.getCity()}
          getInvestmentField={() => this.getInvestmentField()}
          close={() =>
            this.setState({
              shareIdeasModalOpen: false
            })
          }
        />
      </>
    );
  }

  subjectsList = (item, voteable) => {
    let {
      selectedLegalCapacity,
      selectedCity,
      selectedInvestmentField
    } = this.state;

    return (
      <Card key={item.nid} className="cardDraft text-justify collapseDraftCard">
        <CardHeader
          className="d-flex justify-content-between"
          style={{
            backgroundColor: item.modified_id && '#ee5253'
          }}
          onClick={() => this.setState({ [item.nid]: !this.state[item.nid] })}
        >
          <p>{item.title}</p>
          <div className="dratCartTitlelt d-flex">
            <img
              src="/static/img/interactive/whiteTabs.svg"
              alt=""
              className={this.state[item.nid] ? 'rotated' : ''}
            />
          </div>
        </CardHeader>
        {this.state[`modified-${item.nid}`] && (
          <DecisionEdits
            edits={this.state[`edit-${item.nid}`]?.modifications}
          />
        )}
        <CardBody
          style={
            this.state[item.nid] ? { display: 'block' } : { display: 'none' }
          }
        >
          <Row className="mt-3">
            <Col md="12" className="draftBodyRt">
              <p className="line-clamp-3">
                {renderHTML(item.body_value || '')}
              </p>
              {voteable && (
                <div>
                  <CommentForm
                    {...item}
                    job={{
                      selectedLegalCapacity,
                      selectedCity,
                      selectedInvestmentField
                    }}
                    jobRef={this.jobRef}
                    setStars={val => this.setState({ stars: val })}
                    setEditorState={val => this.setState({ editorState: val })}
                    saveComment={() => this.saveDraftComment(item)}
                  />
                  {/* alerts */}
                  {this.state.draftSuccess && (
                    <Alert color="success">
                      {translate('draftDetails.commentAdded')}
                    </Alert>
                  )}
                </div>
              )}

              {/* files and more */}
              <Link href={`/draft-details-info/${item.nid}`}>
                <Button
                  className="btn-inline-block"
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
                  {'  '}
                  <img src={this.state.img2} alt="" />
                </Button>
              </Link>
              {item?.pdf_url && (
                <Button
                  className="btn-inline-block"
                  color="secondary"
                  size="lg"
                  // disabled={!item?.pdf_url}
                  onClick={() => window.open(item?.pdf_url)}
                >
                  {item.pdf_name}
                </Button>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };
}

const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(DraftDetailsInfo);
