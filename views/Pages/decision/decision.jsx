import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Container,
  Col,
  Row,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import Pagination from 'rc-pagination';
import CardDraft from '../components/card-draft/card-draft';
import './decision.css';
import Api from '../../../api';

class Decision extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      appliedItems: [],
      page: 1,
      appliedCount: 0,
      appliedPageSize: 10,
      archivedItems: [],
      archivedPage: 1,
      archivedCount: 0,
      archivedPageSize: 10
    };
  }

  componentDidMount() {
    this.getAppliedItems();
    this.getArchivedItems();
  }

  getAppliedItems = async () => {
    const { page, appliedPageSize } = this.state;
    const appliedCountResponse = await Api.get(
      `/qarar_api/count/applied_qarar?_format=json`
    );
    if (appliedCountResponse.ok) {
      this.setState({ appliedCount: appliedCountResponse.data });
    }
    const appliedResponse = await Api.get(
      `/qarar_api/qarar/applied/created/DESC/${appliedPageSize}/${page}?_format=json`
    );
    if (appliedResponse.ok) {
      this.setState({ appliedItems: appliedResponse.data });
    }
  };

  getArchivedItems = async () => {
    const { page, archivedPageSize } = this.state;
    const archivedCountResponse = await Api.get(
      `/qarar_api/count/archived_qarar?_format=json`
    );
    if (archivedCountResponse.ok) {
      this.setState({ archivedCount: archivedCountResponse.data });
    }
    const archivedResponse = await Api.get(
      `/qarar_api/qarar/archived/created/DESC/${archivedPageSize}/${page}?_format=json`
    );
    if (archivedResponse.ok) {
      this.setState({ archivedItems: archivedResponse.data });
    }
  };

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
      page,
      appliedItems,
      appliedCount,
      appliedPageSize,
      archivedItems,
      archivedPage,
      archivedCount,
      archivedPageSize
    } = this.state;

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
              <TabPane tabId="1">
                <>
                  <section>
                    <Row>
                      {appliedItems.map(item => (
                        <Col key={item.id} xs="12" md="6">
                          <CardDraft
                            header={item.title}
                            subHeader={`تم التطبيق بتاريخ ${item.applied_date}`}
                            content={item.body.substr(0, 100)}
                            tags={item.tags.map(tag => ({
                              tag: tag.name.substr(0, 20),
                              id: tag.id
                            }))}
                            subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                            date=" "
                            borderColor="#9D9D9D"
                            link={`/decision-details/${item.id}`}
                          />
                        </Col>
                      ))}
                    </Row>
                  </section>
                  <div className="pagination-container">
                    <Pagination
                      total={appliedCount}
                      pageSize={appliedPageSize}
                      current={page}
                      onChange={pageCurrent =>
                        this.setState({ page: pageCurrent }, () =>
                          this.getAppliedItems()
                        )
                      }
                      className="pagination"
                      itemRender={this.paginagtionItemRender}
                    />
                  </div>
                </>
              </TabPane>
              <TabPane tabId="2">
                <>
                  <section>
                    <Row>
                      {archivedItems.map(item => (
                        <Col key={item.id} xs="12" md="6">
                          <CardDraft
                            header={item.title}
                            subHeader={`تم الأرشفة بتاريخ ${item.archived_date}`}
                            content={item.body.substr(0, 100)}
                            tags={
                              item.tags
                                ? item.tags.map(tag => ({
                                    tag: tag.name.substr(0, 20),
                                    id: tag.id
                                  }))
                                : []
                            }
                            subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                            date=" "
                            borderColor="#9D9D9D"
                            link={`/decision-details/${item.id}`}
                          />
                        </Col>
                      ))}
                    </Row>
                  </section>
                  <div className="pagination-container">
                    <Pagination
                      total={archivedCount}
                      pageSize={archivedPageSize}
                      current={archivedPage}
                      onChange={pageCurrent =>
                        this.setState({ archivedPage: pageCurrent }, () =>
                          this.getArchivedItems()
                        )
                      }
                      className="pagination"
                      itemRender={this.paginagtionItemRender}
                    />
                  </div>
                </>
              </TabPane>
            </TabContent>
          </section>
        </Container>
      </>
    );
  }
}

export default Decision;
