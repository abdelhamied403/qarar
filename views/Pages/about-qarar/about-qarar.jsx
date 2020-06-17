import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import renderHTML from 'react-render-html';
import './about-qarar.css';
import Api from '../../../api';

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
              <h3>{aboutData.data ? aboutData.data.title : ''}</h3>
            </div>
          </Container>
        </div>

        <section className="about-qarar-sec">
          <Container>
            <Row>
              <Col xs="12">
                {aboutData.data ? renderHTML(aboutData.data.body) : ''}
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default AboutQarar;
