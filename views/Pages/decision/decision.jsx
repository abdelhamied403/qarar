import React, { Component } from 'react';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container,
  Col,
  Row
} from 'reactstrap';

import CardDraft from '../components/card-draft/card-draft';
import './decision.css';

class Decision extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1')
    };
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">{this.tab1()}</TabPane>
        <TabPane tabId="2">{this.tab2()}</TabPane>
      </>
    );
  }

  tab1() {
    return (
      <>
        <Row>
          <Col xs="12" md="6">
            <CardDraft
              header="سياسة السماح باستيراد السيارات الكهربائية"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
              content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
              link="/decision-details/decisionId"
              tags={[{ tag: 'نقل', id: 1 }]}
              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            />
          </Col>
          <Col xs="12" md="6">
            <CardDraft
              header="سياسة السماح باستيراد السيارات الكهربائية"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
              content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
              link="/decision-details/decisionId"
              tags={[{ tag: 'نقل', id: 1 }]}
              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            />
          </Col>
          <Col xs="12" md="6">
            <CardDraft
              header="سياسة السماح باستيراد السيارات الكهربائية"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
              content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
              link="/decision-details/decisionId"
              tags={[{ tag: 'نقل', id: 1 }]}
              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            />
          </Col>
          <Col xs="12" md="6">
            <CardDraft
              header="سياسة السماح باستيراد السيارات الكهربائية"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
              content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
              tags={[{ tag: 'نقل', id: 1 }]}
              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
              link="/decision-details/decisionId"
            />
          </Col>
          <Col xs="12" md="6">
            <CardDraft
              header="سياسة السماح باستيراد السيارات الكهربائية"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
              content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
              link="/decision-details/decisionId"
              tags={[{ tag: 'نقل', id: 1 }]}
              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            />
          </Col>
          <Col xs="12" md="6">
            <CardDraft
              header="سياسة السماح باستيراد السيارات الكهربائية"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
              content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
              link="/decision-details/decisionId"
              tags={[{ tag: 'نقل', id: 1 }]}
              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            />
          </Col>
          <Col xs="12" md="6">
            <CardDraft
              header="سياسة السماح باستيراد السيارات الكهربائية"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
              content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
              link="/decision-details/decisionId"
              tags={[{ tag: 'نقل', id: 1 }]}
              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            />
          </Col>
          <Col xs="12" md="6">
            <CardDraft
              header="سياسة السماح باستيراد السيارات الكهربائية"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
              content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
              tags={[{ tag: 'نقل', id: 1 }]}
              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
              link="/decision-details/decisionId"
            />
          </Col>
        </Row>
      </>
    );
  }

  tab2() {
    return (
      <Row>
        <Col xs="12" md="6">
          <CardDraft
            header="سياسة السماح باستيراد السيارات الكهربائية"
            subHeader=" تم الأرشفة بتاريخ 25/8/2019"
            content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
            link="/decision-details/decisionId"
            tags={[{ tag: 'نقل', id: 1 }]}
            subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            date=" "
            borderColor="#9D9D9D"
          />
        </Col>
        <Col xs="12" md="6">
          <CardDraft
            header="سياسة السماح باستيراد السيارات الكهربائية"
            subHeader=" تم الأرشفة بتاريخ 25/8/2019"
            content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
            link="/decision-details/decisionId"
            tags={[{ tag: 'نقل', id: 1 }]}
            subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            date=" "
            borderColor="#9D9D9D"
          />
        </Col>
        <Col xs="12" md="6">
          <CardDraft
            header="سياسة السماح باستيراد السيارات الكهربائية"
            subHeader=" تم الأرشفة بتاريخ 25/8/2019"
            content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
            link="/decision-details/decisionId"
            tags={[{ tag: 'نقل', id: 1 }]}
            subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            date=" "
            borderColor="#9D9D9D"
          />
        </Col>
        <Col xs="12" md="6">
          <CardDraft
            header="سياسة السماح باستيراد السيارات الكهربائية"
            subHeader=" تم الأرشفة بتاريخ 25/8/2019"
            content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
            tags={[{ tag: 'نقل', id: 1 }]}
            subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            date=" "
            borderColor="#9D9D9D"
            link="/decision-details/decisionId"
          />
        </Col>
        <Col xs="12" md="6">
          <CardDraft
            header="سياسة السماح باستيراد السيارات الكهربائية"
            subHeader=" تم الأرشفة بتاريخ 25/8/2019"
            content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
            link="/decision-details/decisionId"
            tags={[{ tag: 'نقل', id: 1 }]}
            subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            date=" "
            borderColor="#9D9D9D"
          />
        </Col>
        <Col xs="12" md="6">
          <CardDraft
            header="سياسة السماح باستيراد السيارات الكهربائية"
            subHeader=" تم الأرشفة بتاريخ 25/8/2019"
            content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
            link="/decision-details/decisionId"
            tags={[{ tag: 'نقل', id: 1 }]}
            subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            date=" "
            borderColor="#9D9D9D"
          />
        </Col>
        <Col xs="12" md="6">
          <CardDraft
            header="سياسة السماح باستيراد السيارات الكهربائية"
            subHeader=" تم الأرشفة بتاريخ 25/8/2019"
            content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
            link="/decision-details/decisionId"
            tags={[{ tag: 'نقل', id: 1 }]}
            subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            date=" "
            borderColor="#9D9D9D"
          />
        </Col>
        <Col xs="12" md="6">
          <CardDraft
            header="سياسة السماح باستيراد السيارات الكهربائية"
            subHeader=" تم الأرشفة بتاريخ 25/8/2019"
            content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
            tags={[{ tag: 'نقل', id: 1 }]}
            subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
            date=" "
            borderColor="#9D9D9D"
            link="/decision-details/decisionId"
          />
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <>
        <div className="decisionHeader">
          <Container>
            <h3>قرارات مطبقة</h3>
          </Container>
        </div>
        <Container className="decsion-page">
          <section className="tabs-content">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => {
                    this.toggle(0, '1');
                  }}
                >
                  قرارات يتم العمل عليها الان
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => {
                    this.toggle(0, '2');
                  }}
                >
                  قرارات مؤرشفة
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </section>
        </Container>
        <Container>
          <div className="pagination-container">
            <Pagination>
              <PaginationItem>
                <PaginationLink previous tag="button" />
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink tag="button">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next tag="button" />
              </PaginationItem>
            </Pagination>
          </div>
        </Container>
      </>
    );
  }
}

export default Decision;
