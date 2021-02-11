import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';

import './tag-item.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class TagItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  async setButtonHovered(state) {
    await this.setState({
      isHovered: state
    });
  }

  render() {
    // eslint-disable-next-line
    const { tag, btnClick } = this.props;

    return (
      <div
        onMouseEnter={() => this.setButtonHovered(true)}
        onMouseLeave={() => this.setButtonHovered(false)}
        className="tag-card flex flex-justifiy-center flex-aligen-center"
      >
        <button
          onClick={() => {
            this.setState({ loading: true });
            if (btnClick) {
              btnClick();
            }
          }}
          className={
            this.state.isHovered
              ? 'abs-remove-icon flex-show'
              : 'abs-remove-icon'
          }
        >
          <i className="fa fa-remove" />
        </button>
        #{tag}
        {this.state.loading && (
          <ReactLoading
            className="mx-1 text-danger"
            type="spin"
            color="#f86c6b"
            height={20}
            width={20}
          />
        )}
      </div>
    );
  }
}

TagItem.propTypes = propTypes;
TagItem.defaultProps = defaultProps;

export default TagItem;
