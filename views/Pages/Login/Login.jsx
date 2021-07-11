import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Media, FormGroup, Label, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import * as yup from 'yup';

import '../Register/Register.css';
import './Login.css';
import Api from '../../../api';
import { translate } from '../../../utlis/translation';

const messages = {
  'Sorry, unrecognized username or password.': 'loginError',
  'The user has not been activated or is blocked.': 'loginBlocked'
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
        .min(5, translate('loginPage.userNameYupError'))
        .required(translate('loginPage.userNameRequired')),

      pass: yup
        .string()
        .min(6, translate('loginPage.passwordYupError'))
        .required(translate('loginPage.passwordRequired'))
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
        setError(translate(`loginPage.${messages[resMessage]}`));
      } else {
        setError('loginPage.error');
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
        <div dir={translate('dir')} className="register-content">
          <div className="custom-container">
            <div className="register-header m-tb-20">
              <h3>{translate('loginPage.title')}</h3>
            </div>
            <p className="sub-header">
              {translate('loginPage.description')}
            </p>

            <Alert isOpen={error} color="danger">
              {error}
            </Alert>
            <div>
              <div className="form-horizontal">
                <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="hf-username">{translate('loginPage.userName')}</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input
                      type="username"
                      id="hf-username"
                      name="hf-username"
                      value={user.name}
                      onChange={e => setUser({ ...user, name: e.target.value })}
                      onKeyPress={handleKeyPress}
                      placeholder={translate('loginPage.userName')}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="hf-password">{translate('loginPage.password')}</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input
                      type="password"
                      id="hf-password"
                      name="hf-password"
                      placeholder={translate('loginPage.passwordPlaceholder')}
                      autoComplete="current-password"
                      value={user.pass}
                      onChange={e => setUser({ ...user, pass: e.target.value })}
                      onKeyPress={handleKeyPress}
                    />
                  </Col>
                </FormGroup>
                <div className="button-group flex flex-justifiy-sp">
                  <Button color="primary" onClick={() => login()}>
                    {translate('loginPage.login')}
                    <img dir={translate('dir')} src="/static/img/interactive/whiteArrow.svg" alt="" />
                  </Button>
                </div>

                <a
                  id="loginWithBaladyLink"
                  className="d-flex"
                  href="https://apps.balady.gov.sa/UsersMgmt/Login.aspx?ReturnUrl=//qarar.balady.gov.sa"
                >
                  <div className="item-img mx-1">
                    <img src="/static/fav.png" alt="Avatar" />
                  </div>
                  <div className="item-content mx-1">
                    <span className="title">{translate('loginPage.byBalady')}</span>
                    <br />
                    <span className="sub-title">
                      {translate('loginPage.via')}
                    </span>
                  </div>
                </a>
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
