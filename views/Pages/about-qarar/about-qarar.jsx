import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';

import './about-qarar.css';

class AboutQarar extends Component {
  render() {
    return (
      <>
        <div className="about-qarar">
          <Container>
            <div className="about-qarar-header text-center">
              <h3>عن قرار</h3>
              <p className="sub-header">ما هي المنصة و لماذا تم بناؤها </p>
            </div>
          </Container>

          <section className="about-qarar-sec">
            <Container>
              <Row>
                <Col xs="12" md="5">
                  <h5>
                    قرار هي منصة تهدف لزيادة المشاركة المجتمعية للشعب السعودي
                    تحقيقا لرؤية 2030
                  </h5>

                  <h5>
                    ونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم
                    فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي يت
                    أليكيوب.
                  </h5>
                </Col>
                <Col xs="12" md="1" />
                <Col xs="12" md="5">
                  <p className="sub-header">
                    تقام هذه الجائزة السنوية منذ خمسة أعوام، بحيث أصبحت جزءاً
                    رئيسياً من هويتنا. ونسعى من خلالها للاحتفال بروّاد الأعمال
                    المميزين، والاستماع إلى قصص نجاحهم، ومساعدتهم على التعريف عن
                    شركاتهم لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
                    يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري
                    ات دولار ماجنا أليكيوا .
                  </p>
                  <br />
                  <br />
                  <p className="sub-header">
                    يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو
                    لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس
                    أيوتييللأمكو .
                  </p>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </>
    );
  }
}

export default AboutQarar;
