import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import Api from '../../../../api';
import { translate } from '../../../../utlis/translation';

const getLegalCapacity = async () => {
  const itemResponse = await Api.get(
    `/qarar_api/load/vocabulary/legal_capacity?_format=json`,
    {}
  );
  if (itemResponse.ok) {
    return itemResponse.data;
  }
};

const getCity = async () => {
  const itemResponse = await Api.get(
    `/qarar_api/load/vocabulary/city?_format=json`,
    {}
  );
  if (itemResponse.ok) {
    return itemResponse.data;
  }
};

const getInvestmentField = async () => {
  const itemResponse = await Api.get(
    `/qarar_api/load/vocabulary/investment_field?_format=json`,
    {}
  );
  if (itemResponse.ok) {
    return itemResponse.data;
  }
};

const Job = props => {
  // selected
  const [selectedLegalCapacity, setSelectedLegalCapacity] = useState(-1);
  const [selectedCity, setSelectedCity] = useState(-1);
  const [selectedInvestmentField, setSelectedInvestmentField] = useState(-1);

  // lists
  const [legalCapacityList, setLegalCapacityList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [investmentFieldList, setInvestmentFieldList] = useState([]);

  useEffect(
    () => async () => {
      const list = await getLegalCapacity();
      const list2 = await getCity();
      const list3 = await getInvestmentField();
      setLegalCapacityList(list);
      setCityList(list2);
      setInvestmentFieldList(list3);
    },
    []
  );

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
            onChange={e => {
              props.setLegalCapacity(parseInt(e.target.value, 10));
              setSelectedLegalCapacity(parseInt(e.target.value, 10));
            }}
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
              props.setCity(parseInt(e.target.value, 10));
              setSelectedCity(parseInt(e.target.value, 10));
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
                props.setInvestmentField(parseInt(e.target.value, 10));
                setSelectedInvestmentField(parseInt(e.target.value, 10));
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
        </Col>
      </div>
    </div>
  );
};

export default Job;
