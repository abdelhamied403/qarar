import React, { Component } from 'react';
import {
  Button,
  Col,
  Input,
  Media,
  FormGroup,
  Label,
  FormText
} from 'reactstrap';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';

import './Register.css';
import Api from '../../../api';

class Register extends Component {
  constructor(props) {
    super(props);
    this.nextStep = this.nextStep.bind(this);
    this.PreviousStep = this.PreviousStep.bind(this);

    this.state = { currentStep: 0, user: {} };
  }

  componentDidMount() {
    const { token } = this.props;
    if (token) {
      Router.push('/me/about');
    }
  }

  async nextStep() {
    this.setState({
      currentStep: this.state.currentStep + 1
    });
    console.log(this.state.currentStep);
  }

  async PreviousStep() {
    this.setState({
      currentStep: this.state.currentStep - 1
    });
    console.log(this.state.currentStep);
  }

  step1() {
    const { user } = this.state;
    return (
      <div className="form-horizontal">
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="hf-username"> اسم المستخدم</Label>
          </Col>
          <Col xs="12" md="8">
            <Input
              type="username"
              id="hf-username"
              name="hf-username"
              placeholder="الاسم الاول اسم العائلة"
              onChange={e =>
                this.setState({
                  user: { ...user, name: e.target.value }
                })
              }
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
              name="hf-email"
              placeholder="name@test.com"
              autoComplete="email"
              onChange={e =>
                this.setState({
                  user: { ...user, email: e.target.value }
                })
              }
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="4">
            <Label htmlFor="hf-password">كلمة المرور</Label>
          </Col>
          <Col xs="12" md="8">
            <Input
              type="password"
              id="hf-password"
              name="hf-password"
              placeholder="ادخل كلمة المرور هنا"
              autoComplete="current-password"
              onChange={e =>
                this.setState({
                  user: { ...user, password: e.target.value }
                })
              }
            />
            <FormText className="help-block sub-header">
              *يستغرق الرد عادة ٣-٥ ايام عمل
            </FormText>
          </Col>
        </FormGroup>
        <div className="button-group flex flex-justifiy-end">
          <Button color="primary" onClick={this.nextStep}>
            التالي
          </Button>
        </div>
      </div>
    );
  }

  step2() {
    const { user } = this.state;
    return (
      <div className="form-horizontal">
        <FormGroup row>
          <Col md="3">
            <Label>الجنس</Label>
          </Col>
          <Col md="9" className="flex">
            <FormGroup check className="radio">
              <Input
                className="form-check-input"
                type="radio"
                id="radio1"
                name="radios"
                value="option1"
                onChange={e =>
                  this.setState({
                    user: { ...user, gender: e.target.value }
                  })
                }
              />
              <Label check className="form-check-label" htmlFor="radio1">
                ذكر
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
              <Label check className="form-check-label" htmlFor="radio2">
                أنثى
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="select">المستوى التعليمي</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="select" name="select" id="select">
              <option value="0">Please select</option>
              <option value="1">بكالوريوس</option>
              <option value="2">بكالوريوس</option>
              <option value="3">بكالوريوس</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="select">المدينة</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="select" name="select" id="select">
              <option value="0">الرياض</option>
              <option value="1">الرياض</option>
              <option value="2">الرياض</option>
              <option value="3">الرياض</option>
            </Input>
          </Col>
        </FormGroup>
        <div className="button-group flex flex-justifiy-end">
          <Button color="primary" outline onClick={this.PreviousStep}>
            السابق
          </Button>
          <Button color="primary" onClick={this.nextStep}>
            التالي
          </Button>
        </div>
      </div>
    );
  }

  register = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'LOGIN', token: 'myToken' });
    Router.push('/me/about');
  };

  step3() {
    return (
      <div className="step3 flex flex-col flex-justifiy-sp">
        <div className="flex flex-col ">
          <h6 className="m-50-b">هذا كل شئ</h6>
          <h6>
            {' '}
            يمكنك العودة للصفحات السابقة لتعديل معلوماتك. عند الانتهاء اضغط
            تأكيد انشاء حساب.
          </h6>
        </div>
        <div className="flex flex flex-justifiy-sp flex-align-end">
          <Button color="primary" outline onClick={this.PreviousStep}>
            السابق
          </Button>
          <div className="flex flex-col">
            <div style={{ marginBottom: '20px', marginRight: '20px' }}>
              <FormGroup>
                <Input
                  className="form-check-input"
                  type="checkbox"
                  id="checkbox1"
                  name="checkbox1"
                  value="option1"
                />
                <Label check className="form-check-label" htmlFor="checkbox1">
                  اوافق على شروط الاستخدام
                </Label>
              </FormGroup>
            </div>
            <Button color="primary" onClick={this.register}>
              تأكيد إنشاء الحساب
            </Button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    let currentEleme = this.step1();
    const circleState = ['', '', ''];
    const lineState = ['', ''];
    if (this.state.currentStep === 0) {
      currentEleme = this.step1();
      circleState[0] = 'active';
      lineState[0] = 'active';
    } else if (this.state.currentStep === 1) {
      currentEleme = this.step2();
      circleState[0] = 'done';
      lineState[0] = 'done';
      circleState[1] = 'active';
      lineState[1] = 'active';
    } else {
      currentEleme = this.step3();
      circleState[0] = 'done';
      lineState[0] = 'done';
      circleState[1] = 'done';
      lineState[1] = 'done';
      circleState[2] = 'active';
      lineState[2] = 'done';
    }
    return (
      <div className="register-container flex flex-justifiy-center flex-align-stretch">
        <div className="register-content">
          <div className="custom-container">
            <div className="register-header m-tb-50">
              <Link href="/login">
                <a>هل قمت بانشاء حساب مسبقا؟</a>
              </Link>
              <h3>إنشاء حساب - مرحبا بك!</h3>
              <p className="sub-header">
                قم بإنشاء حساب الآن لتلعب دوراً مباشراً و فعالاً في اتخاذ
                القرارات التي تمس حياتك.
              </p>
            </div>
            <div className="flex">
              <div className="abs-states">
                <span className={circleState[0]}>1</span>
                <div className={`${lineState[0]} line`} />
                <span className={circleState[1]}>2</span>
                <div className={`${lineState[1]} line`} />
                <span className={circleState[2]}>3</span>
              </div>
              {currentEleme}
            </div>
          </div>
        </div>
        <div className="qarar-image">
          <Media
            object
            src="/static/img/login-bg-big.png"
            className="image-avatar"
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ token }) => ({ token });
export default connect(mapStateToProps)(Register);
