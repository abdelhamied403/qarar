import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardFooter,
  CardBody,
  Button,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';
import renderHTML from 'react-render-html';
import Link from 'next/link';

import './card-draft-details.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class CardDraftDetails extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(6).fill(false)
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
  }

  render() {
    // eslint-disable-next-line
    const {
      header,
      subHeader,
      content,
      tags,
      dropdownList,
      borderColor,
      date
    } = this.props;

    return (
      <Card
        className="card-draft-details"
        style={{ borderRightColor: borderColor }}
      >
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
              <Col xs="12">
                <div className="header">
                  <h4>{header}</h4>
                  {subHeader ? (
                    <div>
                      <i className="icon-like icons " />
                      <span>{subHeader} </span>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </Col>
              <div className="moaad">
                <Col xs="12" md="10">
                  {renderHTML(content)}
                </Col>
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter>
          <div className="footer-card">
            <Col xs="10" md="10">
              <div className="tags">
                {tags.map(t => {
                  return (
                    <Link href={`/tag/${t.id}`}>
                      <a className="sub-header">#{t.tag}</a>
                    </Link>
                  );
                })}
              </div>
            </Col>

            {date ? (
              <span className="date">{date}</span>
            ) : (
              <Link href="/">
                <Button color="link">طلب تعديل</Button>
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  }
}

CardDraftDetails.propTypes = propTypes;
CardDraftDetails.defaultProps = defaultProps;

export default CardDraftDetails;
