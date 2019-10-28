import React, { Component } from 'react';
import './draft-details.css';
import { Container, Col, Row, Button, Media } from 'reactstrap';
import Link from 'next/link';
import CardDraft from '../components/card-draft/card-draft';
import Breadcrumb from '../components/breadcrumb/breadcrumb';
import CardInfo from '../components/card-info/card-info';
import TextBox from '../components/text-box/text-box';
import CardComments from '../components/card-comments/card-comments';

import Api from '../../../api';

class DraftDetails extends Component {
  constructor() {
    super();
    this.state = {
      draft: {
        tags: []
      },
      items: [],
      comments: []
    };
  }

  componentDidMount() {
    this.getDraft();
    this.getComments();
  }

  getDraft = async () => {
    const { draftId } = this.props;
    const draftResponse = await Api.get(
      `/qarar_api/load/node/${draftId}?_format=json`
    );
    console.log(draftResponse);

    if (draftResponse.ok) {
      const { items, data } = draftResponse.data;
      this.setState({ draft: data, items });
    }
  };

  getComments = async () => {};

  render() {
    const { draft, items } = this.state;
    return (
      <>
        <Breadcrumb title="المسودات المطروحة للنقاش" link="/drafts" />
        <Container>
          <div className="dc-details-header">
            <Row>
              <Col sm="12" md="8" lg="9">
                <div className="header-content">
                  <h2>{draft.title}</h2>
                  <div className="sub-header">
                    <Media
                      object
                      src="/static/img/Icon - most active - views Copy 3.svg"
                      className="icon-small"
                    />

                    {/* <i className="fa fa-clock-o "></i> */}
                    {draft.archived_date && (
                      <span>أغلق التصويت بتاريخ {draft.archived_date}</span>
                    )}
                    {draft.applied_date && (
                      <span>تم التطبيق بتاريخ {draft.applied_date}</span>
                    )}
                    {draft.end_date &&
                      !(draft.applied_date || draft.archived_date) && (
                        <span>يغلق التصويت بتاريخ {draft.end_date}</span>
                      )}
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
                        number={draft.comments}
                        icon="/static/img/draft activity - comments.svg"
                      />
                    </Col>
                    <Col xs="12">
                      <CardInfo
                        type="صوت"
                        number={draft.likes - draft.dislikes}
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
              header=""
              content={draft.body}
              tags={
                draft.tags
                  ? draft.tags.map(tag => ({
                      tag: tag.name.substr(0, 20),
                      id: tag.id
                    }))
                  : []
              }
              date={draft.end_date}
            />
          </div>
          <div className="moaad-open">
            <h6 className="flex flex-align-center no-p-m">
              {items.length} مواد مفتوحة للنقاش
              <Link href="/client/landing">
                <Button color="link">من اصل ١٨٧ مادة</Button>
              </Link>
            </h6>
            {items.map(item => (
              <CardDraft
                key={item.id}
                header={item.title}
                // subHeader="يغلق التصويت بتاريخ 25/8/2019"
                content={item.body}
                votes={item.likes}
                date=" "
                link="/"
                tags={
                  item.tags
                    ? item.tags.map(tag => ({
                        tag: tag.name.substr(0, 20),
                        id: tag.id
                      }))
                    : []
                }
              />
            ))}
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
