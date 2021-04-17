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

import './share-ideas.css';
import { translate } from '../../../../utlis/translation';

const ModalState = {
  RATE: 0,
  ASK_TO_ADD_COMMENT: 1,
  CHOSE_COMMENT: 2,
  COMMENT: 3,
  END: 4
};
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
);
const ShareIdeasModal = props => {
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
  const [state, setState] = useState(ModalState.RATE);
  const [starHoverIndex , setStarHoverIndex] = useState(0);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({
    error: false,
    txt: '',
    show: false
  });
  useEffect(() => {
    setState(ModalState.RATE);
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
    close();
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

  const Rate = props => {
    return (
      <div
        style={{ display: 'flex', alignItems: 'center', flexFlow: 'column', padding: '0 30px 0 30px' }}
      >
        <h4>{translate('draftDetails.shareIdeasModal.stepOne')}</h4>
        <div className="action-items-modal">
          <div style={{width: '10px'}} onMouseOver={e => setStarHoverIndex(0)}></div>
          <div className="star">
            <img src={starHoverIndex > 0 ? "/static/img/Icon - dropdown - arrow down.svg" :
                     "/static/img/Icon - dropdown - arrow down danger.svg"}
                 alt=""
                 onMouseOver={e => setStarHoverIndex(1)}
                 onClick={() => setState(ModalState.ASK_TO_ADD_COMMENT)}
            />
            <span>{translate('draftDetails.shareIdeasModal.stepOneOption1')}</span>
          </div>
          <div className="star">
            <img src={starHoverIndex > 1 ? "/static/img/Icon - dropdown - arrow down.svg" :
              "/static/img/Icon - dropdown - arrow down danger.svg"}
                 alt=""
                 onMouseOver={e => setStarHoverIndex(2)}
                 onClick={() => setState(ModalState.ASK_TO_ADD_COMMENT)}
            />
            <span>{translate('draftDetails.shareIdeasModal.stepOneOption2')}</span>
          </div>
          <div className="star">
            <img src={starHoverIndex > 2 ? "/static/img/Icon - dropdown - arrow down.svg" :
              "/static/img/Icon - dropdown - arrow down danger.svg"}
                 alt=""
                 onMouseOver={e => setStarHoverIndex(3)}
                 onClick={() => setState(ModalState.ASK_TO_ADD_COMMENT)}
            />
            <span>{translate('draftDetails.shareIdeasModal.stepOneOption3')}</span>
          </div>
          <div className="star">
            <img src={starHoverIndex > 3 ? "/static/img/Icon - dropdown - arrow down.svg" :
              "/static/img/Icon - dropdown - arrow down danger.svg"}
                 alt=""
                 onMouseOver={e => setStarHoverIndex(4)}
                 onClick={() => setState(ModalState.ASK_TO_ADD_COMMENT)}
            />
            <span>{translate('draftDetails.shareIdeasModal.stepOneOption4')}</span>
          </div>
          <div className="star">
            <img src={starHoverIndex > 4 ? "/static/img/Icon - dropdown - arrow down.svg" :
              "/static/img/Icon - dropdown - arrow down danger.svg"}
                 alt=""
                 onMouseOver={e => setStarHoverIndex(5)}
                 onClick={() => setState(ModalState.ASK_TO_ADD_COMMENT)}
            />
            <span>{translate('draftDetails.shareIdeasModal.stepOneOption5')}</span>
          </div>
        </div>
      </div>
    );
  }

  const AskToAddComment = props => {
    return (
      <div
        style={{ display: 'flex', alignItems: 'center', flexFlow: 'column', padding: '0 30px 0 30px' }}
      >
        <h4>{translate('draftDetails.shareIdeasModal.stepTwo')}</h4>
        <div className="action-items-modal">
          <div>
            <Button className="button-ask-to-add-comment-yes" onClick={() => setState(ModalState.CHOSE_COMMENT)}>
              {translate('draftDetails.shareIdeasModal.stepTwoOption1')}
            </Button>
          </div>
          <div>
            <Button className="button-ask-to-add-comment-no" onClick={close}>
              {translate('draftDetails.shareIdeasModal.stepTwoOption2')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const ChoseComment = props => {
    return (
      <div
        style={{ display: 'flex', alignItems: 'center', flexFlow: 'column', padding: '0 30px 0 30px' }}
      >
        <h4>{translate('draftDetails.shareIdeasModal.stepThree')}</h4>
        <div className="action-items-modal">
          <div>
            <Button className="button-chose-comment" onClick={() => setState(ModalState.COMMENT)}>
              {translate('draftDetails.shareIdeasModal.stepThreeOption1')}
            </Button>
          </div>
          <div>
            <Button className="button-chose-comment" onClick={() => setState(ModalState.COMMENT)}>
              {translate('draftDetails.shareIdeasModal.stepThreeOption2')}
            </Button>
          </div>
          <div>
            <Button className="button-chose-comment" onClick={() => setState(ModalState.COMMENT)}>
              {translate('draftDetails.shareIdeasModal.stepThreeOption3')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const AddComment = props => {
    return (
      <div
        style={{ display: 'flex', alignItems: 'flex-end', flexFlow: 'column' }}
      >
        <Editor
          placeholder={translate('draftDetails.shareIdeasModal.stepFourPlaceholder')}
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
          editorClassName="editor-class"
          onEditorStateChange={setEditorState}
        />
        <Button className="button-comment" onClick={() => saveComment()}>
          {translate('draftDetails.shareIdeasModal.stepFourComment')}
          <img dir={translate('dir')} src="/static/img/interactive/whiteArrow.svg" alt="" />
        </Button>
      </div>
    );
  };

  const Likes = props => {
    const like = async () => {
      await vote('like', id);
    };
    const disLike = async () => {
      await vote('dislike', id);
    };
    return (
      <div
        style={{ display: 'flex', alignItems: 'center', flexFlow: 'column' }}
      >
        <h4>ما رايك في الماده؟</h4>
        <div className="action-items">
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
  return (
    <Modal isOpen={open} backdrop toggle={() => { setStarHoverIndex(0); close();}}>
      <ModalHeader className="header-modal" style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{translate('draftDetails.shareIdeasModal.title')}</span>
          {loading && <Spinner color="secondary" />}
        </div>
      </ModalHeader>
      <ModalBody>
          {state === ModalState.RATE && <Rate />}
          {state === ModalState.ASK_TO_ADD_COMMENT && <AskToAddComment />}
          {state === ModalState.CHOSE_COMMENT && <ChoseComment />}
          {state === ModalState.COMMENT && <AddComment />}
          {/*{state === ModalState.SUGGEST && <Suggest />}*/}
          {/*{state === ModalState.COMMENT && <Comment />}*/}
        {/*{msg.show && (*/}
        {/*  <Alert color={msg.error ? 'danger' : 'success'}>{msg.txt}</Alert>*/}
        {/*)}*/}
        {/*{canVote ? <Alert color="danger">تم ايقاف التصويت</Alert> : <Steps />}*/}
      </ModalBody>
    </Modal>
  );
};

export default ShareIdeasModal;
