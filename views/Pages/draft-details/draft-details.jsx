import React, { Component } from 'react';
import './draft-details.css';
import { Container, Col, Row, Button, Media } from 'reactstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import Pagination from 'rc-pagination';
import moment from 'moment';
import {
  Link as ScrollLink,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from 'react-scroll';
import CardDraft from '../components/card-draft/card-draft';
import CardDraftItems from '../components/card-draft-items/card-draft-items';
import Breadcrumb from '../components/breadcrumb/breadcrumb';
import CardInfo from '../components/card-info/card-info';
import TextBox from '../components/text-box/text-box';
import CardComments from '../components/card-comments/card-comments';

import Api from '../../../api';

moment.locale('ar');
class DraftDetails extends Component {
  constructor() {
    super();
    this.state = {
      draft: {
        tags: []
      },
      items: [],
      comments: [],
      commentPage: 1,
      flagged: false
    };
  }

  componentDidMount() {
    this.getDraft();
    this.getComments();
    this.flagged();
    Events.scrollEvent.register('begin', function() {
      console.log('begin', arguments);
    });

    Events.scrollEvent.register('end', function() {
      console.log('end', arguments);
    });
  }

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
    const { draftId } = this.props;
    const draftResponse = await Api.get(
      `/qarar_api/load/node/${draftId}?_format=json`
    );
    if (draftResponse.ok) {
      const { items, data } = draftResponse.data;
      this.setState({ draft: data, items });
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

  flagged = async () => {
    const { uid, draftId } = this.props;
    const response = await Api.get(
      `/qarar_api/isflagged/follow/${draftId}/${uid}?_format=json`
    );
    console.log(response);

    if (response.ok) {
      const {
        data: {
          data: { flagged }
        }
      } = response;
      this.setState({ flagged });
    }
  };

  flag = async () => {
    const { uid, token, draftId, flagged } = this.props;
    const data = {
      type: 'follow',
      action: flagged ? 'unflag' : 'flag',
      id: draftId,
      uid
    };
    const response = await Api.post(`/qarar_api/flag?_format=json`, data, {
      headers: { 'X-CSRF-Token': token }
    });
    if (response.ok) {
      this.flagged();
    }
  };

  saveComment = async () => {
    const { draftId, token } = this.props;
    const { comment } = this.state;

    const data = {
      entity_id: [{ target_id: draftId }],
      entity_type: [{ value: 'node' }],
      comment_type: [{ target_id: 'draft_comments' }],
      field_name: [{ value: 'field_comments' }],
      // subject: [{ value: 'parent comment' }],
      comment_body: [{ value: comment }],
      pid: [{ target_id: '0' }]
    };
    const response = await Api.post(`/en/comment?_format=json`, data, {
      headers: { 'X-CSRF-Token': token }
    });
    if (response.ok) {
      this.setState({ comment: '' });
      this.getDraft();
      this.getComments();
    }
  };

  noAccess() {
    return (
      <>
        <div className="no-access">
          <div className="blur" />
          <div className="flex flex-col flex-align-center flex-justifiy-center flex-space-child item-content">
            <span className="fa fa-ban " />
            <h2>يجب تسجيل الدخول لأضافة تعليق</h2>
            <Link href="/login">
              <Button color="primary">تسجيل الدخول</Button>
            </Link>
            <Link href="/register">
              <a>تسجيل حساب</a>
            </Link>
          </div>
        </div>
      </>
    );
  }

  render() {
    const {
      draft,
      items,
      comments,
      comment: commentText,
      flagged
    } = this.state;
    const { uid } = this.props;
    console.log(items, draft);
    return (
      <>
        <Breadcrumb title="المسودات المطروحة للنقاش" link="/drafts" />
        <Container>
          <div className="dc-details-header">
            <Row>
              <Col sm="12" md="8" lg="9">
                <div className="header-content">
                  <h2>{draft.title}</h2>
                  <div className="sub-header">
                    <Media
                      object
                      src="/static/img/Icon - most active - views Copy 3.svg"
                      className="icon-small"
                    />

                    {/* <i className="fa fa-clock-o "></i> */}
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
                      <Button color="primary">شارك برأيك</Button>
                    </ScrollLink>
                    {uid && (
                      <Button
                        color="primary"
                        onClick={() => this.flag()}
                        outline={!flagged}
                      >
                        {flagged ? 'إلغاء المتابعة' : 'متابعة'}
                      </Button>
                    )}
                  </div>
                </div>
              </Col>
              <Col sm="12" md="4" lg="3">
                <div className="cards">
                  <Row>
                    <Col xs="6">
                      <CardInfo
                        type="مشترك"
                        number={draft.followers}
                        icon="/static/img/like-icon.svg"
                      />
                    </Col>
                    <Col xs="6">
                      <CardInfo
                        type="تعليق"
                        number={draft.comments}
                        icon="/static/img/draft activity - comments.svg"
                      />
                    </Col>
                    <Col xs="12">
                      <CardInfo
                        type="صوت"
                        number={parseInt(draft.likes, 10)}
                        icon="/static/img/Icon - draft activity - users.svg"
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
          <div className="description">
            <h5>الوصف</h5>
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
            {items && items.length && (
              <CardDraftItems
                date={
                  draft.applied_date
                    ? ''
                    : moment(draft.end_date).format('dddd, MMMM Do YYYY')
                }
                dropdownList={items}
                tags={[]}
              />
            )}
          </div>
          <Element name="test1" className="element">
            {!uid ? (
              this.noAccess()
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
          <CardComments
            commentsArray={comments.map(comment => ({
              id: comment.cid,
              avatar: comment.owner_image,
              name: comment.full_name,
              like: '33',
              share: '2',
              content: comment.comment_body,
              comments: comment.children
                ? comment.children.map(childComment => ({
                    id: childComment.cid,
                    avatar: childComment.owner_image,
                    name: childComment.full_name,
                    like: '33',
                    share: '2',
                    content: childComment.comment_body
                  }))
                : []
            }))}
          />
        </Container>
      </>
    );
  }
}
const mapStateToProps = ({ uid, token }) => ({ uid, token });
export default connect(mapStateToProps)(DraftDetails);
