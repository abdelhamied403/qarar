import React, { Component } from 'react';
import { Container, Col, Row, Media } from 'reactstrap';

import CardDraftDetails from '../components/card-draft-details/card-draft-details';
import Breadcrumb from '../components/breadcrumb/breadcrumb';
import CardInfo from '../components/card-info/card-info';
import TextBox from '../components/text-box/text-box';
import Skeleton from '../components/skeleton/skeleton';

import Api from '../../../api';

import './decision-details.css';
import { translate } from '../../../utlis/translation';

class DecisionDetails extends Component {
  constructor() {
    super();
    this.state = {
      draft: {
        tags: [],
        body: ''
      },
      items: [],
      comments: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getDraft();
    this.getComments();
  }

  getDraft = async () => {
    const { decisionId } = this.props;
    const draftResponse = await Api.get(
      `/qarar_api/load/node/${decisionId}?_format=json`
    );
    if (draftResponse.ok) {
      const { items, data } = draftResponse.data;
      this.setState({ draft: data, items, loading: false });
    }
  };

  getComments = async () => {};

  render() {
    const { draft, items, loading } = this.state;
    if (loading) {
      return <Skeleton details />;
    }
    return (
      <>
        <Breadcrumb
          title="كل التشريعات التي يتم العمل بها حاليا"
          link="/decisions"
        />
        <Container>
          <div className="dc-details-header">
            <Row>
              <Col sm="12" md="8" lg="9">
                <div className="header-content">
                  <h2>{draft.title}</h2>
                  <div className="sub-header">
                    {draft.archived_date && (
                      <div className="">
                        <Media
                          object
                          src="/static/img/vote-closed.svg"
                          className="icon-small"
                          dir={translate('dir')}
                        />
                        <span>أغلق التصويت بتاريخ {draft.archived_date}</span>
                      </div>
                    )}
                    {draft.end_date &&
                      !(draft.applied_date || draft.archived_date) && (
                        <div className="">
                          <Media
                            object
                            src="/static/img/vote-closed.svg"
                            className="icon-small"
                            dir={translate('dir')}
                          />
                          <span>يغلق التصويت بتاريخ {draft.end_date}</span>
                        </div>
                      )}
                  </div>
                  <div className="sub-header">
                    {draft.applied_date && (
                      <div className="">
                        <Media
                          object
                          src="/static/img/Icon - most active - views Copy 3.svg"
                          className="icon-small"
                          dir={translate('dir')}
                        />
                        <span>أتم إقراره بتاريخ {draft.applied_date}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
              <Col sm="12" md="4" lg="3">
                <div className="cards">
                  <Row>
                    <Col xs="6">
                      <CardInfo
                        type="صوت"
                        number="11"
                        icon="/static/img/draft activity -.svg"
                      />
                    </Col>
                    <Col xs="6">
                      <CardInfo
                        type="تعليق"
                        number={11}
                        icon="/static/img/draft activity - comments.svg"
                      />
                    </Col>
                    <Col xs="12" className="users">
                      <CardInfo
                        type="مشترك"
                        number={11}
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
              header={draft.title}
              content={draft.body}
              tags={[]}
              date={draft.publisheDate}
              borderColor="#9D9D9D"
              dropdownList={[]}
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
