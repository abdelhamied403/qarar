/* eslint-disable radix */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Col } from 'reactstrap';
import { translate } from '../../../../utlis/translation';

const Job = props => {
  const {
    allLegalCapacity,
    allCity,
    allInvestmentField,
    selectLegalCapacity,
    selectCity,
    selectInvestmentField
  } = props;

  const [selectedLegalCapacity, setSelectedLegalCapacity] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedInvestmentField, setSelectedInvestmentField] = useState();

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
          {allLegalCapacity && (
            <select
              className="not-select2 form-control"
              value={selectedLegalCapacity}
              onChange={e => {
                selectLegalCapacity(e.target.value);
                setSelectedLegalCapacity(e.target.value);
              }}
            >
              <option value="-1">
                {translate('draftDetails.shareIdeasModal.choose')}{' '}
                {translate('draftDetails.shareIdeasModal.legalCapacity')}
              </option>
              {allLegalCapacity.map(option => (
                <option value={option.id}>{option.name}</option>
              ))}
            </select>
          )}

          {allCity && (
            <select
              className="not-select2 form-control"
              value={selectedCity}
              onChange={e => {
                selectCity(e.target.value);
                setSelectedCity(e.target.value);
              }}
            >
              <option value="-1">
                {translate('draftDetails.shareIdeasModal.choose')}{' '}
                {translate('draftDetails.shareIdeasModal.city')}
              </option>
              {allCity.map(option => (
                <option value={option.id}>{option.name}</option>
              ))}
            </select>
          )}
          {allInvestmentField && parseInt(selectedLegalCapacity) === 48 && (
            <select
              className="not-select2 form-control"
              value={selectedInvestmentField}
              onChange={e => {
                selectInvestmentField(e.target.value);
                setSelectedInvestmentField(e.target.value);
              }}
            >
              <option value="-1">
                {translate('draftDetails.shareIdeasModal.choose')}{' '}
                {translate('draftDetails.shareIdeasModal.investmentField')}
              </option>
              // eslint-disable-next-line react/prop-types
              eslint-disable-next-line react/prop-types eslint-disable-next-line
              react/prop-types // eslint-disable-next-line react/prop-types //
              eslint-disable-next-line react/prop-types eslint-disable-next-line
              react/prop-types
              {allInvestmentField.map(option => (
                <option value={option.id}>{option.name}</option>
              ))}
            </select>
          )}
        </Col>
      </div>
    </div>
  );
};

export default Job;
