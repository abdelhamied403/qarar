import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Card, Button, Media } from 'reactstrap';
import Link from 'next/link';

import './text-box.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class TextBox extends Component {
  render() {
    // eslint-disable-next-line
    const {
      header,
      alertMsg,
      placeholder,
      outline,
      primary,
      onPrimaryButtonClick,
      onInputChange,
      inputValue
    } = this.props;

    return (
      <div className="text-box">
        <div className="flex-box-header">
          <h6>{header}</h6>
          <span>{alertMsg}</span>
        </div>
        <Card>
          <Input
            type="textarea"
            name="textarea-input"
            rows="9"
            value={inputValue}
            placeholder={placeholder}
            onChange={onInputChange}
          />
          <div className="flex-tools">
            <div>
              <span className="icon">
                <Media
                  object
                  src="/static/img/attachment-icon.svg"
                  className="icon-media"
                />
              </span>
              <span className="icon">
                <Media
                  object
                  src="/static/img/underline-icon.svg"
                  className="icon-media"
                />
              </span>
              <span className="icon">
                <Media
                  object
                  src="/static/img/bold-icon.svg"
                  className="icon-media"
                />
              </span>
            </div>
            <div>
              <Link href="/terms">
                <Button color="link">{outline}</Button>
              </Link>
              <Button onClick={onPrimaryButtonClick} color="primary">
                {primary}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

TextBox.propTypes = propTypes;
TextBox.defaultProps = defaultProps;

export default TextBox;
