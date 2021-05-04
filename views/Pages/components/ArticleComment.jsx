import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Alert,
  UncontrolledTooltip
} from 'reactstrap';
import renderHTML from 'react-render-html';
import ReactLoading from 'react-loading';
import moment from 'moment';
import Link from 'next/link';

import Api from '../../../api';

class ArticleComment extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    this.getComments();
  }

  getComments = async () => {
    const { itemId, commentsMapper } = this.props;
    const response = await Api.get(
      `/qarar_api/comments/${itemId}/DESC?_format=json`
    );
    if (response.ok) {
      this.setState({ comments: response.data });
      // eslint-disable-next-line react/destructuring-assignment
      if (commentsMapper) {
        commentsMapper(this.setCommentsLikesAndDisLikesCounter(response.data));
      }
    }
  };

  setCommentsLikesAndDisLikesCounter = comments => {
    let likes = 0;
    let dislikes = 0;
    if (comments && comments.length) {
      comments.forEach(comment => {
        likes += +comment.likes;
        dislikes += +comment.dislikes;
      });
    }
    return {
      likes,
      dislikes
    };
  };

  saveComment = async () => {
    const { itemId, accessToken } = this.props;
    const { comment } = this.state;
    if (!comment) {
      this.setState({ error: true });
      return;
    }
    const data = {
      entity_id: [{ target_id: itemId }],
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
      setTimeout(() => this.setState({ successComment: false }), 3000);
    }
  };

  render() {
    const { comments, successComment } = this.state;
    const { uid, enableCommentForm, enableVote } = this.props;

    return (
      <>
        {comments.map(comment => (
          <div
            key={comment.cid}
            className="ArticleComment d-flex align-items-start"
          >
            <div className="comment-user-info">
              <img
                src={comment.owner_image || '/static/img/interactive/user.svg'}
                alt=""
                className="avatarUser"
              />
              <div className="comment-info">
                <Link href={`/user-profile/${comment.ownerid}`}>
                  <a>
                    <h5>{comment.full_name || comment.ownername}</h5>
                  </a>
                </Link>
                <p>
                  {moment(comment.createdcomment * 1000).format('YYYY/MM/DD')}
                </p>
              </div>
            </div>
            <div>
              <p className="text-justify">
                {renderHTML(comment.comment_body || '')}
              </p>
            </div>
            {/* <div className="d-flex flex-row draftLikeDislike likeDiv">
              <span>{comment.likes}</span>
              {this.state.like && this.state.id === comment.cid && (
                <ReactLoading
                  className="mx-1"
                  type="spin"
                  color="#046F6D"
                  height={20}
                  width={20}
                />
              )}
              <img
                onClick={() => {
                  if (enableVote) {
                    this.setState({ id: comment.cid, like: true });
                    this.props.likeComment(comment.cid, () => {
                      this.getComments();
                      this.setState({ id: null, like: false });
                    });
                  }
                }}
                src={
                  comment.flag === 'like'
                    ? '/static/img/interactive/blueLikeActive.svg'
                    : '/static/img/interactive/dislikeGreen.svg'
                }
                alt=""
                className="likeImg"
                id={`tooltip-d-${comment.cid}`}
              />
              {!enableVote && (
                <UncontrolledTooltip
                  placement="top"
                  target={`tooltip-d-${comment.cid}`}
                >
                  تم إيقاف التصويت
                </UncontrolledTooltip>
              )}
              {enableVote && !uid && (
                <UncontrolledTooltip
                  placement="top"
                  target={`tooltip-d-${comment.cid}`}
                >
                  يجب عليك تسجيل الدخول
                </UncontrolledTooltip>
              )}
              <span>{comment.dislikes}</span>
              {this.state.dislike && this.state.id === comment.cid && (
                <ReactLoading
                  className="mx-1"
                  type="spin"
                  color="#046F6D"
                  height={20}
                  width={20}
                />
              )}
              <img
                onClick={() => {
                  if (enableVote) {
                    this.setState({ id: comment.cid, dislike: true });
                    this.props.dislikeComment(comment.cid, () => {
                      this.getComments();
                      this.setState({ id: null, dislike: false });
                    });
                  }
                }}
                src={
                  comment.flag === 'dislike'
                    ? '/static/img/interactive/blueDislikeActive.svg'
                    : '/static/img/interactive/likeGreen.svg'
                }
                alt=""
                className="likeImg"
                id={`tooltip-l-${comment.cid}`}
              />
              {!enableVote && (
                <UncontrolledTooltip
                  placement="top"
                  target={`tooltip-l-${comment.cid}`}
                >
                  تم إيقاف التصويت
                </UncontrolledTooltip>
              )}
              {enableVote && !uid && (
                <UncontrolledTooltip
                  placement="top"
                  target={`tooltip-l-${comment.cid}`}
                >
                  يجب عليك تسجيل الدخول
                </UncontrolledTooltip>
              )}
            </div> */}
          </div>
        ))}
        {successComment && (
          <Alert color="success">
            تم إضافة التعليق في إنتظار موافقة إدارة الموقع
          </Alert>
        )}
        {uid && enableCommentForm ? (
          <InputGroup>
            <Input
              value={this.state.comment}
              onChange={e => this.setState({ comment: e.target.value })}
              placeholder="اضف تعليقك"
            />
            <InputGroupAddon onClick={this.saveComment} addonType="prepend">
              <img src="/static/img/interactive/whiteArrow.svg" alt="" />
            </InputGroupAddon>
          </InputGroup>
        ) : null}
      </>
    );
  }
}
const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(ArticleComment);
