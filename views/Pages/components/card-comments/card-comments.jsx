import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardImg, Button, Input } from 'reactstrap';
import { connect } from 'react-redux';
import Api from '../../../../api';
import avatar from '../../../../static/img/avatar.png';
import './card-comments.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class CardComments extends Component {
  flagged = async commentId => {
    const { uid } = this.props;
    const response = await Api.get(
      `/qarar_api/isflagged/follow/${draftId}/${uid}?_format=json`
    );
    // console.log(response);

    if (response.ok) {
      const {
        data: {
          data: { flagged }
        }
      } = response;
      return flagged;
    }
  };

  flag = async (commentId, flagged) => {
    const { uid, token } = this.props;
    const data = {
      type: 'like',
      action: flagged ? 'unflag' : 'flag',
      id: commentId,
      uid
    };
    const response = await Api.post(`/qarar_api/flag?_format=json`, data, {
      headers: { 'X-CSRF-Token': token }
    });
    if (response.ok) {
      this.flagged();
    }
  };

  render() {
    // eslint-disable-next-line
    const { commentsArray } = this.props;

    return (
      <div>
        {commentsArray.map(ca => {
          return (
            <Card className="card-comments">
              <CardBody>
                <div className="comment-container">
                  <div className="flex-header-comments">
                    <CardImg
                      top
                      width="100%"
                      src={ca.owner_image || avatar}
                      alt="Card image cap"
                    />
                    <div className="user-info">
                      <span className="name">{ca.name}</span>
                    </div>
                  </div>
                  <div className="comment">
                    <div className="d-flex align-items-start justify-content-between ">
                      <p>{ca.content}</p>
                      <div>
                        <i className="fa fa-heart primary-icon" />
                      </div>
                    </div>
                    <div>
                      {ca.likes || 0}
                      <i className="fa fa-heart" />
                      {(ca.comments && ca.comments.length) || 0}
                      <i className="fa fa-share" />
                    </div>
                  </div>
                </div>
                {ca.comments.map(caShild => {
                  return (
                    <div className="comment-container sub-comment">
                      <div className="flex-header-comments">
                        <CardImg
                          top
                          width="100%"
                          src={caShild.owner_image || avatar}
                          alt="user"
                        />
                        <div className="user-info">
                          <span className="name">{caShild.name}</span>
                        </div>
                      </div>
                      <div className="comment">
                        <div className="flex-contet-comment">
                          <p>{caShild.content}</p>
                          <div>
                            <i className="fa fa-heart" />
                          </div>
                        </div>
                        <div>
                          {caShild.like || 0}{' '}
                          <i
                            onClick={() => this.flag()}
                            className="fa fa-heart"
                          />
                          {caShild.share || 0} <i className="fa fa-share" />
                        </div>
                      </div>
                    </div>
                  );
                })}
                {ca.comments.length > 0 ? (
                  <div>
                    <div className="input-container">
                      <Input
                        type="text"
                        id="text-input"
                        name="text-input"
                        placeholder="لديك رد على هذا التعليق؟"
                      />
                      <Button color="primary">إرسال</Button>
                    </div>
                    <div className="text-center">
                      <Button color="link">
                        إخفاء التفاصيل
                        <i className="cui-arrow-top icons " />
                      </Button>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
    );
  }
}

CardComments.propTypes = propTypes;
CardComments.defaultProps = defaultProps;
const mapStateToProps = ({ uid, token }) => ({ uid, token });
export default connect(mapStateToProps)(CardComments);
