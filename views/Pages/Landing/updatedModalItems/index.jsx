import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { translate } from '../../../../utlis/translation';
import moment from 'moment';
import './style.css';
import Link from 'next/link';

const UpdatedItemsModal = props => {
  const { title, toggle, items, setToggle } = props;

  return (
    <div>
      <Modal
        style={{
          width: '80vw'
        }}
        isOpen={toggle}
        toggle={setToggle}
        className="test"
      >
        <div className={'modal-header'}>
          <h4>{title}</h4>
          <div>
            <img
              dir={translate('dir')}
              src="/static/img/interactive/calendar-1.svg"
              alt=""
            />
            <span>
              {items && items.length} {translate('landingPage.update')}
            </span>
          </div>
        </div>
        <ModalBody className="item-body-modal">
          {items && items.map(item => {
            return (
              <div className="item-update">
                <div>
                  <h5>{item.title}</h5>
                  <p className="oneActivityRow">
                    <img
                      dir={translate('dir')}
                      src="/static/img/interactive/calendar-2.svg"
                      alt=""
                    />
                    <span>
                      {translate('landingPage.votingStart')}{' '}
                      {item.publishDate}
                    </span>
                  </p>
                </div>
                <div>
                  <Link href={`/draft-details/${item.id}`}>
                    <Button outline color="primary" size="md">
                      {translate('landingPage.showDraft')}
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdatedItemsModal;
