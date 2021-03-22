import React, { Component } from 'react';
import './decision-draft-details.css';
import {
  Container,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardHeader,
  CardBody,
  Media
} from 'reactstrap';
import CardDraftDetails from '../components/card-draft-details/card-draft-details';
import logo from '../../../assets/img/avatar.png';

import likeIcon from '../../../assets/img/like-icon.svg';
import unlikeIcon from '../../../assets/img/unlike-icon.svg';
import likeIconReflect from '../../../assets/img/like-icon-reflect.svg';

import usersDraft from '../../../assets/img/Icon - draft activity - users.svg';
import calender from '../../../assets/img/Icon - most active - views Copy 3.svg';
import file from '../../../assets/img/Icon - most active - draft.svg';
import like from '../../../assets/img/Icon - most active - views Copy.svg';
import comment from '../../../assets/img/Icon - most active - views Copy 2.svg';
import { translate } from '../../../utlis/translation';

const Breadcrumb = React.lazy(() =>
  import('../components/breadcrumb/breadcrumb')
);
const CardPoints = React.lazy(() =>
  import('../components/card-points/cards-points')
);
const CardInfo = React.lazy(() => import('../components/card-info/card-info'));

class DecisionDraftDetails extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1')
    };
  }

  lorem() {
    return `
    لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي. سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو أنفينتوري فيرأتاتيس #نقل ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو. نيمو أنيم أبسام فوليوباتاتيم كيواي فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت فيوجايت, سيد كيواي كونسيكيونتشر ماجناي دولارس أيوس كيواي راتاشن فوليوبتاتيم سيكيواي نيسكايونت. نيكيو بوررو#نقل كيوايسكيوم ايست,كيواي دولوريم ايبسيوم كيوا دولار #طاقة سايت أميت, كونسيكتيتيور,أديبايسكاي فيلايت, سيد كيواي نون نيومكيوام ايايوس موداي   < يوت لابوري أيت دولار ماجنام`;
  }
  tab1() {
    return (
      <CardDraftDetails
        header="المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل"
        content={
          this.lorem() +
          this.lorem() +
          ' <br /> <br />' +
          this.lorem() +
          this.lorem()
        }
        tags={[{ tag: 'نقل', id: 1 }]}
        date="12/4/2019"
        borderColor="#9D9D9D"
        dropdownList={[
          'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل',
          'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل',
          'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل'
        ]}
      />
    );
  }

  tab2() {
    return (
      <CardDraftDetails
        header="تاريخ التعديلات قبل الارشفة"
        content={
          this.lorem() +
          this.lorem() +
          ' <br /> <br />' +
          this.lorem() +
          this.lorem()
        }
        tags={[{ tag: 'نقل', id: 1 }]}
        date=" "
        borderColor="#9D9D9D"
        dropdownList={[
          'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل',
          'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل',
          'المادة ٢.٦ الاستخدام لمشروط للسيارات التي تعمل بالديزل'
        ]}
      />
    );
  }

  tab3() {
    return (
      <div className="users">
        <Card className="card-users-part">
          <CardHeader>
            <div className="flex-header">
              <h6 className="name">عدد المستخدمين المشاركين في النقاش</h6>
              <div className="points-group">
                <span className="points">3470</span>
                <span className="points-gray">نقطة</span>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <h6>أكثرهم تأثيراً</h6>
            <div className="content">
              <CardPoints
                isDarkCard="true"
                avatar={logo}
                name="كامل حمد"
                points="1200"
                number="2000"
                icon={like}
              />
              <CardPoints
                isDarkCard="true"
                avatar={logo}
                name="كامل حمد"
                points="1200"
                number="2000"
                icon={like}
              />
              <CardPoints
                isDarkCard="true"
                avatar={logo}
                name="كامل حمد"
                points="1200"
                number="2000"
                icon={comment}
              />

              <span className="icon-abs-card">
                <Media object src={usersDraft} className="icon-media" />
              </span>
            </div>
          </CardBody>
        </Card>
        <Card className="card-users-part">
          <CardHeader>
            <div className="flex-header">
              <h6 className="name">عدد الأصوات خلال كل مراحل النقاش</h6>
              <div className="points-group">
                <span className="points">67824</span>
                <span className="points-gray">صوت</span>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <div className="content">
              <div>
                <h6>إيجاباً</h6>
                <CardInfo
                  isDarkCard="true"
                  type="مشترك"
                  number="5523"
                  icon={likeIcon}
                />
              </div>

              <div>
                <h6>سلباً</h6>
                <CardInfo
                  isDarkCard="true"
                  type="مشترك"
                  number="5523"
                  icon={unlikeIcon}
                />
              </div>
              <span className="icon-abs-card">
                {/* <i className={like}></i> */}
                <Media dir={translate('dir')} object src={likeIconReflect} className="icon-small" />
              </span>
            </div>
          </CardBody>
        </Card>
        <Card className="card-users-part">
          <CardHeader>
            <div className="flex-header">
              <h6 className="name">عدد التعليقات خلال كل مراحل النقاش</h6>
              <div className="points-group">
                <span className="points">3470</span>
                <span className="points-gray">تعليق</span>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <h6>أكثرهم تأثيراً</h6>
            <Row>
              <Col sm="12" md="6">
                <CardPoints
                  isDarkCard="true"
                  avatar={logo}
                  name="كامل حمد"
                  points="1200"
                  link="/client/landing"
                  content="سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو أنفينتوري فيرأتاتيس #نقل ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو. ن"
                />
              </Col>
              <Col sm="12" md="6">
                <CardPoints
                  isDarkCard="true"
                  avatar={logo}
                  name="كامل حمد"
                  points="1200"
                  link="/client/landing"
                  content="سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو أنفينتوري فيرأتاتيس #نقل ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو. ن"
                />
              </Col>
              <Col sm="12" md="6">
                <CardPoints
                  isDarkCard="true"
                  avatar={logo}
                  name="كامل حمد"
                  points="1200"
                  link="/client/landing"
                  content="سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو أنفينتوري فيرأتاتيس #نقل ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو. ن"
                />
              </Col>
              <Col sm="12" md="6">
                <CardPoints
                  isDarkCard="true"
                  avatar={logo}
                  name="كامل حمد"
                  points="1200"
                  link="/client/landing"
                  content="سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو أنفينتوري فيرأتاتيس #نقل ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو. ن"
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray
    });
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">{this.tab1()}</TabPane>
        <TabPane tabId="2">{this.tab2()}</TabPane>
        <TabPane tabId="3">{this.tab3()}</TabPane>
      </>
    );
  }

  render() {
    const content = ``;
    return (
      <React.Fragment>
        <Breadcrumb
          title="كل القرارات المؤرشفة"
          link="/client/decision-draft"
        />
        <Container>
          <div className="dc-details-header">
            <Row>
              <Col>
                <div className="header-content">
                  <h2>سياسة استرجاع السيارات الكهربائية</h2>
                  <div className="sub-header">
                    <Media dir={translate('dir')} object src={calender} className="icon-small" />

                    {/* <i className="fa fa-calendar "></i> */}
                    <span>تم إقراره بتاريخ 25/9/2019</span>
                  </div>
                  <div className="sub-header">
                    {/* <i className="fa fa-file "></i> */}
                    <Media dir={translate('dir')} object src={file} className="icon-small" />
                    <span>تم أرشفته بتاريخ 25/9/2019</span>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          <section className="tabs-content decision-draft-details">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => {
                    this.toggle(0, '1');
                  }}
                >
                  الوصف
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => {
                    this.toggle(0, '2');
                  }}
                >
                  تاريخ التعديلات
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === '3'}
                  onClick={() => {
                    this.toggle(0, '3');
                  }}
                >
                  تقرير المشاركة المجتمعية
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </section>
        </Container>
      </React.Fragment>
    );
  }
}

export default DecisionDraftDetails;
