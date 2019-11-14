import React, { Component } from 'react';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Button,
  Media
} from 'reactstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import ClientSidebar from '../../../layout/ClientSidebar';
import './groups.css';
import api from '../../../api';

class Groups extends Component {
  constructor() {
    super();
    this.state = {
      groups: []
    };
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups = async () => {
    const { uid } = this.props;
    const response = await api.get(
      `/qarar_api/profile/${uid}/groups/5/DESC/1?_format=json`
    );
    if (response.ok) {
      this.setState({ groups: response.data });
    }
  };

  render() {
    const { groups } = this.state;
    return (
      <>
        <ClientSidebar />
        <div className="groups">
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/me/about">
                  <a>لوحة التحكم</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>مجموعاتي</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-25-b">
              <h2>مجموعاتي</h2>
            </div>

            {groups.map(item => (
              <Card key={item.id}>
                <CardBody className="card-not">
                  <div className="flex flex-justifiy-sp m-25-b">
                    <Link exact to="/client/me/group-details">
                      {item.title}
                    </Link>
                  </div>
                  <div className="flex flex-col">
                    <p>{item.body}</p>
                    <div className="flex flex-justifiy-sp flex-align-center">
                      <p className="danger">
                        تمت دعوتك من قبل الوزارة للاشتراك بنقاش هذه المجموعة
                        المختصة المتعلق بسياسة (اسم السياسة). يغلق التصويت
                        بتاريخ 24/9/2019
                      </p>
                      <Button
                        exact
                        to="/client/me/invitaion"
                        color="primary"
                        outline
                      >
                        قبول الدعوة
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ uid, token }) => ({ uid, token });
export default connect(mapStateToProps)(Groups);
