import React, { useEffect, useState } from 'react';
import { Col, Row, Button, Alert } from 'reactstrap';
import Api from '../../../../api';
import { translate } from '../../../../utlis/translation';

const getLegalCapacity = async () => {
  const itemResponse = await Api.get(
    `/qarar_api/load/vocabulary/legal_capacity?_format=json`
  );
  if (itemResponse.ok) {
    return itemResponse.data;
  }
};

const getCity = async () => {
  const itemResponse = await Api.get(
    `/qarar_api/load/vocabulary/city?_format=json`
  );
  if (itemResponse.ok) {
    return itemResponse.data;
  }
};

const getInvestmentField = async () => {
  const itemResponse = await Api.get(
    `/qarar_api/load/vocabulary/investment_field?_format=json`
  );
  if (itemResponse.ok) {
    return itemResponse.data;
  }
};

const Job = props => {
  const { selectLegalCapacity, selectCity, selectInvestmentField, id } = props;

  let jobDrafts = JSON.parse(localStorage.getItem('jobDrafts')) || {};

  const [selectedLegalCapacity, setSelectedLegalCapacity] = useState(
    jobDrafts[id]?.selectedLegalCapacity
  );
  const [selectedCity, setSelectedCity] = useState(jobDrafts[id]?.selectedCity);
  const [selectedInvestmentField, setSelectedInvestmentField] = useState(
    jobDrafts[id]?.selectedInvestmentField
  );

  const [allLegalCapacity, setAllLegalCapacity] = useState([]);
  const [allCity, setAllCity] = useState([]);
  const [allInvestmentField, setAllInvestmentField] = useState([]);

  const [errMsg, setErrMsg] = useState(null);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    selectLegalCapacity(selectedLegalCapacity);
    selectCity(selectedCity);
    selectInvestmentField(selectedInvestmentField);
  }, [selectedLegalCapacity, selectedCity, selectedInvestmentField]);

  useEffect(async () => {
    let alc = await getLegalCapacity();
    let ac = await getCity();
    let aif = await getInvestmentField();

    setAllLegalCapacity(alc);
    setAllCity(ac);
    setAllInvestmentField(aif);
  }, []);

  const onSave = () => {
    let Obj = {
      ...jobDrafts,
      [id]: {
        selectedLegalCapacity,
        selectedCity,
        selectedInvestmentField
      }
    };

    if ((selectedLegalCapacity && selectedCity) || selectedInvestmentField) {
      if (selectedLegalCapacity === '48' && !selectedInvestmentField) {
        setErrMsg(translate('draftDetails.errors.emptyInvestmentField'));
        setTimeout(() => {
          setErrMsg(null);
        }, 3000);
      } else {
        localStorage.setItem('jobDrafts', JSON.stringify(Obj));
        setDisable(true);
      }
    } else {
      setErrMsg(translate('draftDetails.errors.emptyFields'));
      setTimeout(() => {
        setErrMsg(null);
      }, 3000);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexFlow: 'column'
      }}
    >
      {errMsg && <Alert color="danger">{errMsg}</Alert>}
      <div style={{ width: '100%' }}>
        <div className="comment-form">
          <Row>
            <Col md="6">
              {allLegalCapacity && (
                <select
                  className="not-select2 form-control"
                  value={selectedLegalCapacity}
                  onChange={e => {
                    selectLegalCapacity(e.target.value);
                    setSelectedLegalCapacity(e.target.value);
                  }}
                  disabled={Object.keys(jobDrafts).includes(id) || disable}
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
            </Col>
            <Col md="6">
              {allCity && (
                <select
                  className="not-select2 form-control"
                  value={selectedCity}
                  onChange={e => {
                    selectCity(e.target.value);
                    setSelectedCity(e.target.value);
                  }}
                  disabled={Object.keys(jobDrafts).includes(id) || disable}
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
            </Col>
          </Row>
          <Row>
            <Col md="6">
              {allInvestmentField && parseInt(selectedLegalCapacity) === 48 && (
                <select
                  className="not-select2 form-control"
                  value={selectedInvestmentField}
                  onChange={e => {
                    selectInvestmentField(e.target.value);
                    setSelectedInvestmentField(e.target.value);
                  }}
                  disabled={Object.keys(jobDrafts).includes(id) || disable}
                >
                  <option value="-1">
                    {translate('draftDetails.shareIdeasModal.choose')}{' '}
                    {translate('draftDetails.shareIdeasModal.investmentField')}
                  </option>
                  {allInvestmentField.map(option => (
                    <option value={option.id}>{option.name}</option>
                  ))}
                </select>
              )}
            </Col>
            {!Object.keys(jobDrafts).includes(id) && !disable && (
              <Col md="6">
                <div className="flex h-full">
                  <div className="to-left-center">
                    <Button color="primary" onClick={onSave}>
                      {translate('draftDetails.save')}
                    </Button>
                  </div>
                </div>
              </Col>
            )}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Job;
