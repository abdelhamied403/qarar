import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InputGroup, InputGroupAddon, Input, Alert, Button } from 'reactstrap';
import renderHTML from 'react-render-html';
import ReactLoading from 'react-loading';
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
    const { itemId } = this.props;
    const response = await Api.get(
      `/qarar_api/comments/${itemId}/DESC?_format=json`
    );
    if (response.ok) {
      this.setState({ comments: response.data });
    }
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
    const { uid, enableCommentForm } = this.props;
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
                <h5>اسم المستخدم</h5>
                <p>28/3/2020</p>
              </div>
            </div>
            <div>
              <p>{renderHTML(comment.comment_body || '')}</p>
            </div>
            <div className="d-flex flex-row draftLikeDislike likeDiv">
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
                  this.setState({ id: comment.cid, like: true });
                  this.props.likeComment(comment.cid, () => {
                    this.getComments();
                    this.setState({ id: null, like: false });
                  });
                }}
                src="/static/img/interactive/blueLikeActive.svg"
                alt=""
                className="likeImg"
              />
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
                  this.setState({ id: comment.cid, dislike: true });
                  this.props.dislikeComment(comment.cid, () => {
                    this.getComments();
                    this.setState({ id: null, dislike: false });
                  });
                }}
                src="/static/img/interactive/likeGreen.svg"
                alt=""
                className="likeImg"
              />
            </div>
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
