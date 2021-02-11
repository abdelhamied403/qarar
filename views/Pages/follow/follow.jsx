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
import ReactLoading from 'react-loading';
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
      users: [],
      loading: true
    };
  }

  componentDidMount() {
    this.getDrafts();
    this.getUsers();
    this.getTags();
  }

  getDrafts = async () => {
    const { uid, accessToken } = this.props;
    const response = await Api.get(
      `/qarar_api/flag/entities/${uid}/follow/draft/5/DESC/1?_format=json`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (response.ok) {
      this.setState({ drafts: response.data });
    }
  };

  getUsers = async () => {
    const { uid, accessToken } = this.props;
    const response = await Api.get(
      `/qarar_api/flag/entities/${uid}/follow_user/user/5/DESC/1?_format=json`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (response.ok) {
      this.setState({ users: response.data });
    }
  };

  getTags = async () => {
    const { uid, accessToken } = this.props;
    const response = await Api.get(
      `/qarar_api/flag/entities/${uid}/follow_tag/tag/5/DESC/1?_format=json`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (response.ok) {
      this.setState({ tags: response.data });
    }
  };
  unfollow = async id => {
    const { uid, accessToken } = this.props;
    const data = {
      type: 'follow',
      action: 'unflag',
      id,
      uid
    };
    const response = await Api.post(`/qarar_api/flag?_format=json`, data, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      this.getDrafts();
    }
  };
  unfollowUser = async id => {
    const { uid } = this.props;
    const response = await Api.post(`/qarar_api/flag?_format=json`, {
      type: 'follow_user',
      action: 'unflag',
      id,
      uid
    });
    if (response.ok) {
      this.getUsers();
    }
  };
  unfollowTag = async id => {
    const { uid, accessToken } = this.props;
    const data = {
      type: 'follow_tag',
      action: 'unflag',
      id,
      uid
    };
    const response = await Api.post(`/qarar_api/flag?_format=json`, data, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      this.getTags();
    }
  };
  render() {
    const { users, tags, drafts } = this.state;
    return (
      <>
        <ClientSidebar />
        <div className="aboutheader"></div>
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
                      header={item.title}
                      btnText="ايقاف المتابعة"
                      btnClick={() => this.unfollow(item.id)}
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
                      btnClick={() => this.unfollowUser(item.id)}
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
                    <TagItem
                      key={item.id}
                      tag={item.name}
                      btnClick={() => this.unfollowTag(item.id)}
                    />
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

const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(Follow);
