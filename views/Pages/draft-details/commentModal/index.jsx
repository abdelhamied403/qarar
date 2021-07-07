import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from 'reactstrap';

const CommentModal = ({ modal, toggle, cid, saveComment }) => {
  const [inputValue, setInputValue] = useState(null);
  return (
    <Modal
      isOpen={modal}
      backdrop
      toggle={() => {
        toggle();
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
          <span>اضف تعليق</span>
        </div>
      </ModalHeader>
      <ModalBody>
        <div
          className=""
          style={{
            display: 'flex',
            height: '150px',
            width: '50vw'
          }}
        >
          <div
            className="input"
            style={{
              width: '100%'
            }}
          >
            <Input
              onChange={e => setInputValue(e.target.value)}
              style={{
                height: '100%'
              }}
            ></Input>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            saveComment(cid, inputValue);
            toggle();
          }}
        >
          اضف تعليق
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CommentModal;
