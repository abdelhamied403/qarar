import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardFooter,
  CardBody,
  Button,
  Input,
  FormGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  UncontrolledButtonDropdown
} from 'reactstrap';
import renderHTML from 'react-render-html';
import moment from 'moment';
import './decision-edit.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DecisionEdit extends Component {
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
  }

  handleChange(e) {
    this.props.checkBoxChange(e);
  }

  render() {
    // eslint-disable-next-line
    const {
      header,
      subHeader,
      headerDDlist,
      tags,
      votes,
      date,
      link,
      borderColor,
      edits,
      items,
      subHeaderIcon,
      selected,
      setSelected
    } = this.props;
    if (!edits.length) return null;
    return (
      <Card className="decision-edit" style={{ borderRightColor: borderColor }}>
        <CardBody>
          <div className="flex-card">
            <div className="content">
              <h3 className="edit-title">سجل التعديلات</h3>
              <div className="edit-history">
                {edits &&
                  edits.map(edit => (
                    <div className="edit-item">
                      <h2>
                        {moment(edit.creatednode * 1000).format(
                          'dddd, D MMMM YYYY'
                        )}{' '}
                      </h2>
                      <div className="flex">
                        <p className="edit-time">تعديل </p>
                        <p className="edit-paragraph">
                          {renderHTML(edit.body || '')}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

DecisionEdit.propTypes = propTypes;
DecisionEdit.defaultProps = defaultProps;

export default DecisionEdit;
