import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Media, FormGroup, Label, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';

import '../Register/Register.css';
import Api from '../../../api';

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
      setError(response.data.message);
    }
  };
  return (
    <div className="register-container flex flex-justifiy-center flex-align-stretch">
      <div className="register-content">
        <div className="custom-container">
          <div className="register-header m-tb-50">
            <Link href="/register">
              <a>انا مستخدم جديد</a>
            </Link>
            <h3>تسجيل الدخول</h3>
            <p className="sub-header">
              سجل الدخول للحصول على ملخص التطورات المتعلقة بكل المسودات
              والمشاريع التي تتابعها.{' '}
            </p>
          </div>
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
                  />
                </Col>
              </FormGroup>
              <div className="button-group flex flex-justifiy-sp">
                <Link href="/forgot-password">
                  <a>نسيت كلمت المرور</a>
                </Link>
                <Button color="primary" onClick={() => login()}>
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
