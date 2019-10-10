import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Card, Button, Media } from 'reactstrap';
import './text-box.css';
import BoldFont from '../../../../assets/img/bold-icon.svg';
import Underline from '../../../../assets/img/underline-icon.svg';
import AttachmentFile from '../../../../assets/img/attachment-icon.svg';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class TextBox extends Component {
  render() {
    // eslint-disable-next-line
    const { header, alertMsg, placeholder, outline, primary } = this.props;

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
            placeholder={placeholder}
          />
          <div className="flex-tools">
            <div>
              <span className="icon">
                <Media object src={AttachmentFile} className="icon-media" />
              </span>
              <span className="icon">
                <Media object src={Underline} className="icon-media" />
              </span>
              <span className="icon">
                <Media object src={BoldFont} className="icon-media" />
              </span>
            </div>
            <div>
              <Button color="link">{outline}</Button>
              <Button color="primary">{primary}</Button>
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
