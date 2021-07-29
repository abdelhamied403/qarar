import React, { Component } from 'react';
import {
  Container,
  Col,
  Row,
  Button,
  Media,
  Card,
  CardBody,
  CardHeader,
  DropdownItem
} from 'reactstrap';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import moment from 'moment';
import renderHTML from 'react-render-html';
import Skeleton from '../components/skeleton/skeleton';

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
import DecisionEdits from '../components/decision-edit/decision-edit';
import Api from '../../../api';
import { translate } from '../../../utlis/translation';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);

moment.locale('ar');

class DecisionDetailsInfo extends Component {
  constructor() {
    super();
    moment.locale(localStorage.getItem('LANG') || 'ar');
    this.state = {
      activeTab: '1',
      decision: {
        tags: []
      },
      parentDecision: {},
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
      loadingDecision: true,
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
      allDecisionData: null
    };
  }

  componentDidMount() {
    this.updateVisits();
    this.getDecision();
    // this.getComments();
    this.isFollowed();
    // this.getIsFlagged();
    Events.scrollEvent.register('begin', function() {});

    Events.scrollEvent.register('end', function() {});
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

  updateVisits = async () => {
    const { decisionId, accessToken } = this.props;
    const itemResponse = await Api.post(
      `/qarar_api/update-visits-number?_format=json`,
      { id: decisionId }
    );
    if (itemResponse.ok) {
    }
  };

  getDecision = async () => {
    const { decisionId, accessToken } = this.props;
    const { breadcrumbs } = this.state;
    const itemResponse = await Api.get(
      `/qarar_api/load/node/${decisionId}?_format=json`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (itemResponse.ok) {
      const { data } = itemResponse.data;
      const { items } = data;
      const openArticle =
        new Date(data.end_date).getTime() > new Date().getTime();
      this.setState(
        {
          allDecisionData: itemResponse.data,
          decision: data,
          items,
          loadingDecision: false,
          openArticle
        },
        () => {
          if (!breadcrumbs.length) {
            let parent_id =
              itemResponse.data.field_system_reference &&
              itemResponse.data.field_system_reference[0].target_id;
            this.getParent(parent_id);
          }
        }
      );
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
      this.setState({ parentDecision: itemResponse.data });

      this.setState({
        breadcrumbs: [...breadcrumbs, { id: data.id, title: data.title }]
      });
      let parent_id =
        itemResponse.data.field_system_reference &&
        itemResponse.data.field_system_reference[0].target_id;
      if (parent_id) {
        this.getParent(parent_id);
      }
    }
  };

  getComments = async () => {
    const { decisionId } = this.props;
    const { commentPage } = this.state;
    // alert("called")
    const response = await Api.get(
      `/qarar_api/comments/${decisionId}/DESC?_format=json`
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
    const { uid, decisionId } = this.props;
    const response = await Api.post(`/qarar_api/isflagged?_format=json`, {
      type: 'follow',
      uid,
      id: decisionId
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
    const { uid, accessToken, decisionId } = this.props;
    const { flagged } = this.state;
    const data = {
      type: 'follow',
      action: flagged ? 'unflag' : 'flag',
      id: decisionId,
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
    const { decisionId, accessToken } = this.props;
    const { editorState } = this.state;
    if (!editorState.getCurrentContent().hasText()) {
      this.setState({ errorComment: 'لم تقم بكتابة أي تعليق' });
      setTimeout(() => this.setState({ errorComment: false }), 3000);
      return;
    }
    const data = {
      entity_id: [{ target_id: decisionId }],
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
      this.getDecision();
      this.getComments();
      setTimeout(() => this.setState({ successComment: false }), 3000);
    } else {
      this.setState({ errorComment: 'من فضلك حاول مرة أخري' });
      setTimeout(() => this.setState({ errorComment: false }), 3000);
    }
  };

  saveDecisionDetailsComment = async () => {
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
      this.getDecision();
      this.getComments();
      setTimeout(() => this.setState({ successComment: false }), 3000);
    } else {
      this.setState({ errorComment: 'من فضلك حاول مرة أخري' });
      setTimeout(() => this.setState({ errorComment: false }), 3000);
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
      this.getDecision();
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
      decision,
      items,
      editorState,
      flagged,
      successComment,
      errorComment,
      loadingDecision,
      breadcrumbs,
      openArticle,
      activeTab,
      selectedSubject,
      modalOpen,
      shareIdeasModalOpen
    } = this.state;
    const { uid, accessToken } = this.props;
    if (loadingDecision) {
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
                        <Link href="/decisions-library">
                          <a>{translate('decisionsLibPage.title')}</a>
                        </Link>
                      </li>
                      {breadcrumbs.map(item => (
                        <li key={item.id}>
                          <Link href={`/decision-details/${item.id}`}>
                            <a>{item.title}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <h2>{decision && decision.title}</h2>
                    <div className="sub-header">
                      <Media
                        object
                        src="/static/img/calendarWhite.svg"
                        className="icon-small"
                        dir={translate('dir')}
                      />
                      <span>
                        {translate('decisionDetails.published')}{' '}
                        {decision && decision.publisheDate}
                      </span>
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
                          src="/static/img/decision/Group 1423.svg"
                        />
                      </div>
                      <p>
                        {this.state.parentDecision &&
                          this.state.parentDecision?.data?.visits_number}
                      </p>
                      <h5>{translate('decisionDetails.views')}</h5>
                    </div>
                    <div>
                      <div className="icon-border">
                        <Media
                          className="image-icon"
                          object
                          src="/static/img/decision/Group 1424.svg"
                        />
                      </div>
                      <p>
                        {this.state.parentDecision &&
                          this.state.parentDecision?.data?.modificationsCount}
                      </p>
                      <h5>تعديل</h5>
                    </div>
                    <div>
                      <div className="icon-border">
                        <Media
                          className="image-icon"
                          object
                          src="/static/img/decision/Group 1425.svg"
                        />
                      </div>
                      <p>{decision && decision.ownername}</p>
                      <h5>المسؤل</h5>
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
              <CardHeader>{decision.title}</CardHeader>
              <CardBody>
                <Row>
                  <Col
                    md="9"
                    className={
                      'draftBodyRt text-justify' +
                      (decision.pdf_name ? ' line-bottom' : '')
                    }
                  >
                    <p>{renderHTML(decision.body || '')}</p>
                    <div className="d-flex">
                      {' '}
                      <div className="dateDraft d-flex align-items-center lf-10">
                        <img
                          src="/static/img/interactive/calendar (2).svg"
                          alt=""
                        />
                        <p className="bold">
                          <strong>
                            {translate('decisionDetails.published')}
                          </strong>
                          :{' '}
                        </p>
                        <span>{decision && decision.publisheDate}</span>
                      </div>
                    </div>
                  </Col>
                  <Col md="3" className="line-right just-center">
                    <img
                      style={{ marginBottom: '5px' }}
                      src={
                        decision?.related_project?.entity_logo ||
                        '/static/img/logo.svg'
                      }
                      alt="qarar"
                    />
                    {decision?.related_project ? (
                      <>
                        <p className="bold m-0">
                          {' '}
                          {decision?.related_project?.entity_name}
                        </p>
                        <p className="m-0">
                          {' '}
                          <span className="bold">
                            {translate('decisionDetails.projectType')}
                          </span>
                          {decision?.related_project?.project_type}
                        </p>
                      </>
                    ) : null}
                  </Col>
                </Row>
                {decision.pdf_name && (
                  <Row style={{ padding: '20px' }}>
                    <div className="uploads">
                      <span style={{ marginLeft: '20px', fontWeight: 'bold' }}>
                        {translate('decisionDetails.attachments')}
                      </span>

                      <Button
                        className="btn-inline-block btn-ligh"
                        color="secondary"
                        size="sm"
                        onClick={() => window.open(pdf_url)}
                      >
                        {decision.pdf_name}
                      </Button>
                    </div>
                  </Row>
                )}
              </CardBody>
            </Card>

            <div className="draftInfoShare d-flex justify-content-between mb-4">
              <div className="shareInfoLeft d-flex align-items-center">
                <p>{translate('decisionDetails.shareDecision')}</p>
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

            <div className="edits my-5">
              <h4 className="my-4">
                {translate('cardDraft.modificationRequest')}
              </h4>
              <Editor
                placeholder="اضف تعليقك هنا"
                toolbar={{
                  options: ['inline', 'image'],
                  inline: {
                    options: ['bold', 'underline']
                  },
                  image: {
                    alignmentEnabled: false,
                    uploadCallback: () => {},
                    alt: { present: true, mandatory: false },
                    previewImage: true
                  }
                }}
                editorState={this.state.editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={newData =>
                  this.setState({ editorState: newData })
                }
              />
              <Button
                className="button-comment"
                onClick={() =>
                  console.log(
                    draftToHtml(
                      convertToRaw(this.state.editorState.getCurrentContent())
                    )
                  )
                }
              >
                {translate('draftDetails.addCommentButton')}
                <img
                  dir={translate('dir')}
                  src="/static/img/interactive/whiteArrow.svg"
                  alt=""
                />
              </Button>
            </div>
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
export default connect(mapStateToProps)(DecisionDetailsInfo);
