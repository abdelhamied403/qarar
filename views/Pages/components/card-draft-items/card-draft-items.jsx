import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardFooter,
  CardBody,
  Button,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  UncontrolledCollapse
} from 'reactstrap';
import renderHTML from 'react-render-html';
import Link from 'next/link';
import { connect } from 'react-redux';

import Api from '../../../../api';

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
      count: Number(this.props.votes)
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
            {item.children && this.renderList(item.children)}
          </>
        </li>
      ))}
    </ul>
  );

  renderItems = list => {
    console.log(list);

    return list.map(item => (
      <>
        <Button
          block
          className="text-right justify-content-start"
          color="primary"
          id={`i-${item.nid}`}
          style={{ marginBottom: '1rem' }}
        >
          {item.title}
        </Button>
        <UncontrolledCollapse toggler={`#i-${item.nid}`}>
          <Card>
            <CardBody>{renderHTML(item.body_value || '')}</CardBody>
            {item.children && this.renderItems(item.children)}
          </Card>
        </UncontrolledCollapse>
      </>
    ));
  };

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
      subHeaderIcon
    } = this.props;
    const { selected } = this.state;
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
          {this.renderItems(dropdownList)}
          <div className="flex-card">
            {/* 
            <div className="content">
              <div className="header">
                <h4>{header}</h4>
                {subHeader ? (
                  <div className="sub-header">
                    {subHeaderIcon ? (
                      <Media
                        object
                        src={subHeaderIcon}
                        className="icon-small"
                      />
                    ) : (
                      // <i className={subHeaderIcon}></i>
                      ''
                    )}

                    <span>{subHeader} </span>
                  </div>
                ) : (
                  ''
                )}
              </div>
              <div className="moaad">
                <p>
                  {renderHTML(
                    selected.body_value || dropdownList[0].body_value
                  )}
                  {link ? (
                    <Link href={link}>
                      <Button color="link">المزيد</Button>
                    </Link>
                  ) : (
                    ''
                  )}
                </p>
              </div>
            </div> */}
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
            {date ? (
              <span className="date">{date}</span>
            ) : (
              <Link href="/">
                <a color="link" className="btn btn-link">
                  طلب تعديل
                </a>
              </Link>
            )}
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
