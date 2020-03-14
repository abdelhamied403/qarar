import React, { Component } from 'react';
import {
  Button,
  Col,
  Input,
  Media,
  FormGroup,
  Label,
  FormText,
  Alert
} from 'reactstrap';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import * as yup from 'yup';

import './Register.css';
import { isThisISOWeek } from 'date-fns';
import Api from '../../../api';

const messages = {
  'No password provided.': 'لم تقم بكتابة كلمة المرور.',
  'Unprocessable Entity: validation failed.\nname: \u064a\u062c\u0628 \u0623\u0646 \u062a\u062f\u062e\u0644 \u0627\u0633\u0645 \u0645\u0633\u062a\u062e\u062f\u0645.\nname: This value should not be null.\nmail: \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a field is required.\n':
    'البريد الإلكتروني و الإسم حقول مطلوبة'
};
const gendersLabel = {
  male: 'ذكر',
  female: 'أنثي'
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.nextStep = this.nextStep.bind(this);
    this.PreviousStep = this.PreviousStep.bind(this);

    this.state = {
      currentStep: 0,
      user: {},
      cities: [],
      eLevels: {},
      errorMessage: '',
      successMessage: '',
      disableSubmit: false,
      agree: false
    };
  }

  componentDidMount() {
    const { accessToken } = this.props;
    if (accessToken) {
      Router.push('/me/about');
    }
    this.getCities();
    this.getELevels();
    this.getGenders();
  }

  getCities = async () => {
    const citiesResponse = await Api.get(
      '/qarar_api/load/vocabulary/city?_format=json'
    );
    if (citiesResponse.ok) {
      this.setState({ cities: citiesResponse.data });
    }
  };

  getELevels = async () => {
    const eLevelsResponse = await Api.get(
      '/qarar_api/field-options/user/field_educational_level?_format=json'
    );
    if (eLevelsResponse.ok) {
      this.setState({ eLevels: eLevelsResponse.data });
    }
  };

  getGenders = async () => {
    const gendersResponse = await Api.get(
      '/qarar_api/field-options/user/field_gender?_format=json'
    );
    if (gendersResponse.ok) {
      this.setState({ genders: gendersResponse.data });
    }
  };

  nextStep() {
    this.setState({
      currentStep: this.state.currentStep + 1
    });
  }

  async PreviousStep() {
    this.setState({
      currentStep: this.state.currentStep - 1
    });
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
              placeholder="إسم المستخدم"
              value={user && user.name ? user.name[0].value : ''}
              onChange={e =>
                this.setState({
                  user: { ...user, name: [{ value: e.target.value }] }
                })
              }
            />
          </Col>
        </FormGroup>
        {/* <FormGroup row>
          <Col md="4">
            <Label htmlFor="hf-username">الإسم</Label>
          </Col>
          <Col xs="12" md="8">
            <Input
              type="name"
              id="hf-name"
              name="hf-name"
              placeholder="الاسم الاول اسم العائلة"
              value={
                user && user.field_full_name
                  ? user.field_full_name[0].value
                  : ''
              }
              onChange={e =>
                this.setState({
                  user: {
                    ...user,
                    field_full_name: [{ value: e.target.value }]
                  }
                })
              }
            />
          </Col>
        </FormGroup> */}
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
              value={user && user.mail ? user.mail[0].value : ''}
              onChange={e =>
                this.setState({
                  user: {
                    ...user,
                    mail: [{ value: e.target.value }]
                  }
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
              value={user && user.pass ? user.pass[0].value : ''}
              onChange={e =>
                this.setState({
                  user: {
                    ...user,
                    pass: [{ value: e.target.value }]
                  }
                })
              }
            />
            {/* <FormText className="help-block sub-header">
              *يستغرق الرد عادة ٣-٥ ايام عمل
            </FormText> */}
          </Col>
        </FormGroup>
        <div className="button-group flex flex-justifiy-end">
          <Button color="primary" onClick={this.nextStep}>
            التالي
            <img src="/static/img/interactive/whiteArrow.svg" alt="" />
          </Button>
        </div>
      </div>
    );
  }

  step2() {
    const { user, cities, eLevels, genders } = this.state;
    return (
      <div className="form-horizontal">
        <FormGroup row>
          <Col md="3">
            <Label>الجنس</Label>
          </Col>
          <Col md="9" className="flex">
            {Object.keys(genders).map(gender => (
              <FormGroup key={gender} check className="radio">
                <Input
                  className="form-check-input"
                  type="radio"
                  id={gender}
                  name="radios"
                  value={gender}
                  onChange={e =>
                    this.setState({
                      user: {
                        ...user,
                        field_gender: [{ value: e.target.value }]
                      }
                    })
                  }
                  checked={
                    user &&
                    user.field_gender &&
                    user.field_gender[0].value === gender
                  }
                />
                <Label check className="form-check-label" htmlFor={gender}>
                  {gendersLabel[gender]}
                </Label>
              </FormGroup>
            ))}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="select">المستوى التعليمي</Label>
          </Col>
          <Col xs="12" md="9">
            <Input
              value={
                user && user.field_educational_level
                  ? user.field_educational_level[0].value
                  : ''
              }
              onChange={e =>
                this.setState({
                  user: {
                    ...user,
                    field_educational_level: [{ value: e.target.value }]
                  }
                })
              }
              type="select"
              name="select"
              id="select"
            >
              <option value="">اختر</option>
              {Object.keys(eLevels).map(level => (
                <option key={level} value={level}>
                  {eLevels[level]}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="select">المدينة</Label>
          </Col>
          <Col xs="12" md="9">
            <Input
              value={
                user && user.field_city ? user.field_city[0].target_id : ''
              }
              onChange={e =>
                this.setState({
                  user: {
                    ...user,
                    field_city: [{ target_id: e.target.value }]
                  }
                })
              }
              type="select"
              name="select"
              id="select"
            >
              <option value="">اختر</option>
              {cities.map(city => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <div className="button-group flex flex-justifiy-end">
          <Button color="primary" outline onClick={this.PreviousStep}>
            السابق
          </Button>
          <Button color="primary" onClick={this.nextStep}>
            التالي
            <img src="/static/img/interactive/whiteArrow.svg" alt="" />
          </Button>
        </div>
      </div>
    );
  }

  register = async () => {
    const { agree } = this.state;
    if (!agree) {
      this.setState({ errorMessage: 'لم تقم بالموافقة علي الشروط' });
      return;
    }
    this.setState({ errorMessage: '', disableSubmit: true });
    const { user } = this.state;
    const schema = yup.object().shape({
      name: yup
        .array()
        .of(
          yup.object().shape({
            value: yup
              .string()
              .min(5, 'إسم المستخدم ينبغي أن لا يقل عن ٥ أحرف')
              .required('حقل إسم المستخدم مطلوب')
          })
        )
        .required('حقل إسم المستخدم مطلوب'),
      /* field_full_name: yup
        .array()
        .of(
          yup.object().shape({
            value: yup
              .string()
              .min(5, 'الإسم  ينبغي أن لا يقل عن ٥ أحرف')
              .required('حقل الإسم مطلوب')
          })
        )
        .required('حقل الإسم مطلوب'),*/
      mail: yup
        .array()
        .of(
          yup.object().shape({
            value: yup
              .string()
              .email('البريد الإلكتروني غير صحيح')
              .required('حقل البريد الإلكتروني مطلوب')
          })
        )
        .required('حقل البريد الإلكتروني مطلوب'),
      pass: yup
        .array()
        .of(
          yup.object().shape({
            value: yup
              .string()
              .min(6, 'كلمة المرور  ينبغي أن لا يقل عن ٦ أحرف')
              .required('حقل كلمة المرور مطلوب')
          })
        )
        .required('حقل  كلمة المرور مطلوب'),
      field_gender: yup
        .array()
        .of(
          yup.object().shape({
            value: yup.string().required('حقل الجنس مطلوب')
          })
        )
        .required('حقل الجنس مطلوب'),
      field_educational_level: yup
        .array()
        .of(
          yup.object().shape({
            value: yup.string().required('حقل المستوي التعليمي مطلوب')
          })
        )
        .required('حقل المستوي التعليمي مطلوب'),
      field_city: yup
        .array()
        .of(
          yup.object().shape({
            target_id: yup.number().required('حقل المدينة مطلوب')
          })
        )
        .required('حقل المدينة مطلوب')
    });

    schema.validate(user).catch(err => {
      this.setState({
        errorMessage: err.message,
        disableSubmit: false
      });
    });

    if (!schema.isValidSync(user)) return;

    const response = await Api.post('/user/register?_format=json', user);
    if (response.ok) {
      this.setState({
        successMessage: 'تم التسجيل بنجاح بإمكانك تسجيل الدخول'
      });
    } else {
      const resMessage =
        response.data && response.data.message ? response.data.message : '';
      if (resMessage && messages.hasOwnProperty(resMessage)) {
        this.setState({
          disableSubmit: false,
          errorMessage: messages[resMessage]
        });
      } else {
        this.setState({
          disableSubmit: false,
          errorMessage: 'حدث خطأ ما أثناء التسجيل'
        });
      }
    }
  };

  step3() {
    const { disableSubmit, agree } = this.state;
    return (
      <div className="step3 flex flex-col flex-justifiy-sp">
        <div className="flex flex-col ">
          <h6 className="m-50-b">هذا كل شئ</h6>
          <h6>
            يمكنك العودة للصفحات السابقة لتعديل معلوماتك. عند الانتهاء اضغط
            تأكيد انشاء حساب.
          </h6>
        </div>
        <div className="flex flex flex-justifiy-sp flex-align-end">
          <Button
            disabled={disableSubmit}
            color="primary"
            outline
            onClick={this.PreviousStep}
          >
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
                  checked={agree}
                  onChange={() => this.setState({ agree: !agree })}
                />
                <Label check className="form-check-label" htmlFor="checkbox1">
                  اوافق على شروط الاستخدام
                </Label>
              </FormGroup>
            </div>
            <Button
              disabled={disableSubmit}
              color="primary"
              onClick={this.register}
            >
              تأكيد إنشاء الحساب
              <img src="/static/img/interactive/whiteArrow.svg" alt="" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { successMessage, errorMessage } = this.state;
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
      <>
        <div className="navHeader"></div>
        <div className="register-container flex flex-justifiy-center flex-align-stretch">
          <div className="register-content">
            <div className="custom-container">
              <div className="register-header">
                <Link href="/login">
                  <a className="NewUserLink">هل قمت بانشاء حساب مسبقا؟</a>
                </Link>
                <h3>إنشاء حساب - مرحبا بك!</h3>
              </div>
              <p className="sub-header">
                قم بإنشاء حساب الآن لتلعب دوراً مباشراً و فعالاً في اتخاذ
                القرارات التي تمس حياتك.
              </p>

              <Alert
                isOpen={errorMessage}
                toggle={() => this.setState({ errorMessage: '' })}
                color="danger"
              >
                {errorMessage}
              </Alert>
              <Alert isOpen={successMessage} color="success">
                {successMessage}
              </Alert>
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
            <img src="/static/img/brand/momra-logo.svg" alt="" />
            <img src="/static/img/brand/logo-copy.svg" alt="" />
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ auth: { accessToken } }) => ({ accessToken });
export default connect(mapStateToProps)(Register);
