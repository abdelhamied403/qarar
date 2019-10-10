import React, { Component } from 'react';
import {
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';

import './drafts.css';
import CardDraft from '../components/card-draft/card-draft';

class Drafts extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1')
    };
  }

  tab1() {
    return (
      <section>
        <CardDraft
          header="سياسة السماح باستيراد السيارات الكهربائية"
          subHeader="يغلق التصويت بتاريخ 25/8/2019"
          content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم... المزيد …"
          votes="200"
          date="12/4/2019"
          link="/client/draft-detials"
          tags={[{ tag: 'نقل', id: 1 }]}
          subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
        />

        <CardDraft
          header="سياسة السماح باستيراد السيارات الكهربائية"
          subHeader="يغلق التصويت بتاريخ 25/8/2019"
          content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم... المزيد …"
          votes="200"
          date="12/4/2019"
          link="/client/draft-detials"
          tags={[{ tag: 'نقل', id: 1 }]}
          subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
        />

        <CardDraft
          header="سياسة السماح باستيراد السيارات الكهربائية"
          subHeader="يغلق التصويت بتاريخ 25/8/2019"
          content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم... المزيد …"
          votes="200"
          date="12/4/2019"
          link="/client/draft-detials"
          tags={[{ tag: 'نقل', id: 1 }]}
          subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
        />

        <CardDraft
          header="سياسة السماح باستيراد السيارات الكهربائية"
          subHeader="يغلق التصويت بتاريخ 25/8/2019"
          content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
          votes="200"
          date="12/4/2019"
          link="/client/draft-detials"
          tags={[{ tag: 'نقل', id: 1 }]}
          subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
        />
      </section>
    );
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
        <TabPane tabId="2">{this.tab1()}</TabPane>
        <TabPane tabId="3">{this.tab1()}</TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="drafts">
        <div className="draftHeader">
          <Container>
            <h3>قرارات تحت التصويت</h3>
          </Container>
        </div>
        <Container className="tabs-content">
          <Nav tabs>
            <NavItem>
              <NavLink
                active={this.state.activeTab[0] === '1'}
                onClick={() => {
                  this.toggle(0, '1');
                }}
              >
                كل القرارات
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={this.state.activeTab[0] === '2'}
                onClick={() => {
                  this.toggle(0, '2');
                }}
              >
                السياسات فقط
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={this.state.activeTab[0] === '3'}
                onClick={() => {
                  this.toggle(0, '3');
                }}
              >
                المواد فقط
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab[0]}>
            {this.tabPane()}
          </TabContent>
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
      </div>
    );
  }
}

export default Drafts;
