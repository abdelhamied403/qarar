import React, { Component } from 'react';
import {
  PaginationItem,
  PaginationLink,
  Container,
  Col,
  Row,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import Pagination from 'rc-pagination';
import moment from 'moment';

import CardDraft from '../components/card-draft/card-draft';

import './tag-details.css';

import Api from '../../../api';

class TagDetails extends Component {
  constructor() {
    super();
    this.state = {
      tag: {},
      count: 0,
      data: [],
      page: 1,
      pageSize: 10,
      flagged: false,
      loading: true,
      skeleton: null
    };
  }

  componentDidMount() {
    const Skeleton = dynamic(() => import('react-loading-skeleton'));

    this.setState({
      skeleton: (
        <>
          <Container className="mt-5 pt-5">
            <div className="dc-details-header">
              <Row>
                <Col sm="12" md="8" lg="8">
                  <div className="header-content">
                    <h2>
                      <Skeleton height={20} count={1} />
                    </h2>
                  </div>
                </Col>
                <Col sm="12" md="12" lg="12">
                  <div className="cards">
                    <Row>
                      <Col xs="12">
                        <Skeleton count={5} />
                      </Col>
                      <Col xs="12">
                        <Skeleton count={5} />
                      </Col>
                      <Col xs="12">
                        <Skeleton count={5} />
                      </Col>
                      <Col xs="12">
                        <Skeleton count={5} />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      )
    });
    this.getTag();
    this.getData();
    this.isFollowed();
  }

  getTag = async () => {
    const { tagId } = this.props;
    const response = await Api.get(
      `/qarar_api/load/term/${tagId}?_format=json`
    );
    if (response.ok) {
      this.setState({ tag: response.data });
    }
  };

  getData = async () => {
    const { tagId } = this.props;
    const { page, pageSize } = this.state;
    const response = await Api.get(
      `/qarar_api/tag_data/${tagId}/all/${pageSize}/DESC/${page}?_format=json`
    );
    if (response.ok) {
      this.setState({
        loading: false,
        count: response.data ? response.data.count : 0,
        data: response.data ? response.data.data : []
      });
    }
  };

  isFollowed = async () => {
    const { uid, tagId } = this.props;
    const response = await Api.post(`/qarar_api/isflagged?_format=json`, {
      type: 'follow_tag',
      uid,
      id: tagId
    });

    if (response.ok) {
      try {
        const {
          data: {
            data: { flagged }
          }
        } = response;
        this.setState({ flagged });
      } catch (error) {
        this.setState({ flagged: false });
      }
    }
  };

  follow = async () => {
    const { uid, accessToken, tagId } = this.props;
    const { flagged } = this.state;
    const data = {
      type: 'follow_tag',
      action: flagged ? 'unflag' : 'flag',
      id: tagId,
      uid
    };
    const response = await Api.post(`/qarar_api/flag?_format=json`, data, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      this.isFollowed();
    }
  };

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
      tag,
      page,
      pageSize,
      count,
      data,
      flagged,
      loading,
      skeleton
    } = this.state;
    const { uid } = this.props;
    if (loading) {
      return skeleton;
    }

    return (
      <>
        <div className="tag-detailsHeader">
          <Container>
            <div className="flex flex-justifiy-sp">
              <h3>#{tag.name}</h3>
              {uid && (
                <Button
                  color="primary"
                  onClick={() => this.follow()}
                  outline={!flagged}
                >
                  {flagged ? 'إلغاء المتابعة' : 'متابعة'}
                </Button>
              )}
            </div>
          </Container>
        </div>
        <section>
          <Container>
            <Row>
              {data.map(item => {
                let link = '/';
                switch (item.type) {
                  case 'news':
                    link = `/news-details/${item.id}`;
                    break;
                  case 'drafts':
                    link = `/draft-details/${item.id}`;
                    break;
                  case 'items':
                    link = `/item-details/${item.id}`;
                    break;
                  default:
                    break;
                }
                return (
                  <Col key={item.id} xs="12">
                    <CardDraft
                      header={item.title}
                      subHeader={moment(item.creatednode * 1000).format(
                        'YYYY-MM-DD'
                      )}
                      content={`${item.body && item.body.substr(0, 120)} ...`}
                      date=" "
                      link={link}
                      tags={
                        item.tags
                          ? item.tags.map(tagItem => ({
                              tag: tagItem.name,
                              id: tagItem.id
                            }))
                          : []
                      }
                    />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </section>
        <Container>
          <div className="pagination-container">
            <Pagination
              total={count}
              pageSize={pageSize}
              current={page}
              onChange={pageCurrent =>
                this.setState({ page: pageCurrent }, () => this.getData())
              }
              className="pagination"
              itemRender={this.paginagtionItemRender}
            />
          </div>
        </Container>
      </>
    );
  }
}
const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(TagDetails);
