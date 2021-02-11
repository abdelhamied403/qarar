import React from 'react';
import { Button } from 'reactstrap';
import Link from 'next/link';

const NoAccess = () => (
  <>
    <div className="no-access">
      <div className="blur" />
      <div className="flex flex-col flex-align-center flex-justifiy-center flex-space-child item-content">
        <span className="fa fa-ban " />
        <h2>يجب تسجيل الدخول لأضافة تعليق</h2>
        <Link href="/login">
          <Button color="primary">تسجيل الدخول</Button>
        </Link>
        <Link href="/register">
          <a>تسجيل حساب</a>
        </Link>
      </div>
    </div>
  </>
);

export default NoAccess;
