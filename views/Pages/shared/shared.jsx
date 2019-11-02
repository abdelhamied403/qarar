import React, { Component } from 'react';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody
} from 'reactstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import ClientSidebar from '../../../layout/ClientSidebar';

import Api from '../../../api';

import './shared.css';

class Shared extends Component {
  constructor() {
    super();
    this.state = {
      votes: [],
      comments: [],
      likes: []
    };
  }

  componentDidMount() {
    this.getVotes();
    this.getComments();
    this.getLikes();
  }

  getVotes = async () => {
    const { uid } = this.props;
    const response = await Api.get(
      `qarar_api/flag/entities/like/draft/5/DESC/1?_format=json`
    );
    console.log(response);
  };

  getComments = async () => {
    const { uid } = this.props;
    const response = await Api.get(
      `qarar_api/flag/entities/like/draft/5/DESC/1?_format=json`
    );
  };

  getLikes = async () => {
    const { uid } = this.props;
    const response = await Api.get(
      `qarar_api/flag/entities/like/comment/5/DESC/1?_format=json`
    );
  };

  render() {
    return (
      <>
        <ClientSidebar />
        <div className="shared">
          <Container>
            <Breadcrumb className="px-0" listClassName="px-0">
              <BreadcrumbItem>
                <Link href="/client/landing">
                  <a>لوحة التحكم</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>مشاركاتي</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-50-b">
              <h2>مشاركاتي</h2>
            </div>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-50-b">
                  <h6>المسودات التي قمت بالتصويت عليها</h6>
                  <Link href="/me/shared">
                    <a color="primary" outline>
                      عرض الكل
                    </a>
                  </Link>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-50-b">
                  <h6>المسودات التي قمت بالتعليق عليها</h6>
                  <Link href="/me/shared">
                    <a color="primary" outline>
                      عرض الكل
                    </a>
                  </Link>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-50-b">
                  <h6>تعليقات أعجبتني</h6>
                  <Link href="/me/shared">
                    <a color="primary" outline>
                      عرض الكل
                    </a>
                  </Link>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
                <div className="flex flex-no-wrap flex-justifiy-sp flex-aligen-center">
                  <div>
                    حصل أحمد سالم على وسام ذهبي لفوزة وادث السير في الشارع العام
                  </div>
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ uid, token }) => ({ uid, token });
export default connect(mapStateToProps)(Shared);
