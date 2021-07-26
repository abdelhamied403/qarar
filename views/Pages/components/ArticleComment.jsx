import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { InputGroup, InputGroupAddon, Input, Alert } from 'reactstrap';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Link from 'next/link';

import Api from '../../../api';
import { Button } from 'reactstrap';
import CommentModal from '../draft-details/commentModal';
import { translate } from '../../../utlis/translation';

import './comments.css';

class ArticleComment extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      commentModalOpen: false,
      cid: null
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

  saveComment = async (comment, cid) => {
    const { itemId, accessToken } = this.props;
    if (!comment) {
      this.setState({ error: true });
      return;
    }
    const data = {
      entity_id: [{ target_id: itemId }],
      subject: [{ value: 'comment' }],
      comment_body: [{ value: cid }],
      pid: [{ target_id: comment }]
    };
    const response = await Api.post(
      `/qarar_api/post-comment?_format=json`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
    if (response.ok) {
      this.setState({ comment: '', successComment: true });
      setTimeout(() => this.setState({ successComment: false }), 3000);
    }
  };

  render() {
    const { comments, successComment, commentModalOpen } = this.state;
    const { uid, enableCommentForm, enableVote, voteable } = this.props;

    return (
      <div class="subject-comments">
        {/* showing comments in here */}
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
            {voteable ? (
              <Button
                onClick={() => {
                  this.setState({ cid: comment.cid });
                  this.setState({ commentModalOpen: true });
                }}
              >
                {translate('draftDetails.reply')}
              </Button>
            ) : null}
            {comment.children?.map(reply => (
              <div className="reply">
                <div className="reply-user-info">
                  <img
                    src={
                      reply.owner_image || '/static/img/interactive/user.svg'
                    }
                    alt=""
                    className="avatarUser"
                  />
                  <div className="about">
                    <div className="reply-info">
                      <Link href={`/user-profile/${reply.ownerid}`}>
                        <a>
                          <h5>{reply.full_name || reply.ownername}</h5>
                        </a>
                      </Link>
                      <p>
                        {moment(reply.createdcomment * 1000).format(
                          'YYYY/MM/DD'
                        )}
                      </p>
                    </div>
                    <div className="reply-body">
                      <p>{reply.comment_body}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        <CommentModal
          modal={commentModalOpen}
          cid={this.state.cid}
          saveComment={this.saveComment}
          toggle={() => {
            this.setState({ commentModalOpen: false });
          }}
        />
        {successComment && (
          <Alert color="success">
            تم إضافة التعليق في إنتظار موافقة إدارة الموقع
          </Alert>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(ArticleComment);
