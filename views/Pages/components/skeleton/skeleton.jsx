import React, { Component } from 'react';
import dynamic from 'next/dynamic';
import { Container, Col, Row } from 'reactstrap';

class SkeletonCustom extends Component {
  state = {
    skeleton: null
  };

  componentDidMount() {
    const { details } = this.props;
    const Skeleton = dynamic(() => import('react-loading-skeleton'));

    this.setState({
      skeleton: details ? (
        <>
          <Container className="mt-5 pt-5">
            <div className="dc-details-header">
              <Row>
                <Col sm="12" md="8" lg="9">
                  <div className="header-content">
                    <h2>
                      <Skeleton height={40} count={1} />
                    </h2>
                    <div className="sub-header">
                      <Skeleton count={1} width={200} />
                    </div>
                    <div className="button-group">
                      <Skeleton count={1} />
                    </div>
                  </div>
                </Col>
                <Col sm="12" md="4" lg="3">
                  <div className="cards">
                    <Row>
                      <Col xs="6">
                        <Skeleton height={40} count={1} />
                      </Col>
                      <Col xs="6">
                        <Skeleton height={40} count={1} />
                      </Col>
                      <Col xs="12">
                        <Skeleton height={40} count={1} />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="description">
              <h5>
                <Skeleton width={500} height={40} count={1} />
              </h5>
              <Skeleton count={10} />
            </div>
          </Container>
        </>
      ) : (
        <>
          <Container className="mt-5 pt-5">
            <div className="dc-details-header">
              <Row>
                <Col sm="12" md="8" lg="8">
                  <div className="header-content">
                    <h2>
                      <Skeleton height={20} count={1} />
                    </h2>
                  </div>
                </Col>
                <Col sm="12" md="12" lg="12">
                  <div className="cards">
                    <Row>
                      <Col xs="12">
                        <Skeleton count={5} />
                      </Col>
                      <Col xs="12">
                        <Skeleton count={5} />
                      </Col>
                      <Col xs="12">
                        <Skeleton count={5} />
                      </Col>
                      <Col xs="12">
                        <Skeleton count={5} />
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      )
    });
  }

  render() {
    const { skeleton } = this.state;
    return skeleton;
  }
}

export default SkeletonCustom;
