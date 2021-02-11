import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import ReactLoading from 'react-loading';
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
  }

  withoutContent(isWide, header, btnColor, btnText, btnClick) {
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
        {this.state.loading && (
          <ReactLoading
            className="mx-1 text-danger"
            type="spin"
            color="#f86c6b"
            height={20}
            width={20}
          />
        )}
        <Button
          className={
            this.state.isHovered ? 'danger-link flex-show' : 'danger-link'
          }
          onClick={() => {
            this.setState({ loading: true });
            if (btnClick) {
              btnClick();
            }
          }}
          color={btnColor}
          outline
        >
          {btnText}
        </Button>
      </div>
    );
  }

  withContent(isWide, header, btnColor, btnText, btnClick, content) {
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
            onClick={btnClick}
          >
            {btnText}
          </Button>
        </div>
      </div>
    );
  }

  render() {
    // eslint-disable-next-line
    const { header, content, btnText, btnColor, btnClick, isWide } = this.props;

    return (
      <div
        onMouseEnter={() => this.setButtonHovered(true)}
        onMouseLeave={() => this.setButtonHovered(false)}
        className="list-item flex flex-aligen-center"
      >
        {content
          ? this.withContent(
              isWide,
              header,
              btnColor,
              btnText,
              btnClick,
              content
            )
          : this.withoutContent(isWide, header, btnColor, btnText, btnClick)}
      </div>
    );
  }
}

ListItem.propTypes = propTypes;
ListItem.defaultProps = defaultProps;

export default ListItem;
