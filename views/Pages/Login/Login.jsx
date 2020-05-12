import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Media, FormGroup, Label, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import * as yup from 'yup';

import '../Register/Register.css';
import Api from '../../../api';

const messages = {
  'Sorry, unrecognized username or password.':
    'خطأ في اسم المستخدم او كلمة المرور',
  'The user has not been activated or is blocked.':
    'لم يتم تفعيل حساب هذا المستخدم أو تم حظره'
};
const Login = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.accessToken);
  useEffect(() => {
    if (token) {
      Router.push('/me/about');
    }
  }, [token]);
  const login = async () => {
    setError('');
    const schema = yup.object().shape({
      name: yup
        .string()
        .min(5, 'إسم المستخدم ينبغي أن لا يقل عن ٥ أحرف')
        .required('حقل إسم المستخدم مطلوب'),

      pass: yup
        .string()
        .min(6, 'كلمة المرور  ينبغي أن لا يقل عن ٦ أحرف')
        .required('حقل كلمة المرور مطلوب')
    });

    schema.validate(user).catch(err => {
      setError(err.message);
    });

    if (!schema.isValidSync(user)) return;
    const response = await Api.post('/user/login?_format=json', user);
    if (response.ok) {
      let profileImage = '';
      const response2 = await Api.get(
        `/qarar_api/load/user/${response.data.current_user.uid}?_format=json`
      );
      if (response2.ok) {
        profileImage = response2.data.picture;
      }
      dispatch({
        type: 'LOGIN',
        profileImage,
        uid: response.data.current_user.uid,
        name: response.data.current_user.name,
        token: response.data.csrf_token,
        logoutToken: response.data.logout_token,
        accessToken: response.data.access_token
      });
      Router.push('/me/about');
    } else {
      const resMessage =
        response.data && response.data.message ? response.data.message : '';
      if (resMessage && messages.hasOwnProperty(resMessage)) {
        setError(messages[resMessage]);
      } else {
        setError('حدث خطأ ما أثناء تسجيل الدخول');
      }
    }
  };
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      login();
    }
  };
  return (
    <>
      <div className="navHeader" />

      <div className="register-container flex flex-justifiy-center flex-align-stretch">
        <div className="register-content">
          <div className="custom-container">
            <div className="register-header m-tb-20">
              <Link href="/register">
                <button className="btn btn-outline-primary btn-md">
                  مستخدم جديد
                </button>
              </Link>
              <h3>تسجيل الدخول</h3>
            </div>
            <p className="sub-header">
              سجل الدخول للحصول على ملخص التطورات المتعلقة بكل المسودات
              والمشاريع التي تتابعها.{' '}
            </p>

            <Alert isOpen={error} color="danger">
              {error}
            </Alert>
            <div>
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
                      value={user.name}
                      onChange={e => setUser({ ...user, name: e.target.value })}
                      onKeyPress={handleKeyPress}
                      placeholder="إسم المستخدم"
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
                      value={user.pass}
                      onChange={e => setUser({ ...user, pass: e.target.value })}
                      onKeyPress={handleKeyPress}
                    />
                  </Col>
                </FormGroup>
                <div className="button-group flex flex-justifiy-sp">
                  <Link href="/forgot-password">
                    <a>نسيت كلمت المرور</a>
                  </Link>
                  <Button color="primary" onClick={() => login()}>
                    دخول
                    <img src="/static/img/interactive/whiteArrow.svg" alt="" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="qarar-image">
          <img src="/static/img/qararNew.svg" alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
