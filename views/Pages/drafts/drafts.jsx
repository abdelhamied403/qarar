import React, { Component } from 'react';
import {
  Container,
  PaginationItem,
  PaginationLink,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import Pagination from 'rc-pagination';
import './drafts.css';
import CardDraft from '../components/card-draft/card-draft';

import Api from '../../../api';

class Drafts extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      drafts: [],
      page: 1,
      draftCount: 0,
      draftsPageSize: 10,
      items: [],
      itemsPage: 1,
      itemsCount: 0,
      itemsPageSize: 10
    };
  }

  componentDidMount() {
    this.getDrafts();
    this.getItems();
  }

  getDrafts = async () => {
    const { page, draftsPageSize } = this.state;
    const draftCountResponse = await Api.get(
      `/qarar_api/count/draft?_format=json`
    );
    if (draftCountResponse.ok) {
      this.setState({ draftCount: draftCountResponse.data });
    }
    const draftsResponse = await Api.get(
      `/qarar_api/qarar/voting/created/DESC/${draftsPageSize}/${page}?_format=json`
    );
    if (draftsResponse.ok) {
      this.setState({ drafts: draftsResponse.data });
    }
  };

  getItems = async () => {
    const { itemsPage, itemsPageSize } = this.state;
    const itemsCountResponse = await Api.get(
      `/qarar_api/count/item?_format=json`
    );
    if (itemsCountResponse.ok) {
      this.setState({ itemsCount: itemsCountResponse.data });
    }
    const itemsResponse = await Api.get(
      `/qarar_api/data/item/${itemsPageSize}/DESC/${itemsPage}?_format=json`
    );
    if (itemsResponse.ok) {
      this.setState({ items: itemsResponse.data });
    }
  };

  tab1() {
    return (
      <section>
        <CardDraft
          header="سياسة السماح باستيراد السيارات الكهربائية"
          subHeader="يغلق التصويت بتاريخ 25/8/2019"
          content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم... المزيد …"
          votes="200"
          date="12/4/2019"
          link="/draft-details/draftId"
          tags={[{ tag: 'نقل', id: 1 }]}
          subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
        />

        <CardDraft
          header="سياسة السماح باستيراد السيارات الكهربائية"
          subHeader="يغلق التصويت بتاريخ 25/8/2019"
          content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم... المزيد …"
          votes="200"
          date="12/4/2019"
          link="/draft-details/draftId"
          tags={[{ tag: 'نقل', id: 1 }]}
          subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
        />

        <CardDraft
          header="سياسة السماح باستيراد السيارات الكهربائية"
          subHeader="يغلق التصويت بتاريخ 25/8/2019"
          content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم... المزيد …"
          votes="200"
          date="12/4/2019"
          link="/draft-details/draftId"
          tags={[{ tag: 'نقل', id: 1 }]}
          subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
        />

        <CardDraft
          header="سياسة السماح باستيراد السيارات الكهربائية"
          subHeader="يغلق التصويت بتاريخ 25/8/2019"
          content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
          votes="200"
          date="12/4/2019"
          link="/draft-details/draftId"
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

  paginagtionItemRender = (current, type, element) => {
    const { page } = this.state;

    if (type === 'page') {
      return (
        <PaginationItem active={current === page}>
          <PaginationLink tag="button">{current}</PaginationLink>
        </PaginationItem>
      );
    }
    if (type === 'prev') {
      return (
        <PaginationItem>
          <PaginationLink previous tag="button" />
        </PaginationItem>
      );
    }
    if (type === 'next') {
      return (
        <PaginationItem>
          <PaginationLink next tag="button" />
        </PaginationItem>
      );
    }
    return element;
  };

  render() {
    const {
      drafts,
      draftCount,
      draftsPageSize,
      page,
      items,
      itemsCount,
      itemsPage,
      itemsPageSize
    } = this.state;
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
            <TabPane tabId="1">
              <>
                <section>
                  {drafts.map(draft => (
                    <CardDraft
                      key={draft.id}
                      header={draft.title}
                      subHeader={`يغلق التصويت بتاريخ ${draft.end_date}`}
                      content={draft.body.substr(0, 100)}
                      votes={
                        parseInt(draft.likes, 10) +
                          parseInt(draft.dislikes, 10) || '0'
                      }
                      date={draft.end_date}
                      link={`/draft-details/${draft.id}`}
                      tags={[{ tag: 'نقل', id: 1 }]}
                      subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                    />
                  ))}
                </section>
                <div className="pagination-container">
                  <Pagination
                    total={draftCount}
                    pageSize={draftsPageSize}
                    current={page}
                    onChange={pageCurrent =>
                      this.setState({ page: pageCurrent }, () =>
                        this.getDrafts()
                      )
                    }
                    className="pagination"
                    itemRender={this.paginagtionItemRender}
                  />
                </div>
              </>
            </TabPane>
            <TabPane tabId="2">{this.tab1()}</TabPane>
            <TabPane tabId="3">
              <>
                <section>
                  {items.map(item => (
                    <CardDraft
                      key={item.id}
                      header={item.title}
                      subHeader={`يغلق التصويت بتاريخ ${item.end_date}`}
                      content={item.body.substr(0, 100)}
                      votes={
                        parseInt(item.likes, 10) +
                          parseInt(item.dislikes, 10) || '0'
                      }
                      date={item.end_date}
                      link={`/item-details/${item.id}`}
                      tags={[{ tag: 'نقل', id: 1 }]}
                      subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                    />
                  ))}
                </section>
                <div className="pagination-container">
                  <Pagination
                    total={itemsCount}
                    pageSize={itemsPageSize}
                    current={itemsPage}
                    onChange={pageCurrent =>
                      this.setState({ itemsPage: pageCurrent }, () =>
                        this.getItems()
                      )
                    }
                    className="pagination"
                    itemRender={this.paginagtionItemRender}
                  />
                </div>
              </>
            </TabPane>
          </TabContent>
        </Container>
      </div>
    );
  }
}

export default Drafts;
