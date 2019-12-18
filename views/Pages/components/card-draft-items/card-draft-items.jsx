import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardFooter,
  CardBody,
  Button,
  DropdownItem,
  Media,
  Collapse,
  Col,
  Row,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap';
import renderHTML from 'react-render-html';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';
import Scrollspy from 'react-scrollspy';
import CardComments from '../card-comments/card-comments';
import Api from '../../../../api';
import CommentForm from '../CommentForm';
import LikeButtons from '../LikeButtons';

const Scrollbar = dynamic(() => import('react-scrollbar'), {
  ssr: false
});

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class CardDraft extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      selected: {},
      dropdownOpen: new Array(6).fill(false),
      isVoted: false,
      voting: {
        up: false,
        down: false
      },
      count: Number(this.props.votes),
      collapse: []
    };
  }

  setContent() {
    return this.props.content;
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
  }

  vote = async type => {
    const { id, uid, accessToken, refetch } = this.props;
    const item = {
      type,
      action: 'flag',
      id,
      uid
    };
    const response = await Api.post(`/qarar_api/flag?_format=json`, item, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      if (refetch) {
        refetch();
      }
    }
  };

  renderList = (list, className = '') => (
    <ul className={`list-unstyled pb-0 mb-0 ${className}`}>
      {list.map(item => (
        <li>
          <>
            <DropdownItem
              className="border-bottom"
              onClick={() => this.setState({ selected: item })}
              key={item.id}
              value={item}
            >
              {item.title}
            </DropdownItem>
            {/* item.children && this.renderList(item.children) */}
          </>
        </li>
      ))}
    </ul>
  );

  vote = async (type, id) => {
    const { uid, accessToken } = this.props;
    const { voting } = this.state;
    const item = {
      type,
      action: voting[type === 'like' ? 'up' : 'down'] ? 'unflag' : 'flag',
      id,
      uid
    };
    const item2 = {
      type: type === 'like' ? 'dislike' : 'like',
      action: 'unflag',
      id,
      uid
    };
    await Api.post(`/qarar_api/flag?_format=json`, item2, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const response = await Api.post(`/qarar_api/flag?_format=json`, item, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      this.getIsFlagged();
    }
  };

  getIsFlagged = async id => {
    const { uid } = this.props;
    const { voting } = this.state;
    const response = await Api.post(`/qarar_api/isflagged?_format=json`, {
      type: 'like',
      uid,
      id
    });
    const response2 = await Api.post(`/qarar_api/isflagged?_format=json`, {
      type: 'dislike',
      uid,
      id
    });
    if (response.ok && response2.ok) {
      this.setState({
        voting: {
          ...voting,
          up:
            response.data && response.data.data
              ? response.data.data.flagged
              : false,
          down:
            response2.data && response2.data.data
              ? response2.data.data.flagged
              : false
        }
      });
    }
  };

  renderItems = (list, className = '', opacity = 1) => (
    <ul className={`list-unstyled pb-0 mb-0 ${className}`}>
      {list.map((item, index) => {
        const { uid } = this.props;
        const { collapse } = this.state;
        return (
          <li>
            <Scrollspy
              items={['items-title']}
              className={className}
              offset={-200}
              currentClassName="remove-current"
            >
              <Scrollspy
                items={[`b-${item.nid}`]}
                className={className}
                offset={-200}
                currentClassName="container is-current d-block"
              >
                <Button
                  block
                  className="text-right justify-content-start d-none"
                  color="primary"
                  id={`i-${item.nid}`}
                  onClick={() => {
                    if (collapse.indexOf(`i-${item.nid}`) !== -1) {
                      this.setState({
                        collapse: collapse.filter(
                          citem => citem !== `i-${item.nid}`
                        )
                      });
                    } else {
                      this.setState({
                        collapse: [...collapse, `i-${item.nid}`]
                      });
                    }
                  }}
                  style={{
                    marginBottom: '1rem',
                    opacity,
                    zIndex: 1000 - index
                  }}
                >
                  {item.title}
                  <img
                    style={{ width: 20, height: 20, margin: 10 }}
                    alt="comments count"
                    src="/static/img/comment-white.png"
                  />
                  {item.comments}
                </Button>
              </Scrollspy>
            </Scrollspy>
            <Button
              block
              className="text-right justify-content-start"
              color="primary"
              id={`i-${item.nid}`}
              onClick={() => {
                if (collapse.indexOf(`i-${item.nid}`) !== -1) {
                  this.setState({
                    collapse: collapse.filter(
                      citem => citem !== `i-${item.nid}`
                    )
                  });
                } else {
                  this.setState({
                    collapse: [...collapse, `i-${item.nid}`]
                  });
                }
              }}
              style={{
                marginBottom: '1rem',
                opacity,
                zIndex: 1000 - index
              }}
            >
              {item.title}
              <img
                style={{ width: 20, height: 20, margin: 10 }}
                alt="comments count"
                src="/static/img/comment-white.png"
              />
              {item.comments}
            </Button>
            <Collapse isOpen={collapse.indexOf(`i-${item.nid}`) !== -1}>
              <Card id={`b-${item.nid}`} style={{ borderWidth: opacity * 1 }}>
                <Row>
                  <Col md={7}>
                    <CardBody>{renderHTML(item.body_value || '')}</CardBody>
                  </Col>
                  <Col
                    style={{
                      height: '278px',
                      overflowY: 'auto'
                    }}
                    md={5}
                  >
                    <Scrollbar
                      speed={0.8}
                      className="position-relative"
                      contentClassName="content"
                      horizontal={false}
                    >
                      <CardBody>
                        <div
                          style={{ left: 15 }}
                          className="position-absolute bg-white"
                        >
                          <LikeButtons
                            likes={item.likes}
                            dislikes={item.likes}
                            flag={item.flag}
                            id={item.nid}
                          />
                        </div>
                        <CommentForm nid={item.nid} />
                      </CardBody>
                      <CardBody>
                        <CardComments nid={item.nid} commentsArray={[]} />
                      </CardBody>
                    </Scrollbar>
                  </Col>
                  {/* item.children &&
                    this.renderItems(item.children, '', opacity - 0.1) */}
                </Row>
              </Card>
            </Collapse>
          </li>
        );
      })}
    </ul>
  );

  render() {
    // eslint-disable-next-line
    const {
      header,
      subHeader,
      content,
      tags,
      votes,
      date,
      link,
      borderColor,
      dropdownList,
      subHeaderIcon,
      selected
    } = this.props;
    return (
      <Card className="card-draft" style={{ borderRightColor: borderColor }}>
        <CardBody>
          {/* dropdownList && dropdownList.length > 0 ? (
            <div className="dec-details">
              <UncontrolledDropdown>
                <DropdownToggle caret>
                  {selected.title || dropdownList[0].title}
                </DropdownToggle>
                <DropdownMenu>
                  {this.renderList(dropdownList, 'p-0 m-0')}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          ) : (
            ''
          ) */}

          <div className="flex-card">
            <div className="content">
              <div id="items-title" className="header">
                <h4>
                  {selected.title}
                  {dropdownList.length ? (
                    <span className="float-right">
                      <Button
                        onClick={() =>
                          this.setState({
                            collapse: dropdownList.map(item => `i-${item.nid}`)
                          })
                        }
                        className="mx-2"
                        color="primary"
                      >
                        فتح الكل
                      </Button>
                      <Button
                        onClick={() => this.setState({ collapse: [] })}
                        className="mx-2"
                        color="primary"
                      >
                        إغلاق الكل
                      </Button>
                    </span>
                  ) : null}
                </h4>
                <span>{subHeader} </span>
              </div>
              <div className="moaad">
                <p>{renderHTML(selected.body_value || '')}</p>
              </div>
            </div>
            {votes ? (
              <div className="side">
                <h5>أبدِ رأيك</h5>

                <div className="like-dis">
                  <div
                    onClick={() => this.vote('like')}
                    className={this.state.voting.up ? 'voting' : ''}
                  >
                    <Media
                      object
                      src={
                        this.state.voting.up
                          ? '/static/img/Icon - dropdown - arrow down-white.svg'
                          : '/static/img/Icon - dropdown - arrow down.svg'
                      }
                    />
                  </div>
                  <div
                    onClick={() => this.vote('dislike')}
                    className={this.state.voting.down ? 'voting' : ''}
                  >
                    <Media
                      object
                      src={
                        this.state.voting.down
                          ? '/static/img/Icon - dropdown - arrow down Copy-white.svg'
                          : '/static/img/Icon - dropdown - arrow down Copy.svg'
                      }
                    />
                  </div>
                </div>

                <span className="vote">{this.state.count} صوت</span>
              </div>
            ) : (
              ''
            )}
          </div>
          {this.renderItems(dropdownList, 'p-0 m-0')}
        </CardBody>
        <CardFooter>
          <div className="footer-card">
            <div className="tags">
              {tags.map(t => {
                return (
                  <Link href={`/tag/${t.id}`}>
                    <a className="sub-header">#{t.tag}</a>
                  </Link>
                  // <span></span>
                );
              })}
            </div>
            {/* date ? (
              <span className="date">{date}</span>
            ) : (
              <Link href="/">
                <a color="link" className="btn btn-link">
                  طلب تعديل
                </a>
              </Link>
            ) */}
          </div>
        </CardFooter>
      </Card>
    );
  }
}

CardDraft.propTypes = propTypes;
CardDraft.defaultProps = defaultProps;

const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(CardDraft);
