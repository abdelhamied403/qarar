import React, { Component } from 'react';
import {
  Container,
  Col,
  Row,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import Pagination from 'rc-pagination';
import moment from 'moment';
import renderHTML from 'react-render-html';
import CardBlog from '../components/card-blog/card-blog';
import './platform-news.css';
import Skeleton from '../components/skeleton/skeleton';
import Api from '../../../api';

class DecisionDraft extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
      news: [],
      page: 1,
      newsPageSize: 4,
      sortMode: 'DESC',
      sortLabel: 'أحدث الأخبار',
      loading: true
    };
  }

  componentDidMount() {
    this.getNews();
  }

  getNews = async () => {
    const { page, newsPageSize, sortMode } = this.state;
    const newsCountResponse = await Api.get(
      `/qarar_api/count/news?_format=json`
    );
    if (newsCountResponse.ok) {
      this.setState({ newsCount: newsCountResponse.data });
    }
    const newsResponse = await Api.get(
      `/qarar_api/data/news/${newsPageSize}/${sortMode}/${page}?_format=json`
    );
    if (newsResponse.ok) {
      this.setState({ news: newsResponse.data, loading: false });
    }
  };

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
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
      news,
      sortLabel,
      page,
      newsPageSize,
      newsCount,
      loading
    } = this.state;
    if (loading) {
      return <Skeleton />;
    }
    return (
      <>
        <div className="draftHeader">
          <Container>
            <h3>اخبار المنصة</h3>
          </Container>
        </div>
        <div className="platform-news">
          <Container>
            <div className="button-group left cust-d">
              <ButtonDropdown
                className="mr-1"
                isOpen={this.state.dropdownOpen[1]}
                toggle={() => {
                  this.toggle(1);
                }}
              >
                <DropdownToggle caret color="primary">
                  {sortLabel}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() =>
                      this.setState(
                        {
                          sortMode: 'DESC',
                          sortLabel: 'احدث الاخبار'
                        },
                        () => this.getNews()
                      )
                    }
                  >
                    احدث الاخبار
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      this.setState(
                        {
                          sortMode: 'ASC',
                          sortLabel: 'أقدم الاخبار'
                        },
                        () => this.getNews()
                      )
                    }
                  >
                    أقدم الاخبار
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
            <Row>
              {news.map(newsItem => (
                <Col xs="12" md="6">
                  <CardBlog
                    image={newsItem.image}
                    header={newsItem.title}
                    tagId={newsItem.tags.length > 0 && newsItem.tags[0].id}
                    date={moment(newsItem.creatednode * 1000).format(
                      'DD/MM/YYYY'
                    )}
                    content={renderHTML(newsItem.body.substr(0, 200) || '')}
                    blogId={newsItem.id}
                    tag={newsItem.tags.length > 0 && newsItem.tags[0].name}
                    subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                  />
                </Col>
              ))}
            </Row>

            <div className="pagination-container">
              <Pagination
                total={newsCount}
                pageSize={newsPageSize}
                current={page}
                onChange={pageCurrent =>
                  this.setState({ page: pageCurrent }, () => this.getNews())
                }
                className="pagination"
                itemRender={this.paginagtionItemRender}
              />
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default DecisionDraft;
