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
import { connect } from 'react-redux';
import './drafts.css';
import CardDraft from '../components/card-draft/card-draft';
import Skeleton from '../components/skeleton/skeleton';
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
      itemsPageSize: 10,
      loading: true
    };
  }

  componentDidMount() {
    this.getDrafts();
  }

  getDrafts = async () => {
    const { accessToken } = this.props;
    const { page, draftsPageSize } = this.state;
    const draftCountResponse = await Api.get(
      `/qarar_api/count/draft?_format=json`
    );
    if (draftCountResponse.ok) {
      this.setState({ draftCount: draftCountResponse.data });
    }
    const draftsResponse = accessToken
      ? await Api.get(
          `/qarar_api/qarar/voting/created/DESC/${draftsPageSize}/${page}?_format=json`,
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        )
      : await Api.get(
          `/qarar_api/qarar/voting/created/DESC/${draftsPageSize}/${page}?_format=json`
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
      items,
      itemsCount,
      itemsPage,
      itemsPageSize,
      loading
    } = this.state;
    if (loading) {
      return <Skeleton />;
    }
    return (
      <div className="drafts">
        <div className="draftHeader">
          <Container>
            <h3>قرارات تحت التصويت</h3>
          </Container>
        </div>
        <Container>
          <section>
            {drafts.map(draft => (
              <CardDraft
                key={draft.id}
                id={draft.id}
                header={draft.title}
                refetch={() => this.getDrafts()}
                subHeader={`يغلق التصويت بتاريخ ${draft.end_date}`}
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
            ))}
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
export default connect(mapStateToProps)(Drafts);
