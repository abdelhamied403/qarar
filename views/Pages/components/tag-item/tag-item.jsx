import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { tag } = this.props;

    return (
      <div
        onMouseEnter={() => this.setButtonHovered(true)}
        onMouseLeave={() => this.setButtonHovered(false)}
        className="tag-card flex flex-justifiy-center flex-aligen-center"
      >
        <div
          className={
            this.state.isHovered
              ? 'abs-remove-icon flex-show'
              : 'abs-remove-icon'
          }
        >
          <i className="fa fa-remove" />
        </div>
        #{tag}
      </div>
    );
  }
}

TagItem.propTypes = propTypes;
TagItem.defaultProps = defaultProps;

export default TagItem;
