import React, { useEffect } from 'react';
import { Button, Col, Input, Media, FormGroup, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';

import '../Register/Register.css';

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);
  useEffect(() => {
    if (token) {
      Router.push('/me/about');
    }
  }, [token]);
  const login = () => {
    dispatch({ type: 'LOGIN', token: 'myToken' });
  };
  return (
    <div className="register-container flex flex-justifiy-center flex-align-stretch">
      <div className="register-content">
        <div className="custom-container">
          <div className="register-header m-tb-50">
            <Link>انا مستخدم جديد</Link>
            <h3>تسجيل الدخول</h3>
            <p className="sub-header">
              سجل الدخول للحصول على ملخص التطورات المتعلقة بكل المسودات
              والمشاريع التي تتابعها.{' '}
            </p>
          </div>
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
                    placeholder="الاسم الاول اسم العائلة"
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
                  />
                </Col>
              </FormGroup>
              <div className="button-group flex flex-justifiy-sp">
                <Link>نسيت كلمت المرور</Link>
                <Button color="primary" onClick={login}>
                  دخول
                </Button>
              </div>
            </div>
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
};

export default Login;
