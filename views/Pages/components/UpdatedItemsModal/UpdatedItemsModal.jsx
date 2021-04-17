import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { translate } from '../../../../utlis/translation';
import moment from 'moment';

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
              {items.length} {translate('landingPage.update')}
            </span>
          </div>
        </div>
        <ModalBody className="item-body-modal">
          {items.map(item => {
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
                      {moment(item.updatedAt * 1000).format(
                        'dddd, D MMMM YYYY'
                      )}
                    </span>
                  </p>
                </div>
                <div>
                  <Button outline color="primary" size="md">
                    {translate('landingPage.showDraft')}
                  </Button>
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
