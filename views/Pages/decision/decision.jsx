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
  PaginationLink,
  Alert
} from 'reactstrap';
import Pagination from 'rc-pagination';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import CardDraft from '../components/card-draft/card-draft';
import './decision.css';
import Api from '../../../api';
import Skeleton from '../components/skeleton/skeleton';
import { translate } from '../../../utlis/translation';

const animatedComponents = makeAnimated();

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
      archivedPageSize: 10,
      loading: true,
      tags: [],
      selectedTag: false,
      selectedDate: 0
    };
  }

  componentDidMount() {
    this.getDrafts();
    this.getTags();
  }

  getTags = async () => {
    const tagsResponse = await Api.get(
      `/qarar_api/load/vocabulary/tags?_format=json&status=voting`
    );
    if (tagsResponse.ok) {
      this.setState({ tags: tagsResponse.data });
    }
  };

  getDrafts() {
    this.getAppliedItems();
    this.getArchivedItems();
  }

  getAppliedItems = async () => {
    const { page, appliedPageSize, selectedTag, selectedDate } = this.state;
    const appliedCountResponse = await Api.get(
      `/qarar_api/count/applied_qarar?_format=json${
        selectedTag ? `&tag=${selectedTag}` : ''
      }${selectedDate ? `&ends=-1 month` : ''}`
    );
    if (appliedCountResponse.ok) {
      this.setState({ appliedCount: appliedCountResponse.data });
    }
    const appliedResponse = await Api.get(
      `/qarar_api/qarar/applied/created/DESC/${appliedPageSize}/${page}?_format=json${
        selectedTag ? `&tag=${selectedTag}` : ''
      }${selectedDate ? `&ends=-1 month` : ''}`
    );
    if (appliedResponse.ok) {
      this.setState({ appliedItems: appliedResponse.data, loading: false });
    }
  };

  getArchivedItems = async () => {
    const {
      archivedPage,
      archivedPageSize,
      selectedTag,
      selectedDate
    } = this.state;
    const archivedCountResponse = await Api.get(
      `/qarar_api/count/archived_qarar?_format=json${
        selectedTag ? `&tag=${selectedTag}` : ''
      }${selectedDate ? `&ends=-1 month` : ''}`
    );
    if (archivedCountResponse.ok) {
      this.setState({ archivedCount: archivedCountResponse.data });
    }
    const archivedResponse = await Api.get(
      `/qarar_api/qarar/archived/created/DESC/${archivedPageSize}/${archivedPage}?_format=json${
        selectedTag ? `&tag=${selectedTag}` : ''
      }${selectedDate ? `&ends=-1 month` : ''}`
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
    const { page: appliedPage, archivedPage } = this.state;
    const page = this.state.activeTab[0] === '1' ? appliedPage : archivedPage;
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
      archivedPageSize,
      loading,
      tags,
      selectedDate
    } = this.state;

    if (loading) {
      return <Skeleton />;
    }
    return (
      <>
        <div className="draftHeader">
          <Container>
            <h3>{translate('decisionPage.title')}</h3>
          </Container>
        </div>
        <Container className="decsion-page">
          <section className="filter-section text-start">
            <Container>
              <Row>
                <Col xs="12" md="4">
                  <div className="form-group">
                    <label>{translate('decisionPage.decisionType')}</label>
                    <select className="not-select2 form-control">
                      <option value="1">{translate('decisionPage.decisionOptionOne')}</option>
                      <option value="2">{translate('decisionPage.decisionOptionTwo')}</option>
                    </select>
                  </div>
                </Col>

                <Col xs="12" md="4">
                  <div className="form-group">
                    <label htmlFor="orderDropDownList">{translate('decisionPage.subtraction')}</label>
                    <select
                      id="orderDropDownList"
                      className="not-select2 form-control"
                      value={selectedDate}
                      onChange={e =>
                        this.setState(
                          { selectedDate: parseInt(e.target.value, 10) },
                          () => this.getDrafts()
                        )
                      }
                    >
                      <option value={0}>{translate('decisionPage.subtractionOptionOne')}</option>
                      <option value={1}>{translate('decisionPage.subtractionOptionTwo')}</option>
                    </select>
                  </div>
                </Col>
                <Col xs="12" md="4" className="filter-buttons">
                  <div className="form-group">
                    <label htmlFor="orderDropDownList">{translate('decisionPage.keywords')}</label>
                    <ReactSelect
                      isRtl
                      className={`text-start direction-${translate('dir')}`}
                      components={animatedComponents}
                      cacheOptions
                      classNamePrefix="react-select"
                      options={
                        tags
                          ? Object.keys(tags).map(key => ({
                              label: tags[key],
                              value: key
                            }))
                          : []
                      }
                      isClearable
                      placeholder={translate(
                        'decisionPage.keywordsPlaceholder'
                      )}
                      noOptionsMessage={() =>
                        translate('decisionPage.keywordsNoOptionsMessage')
                      }
                      loadingMessage={() =>
                        translate('decisionPage.keywordsLoadingMessage')
                      }
                      cl
                      onChange={selected =>
                        this.setState({ selectedTag: selected?.value }, () =>
                          this.getDrafts()
                        )
                      }
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="tabs-content text-start">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => {
                    this.toggle(0, '1');
                  }}
                >
                  {translate('decisionPage.applicableDecisions')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => {
                    this.toggle(0, '2');
                  }}
                >
                  {translate('decisionPage.archivedDecisions')}
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              <TabPane tabId="1">
                <>
                  <section className="p-0">
                    <Row className="mb-3">
                      <Col>{translate('decisionPage.decisionsImplemented')}</Col>
                    </Row>
                    <Row>
                      {appliedItems.length ? (
                        appliedItems.map(item => (
                          <Col key={item.id} xs="12" md="6">
                            <CardDraft
                              header={item.title}
                              subHeader={`${translate('decisionPage.appliedItemsDate')}${item.end_date}`}
                              content={`${item.body.substr(0, 200)} ...`}
                              tags={item.tags.map(tag => ({
                                tag: tag.name.substr(0, 20),
                                id: tag.id
                              }))}
                              subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                              date=" "
                              borderColor="#9D9D9D"
                              link={`/draft-details/${item.id}`}
                            />
                          </Col>
                        ))
                      ) : (
                        <Col>
                          <Alert type="sucess">
                            {translate('decisionPage.noDecisionsImplemented')}
                          </Alert>
                        </Col>
                      )}
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
                  <section className="p-0">
                    <Row className="mb-3">
                      <Col>{translate('decisionPage.archivedDecisionsNotImplemented')}</Col>
                    </Row>
                    <Row>
                      {archivedItems.length ? (
                        archivedItems.map(item => (
                          <Col key={item.id} xs="12" md="6">
                            <CardDraft
                              header={item.title}
                              subHeader={`${translate('decisionPage.archivedItemDate')}${item.end_date}`}
                              content={`${item.body.substr(0, 200)} ...`}
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
                              link={`/draft-details/${item.id}`}
                            />
                          </Col>
                        ))
                      ) : (
                        <Col>
                          <Alert type="sucess">{translate('decisionPage.noArchivedDecisionsImplemented')}</Alert>
                        </Col>
                      )}
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
