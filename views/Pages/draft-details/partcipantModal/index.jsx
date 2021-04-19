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
import { translate } from '../../../../utlis/translation';

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
const PartcipantModal = props => {
  const {
    open,
    close,
    id,
    uid,
    canVote,
    accessToken,
    getDraft,
    getComments,
    forced_adj_city_investemtn
  } = props;
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
      setLoading(false);
    }, 2000);
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
    const voteStar = async () => {
      setState(ModalState.SUGGEST);
    };
    return (
      <div
        style={{ display: 'flex', alignItems: 'center', flexFlow: 'column' }}
      >
        <h4>ما رايك في الماده؟</h4>
        <div className="stars">
          {
            [1,2,3,4,5].map(
              val => (
                <div className="vote-stars">
                  <img src='/static/img/Assets/star.svg' style={{cursor: 'pointer'}} onClick={() => voteStar(val)} />
                  <span>{translate(`comments.value_${val}`)}</span>
                </div>
              ))
          }
          <div></div>
          {/* <div className="done" onClick={() => like()}>
            <img src="/static/img/Icon - dropdown - arrow down.svg" alt="" />
            <span>ايجابي</span>
          </div>
          <div className="error" onClick={() => disLike()}>
            <img
              src="/static/img/Icon - dropdown - arrow down danger.svg"
              alt=""
            />
            <span>سلبي</span>
          </div> */}
        </div>
      </div>
    );
  };

  const Suggest = props => {
    const nextStep = () => {
      setState(ModalState.COMMENT);
    };
    return (
      <div
        style={{ display: 'flex', alignItems: 'center', flexFlow: 'column' }}
      >
        <h4>هلي ترغب باضافة تعليق</h4>
        <div className="action-items">
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
      <>
        <h4>اضف تعليقك</h4>
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
          <img dir={translate('dir')} src="/static/img/interactive/whiteArrow.svg" alt="" />
        </Button>
      </>
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
                <img dir={translate('dir')} src="/static/img/interactive/btnArrow3.svg" alt="" />
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
      <>
        {state === ModalState.LIKES && <Likes />}
        {state === ModalState.SUGGEST && <Suggest />}
        {state === ModalState.COMMENT && <Comment />}
      </>
    );
  };
  <Modal isOpen={open} backdrop toggle={close}>
      return (
      <ModalHeader className="header primary-h" style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>شارك الان</span>
          {loading && <Spinner color="secondary" />}
        </div>
      </ModalHeader>
      <ModalBody>
        {msg.show && (
          <Alert color={msg.error ? 'danger' : 'success'}>{msg.txt}</Alert>
        )}
        {canVote ? <Alert color="danger">تم ايقاف التصويت</Alert> : <Steps />}
      </ModalBody>
    </Modal>
 
};

export default PartcipantModal;
