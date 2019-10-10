import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import './list-item.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  async setButtonHovered(state) {
    await this.setState({
      isHovered: state
    });
    console.log(this.state.isHovered);
  }

  withoutContent(isWide, header, btnColor, btnText) {
    return (
      <div
        className={
          this.state.isHovered
            ? isWide
              ? 'back-hover-dark flex-justifiy-sp flex flex-align-center'
              : 'back-hover-dark flex flex-align-center'
            : 'flex flex-align-center'
        }
      >
        <div>{header}</div>
        <Button
          className={
            this.state.isHovered ? 'danger-link flex-show' : 'danger-link'
          }
          color={btnColor}
          outline
        >
          {btnText}
        </Button>
      </div>
    );
  }

  withContent(isWide, header, btnColor, btnText, content) {
    return (
      <div
        className={
          this.state.isHovered
            ? isWide
              ? 'back-hover-dark flex-justifiy-sp flex flex-align-center'
              : 'back-hover-dark flex flex-align-center'
            : 'flex flex-align-center'
        }
      >
        <div className="header-list-item">{header}</div>
        <div
          className={
            this.state.isHovered
              ? 'flex flex-justifiy-sp flex-align-center wd100'
              : 'hide flex-justifiy-sp flex-align-center wd100'
          }
        >
          <div className="red-contetn">{content}</div>
          <Button
            className={this.state.isHovered ? 'flex-show' : ''}
            color={btnColor}
          >
            {btnText}
          </Button>
        </div>
      </div>
    );
  }

  render() {
    // eslint-disable-next-line
    const { header, content, btnText, btnColor, isWide } = this.props;

    return (
      <div
        onMouseEnter={() => this.setButtonHovered(true)}
        onMouseLeave={() => this.setButtonHovered(false)}
        className="list-item flex flex-aligen-center"
      >
        {content
          ? this.withContent(isWide, header, btnColor, btnText, content)
          : this.withoutContent(isWide, header, btnColor, btnText)}
      </div>
    );
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;
