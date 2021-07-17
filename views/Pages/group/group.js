import React, { Component } from 'react';
import './group.css';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  Button,
  Media
} from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import avatar from '../../../assets/img/avatar.png';
const ClientSidebar = React.lazy(() =>
  import('../../../containers/ClientLayout/ClientSidebar')
);
const CardPointsEdit = React.lazy(() =>
  import('../components/card-points-edit/cards-points-edit')
);
const TagItem = React.lazy(() => import('../components/tag-item/tag-item'));
const ListItem = React.lazy(() => import('../components/list-item/list-item'));
class Group extends Component {
  render() {
    return (
      <React.Fragment>
        <ClientSidebar />
        <div className="group">
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link exact to="/client/landing" tag={RRNavLink}>
                  لوحة التحكم
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link exact to="/client/landing" tag={RRNavLink}>
                  مجموعاتي
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>النقل و المواصلات</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-25-b">
              <h2>النقل و المواصلات</h2>
            </div>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-25-b">
                  <h6>النقل و المواصلات</h6>
                </div>
                <div className="flex flex-col flex-justifiy-end">
                  وصف المجموعة - لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
                  يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات
                  دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
                  أكسير سيتاشن يللأمكو لابورأس نيسي.
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-25-b">
                  <h6>أعضاء المجموعة</h6>
                  <Button
                    exact
                    to="/client/landing"
                    tag={RRNavLink}
                    color="primary"
                    outline
                  >
                    عرض الكل{' '}
                  </Button>
                </div>
                <div className="flex flex-users-card-edit">
                  <CardPointsEdit
                    avatar={avatar}
                    name="كامل حمد"
                    points="1200"
                  />
                  <CardPointsEdit
                    avatar={avatar}
                    name="كامل حمد"
                    points="1200"
                  />
                  <CardPointsEdit
                    avatar={avatar}
                    name="كامل حمد"
                    points="1200"
                  />
                  <CardPointsEdit
                    avatar={avatar}
                    name="كامل حمد"
                    points="1200"
                  />
                  <CardPointsEdit
                    avatar={avatar}
                    name="كامل حمد"
                    points="1200"
                  />
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not card-no-padding">
                <div className="flex flex-justifiy-sp m-25-b">
                  <h6 className="sub-header">تشريعات أسندت للمجموعة</h6>
                  <Button
                    exact
                    to="/client/me/award-item"
                    tag={RRNavLink}
                    color="primary"
                    outline
                  >
                    عرض الكل
                  </Button>
                </div>
                <div className="dark-card-item">
                  <div className="flex flex-justifiy-sp m-25-b">
                    <h6>النقل و المواصلات</h6>
                  </div>
                  <div className="flex flex-col">
                    <p>سياسة السماح باستيراد السيارات الكهربائية.</p>
                    <div className="flex flex-justifiy-sp flex-align-center">
                      <p className="danger">
                        تمت دعوتك من قبل الوزارة للاشتراك بنقاش هذه المجموعة
                        المختصة المتعلق بسياسة (اسم السياسة). يغلق التصويت
                        بتاريخ 24/9/2019
                      </p>
                      <Button
                        exact
                        to="/client/me/invitaion"
                        tag={RRNavLink}
                        color="primary"
                      >
                        قبول الدعوة
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="flex flex-justifiy-sp m-25-b">
                    <h6>النقل و المواصلات</h6>
                  </div>
                  <div className="flex flex-justifiy-sp">
                    <p>سياسة السماح باستيراد السيارات الكهربائية.</p>
                    <div className="sub-header">
                      أغلق التصويت بتاريخ 25/8/2019
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="flex flex-justifiy-sp m-25-b">
                    <h6>النقل و المواصلات</h6>
                  </div>
                  <div className="flex flex-justifiy-sp">
                    <p>سياسة السماح باستيراد السيارات الكهربائية.</p>
                    <div className="sub-header">
                      أغلق التصويت بتاريخ 25/8/2019
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Group;
