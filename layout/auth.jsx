import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import Loading from '../components/loading';

const Auth = ({ children }) => {
  const token = useSelector(state => state.token);
  useEffect(() => {
    if (!token) {
      Router.push('/login');
    }
  }, [token]);
  return token ? children : <Loading />;
};
export default Auth;
