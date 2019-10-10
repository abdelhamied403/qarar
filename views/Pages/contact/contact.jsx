import React, { Component } from 'react';
import {
  Container,
  Col,
  Row,
  Button,
  Nav,
  FormFeedback,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Media,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import './contact.css';

class Contact extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1')
    };
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
      </>
    );
  }

  form() {
    return (
      <div className="form-horizontal">
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="hf-username"> الاسم</Label>
          </Col>
          <Col xs="12" md="8">
            <Input
              type="username"
              id="hf-username"
              name="hf-username"
              placeholder="الاسم الاول اسم العائلة"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="hf-email">البريد الالكتروني</Label>
          </Col>
          <Col xs="12" md="8">
            <Input
              type="email"
              id="hf-email"
              invalid
              name="hf-email"
              placeholder="ادخل البريد الالكتروني هنا"
              autoComplete="current-email"
            />
            <FormFeedback>
              صيغة خاطئة، البريد الالكتروني الصحيح يتبع الصيغة name@test.com.
            </FormFeedback>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="textarea-input">الرسالة</Label>
          </Col>
          <Col xs="12" md="8">
            <Input
              type="textarea"
              name="textarea-input"
              id="textarea-input"
              rows="3"
              placeholder="اكتب رسالتك هنا"
            />
          </Col>
        </FormGroup>
        <div className="button-group flex flex-justifiy-end">
          <p>*يستغرق الرد عادة ٣-٥ ايام عمل</p>
          <Button color="primary">إرسال</Button>
        </div>
      </div>
    );
  }

  tab1() {
    return (
      <Container>
        <div className="contact-tab-content">
          <Row>
            <Col xs="12" md="4">
              <h3>تود معرفة المزيد؟؟</h3>
              <p className="sub-header p-20-b">
                مادة ١.١: لوريم ايبسوم دولار سيت أميت ,#نقل أدليبتاتيم
                أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا
                كيواي أب أللو أنفينتوري أنفينتوريأنفينتوري فيرأتاتيس.
                <a> أبسا كيواي أ</a>
              </p>
              <div>Captha will intgerated here</div>
            </Col>
            <Col xs="12" md="2" />
            <Col xs="12" md="6">
              {this.form()}
            </Col>
          </Row>
        </div>
      </Container>
    );
  }

  tab2() {
    return (
      <Container>
        <div className="contact-tab-content">
          <Row>
            <Col xs="12" md="4">
              <h3>معلومات الاتصال</h3>
              <p className="sub-header p-20-b">
                مادة ١.١: لوريم ايبسوم دولار سيت أميت ,#نقل أدليبتاتيم
                أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا
                كيواي أب أللو أنفينتوري أنفينتوريأنفينتوري فيرأتاتيس.
                <a> أبسا كيواي أ</a>
              </p>
              <div className="p-20">
                <div className="flex  sub-header p-5-b">
                  <Media
                    object
                    src="/static/img/Icon - check.svg"
                    className="icon-small"
                  />

                  <div>00966 123 4567</div>
                </div>
                <div className="flex  sub-header  p-5-b">
                  <Media
                    object
                    src="/static/img/Icon - check Copy.svg"
                    className="icon-small"
                  />

                  <div>/sharedtechKSA</div>
                </div>
                <div className="flex  sub-header  p-5-b">
                  <Media
                    object
                    src="/static/img/Icon - check Copy 2.svg"
                    className="icon-small"
                  />

                  <div>/sharedtechKSA</div>
                </div>
              </div>
            </Col>
            <Col xs="12" md="2" />
            <Col xs="12" md="6">
              {this.form()}
            </Col>
          </Row>
        </div>
      </Container>
    );
  }

  render() {
    return (
      <>
        <div className="contact">
          <Container>
            <div className="contact-header text-center">
              <h3>هل لديك ما تقوله بخصوص منصة قرار؟؟</h3>
              <p className="sub-header">نحن نرحب بكافة أسئلتكم و رسائلكم</p>
            </div>
          </Container>

          <section className="tabs-content">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className="text-center"
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => {
                    this.toggle(0, '1');
                  }}
                >
                  <h6>أرسل رسالة</h6>
                  <p className="sub-header">رسالة أو سؤال متعلق بالمنصة</p>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className="text-center"
                  active={this.state.activeTab[0] === '2'}
                  onClick={() => {
                    this.toggle(0, '2');
                  }}
                >
                  <h6>معلومات الاتصال</h6>
                  <p className="sub-header">
                    البريد الالكتروني و منصات التواصل الاجتماعي
                  </p>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </section>
        </div>
      </>
    );
  }
}

export default Contact;
