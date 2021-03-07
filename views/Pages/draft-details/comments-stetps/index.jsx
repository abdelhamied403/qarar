/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Alert,
  Spinner
} from 'reactstrap';
import Link from 'next/link';

import dynamic from 'next/dynamic';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';

import Api from '../../../../api';

import './style.css';

const ModalState = {
  LIKES: 0,
  SUGGEST: 1,
  COMMENT: 2
};
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);
const PartcipantSteps = props => {
  const {
    open,
    close,
    id,
    uid,
    canVote,
    accessToken,
    getDraft,
    getComments
  } = props;
  const title = props.title || 'المادة';
  const [state, setState] = useState(ModalState.LIKES);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({
    error: false,
    txt: '',
    show: false
  });
  useEffect(() => {
    setState(ModalState.LIKES);
  }, [open]);

  const vote = async (type, id) => {
    setLoading(true);
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
      setMsg({
        error: false,
        show: true,
        txt: 'تم التعليق'
      });
      getDraft();
      setState(ModalState.SUGGEST);
    } else {
      setMsg({
        error: true,
        show: true,
        txt: 'حدث خطا ما'
      });
    }
    setTimeout(() => {
      setMsg({
        error: false,
        show: false,
        txt: ''
      });
    }, 2000);
    setLoading(false);
  };

  const saveComment = async () => {
    setLoading(true);
    const draftId = id;

    if (!editorState.getCurrentContent().hasText()) {
      setMsg({
        error: true,
        txt: 'لم تقم بكتابة أي تعليق',
        show: true
      });
      setTimeout(() => {
        setMsg({
          error: false,
          txt: '',
          show: false
        });
      }, 3000);
      setLoading(false);
      return;
    }
    const data = {
      entity_id: [{ target_id: draftId }],
      subject: [{ value: 'comment' }],
      comment_body: [
        { value: draftToHtml(convertToRaw(editorState.getCurrentContent())) }
      ],
      pid: [{ target_id: '0' }]
      // comment_type: commentType
    };
    const response = await Api.post(
      `/qarar_api/post-comment?_format=json`,
      data,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (response.ok) {
      setEditorState(EditorState.createEmpty());
      setMsg({
        error: false,
        show: true,
        txt: 'تم التعليق بنجاح'
      });
      getDraft();
      getComments();
      setTimeout(() => {
        setMsg({
          error: false,
          txt: '',
          show: false
        });
      }, 3000);
      setState(ModalState.LIKES);
      close();
    } else {
      setMsg({
        error: true,
        show: true,
        txt: 'من فضلك حاول مرة أخري'
      });
      setTimeout(() => {
        setMsg({
          error: false,
          txt: '',
          show: false
        });
      }, 3000);
    }
    setLoading(false);
  };

  const Likes = props => {
    const like = async () => {
      await vote('like', id);
    };
    const disLike = async () => {
      await vote('dislike', id);
    };
    return (
      <div style={{ padding: '30px 0', borderBottom: '2px solid #046f6d61' }}>
        <h4>ما رايك في {title}؟</h4>
        <div className="action-itemsb">
          <div className="done" onClick={() => like()}>
            <img src="/static/img/Icon - dropdown - arrow down.svg" alt="" />
            <span>ايجابي</span>
          </div>
          <div className="error" onClick={() => disLike()}>
            <img
              src="/static/img/Icon - dropdown - arrow down danger.svg"
              alt=""
            />
            <span>سلبي</span>
          </div>
        </div>
      </div>
    );
  };

  const Suggest = props => {
    const nextStep = () => {
      setState(ModalState.COMMENT);
    };
    return (
      <div>
        <h4>هلي ترغب باضافة تعليق</h4>
        <div className="action-itemsb">
          <div className="done" onClick={() => nextStep()}>
            <span>نعم</span>
          </div>
          <div className="error" onClick={close}>
            <span>لا</span>
          </div>
        </div>
      </div>
    );
  };
  const Comment = props => {
    return (
      <div style={{ padding: '30px 0' }}>
        ><h4>اضف تعليقك</h4>
        <Editor
          placeholder="اضف تعليقك هنا"
          toolbar={{
            options: ['inline', 'image'], // This is where you can specify what options you need in
            // the toolbar and appears in the same order as specified
            inline: {
              options: ['bold', 'underline'] // this can be specified as well, toolbar wont have
              // strikethrough, 'monospace', 'superscript', 'subscript'
            },
            image: {
              alignmentEnabled: false,
              uploadCallback: () => {},
              alt: { present: true, mandatory: false },
              previewImage: true
            }
          }}
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={setEditorState}
        />
        <Button className="button-comment" onClick={() => saveComment()}>
          اضف تعليقك
          <img src="/static/img/interactive/whiteArrow.svg" alt="" />
        </Button>
      </div>
    );
  };
  const Steps = () => {
    if (!uid) {
      return (
        <>
          <Alert color="danger">يجب تسجيل الدخول اولا</Alert>

          <div className="draftShouldLogin d-flex flex-column">
            <img src="/static/img/interactive/disabled.svg" alt="" />
            <h4>يجب تسجيل الدخول لأضافة تعليق</h4>
            <Link href="/login">
              <Button>
                تسجيل الدخول
                <img src="/static/img/interactive/btnArrow3.svg" alt="" />
              </Button>
            </Link>
            <Link href="/register">
              <a>تسجيل حساب</a>
            </Link>
          </div>
        </>
      );
    }
    return (
      <div className="container">
        {<Likes />}
        {<Comment />}
      </div>
    );
  };
  return (
    <>
      {msg.show && (
        <Alert color={msg.error ? 'danger' : 'success'}>{msg.txt}</Alert>
      )}
      {canVote ? <Alert color="danger">تم ايقاف التصويت</Alert> : <Steps />}
    </>
  );
};

export default PartcipantSteps;
