import React, { Component } from 'react';
import {
  Container,
  Col,
  Row,
  Nav,
  NavItem,
  NavLink,
  Button,
  Collapse
} from 'reactstrap';

import './questions.css';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.selectTab = this.selectTab.bind(this);

    this.state = {
      collapse: [true, false, false, false],
      selectedTab: 'register'
    };
  }

  async selectTab(tab) {
    await this.setState(state => ({ selectedTab: tab }));
  }

  async toggle(i) {
    // alert(i);
    const tempArr = this.state.collapse;
    tempArr[i] = !tempArr[i];
    await this.setState(state => ({ collapse: tempArr }));
  }

  registerInfo() {
    return (
      <div>
        <div className="p-20-b">
          <div className="flex flex-align-base">
            <i
              className={this.state.collapse[0] ? 'fa fa-minus' : 'fa fa-plus'}
            />
            <h4
              className="link-header"
              onClick={() => this.toggle(0)}
              style={{ marginBottom: '1rem' }}
            >
              كيف أقوم بتسجيل الدخول؟
            </h4>
          </div>
          <Collapse className="sub-header" isOpen={this.state.collapse[0]}>
            لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
            أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
            انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي
            يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي أريري دولار إن
            ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت
            نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون
            بروايدينت ,سيونت ان كيولبا كيو أوفيسيا ديسيريونتموليت.
          </Collapse>
        </div>
        <div className="p-20-b">
          <div className="flex flex-align-base">
            <i
              className={this.state.collapse[1] ? 'fa fa-minus' : 'fa fa-plus'}
            />
            <h4
              className="link-header"
              onClick={() => this.toggle(1)}
              style={{ marginBottom: '1rem' }}
            >
              كيف أقوم بتسجيل الدخول؟
            </h4>
          </div>
          <Collapse className="sub-header" isOpen={this.state.collapse[1]}>
            لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
            أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
            انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي
            يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي أريري دولار إن
            ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت
            نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون
            بروايدينت ,سيونت ان كيولبا كيو أوفيسيا ديسيريونتموليت.
          </Collapse>
        </div>
        <div className="p-20-b">
          <div className="flex flex-align-base">
            <i
              className={this.state.collapse[2] ? 'fa fa-minus' : 'fa fa-plus'}
            />
            <h4
              className="link-header"
              onClick={() => this.toggle(2)}
              style={{ marginBottom: '1rem' }}
            >
              كيف أقوم بتغيير معلوماتي الشخصية؟
            </h4>
          </div>
          <Collapse className="sub-header" isOpen={this.state.collapse[2]}>
            لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
            أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
            انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي
            يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي أريري دولار إن
            ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت
            نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون
            بروايدينت ,سيونت ان كيولبا كيو أوفيسيا ديسيريونتموليت.
          </Collapse>
        </div>
        <div className="p-20-b">
          <div className="flex flex-align-base">
            <i
              className={this.state.collapse[3] ? 'fa fa-minus' : 'fa fa-plus'}
            />
            <h4
              className="link-header"
              onClick={() => this.toggle(3)}
              style={{ marginBottom: '1rem' }}
            >
              أين أجد قائمة الأشخاص الذين أتابعهم؟
            </h4>
          </div>
          <Collapse className="sub-header" isOpen={this.state.collapse[3]}>
            لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
            أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت
            انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأس نيسي
            يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي أريري دولار إن
            ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت
            نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون
            بروايدينت ,سيونت ان كيولبا كيو أوفيسيا ديسيريونتموليت.
          </Collapse>
        </div>
      </div>
    );
  }

  render() {
    let currentElement;
    if (this.state.selectedTab === 'register') {
      currentElement = this.registerInfo();
    } else if (this.state.selectedTab === 'account') {
      currentElement = 'account';
    } else if (this.state.selectedTab === 'votting') {
      currentElement = 'votting';
    } else if (this.state.selectedTab === 'rules') {
      currentElement = 'rules';
    } else if (this.state.selectedTab === 'awards') {
      currentElement = 'awards';
    } else if (this.state.selectedTab === 'privacy') {
      currentElement = 'privacy';
    }
    return (
      <>
        <div className="questions">
          <div className="draftHeader">
            <Container>
              <div className="questions-header">
                <h3>أسئلة شائعة عن المنصة</h3>
                <p className="sub-header">هل لديك مشكلة باستخدام المنصة؟</p>
              </div>
            </Container>
          </div>
          <section className="questions-sec">
            <Container>
              <Row>
                <Col xs="12" md="3">
                  <Nav vertical>
                    <NavItem
                      className={
                        this.state.selectedTab === 'register' ? 'active' : ''
                      }
                    >
                      <NavLink onClick={() => this.selectTab('register')}>
                        تسجيل الدخول
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={
                        this.state.selectedTab === 'account' ? 'active' : ''
                      }
                    >
                      <NavLink onClick={() => this.selectTab('account')}>
                        حسابي
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={
                        this.state.selectedTab === 'votting' ? 'active' : ''
                      }
                    >
                      <NavLink onClick={() => this.selectTab('votting')}>
                        التصويت و التعليق
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={
                        this.state.selectedTab === 'rules' ? 'active' : ''
                      }
                    >
                      <NavLink onClick={() => this.selectTab('rules')}>
                        قوانين المشاركة
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={
                        this.state.selectedTab === 'awards' ? 'active' : ''
                      }
                    >
                      <NavLink onClick={() => this.selectTab('awards')}>
                        الجوائز
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={
                        this.state.selectedTab === 'privacy' ? 'active' : ''
                      }
                    >
                      <NavLink onClick={() => this.selectTab('privacy')}>
                        السرية و الخصوصية
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Col>
                <Col xs="12" md="1"></Col>
                <Col xs="12" md="8">
                  {currentElement}
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </>
    );
  }
}

export default Questions;
