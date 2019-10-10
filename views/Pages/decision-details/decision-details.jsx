import React, { Component } from 'react';
import { Container, Col, Row, Media } from 'reactstrap';

import CardDraftDetails from '../components/card-draft-details/card-draft-details';
import Breadcrumb from '../components/breadcrumb/breadcrumb';
import CardInfo from '../components/card-info/card-info';
import TextBox from '../components/text-box/text-box';

import './decision-details.css';

class DecisionDetails extends Component {
  render() {
    const content = `
    لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور
     أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا 
    . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي. سيت يتبيرس<br /><br />
    بايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم أكيسأنتييوم دولاريمكيو لايود
    انتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو أنفينتوري فيرأتاتيس #نقل ايت كياسي
     أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو. نيمو أنيم أبسام فوليوباتاتيم كيواي
     فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت فيوجايت, سيد كيواي كونسيكيونتشر ماجناي<br /><br />
     دولارس أيوس كيواي راتاشن فوليوبتاتيم سيكيواي نيسكايونت. نيكيو بوررو#نقل كيوايسكيوم
     ايست,كيواي دولوريم ايبسيوم كيوا دولار #طاقة سايت أميت, كونسيكتيتيور,أديبايسكاي فيلا
    يت, سيد كيواي نون نيومكيوام ايايوس موداي تيمبورا انكايديونت يوت لابوري أيت دولار ماجنام
    `;
    return (
      <>
        <Breadcrumb
          title="كل القرارات التي يتم العمل بها حاليا"
          link="/decisions"
        />
        <Container>
          <div className="dc-details-header">
            <Row>
              <Col sm="12" md="8" lg="9">
                <div className="header-content">
                  <h2>سياسة السماح باستيراد السيارات الكهربائية</h2>
                  <div className="sub-header">
                    <Media
                      object
                      src="/static/img/vote-closed.svg"
                      className="icon-small"
                    />
                    {/* <i className="fa fa-stop-circle "></i> */}
                    <span>أغلق التصويت بتاريخ 25/8/2019</span>
                  </div>
                  <div className="sub-header">
                    <Media
                      object
                      src="/static/img/Icon - most active - views Copy 3.svg"
                      className="icon-small"
                    />
                    {/* <i className="fa fa-calendar "></i> */}
                    <span>أتم إقراره بتاريخ 25/8/2019</span>
                  </div>
                </div>
              </Col>
              <Col sm="12" md="4" lg="3">
                <div className="cards">
                  <Row>
                    <Col xs="6">
                      <CardInfo
                        type="صوت"
                        number="5523"
                        icon="/static/img/draft activity -.svg"
                      />
                    </Col>
                    <Col xs="6">
                      <CardInfo
                        type="تعليق"
                        number="5523"
                        icon="/static/img/draft activity - comments.svg"
                      />
                    </Col>
                    <Col xs="12" className="users">
                      <CardInfo
                        type="مشترك"
                        number="5523"
                        icon="/static/img/Icon - draft activity - users.svg"
                      />
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
          <div className="description">
            <h5>الوصف</h5>
            <CardDraftDetails
              header="المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل"
              content={content}
              tags={[{ tag: 'نقل', id: 1 }, { tag: 'نقل', id: 1 }]}
              date="12/4/2019"
              dropdownList={[
                'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل',
                'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل',
                'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل'
              ]}
            />
          </div>
          <TextBox
            header="طلب تعديل"
            alertMsg="يستطيع النظام ايجاد الكلمات المسيئة. اجعل تعليقك بناءً"
            placeholder="هل لديك اقترتحات اتحسين هذه السياسة؟"
            outline="شروط المشاركة"
            primary="إرسال الاقتراح"
          />
        </Container>
      </>
    );
  }
}

export default DecisionDetails;
