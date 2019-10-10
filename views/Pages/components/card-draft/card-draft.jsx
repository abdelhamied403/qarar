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

import './card-draft.css';

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

  async vote(v) {
    await this.setState({
      voting: { [v]: true }
    });
    const voteCounter = v === 'up' ? 1 : -1;
    setTimeout(async () => {
      await this.setState({
        isVoted: true,
        count: this.state.count + voteCounter
      });
      await this.setState({
        voting: { [v]: false }
      });
    }, 300);
    console.log(this.state.voting);
  }

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
                  {this.setContent()}
                  {link ? (
                    <Button href={link} tag={Link} color="link">
                      <a className="btn btn-link">المزيد</a>
                    </Button>
                  ) : (
                    ''
                  )}
                </p>
              </div>
            </div>
            {votes ? (
              <div className="side">
                <h5>أبدِ رأيك</h5>
                {!this.state.isVoted ? (
                  <div className="like-dis">
                    <div
                      onClick={() => this.vote('up')}
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
                      onClick={() => this.vote('down')}
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
                ) : (
                  ''
                )}

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
                  <Link href={`/client/tag/${t.id}`}>
                    <a className="sub-header">#{t.tag}</a>
                  </Link>
                  // <span></span>
                );
              })}
            </div>
            {date ? (
              <span className="date">{date}</span>
            ) : (
              <Link href="/" color="link">
                <a className="btn btn-link">طلب تعديل</a>
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

export default CardDraft;
