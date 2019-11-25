import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Media,
  InputGroupButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';

import './card-points-edit.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class CardPointsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { isHovered: false };
  }

  async setButtonHovered(state) {
    if (this.props.noHover) return;
    await this.setState({
      isHovered: state
    });
  }

  render() {
    // eslint-disable-next-line
    const { avatar, name, points } = this.props;
    if (!this.props.isWaiting) {
      return (
        <div
          onMouseEnter={() => this.setButtonHovered(true)}
          onMouseLeave={() => this.setButtonHovered(false)}
          className="custom-card flex flex-justifiy-center flex-aligen-center"
        >
          <div
            className={
              this.state.isHovered
                ? 'abs-remove-icon flex-show'
                : 'abs-remove-icon'
            }
          >
            <i className="fa fa-remove"></i>
          </div>
          <div className="image">
            <Media className="icon-image" object src={avatar} />
          </div>
          <div className="info flex flex-col">
            <h6>{name}</h6>
            <span className="sub-header">{points} نقطة</span>
          </div>
        </div>
      );
    }
    return (
      <>
        <div className="flex flex-col card-dark-wait">
          <h6>{name}</h6>
          <span className="sub-header">بانتظار الموافقة</span>
          <div className="flex flex-justifiy-end gray">
            <InputGroupButtonDropdown
              isOpen={this.state.fourth}
              toggle={() => {
                this.setState({ fourth: !this.state.fourth });
              }}
            >
              <DropdownToggle
                className="gray"
                color="link"
                style={{ height: 'auto', width: '5px' }}
              >
                <i className="fa fa-ellipsis-h"></i>
              </DropdownToggle>
              <DropdownMenu className={this.state.fourth ? 'show' : ''}>
                <DropdownItem>اعادة ارسال</DropdownItem>
                <DropdownItem>الغاء الدعوة</DropdownItem>
              </DropdownMenu>
            </InputGroupButtonDropdown>
          </div>
        </div>
      </>
    );
  }
}

CardPointsEdit.propTypes = propTypes;
CardPointsEdit.defaultProps = defaultProps;

export default CardPointsEdit;
