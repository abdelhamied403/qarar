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
import './drafts-applied.css';
import CardDraft from '../components/card-draft/card-draft';
import Skeleton from '../components/skeleton/skeleton';
import Api from '../../../api';
import { translate } from '../../../utlis/translation';
import { debounce } from '../../../utlis/helpers';

const animatedComponents = makeAnimated();

class DraftsApplied extends Component {
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
      selectedDate: 0
    };
  }

  componentDidMount() {
    this.getDrafts();
    this.getTags();
  }

  getTags = async () => {
    const tagsResponse = await Api.get(
      `/qarar_api/load/vocabulary/tags?_format=json&status=applied`
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
      searchKey
    } = this.state;
    const draftCountResponse = await Api.get(
      `/qarar_api/count/voting_qarar?_format=json${
        selectedTag ? `&tag=${selectedTag}` : ''
      }${selectedDate ? `&ends=-1 month` : ''}`
    );
    if (draftCountResponse.ok) {
      this.setState({ draftCount: draftCountResponse.data });
    }
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
          `/qarar_api/data/draft/0/DESC/1?_format=json&draft_status=applied${
            searchKey ? '&search_key=' + searchKey : ''
          }`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        )
      : await Api.get(
          `/qarar_api/data/draft/0/DESC/1?_format=json&draft_status=applied${
            searchKey ? '&search_key=' + searchKey : ''
          }`
        );
    if (draftsResponse.ok) {
      this.setState({ drafts: draftsResponse.data, loading: false });
    }
  };

  getItems = async () => {
    const { accessToken } = this.props;
    const { itemsPage, itemsPageSize } = this.state;
    const itemsCountResponse = await Api.get(
      `/qarar_api/count/item?_format=json`
    );
    if (itemsCountResponse.ok) {
      this.setState({ itemsCount: itemsCountResponse.data });
    }
    const itemsResponse = accessToken
      ? await Api.get(
          `/qarar_api/data/item/${itemsPageSize}/DESC/${itemsPage}?_format=json`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        )
      : await Api.get(
          `/qarar_api/data/item/${itemsPageSize}/DESC/${itemsPage}?_format=json`
        );
    if (itemsResponse.ok) {
      this.setState({ items: itemsResponse.data });
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
      selectedDate
    } = this.state;
    if (loading) {
      return <Skeleton />;
    }
    return (
      <div className="drafts">
        <div className="draftHeader">
          <Container>
            <h3>{translate('draftsAppliedPage.title')}</h3>
          </Container>
        </div>
        <Container>
          <section className="filter-section text-start">
            <Container>
              <Row>
                <Col xs="12" md="4">
                  <div className="form-group">
                    <label>{translate('draftsAppliedPage.decisionType')}</label>
                    <select className="not-select2 form-control">
                      <option value="1">
                        {translate('draftsAppliedPage.decisionOptionOne')}
                      </option>
                      <option value="2">
                        {translate('draftsAppliedPage.decisionOptionTwo')}
                      </option>
                    </select>
                  </div>
                </Col>

                <Col xs="12" md="4">
                  <div className="form-group">
                    <label htmlFor="orderDropDownList">
                      {translate('draftsAppliedPage.subtraction')}
                    </label>
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
                      <option value={0}>
                        {translate('draftsAppliedPage.subtractionOptionOne')}
                      </option>
                      <option value={1}>
                        {translate('draftsAppliedPage.subtractionOptionTwo')}
                      </option>
                    </select>
                  </div>
                </Col>
                <Col xs="12" md="4" className="filter-buttons">
                  <div className="form-group">
                    <label htmlFor="orderDropDownList">
                      {translate('draftsAppliedPage.keywords')}
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
                        tags
                          ? Object.keys(tags).map(key => ({
                              label: tags[key],
                              value: key
                            }))
                          : []
                      }
                      isClearable
                      placeholder={translate(
                        'draftsAppliedPage.keywordsPlaceholder'
                      )}
                      noOptionsMessage={() =>
                        translate('draftsAppliedPage.keywordsNoOptionsMessage')
                      }
                      loadingMessage={() =>
                        translate('draftsAppliedPage.keywordsLoadingMessage')
                      }
                      cl
                      onChange={selected =>
                        this.setState({ selectedTag: selected?.value }, () =>
                          this.getDrafts()
                        )
                      }
                    /> */}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="draft-cards">
            {drafts.length ? (
              drafts.map(draft => (
                <CardDraft
                  key={draft.id}
                  id={draft.id}
                  header={draft.title}
                  refetch={() => this.getDrafts()}
                  subHeader={`${translate(
                    'draftsAppliedPage.draftCard.votingCloses'
                  )}${draft.end_date}`}
                  content={draft.body}
                  votes={
                    parseInt(draft.likes, 10) + parseInt(draft.dislikes, 10) ||
                    '0'
                  }
                  date={draft.end_date}
                  link={`/draft-details/${draft.id}`}
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
              ))
            ) : (
              <Col className="text-start">
                <Alert type="sucess">
                  {translate('draftsAppliedPage.noDecisions')}
                  <Link href="/archived-drafts">
                    <a>{translate('draftsAppliedPage.archivedDecisions')}</a>
                  </Link>
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
export default connect(mapStateToProps)(DraftsApplied);
