import React, { Component } from 'react';
import './draft-details.css';
import { Container, Col, Row, Button, Media } from 'reactstrap';
import Link from 'next/link';
import CardDraft from '../components/card-draft/card-draft';
import Breadcrumb from '../components/breadcrumb/breadcrumb';
import CardInfo from '../components/card-info/card-info';
import TextBox from '../components/text-box/text-box';
import CardComments from '../components/card-comments/card-comments';

class DraftDetails extends Component {
  render() {
    return (
      <>
        <Breadcrumb title="المسودات المطروحة للنقاش" link="/client/drafts" />
        <Container>
          <div className="dc-details-header">
            <Row>
              <Col sm="12" md="8" lg="9">
                <div className="header-content">
                  <h2>سياسة السماح باسترجاع السيارات الالكترونية</h2>
                  <div className="sub-header">
                    <Media
                      object
                      src="/static/img/Icon - most active - views Copy 3.svg"
                      className="icon-small"
                    />

                    {/* <i className="fa fa-clock-o "></i> */}
                    <span>أغلق التصويت بتاريخ 25/8/2019</span>
                  </div>
                  <div className="button-group">
                    <Button color="primary">شارك برأيك</Button>
                    <Button color="primary" outline>
                      متابعة
                    </Button>
                  </div>
                </div>
              </Col>
              <Col sm="12" md="4" lg="3">
                <div className="cards">
                  <Row>
                    <Col xs="6">
                      <CardInfo
                        type="مشترك"
                        number="5523"
                        icon="/static/img/like-icon.svg"
                      />
                    </Col>
                    <Col xs="6">
                      <CardInfo
                        type="تعليق"
                        number="5523"
                        icon="/static/img/draft activity - comments.svg"
                      />
                    </Col>
                    <Col xs="12">
                      <CardInfo
                        type="صوت"
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
            <CardDraft
              header=" "
              content={`
              لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
              أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
               أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابو
              رأس نيسي. سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم
               أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو
               أنفينتوري فيرأتاتيس #نقل ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو
              . نيمو أنيم أبسام فوليوباتاتيم كيواي فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت
               فيوجايت, سيد كيواي كونسيكيونتشر ماجناي دولارس أيوس كيواي راتاشن فوليوبتاتيم
               سيكيواي نيسكايونت. نيكيو بوررو#نقل كيوايسكيوم ايست,كيواي دولوريم ايبسيوم
               كيوا دولار #طاقة سايت أميت, كونسيكتيتيور,أديبايسكاي فيلايت, سيد كيواي نون
               نيومكيوام ايايوس موداي تيمبورا انكايديونت يوت لابوري أيت دولار ماجنام`}
              tags={[{ tag: 'نقل', id: 1 }]}
              date="12/4/2019"
            />
          </div>
          <div className="moaad-open">
            <h6 className="flex flex-align-center no-p-m">
              3 مواد مفتوحة للنقاش
              <Link href="/client/landing">
                <Button color="link">من اصل ١٨٧ مادة</Button>
              </Link>
            </h6>
            <CardDraft
              header="المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل"
              // subHeader="يغلق التصويت بتاريخ 25/8/2019"
              content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم... المزيد …"
              votes="200"
              date=" "
              link="/"
              tags={[{ tag: 'نقل', id: 1 }]}
              dropdownList={[
                'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل',
                'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل',
                'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل'
              ]}
            />
          </div>
          <TextBox
            header="التعليقات على هذه المادة"
            alertMsg="يستطيع النظام ايجاد الكلمات المسيئة. اجعل تعليقك بناءً"
            placeholder="أضف تعليقك هنا"
            outline="شروط المشاركة"
            primary="إرسال التعليق"
          />

          <CardComments
            commentsArray={[
              {
                avatar: '/static/img/avatar.png',
                name: 'كامل حمد',
                like: '33',
                share: '2',
                content:
                  'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس.',
                comments: [
                  {
                    avatar: '/static/img/avatar.png',
                    name: 'كامل حمد',
                    like: '33',
                    share: '2',
                    content:
                      'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس.'
                  },
                  {
                    avatar: '/static/img/avatar.png',
                    name: 'كامل حمد',
                    like: '33',
                    share: '2',
                    content:
                      'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس.'
                  }
                ]
              },
              {
                avatar: '/static/img/avatar.png',
                name: 'كامل حمد',
                like: '33',
                share: '2',
                content:
                  'لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديو ',
                comments: []
              }
            ]}
          />
        </Container>
      </>
    );
  }
}

export default DraftDetails;
