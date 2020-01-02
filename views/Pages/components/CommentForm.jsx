import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import TextBox from './text-box/text-box';
import NoAccess from './NoAccess';
import Api from '../../../api';

class CommentForm extends Component {
  constructor() {
    super();
    this.state = {
      successComment: false,
      comment: ''
    };
  }

  saveComment = async () => {
    const { nid, accessToken } = this.props;
    const { comment } = this.state;
    if (!comment) {
      this.setState({ error: true });
      return;
    }
    const data = {
      entity_id: [{ target_id: nid }],
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
    const { uid, small } = this.props;
    const { comment: commentText, successComment, error } = this.state;
    return (
      <>
        {successComment && (
          <Alert color="success">
            تم إضافة التعليق في إنتظار موافقة إدارة الموقع
          </Alert>
        )}
        {error && <Alert color="danger">لم تقم بكتابة اي تعليق</Alert>}
        {!uid ? (
          small ? (
            <Alert color="danger">يجب عليك تسجيل الدخول لإضافة تعليق</Alert>
          ) : (
            <NoAccess />
          )
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
      </>
    );
  }
}

const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(CommentForm);
