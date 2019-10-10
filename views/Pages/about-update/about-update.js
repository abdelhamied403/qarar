import React, { Component } from 'react';
import './about-update.css';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Media,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  FormText
} from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';

import avatar from '../../../assets/img/avatar.png';

class AboutUpdate extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="about-update">
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link exact to="/client/landing" tag={RRNavLink}>
                  لوحة التحكم
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>معلوماتي الشخصية</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-50-b">
              <h2>معلوماتي الشخصية</h2>
              <div className="flex">
                <Button color="primary m-10-lr" outline>
                  إلغاء
                </Button>
                <Button color="primary m-10-lr">حفظ التعديلات</Button>
              </div>
            </div>
            <div className="userinfo flex flex-align-center m-50-b">
              <Media object src={avatar} className="image-avatar" />
              <div className="felx flex-col">
                <h3>كامل حمد</h3>
                <Input
                  type="text"
                  id="text-input"
                  name="text-input"
                  value="@kamelA"
                />
              </div>
            </div>
            <Row>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">البريد الالكتروني</h6>
                  <Input
                    type="email"
                    id="email-input"
                    name="email-input"
                    value="m234@gmail.com"
                    autoComplete="email"
                  />
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">البلد </h6>
                  {/* <h4>المملكة العربية السعودية</h4> */}
                  <Input
                    type="select"
                    name="selectLg"
                    id="selectLg"
                    bsSize="md"
                  >
                    <option value="0">المملكة العربية السعودية</option>
                    <option value="1">مصر</option>
                    <option value="2">الاردن</option>
                    <option value="3">الكويت</option>
                  </Input>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">المدينة</h6>
                  {/* <h4>الرياض</h4> */}
                  <Input
                    type="select"
                    name="selectLg"
                    id="selectLg"
                    bsSize="md"
                  >
                    <option value="0">الرياض</option>
                    <option value="1">جده</option>
                    <option value="2">القاهره</option>
                  </Input>
                </div>
              </Col>

              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">منطقة السكن</h6>
                  <Input
                    type="text"
                    id="text-input"
                    name="text-input"
                    value="أضف منطقة السكن"
                  />
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">أعلى مستوى تعليمي</h6>
                  <Input
                    type="select"
                    name="selectLg"
                    id="selectLg"
                    bsSize="md"
                  >
                    <option value="0">بكالوريس</option>
                    <option value="1">بكالوريس</option>
                    <option value="2">بكالوريس</option>
                  </Input>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">الوظيفة</h6>
                  <Input
                    type="text"
                    id="text-input"
                    name="text-input"
                    value="مهندس"
                  />
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">قطاع العمل</h6>
                  <div className="flex">
                    <FormGroup check className="radio">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="radio1"
                        name="radios"
                        value="option1"
                      />
                      <Label
                        check
                        className="form-check-label"
                        htmlFor="radio1"
                      >
                        القطاع الخاص
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="radio2"
                        name="radios"
                        value="option2"
                      />
                      <Label
                        check
                        className="form-check-label"
                        htmlFor="radio2"
                      >
                        القطاع العام
                      </Label>
                    </FormGroup>
                  </div>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">الحالة الاجتماعية</h6>
                  <div className="flex">
                    <FormGroup check className="radio">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="radio3"
                        name="radios"
                        value="option1"
                      />
                      <Label
                        check
                        className="form-check-label"
                        htmlFor="radio3"
                      >
                        {' '}
                        اعزب
                      </Label>
                    </FormGroup>
                    <FormGroup check className="radio">
                      <Input
                        className="form-check-input"
                        type="radio"
                        id="radio4"
                        name="radios"
                        value="option2"
                      />
                      <Label
                        check
                        className="form-check-label"
                        htmlFor="radio4"
                      >
                        {' '}
                        متزوج
                      </Label>
                    </FormGroup>
                  </div>
                </div>
              </Col>
              <Col xs="12">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header m-50-b">تغيير كلمة المرور</h6>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="password-input">كلمة السر الحالية</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="password"
                        id="password-input"
                        name="password-input"
                        placeholder="اكتب كلمة السر التي تود تغييرها هنا"
                        autoComplete="new-password"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="2">
                      <Label htmlFor="password-input">كلمة السر الجديدة</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="password"
                        id="password-input"
                        name="password-input"
                        placeholder="لوريم ايبسوم دولار سيت أميت"
                        autoComplete="new-password"
                      />
                      <FormText className="help-block red">
                        ٧ أحرف أو أكثر بالإضافة لرقم
                      </FormText>
                    </Col>
                  </FormGroup>
                  <div className="flex flex-justifiy-end">
                    <Button color="primary" outline>
                      تغيير كلمة السر
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default AboutUpdate;
