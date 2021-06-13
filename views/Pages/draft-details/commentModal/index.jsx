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
        <Input onChange={e => setInputValue(e.target.value)}></Input>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => {
            saveComment(cid, inputValue);
          }}
        >
          اضف تعليق
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CommentModal;
