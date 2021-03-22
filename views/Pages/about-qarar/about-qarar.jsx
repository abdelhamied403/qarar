import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import renderHTML from 'react-render-html';
import './about-qarar.css';
import Api from '../../../api';
import { translate } from '../../../utlis/translation';

const AboutQarar = () => {
  const [aboutData, setAboutData] = useState({});
  const getAbout = async () => {
    const response = await Api.get('/qarar_api/load/node/904?_format=json');
    if (response.ok) {
      setAboutData(response.data);
    }
  };
  useEffect(() => {
    getAbout();
  }, []);

  return (
    <>
      <div className="about-qarar">
        <div className="draftHeader">
          <Container>
            <div>
              <h3>{aboutData.data ? aboutData.data.title : translate('aboutQararPage.title')}</h3>
            </div>
          </Container>
        </div>

        <section className="about-qarar-sec">
          <Container>
            <Row>
              <Col xs="12" md="3" className="about-mockup">
                <img
                  src="../static/img/about-mockup.svg"
                  alt=""
                  className="mockup-image"
                />
              </Col>
              <Col xs="12" md="9" className="about-mockup-text">
                {/* {aboutData.data ? renderHTML(aboutData.data.body) : ''}  */}
                <h2>{translate('aboutQararPage.title')}</h2>
                <p className="text-start">
                  {translate('aboutQararPage.description')}
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="about-qarar-sec paltform-importance" dir={translate('dir')}>
          <Container>
            <Row>
              <Col xs="12" className="text-start">
                <h2>{translate('aboutQararPage.importance')}</h2>
                <p>{translate('aboutQararPage.importanceDescriptionOne')}</p>
                <p>{translate('aboutQararPage.importanceDescriptionTwo')}</p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="about-qarar-sec text-start">
          <Container>
            <Row>
              <Col xs="12">
                <h2>{translate('aboutQararPage.qararServices')}</h2>
                <p>{translate('aboutQararPage.beneficiaries')}</p>
              </Col>
            </Row>
            <Row className="qarar-services">
              <Col xs="12" md="3" className="item">
                <img src="../static/img/register.svg" alt="" />
                <h4>{translate('aboutQararPage.register')}</h4>
                <p>{translate('aboutQararPage.registerDescription')}</p>
              </Col>
              <Col xs="12" md="3" className="item">
                <img src="../static/img/people.svg" alt="" />
                <h4>{translate('aboutQararPage.interaction')}</h4>
                <p>{translate('aboutQararPage.interactionDescription')}</p>
              </Col>
              <Col xs="12" md="3" className="item">
                <img src="../static/img/filter.svg" alt="" />
                <h4>{translate('aboutQararPage.filtration')}</h4>
                <p>{translate('aboutQararPage.filtrationDescription')}</p>
              </Col>
              <Col xs="12" md="3" className="item">
                <img src="../static/img/chart.svg" alt="" />
                <h4>{translate('aboutQararPage.stimulus')}</h4>
                <p>{translate('aboutQararPage.stimulusDescription')}</p>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default AboutQarar;
