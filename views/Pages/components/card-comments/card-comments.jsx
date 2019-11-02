import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardImg, Button, Input } from 'reactstrap';

import './card-comments.css';

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class CardComments extends Component {
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
                      src={ca.avatar}
                      alt="Card image cap"
                    />
                    <div className="user-info">
                      <span className="name">{ca.name}</span>
                    </div>
                  </div>
                  <div className="comment">
                    <div className="flex-contet-comment">
                      <p>{ca.content}</p>
                      <div>
                        <i className="fa fa-heart primary-icon" />
                      </div>
                    </div>
                    <div>
                      {ca.like || 0}
                      <i className="fa fa-heart" />
                      {ca.share || 0}
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
                          src={caShild.avatar}
                          alt="Card image cap"
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
                          {caShild.like || 0} <i className="fa fa-heart" />
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

export default CardComments;
