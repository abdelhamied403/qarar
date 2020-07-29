import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Media, FormGroup, Label, Alert } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import * as yup from 'yup';

import '../views/Pages/Register/Register.css';
import Api from '../api';

const messages = {
  'Sorry, unrecognized username or password.':
    'خطأ في اسم المستخدم او كلمة المرور',
  'The user has not been activated or is blocked.':
    'لم يتم تفعيل حساب هذا المستخدم أو تم حظره'
};
const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const token = useSelector(state => state.auth.accessToken);
  useEffect(() => {
    if (token) {
      Router.push('/me/about');
    }
  }, [token]);
  const forgotPassword = async () => {
    setError('');
    const schema = yup.object().shape({
      email: yup
        .string()
        .email('ادخل بريد الكتروني صحيح')
        .required('البريد الالكتروني مطلوب')
    });

    schema.validate({ email }).catch(err => {
      setError(err.message);
    });

    if (!schema.isValidSync({ email })) return;
    const response = await Api.post('/user/lost-password?_format=json', {
      mail: email
    });
    if (response.ok) {
      setError('تم ارسال بريد الكتروني لاستعادة كلمة المرور');
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
      forgotPassword();
    }
  };
  return (
    <>
      <div className="navHeader" />

      <div className="register-container flex flex-justifiy-center flex-align-stretch">
        <div className="register-content">
          <div className="custom-container">
            <div className="register-header m-tb-20">
              <h3>استعادة كلمة المرور</h3>
              <p className="sub-header">
                ادخل بريدك الالكتروني و سوف يتم ارسال كلمة مرور مؤقتة لاستخدامها
                في الدخول.
              </p>
            </div>

            <Alert isOpen={error} color="danger">
              {error}
            </Alert>
            <div>
              <div className="form-horizontal">
                <FormGroup row>
                  <Col md="4">
                    <Label htmlFor="hf-username"> البريد الإلكتروني</Label>
                  </Col>
                  <Col xs="12" md="8">
                    <Input
                      type="email"
                      id="hf-email"
                      name="hf-email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="البريد الإلكتروني"
                    />
                  </Col>
                </FormGroup>
                <div className="button-group flex flex-justifiy-sp">
                  <Button color="primary" onClick={() => forgotPassword()}>
                    إستعادة كلمة المرور
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
