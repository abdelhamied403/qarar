import React, { Component } from 'react';
import './follow.css';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Button,
  Media
} from 'reactstrap';
import { connect } from 'react-redux';
import Link from 'next/link';

import ClientSidebar from '../../../layout/ClientSidebar';
import CardPointsEdit from '../components/card-points-edit/cards-points-edit';
import TagItem from '../components/tag-item/tag-item';
import ListItem from '../components/list-item/list-item';
import Api from '../../../api';

class Follow extends Component {
  constructor() {
    super();
    this.state = {
      drafts: [],
      tags: [],
      users: []
    };
  }

  componentDidMount() {
    this.getDrafts();
    this.getUsers();
    this.getTags();
  }

  getDrafts = async () => {
    const { uid } = this.props;
    const response = await Api.get(
      `/qarar_api/flag/entities/${uid}/follow/draft/5/DESC/1?_format=json`
    );
    if (response.ok) {
      this.setState({ drafts: response.data });
    }
  };

  getUsers = async () => {
    const { uid } = this.props;
    const response = await Api.get(
      `/qarar_api/flag/entities/${uid}/follow_user/user/5/DESC/1?_format=json`
    );
    if (response.ok) {
      this.setState({ users: response.data });
    }
  };

  getTags = async () => {
    const { uid } = this.props;
    const response = await Api.get(
      `/qarar_api/flag/entities/${uid}/follow_tag/tag/5/DESC/1?_format=json`
    );
    if (response.ok) {
      this.setState({ tags: response.data });
    }
  };

  render() {
    const { users, tags, drafts } = this.state;
    return (
      <>
        <ClientSidebar />
        <div className="follow">
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/me/about">
                  <a>لوحة التحكم</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>متابعاتي</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-25-b">
              <h2>متابعاتي</h2>
            </div>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-25-b">
                  <h6>المسودات</h6>
                  <Button to="/client/me/follow-item" color="primary" outline>
                    عرض و تعديل
                  </Button>
                </div>
                <div className="flex flex-col">
                  {drafts.map(item => (
                    <ListItem
                      key={item.id}
                      header="سياسة السماح باستيراد السيارات الكهربائية"
                      btnText="ايقاف المتابعة"
                      btnColor="danger"
                    />
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-25-b">
                  <h6>المستخدمين</h6>
                  <Button
                    exact
                    to="/client/me/follow-item"
                    color="primary"
                    outline
                  >
                    عرض و تعديل
                  </Button>
                </div>
                <div className="flex flex-users-card-edit">
                  {users.map(item => (
                    <CardPointsEdit
                      key={item.id}
                      avatar={item.picture || '/static/img/avatar.png'}
                      name={item.full_name}
                      points="1200"
                    />
                  ))}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-25-b">
                  <h6>الكلمات الدلالية</h6>
                  <Button
                    exact
                    to="/client/me/follow-item"
                    color="primary"
                    outline
                  >
                    عرض و تعديل
                  </Button>
                </div>
                <div className="tags-container flex flex-aligen-center">
                  {tags.map(item => (
                    <TagItem key={item.id} tag={item.name} />
                  ))}
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ uid }) => ({ uid });
export default connect(mapStateToProps)(Follow);
