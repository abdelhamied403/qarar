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
import { translate } from '../../../../utlis/translation';

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
  const [stars, setStars] = useState(0);
  const [starHoverIndex, setStarHoverIndex] = useState(0);
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

  const saveComment = async stars => {
    setLoading(true);
    const draftId = id;

    if (!editorState.getCurrentContent().hasText() || stars === 0) {
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
      field_draft_opinion: stars
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
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <h4>{translate('draftDetails.opinion')}</h4>
        <div
          className="action-items-modal-draft"
          onMouseLeave={e => setStarHoverIndex(stars)}
        >
          <div
            style={{ width: '10px', height: '70px', position: 'absolute' }}
            onMouseOver={e => setStarHoverIndex(0)}
          ></div>

          {new Array(5).fill(0).map((_, i) => (
            <div className="star-draft">
              <img
                src={
                  starHoverIndex > i
                    ? '/static/img/Assets/star (-3.svg'
                    : '/static/img/Assets/star.svg'
                }
                alt=""
                onMouseOver={e => setStarHoverIndex(i + 1)}
                onClick={() => {
                  setStars(i + 1);
                }}
              />
              <span dir={translate('dir')}>
                {translate(
                  `draftDetails.shareIdeasModal.stepOneOption${i + 1}`
                )}
              </span>
            </div>
          ))}
        </div>
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
        <h4> {translate('draftDetails.addNewComment')}</h4>
        <div className="action-itemsb">
          <div className="done" onClick={() => nextStep()}>
            <span> {translate('draftDetails.yes')}</span>
          </div>
          <div className="error" onClick={close}>
            <span> {translate('draftDetails.no')}</span>
          </div>
        </div>
      </div>
    );
  };
  const Comment = props => {
    return (
      <div style={{ padding: '30px 0' }}>
        <h4>{translate('draftDetails.addComment')}</h4>
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
        <Button className="button-comment" onClick={() => saveComment(stars)}>
          {translate('draftDetails.addCommentButton')}
          <img
            dir={translate('dir')}
            src="/static/img/interactive/whiteArrow.svg"
            alt=""
          />
        </Button>
      </div>
    );
  };
  const Steps = () => {
    // if (!uid) {
    //   return (
    //     <>
    //       <Alert color="danger">{translate('draftDetails.loginFirst')}</Alert>

    //       <div className="draftShouldLogin d-flex flex-column">
    //         <img src="/static/img/interactive/disabled.svg" alt="" />
    //         <h4>{translate('draftDetails.loginComment')}</h4>
    //         <Link href="/login">
    //           <Button>
    //             {translate('draftDetails.login')}
    //             <img
    //               dir={translate('dir')}
    //               src="/static/img/interactive/btnArrow3.svg"
    //               alt=""
    //             />
    //           </Button>
    //         </Link>
    //         <Link href="/register">
    //           <a>{translate('draftDetails.createAccount')}</a>
    //         </Link>
    //       </div>
    //     </>
    //   );
    // }
    return (
      <div className="container">
        {<Rate />}
        {<Comment />}
      </div>
    );
  };
  return (
    <>
      {msg.show && (
        <Alert color={msg.error ? 'danger' : 'success'}>{msg.txt}</Alert>
      )}
      {!canVote ? (
        <Alert color="danger">{translate('draftDetails.votingStopped')}</Alert>
      ) : (
        <Steps />
      )}
    </>
  );
};

export default PartcipantSteps;
