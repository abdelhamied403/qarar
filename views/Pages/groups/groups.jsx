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
import ClientSidebar from '../../../layout/ClientSidebar';
import './groups.css';

class Groups extends Component {
  render() {
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

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-25-b">
                  <Link exact to="/client/me/group-details">
                    النقل و المواصلات
                  </Link>
                </div>
                <div className="flex flex-col">
                  <p>
                    وصف المجموعة - لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور
                    أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت
                    لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم
                    فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي.
                  </p>
                  <div className="flex flex-justifiy-sp flex-align-center">
                    <p className="danger">
                      تمت دعوتك من قبل الوزارة للاشتراك بنقاش هذه المجموعة
                      المختصة المتعلق بسياسة (اسم السياسة). يغلق التصويت بتاريخ
                      24/9/2019
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

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-25-b">
                  <Link href="/me/group-details">
                    <a>السياحة</a>
                  </Link>
                </div>
                <div className="flex flex-col">
                  <p>
                    وصف المجموعة - لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور
                    أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت
                    لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم
                    فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="card-not">
                <div className="flex flex-justifiy-sp m-25-b">
                  <Link href="/me/group-details">
                    <a>السيارات</a>
                  </Link>
                </div>
                <div className="flex flex-col">
                  <p>
                    وصف المجموعة - لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور
                    أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت
                    لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم
                    فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Container>
        </div>
      </>
    );
  }
}

export default Groups;
