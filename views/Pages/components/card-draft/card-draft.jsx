import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardFooter,
  CardBody,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media
} from 'reactstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';
import Api from '../../../../api';
import './card-draft.css';
import { translate } from '../../../../utlis/translation';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class CardDraft extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(6).fill(false),
      isVoted: false,
      voting: {
        up: false,
        down: false
      },
      count: Number(this.props.votes)
    };
  }

  componentDidMount() {
    // this.getIsFlagged();
    const { liked, disliked } = this.props;
    if (liked && disliked) {
      this.setState({
        voting: {
          up: liked.flagged,
          down: disliked.flagged
        }
      });
    }
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

  getIsFlagged = async () => {
    const { id, uid, accessToken } = this.props;
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
      type
    } = this.props;

    return (
      <Card className="card-draft" style={{ borderRightColor: borderColor }}>
        <CardBody>
          {dropdownList && dropdownList.length > 0 ? (
            <div className="dec-details">
              <Dropdown
                isOpen={this.state.dropdownOpen[0]}
                toggle={() => {
                  this.toggle(0);
                }}
              >
                <DropdownToggle caret>{dropdownList[0]}</DropdownToggle>
                <DropdownMenu>
                  {dropdownList.map(dl => {
                    return <DropdownItem>{dl}</DropdownItem>;
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            ''
          )}
          <div className="flex-card">
            <div className="content">
              <div className="header">
                {link ? (
                  <Link href={link}>
                    <a>
                      <h4>{header}</h4>
                    </a>
                  </Link>
                ) : (
                  <h4>{header}</h4>
                )}

                {subHeader ? (
                  <div className="sub-header">
                    {subHeaderIcon ? (
                      <Media
                        object
                        src={subHeaderIcon}
                        className="icon-small"
                        dir={translate('dir')}
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
              <div className="text-justify">
                <div>
                  <div className="wrap">{renderHTML(content || '')}</div>
                  {link ? (
                    <Link href={link}>
                      <Button color="link">
                        {translate('cardDraft.more')}
                      </Button>
                    </Link>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            {/* {votes ? (
              <div className="side">
                <h5>{translate('cardDraft.yourOpinion')}</h5>

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

                <span className="vote">
                  {this.state.count}
                  {translate('cardDraft.vote')}
                </span>
              </div>
            ) : (
              ''
            )} */}
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
                  {translate('cardDraft.modificationRequest')}
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
