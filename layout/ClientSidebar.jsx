import React from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import './client.css';

const ClientSidebar = () => {
  const router = useRouter();
  return (
    <div className="sideBar">
      <Nav vertical>
        <NavItem active={router.pathname === '/me/about'}>
          <Link href="/me/about">
            <NavLink href="">معلوماتي الشخصية</NavLink>
          </Link>
        </NavItem>
        <NavItem active={router.pathname === '/me/notifications'}>
          <Link href="/me/notifications">
            <NavLink href="">اشعارات</NavLink>
          </Link>
        </NavItem>
        <NavItem active={router.pathname === '/me/shared'}>
          <Link href="/me/shared">
            <NavLink href="">مشاركاتي</NavLink>
          </Link>
        </NavItem>
        <NavItem active={router.pathname === '/me/awards'}>
          <Link href="/me/awards">
            <NavLink href="">اوسمتي</NavLink>
          </Link>
        </NavItem>
        <NavItem active={router.pathname === '/me/follow'}>
          <Link href="/me/follow">
            <NavLink href="">متابعاتي</NavLink>
          </Link>
        </NavItem>
        <NavItem active={router.pathname === '/me/groups'}>
          <Link href="/me/groups">
            <NavLink href="">مجموعاتي</NavLink>
          </Link>
        </NavItem>
      </Nav>
    </div>
  );
};

export default ClientSidebar;
