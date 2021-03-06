import React, { Component } from 'react';
import {
  Container,
  PaginationItem,
  PaginationLink,
  Row,
  Col,
  Alert,
  TabPane
} from 'reactstrap';
import Pagination from 'rc-pagination';
import { connect } from 'react-redux';
import Link from 'next/link';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import './decisions-library.css';
import CardDraft from '../components/card-draft/card-draft';
import Skeleton from '../components/skeleton/skeleton';
import Api from '../../../api';
import { translate } from '../../../utlis/translation';
import { debounce } from '../../../utlis/helpers';

const animatedComponents = makeAnimated();

class DecisionsLibrary extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      drafts: [],
      page: 1,
      draftCount: 0,
      draftsPageSize: 10,
      itemsPage: 1,
      itemsPageSize: 10,
      loading: true,
      tags: [],
      selectedTag: false,
      selectedDate: 0,
      systemOptions: [],
      vocabularyOptions: [],
      selectedMainCategoryId: -1,
      selectedSubCategoryId: -1
    };
  }

  componentDidMount() {
    this.getOptions();
    this.getDrafts();
    this.getTags();
  }

  getTags = async () => {
    const tagsResponse = await Api.get(
      `/qarar_api/load/vocabulary/tags?_format=json`
    );
    if (tagsResponse.ok) {
      this.setState({ tags: tagsResponse.data });
    }
  };

  getDrafts = async () => {
    const { accessToken } = this.props;
    const {
      page,
      draftsPageSize,
      selectedTag,
      selectedDate,
      selectedSubCategoryId,
      selectedMainCategoryId,
      searchKey
    } = this.state;
    // const draftCountResponse = await Api.get(
    //   `/qarar_api/count/voting_qarar?_format=json${
    //     selectedTag ? `&tag=${selectedTag}` : ''
    //   }${selectedDate ? `&ends=-1 month` : ''}`
    // );
    // if (draftCountResponse.ok) {
    this.setState({ draftCount: 1 });
    // }
    // const draftsResponse = accessToken
    //   ? await Api.get(
    //       `/qarar_api/qarar/voting/created/DESC/${draftsPageSize}/${page}?_format=json${
    //         selectedTag ? `&tag=${selectedTag}` : ''
    //       }${selectedDate ? `&ends=-1 month` : ''}`,
    //       {},
    //       {
    //         headers: { Authorization: `Bearer ${accessToken}` }
    //       }
    //     )
    //   : await Api.get(
    //       `/qarar_api/qarar/voting/created/DESC/${draftsPageSize}/${page}?_format=json${
    //         selectedTag ? `&tag=${selectedTag}` : ''
    //       }${selectedDate ? `&ends=-1 month` : ''}`
    //     );
    const draftsResponse = accessToken
      ? await Api.get(
          `/qarar_api/data/system/0/DESC/1?_format=json${
            selectedMainCategoryId !== -1
              ? '&main_category=' + selectedMainCategoryId
              : ''
          }${
            selectedSubCategoryId !== -1
              ? '&sub_category=' + selectedSubCategoryId
              : ''
          }${searchKey ? '&search_key=' + searchKey : ''}`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        )
      : await Api.get(
          `/qarar_api/data/system/0/DESC/1?_format=json${
            selectedMainCategoryId !== -1
              ? '&main_category=' + selectedMainCategoryId
              : ''
          }${
            selectedSubCategoryId !== -1
              ? '&sub_category=' + selectedSubCategoryId
              : ''
          }${searchKey ? '&search_key=' + searchKey : ''}`
        );
    if (draftsResponse.ok) {
      this.setState({ drafts: draftsResponse.data, loading: false });
    }
  };

  getOptions = async () => {
    const { accessToken } = this.props;
    const systemOptionsResponse = accessToken
      ? await Api.get(
          `/qarar_api/load/vocabulary/systems_types?_format=json`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        )
      : await Api.get(`/qarar_api/load/vocabulary/systems_types?_format=json`);
    if (systemOptionsResponse.ok) {
      this.setState({ systemOptions: systemOptionsResponse.data });
    }

    const vocabularyOptionsResponse = accessToken
      ? await Api.get(
          `/qarar_api/load/vocabulary/altshry_at?_format=json`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        )
      : await Api.get(`/qarar_api/load/vocabulary/altshry_at?_format=json`);
    if (vocabularyOptionsResponse.ok) {
      this.setState({ vocabularyOptions: vocabularyOptionsResponse.data });
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
      tags,
      loading,
      selectedDate,
      systemOptions,
      vocabularyOptions,
      selectedSubCategoryId,
      selectedMainCategoryId
    } = this.state;
    if (loading) {
      return <Skeleton />;
    }
    return (
      <div className="drafts">
        <div className="draftHeader">
          <Container>
            <h3>{translate('decisionsLibPage.title')}</h3>
          </Container>
        </div>
        <Container>
          <section className="filter-section text-start">
            <Container>
              <Row>
                <Col xs="12" md="4">
                  <div className="form-group">
                    <label>
                      {translate('decisionsLibPage.classification')}
                    </label>
                    <select
                      className="not-select2 form-control"
                      value={selectedMainCategoryId}
                      onChange={e =>
                        this.setState(
                          {
                            selectedMainCategoryId: parseInt(e.target.value, 10)
                          },
                          () => this.getDrafts()
                        )
                      }
                    >
                      <option value="-1">
                        {translate('decisionsLibPage.choose')}{' '}
                        {translate('decisionsLibPage.classification')}
                      </option>
                      {systemOptions &&
                        systemOptions.map(option => (
                          <option value={option.id}>{option.name}</option>
                        ))}
                    </select>
                  </div>
                </Col>

                <Col xs="12" md="4">
                  <div className="form-group">
                    <label htmlFor="orderDropDownList">
                      {translate('decisionsLibPage.subClassification')}
                    </label>
                    <select
                      id="orderDropDownList"
                      className="not-select2 form-control"
                      value={selectedSubCategoryId}
                      onChange={e =>
                        this.setState(
                          {
                            selectedSubCategoryId: parseInt(e.target.value, 10)
                          },
                          () => this.getDrafts()
                        )
                      }
                    >
                      <option value="-1">
                        {translate('decisionsLibPage.choose')}{' '}
                        {translate('decisionsLibPage.subClassification')}
                      </option>
                      {vocabularyOptions &&
                        vocabularyOptions.map(option => (
                          <option value={option.id}>{option.name}</option>
                        ))}
                    </select>
                  </div>
                </Col>
                <Col xs="12" md="4" className="filter-buttons">
                  <div className="form-group">
                    <label htmlFor="orderDropDownList">
                      {translate('decisionsLibPage.keywords')}
                    </label>
                    <input
                      className={`text-start direction-${translate(
                        'dir'
                      )} form-control`}
                      placeholder={translate(
                        'decisionsLibPage.keywordsPlaceholder'
                      )}
                      onChange={({ target: { value } }) =>
                        debounce(() => {
                          this.setState(
                            {
                              searchKey: value
                            },
                            () => this.getDrafts()
                          );
                        })
                      }
                    />
                    {/* <ReactSelect
                      isRtl
                      className={`text-start direction-${translate('dir')}`}
                      components={animatedComponents}
                      cacheOptions
                      classNamePrefix="react-select"
                      options={
                        tags?.map(tag => ({
                          label: tag.name,
                          value: tag.id
                        })) || []
                      }
                      isClearable
                      placeholder={translate(
                        'decisionsLibPage.keywordsPlaceholder'
                      )}
                      noOptionsMessage={() =>
                        translate('decisionsLibPage.keywordsNoOptionsMessage')
                      }
                      loadingMessage={() =>
                        translate('decisionsLibPage.keywordsLoadingMessage')
                      }
                      cl
                      onChange={selected =>
                        this.setState({ selectedTag: selected?.value }, () => {
                          this.getOptions();
                        })
                      }
                    /> */}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="draft-cards">
            {drafts && drafts.length ? (
              drafts.map(draft => (
                <Col lg="6">
                  <CardDraft
                    type="decision"
                    key={draft.id}
                    id={draft.id}
                    header={draft.title}
                    refetch={() => this.getDrafts()}
                    subHeader={`${translate(
                      'decisionsLibPage.draftCard.publication'
                    )}${draft.publisheDate || ''}`}
                    content={draft.body}
                    date={draft.publisheDate}
                    link={`/decision-details/${draft.id}`}
                    tags={
                      draft.tags
                        ? draft.tags.map(tagItem => ({
                            tag: tagItem.name,
                            id: tagItem.id
                          }))
                        : []
                    }
                    liked={draft.liked}
                    disliked={draft.disliked}
                    subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                  />
                </Col>
              ))
            ) : (
              <Col className="text-start">
                <Alert type="sucess">
                  {translate('decisionsLibPage.noDecisions')}
                  {/*<Link href="/decisions">*/}
                  {/*  <a>{translate('draftsPage.archivedDecisions')}</a>*/}
                  {/*</Link>*/}
                </Alert>
              </Col>
            )}
          </section>
          <div className="pagination-container">
            <Pagination
              total={draftCount}
              pageSize={draftsPageSize}
              current={page}
              onChange={pageCurrent =>
                this.setState({ page: pageCurrent }, () => this.getDrafts())
              }
              className="pagination"
              itemRender={this.paginagtionItemRender}
            />
          </div>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(DecisionsLibrary);
