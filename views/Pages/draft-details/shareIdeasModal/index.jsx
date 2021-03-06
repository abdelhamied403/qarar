/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Alert,
  Spinner,
  Row,
  Col
} from 'reactstrap';
import Link from 'next/link';

import dynamic from 'next/dynamic';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw } from 'draft-js';

import Api from '../../../../api';

import './style.css';
import { translate } from '../../../../utlis/translation';

const ModalState = {
  RATE: 0,
  ASK_TO_ADD_COMMENT: 1,
  FILL_FORM: 2,
  CHOSE_COMMENT: 3,
  COMMENT: 4,
  END: 5
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
    getComments,
    getLegalCapacity,
    getCity,
    getInvestmentField,
    forced_adj_city_investemtn
  } = props;
  const [state, setState] = useState(ModalState.RATE);
  const [stars, setStars] = useState(0);
  const [starHoverIndex, setStarHoverIndex] = useState(0);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [commentSubject, setCommentSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLegalCapacity, setSelectedLegalCapacity] = useState(-1);
  const [selectedCity, setSelectedCity] = useState(-1);
  const [selectedInvestmentField, setSelectedInvestmentField] = useState(-1);
  const [legalCapacityList, setLegalCapacityList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [investmentFieldList, setInvestmentFieldList] = useState([]);
  const [msg, setMsg] = useState({
    error: false,
    txt: '',
    show: false
  });

  const [commentType, setCommentType] = useState(1);
  const [modState, setModState] = useState(0);

  const updateLists = async () => {
    const list = await getLegalCapacity();
    const list2 = await getCity();
    const list3 = await getInvestmentField();
    setLegalCapacityList(list);
    setCityList(list2);
    setInvestmentFieldList(list3);
  };

  useEffect(() => {
    updateLists();
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
        txt: '???? ??????????????'
      });
      getDraft();
      setState(ModalState.SUGGEST);
    } else {
      setMsg({
        error: true,
        show: true,
        txt: '?????? ?????? ????'
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

    if (
      !editorState.getCurrentContent().hasText() &&
      state === ModalState.COMMENT &&
      stars !== 0
    ) {
      setMsg({
        error: true,
        txt: '???? ?????? ???????????? ???? ?????????? ???? ??????????',
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
      subject: [{ value: commentSubject }],
      comment_body: [
        { value: draftToHtml(convertToRaw(editorState.getCurrentContent())) }
      ],
      field_legal_capacity: selectedLegalCapacity,
      field_city: selectedCity,
      field_investment_field: selectedInvestmentField,
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

    setStars(0);
    if (response.ok) {
      setEditorState(EditorState.createEmpty());
      setMsg({
        error: false,
        show: true,
        txt: '???? ?????????????? ??????????'
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
        txt: '???? ???????? ???????? ?????? ????????'
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
        style={{
          display: 'flex',
          alignItems: 'center',
          flexFlow: 'column',
          padding: '0 30px 0 30px'
        }}
      >
        <h4>{translate('draftDetails.shareIdeasModal.stepOne')}</h4>
        <div
          className="action-items-modal"
          onMouseLeave={e => setStarHoverIndex(stars)}
        >
          <div
            style={{ width: '10px' }}
            onMouseOver={e => setStarHoverIndex(0)}
          ></div>
          {new Array(5).fill(0).map((_, i) => (
            <div className="star">
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
                  setState(ModalState.ASK_TO_ADD_COMMENT);
                  modState <= 1 && setModState(1);
                }}
              />
              <span>
                {translate('draftDetails.shareIdeasModal.stepOneOptionnew' + i)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AskToAddComment = props => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexFlow: 'column',
          padding: '0 30px 0 30px'
        }}
      >
        <h4>{translate('draftDetails.shareIdeasModal.stepTwo')}</h4>
        <div className="action-items-modal">
          <div>
            <Button
              className="button-ask-to-add-comment-yes"
              onClick={() =>
                setState(
                  forced_adj_city_investemtn
                    ? ModalState.FILL_FORM
                    : ModalState.COMMENT
                )
              }
            >
              {translate('draftDetails.shareIdeasModal.stepTwoOption1')}
            </Button>
          </div>
          <div>
            <Button
              className="button-ask-to-add-comment-no"
              onClick={() => {
                saveComment();
                close();
              }}
            >
              {translate('draftDetails.shareIdeasModal.stepTwoOption2')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const ChoseComment = props => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexFlow: 'column',
          padding: '0 30px 0 30px'
        }}
      >
        <h4>{translate('draftDetails.shareIdeasModal.stepThree')}</h4>
        <div className="action-items-modal">
          <div>
            <Button
              color={commentType === 1 && 'primary'}
              onClick={() => {
                setCommentType(1);
                modState <= 3 && setModState(3);
              }}
            >
              {translate('draftDetails.shareIdeasModal.stepThreeOption1')}
            </Button>
          </div>
          <div>
            <Button
              color={commentType === 2 && 'primary'}
              onClick={() => {
                setCommentType(2);
                modState <= 3 && setModState(3);
              }}
            >
              {translate('draftDetails.shareIdeasModal.stepThreeOption2')}
            </Button>
          </div>
          <div>
            <Button
              color={commentType === 3 && 'primary'}
              onClick={() => {
                setCommentType(3);
                modState <= 3 && setModState(3);
              }}
            >
              {translate('draftDetails.shareIdeasModal.stepThreeOption3')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const FillForm = props => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexFlow: 'column'
        }}
      >
        <div className="action-items-modal" style={{ width: '100%' }}>
          <Col className="comment-form">
            <select
              className="not-select2 form-control"
              value={selectedLegalCapacity}
              onChange={e =>
                setSelectedLegalCapacity(parseInt(e.target.value, 10))
              }
            >
              <option value="-1">
                {translate('draftDetails.shareIdeasModal.choose')}{' '}
                {translate('draftDetails.shareIdeasModal.legalCapacity')}
              </option>
              {legalCapacityList &&
                legalCapacityList.map(option => (
                  <option value={option.id}>{option.name}</option>
                ))}
            </select>

            <select
              className="not-select2 form-control"
              value={selectedCity}
              onChange={e => {
                setSelectedCity(parseInt(e.target.value, 10));
                modState <= 2 && setModState(2);
              }}
            >
              <option value="-1">
                {translate('draftDetails.shareIdeasModal.choose')}{' '}
                {translate('draftDetails.shareIdeasModal.city')}
              </option>
              {cityList &&
                cityList.map(option => (
                  <option value={option.id}>{option.name}</option>
                ))}
            </select>

            {selectedLegalCapacity === 65 && (
              <select
                className="not-select2 form-control"
                value={selectedInvestmentField}
                onChange={e => {
                  setSelectedInvestmentField(parseInt(e.target.value, 10));
                  setModState(2);
                }}
              >
                <option value="-1">
                  {translate('draftDetails.shareIdeasModal.choose')}{' '}
                  {translate('draftDetails.shareIdeasModal.investmentField')}
                </option>
                {investmentFieldList &&
                  investmentFieldList.map(option => (
                    <option value={option.id}>{option.name}</option>
                  ))}
              </select>
            )}
            {/* <Button
              className="button-comment"
              disabled={
                selectedLegalCapacity === -1 ||
                selectedCity === -1 ||
                (selectedInvestmentField === -1 && selectedLegalCapacity === 65)
              }
              onClick={() => setState(ModalState.CHOSE_COMMENT)}
            >
              {translate('draftDetails.shareIdeasModal.nextStep')}
              <img
                dir={translate('dir')}
                src="/static/img/interactive/whiteArrow.svg"
                alt=""
              />
            </Button> */}
          </Col>
        </div>
      </div>
    );
  };

  const AddComment = props => {
    return (
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <Editor
          placeholder={translate(
            'draftDetails.shareIdeasModal.stepFourPlaceholder'
          )}
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
        <Button
          className="button-comment w-min mr-0 ml-auto flex flex-end"
          onClick={() => saveComment()}
        >
          {translate('draftDetails.shareIdeasModal.stepFourComment')}
          <img
            dir={translate('dir')}
            src="/static/img/interactive/greenArrow.svg"
            alt=""
          />
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
        <h4>???? ???????? ???? ??????????????</h4>
        <div className="action-items">
          <div className="done" onClick={() => like()}>
            <img src="/static/img/Icon - dropdown - arrow down.svg" alt="" />
            <span>????????????</span>
          </div>
          <div className="error" onClick={() => disLike()}>
            <img
              src="/static/img/Icon - dropdown - arrow down danger.svg"
              alt=""
            />
            <span>????????</span>
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
        <h4>?????? ???????? ???????????? ??????????</h4>
        <div className="action-items">
          <div className="done" onClick={() => nextStep()}>
            <span>??????</span>
          </div>
          <div className="error" onClick={close}>
            <span>????</span>
          </div>
        </div>
      </div>
    );
  };
  const Comment = props => {
    return (
      <>
        <h4>?????? ????????????</h4>
        <Editor
          placeholder="?????? ???????????? ??????"
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
          ?????? ????????????
          <img
            dir={translate('dir')}
            src="/static/img/interactive/whiteArrow.svg"
            alt=""
          />
        </Button>
      </>
    );
  };
  const Steps = () => {
    if (!uid) {
      return (
        <>
          <Alert color="danger">?????? ?????????? ???????????? ????????</Alert>

          <div className="draftShouldLogin d-flex flex-column">
            <img src="/static/img/interactive/disabled.svg" alt="" />
            <h4>?????? ?????????? ???????????? ???????????? ??????????</h4>
            <Link href="/login">
              <Button>
                ?????????? ????????????
                <img
                  dir={translate('dir')}
                  src="/static/img/interactive/btnArrow3.svg"
                  alt=""
                />
              </Button>
            </Link>
            <Link href="/register">
              <a>?????????? ????????</a>
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
    <Modal
      isOpen={open}
      backdrop
      toggle={() => {
        setStarHoverIndex(0);
        close();
      }}
    >
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
        {modState >= 0 && <Rate />}
        {modState >= 1 && <FillForm />}
        {modState >= 2 && <ChoseComment />}
        {modState >= 3 && <AddComment />}
      </ModalBody>
    </Modal>
  );
};

export default ShareIdeasModal;
