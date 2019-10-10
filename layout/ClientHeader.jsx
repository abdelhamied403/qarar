import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import Link from 'next/link';

import './client.css';

const propTypes = {
  isAuthentcated: PropTypes.bool,
  signOut: PropTypes.func
};

const defaultProps = {};

class ClientHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      viewWidth: 800
    };
  }

  getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  toggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  closeMobile = () => {
    // if (process.browser) {
    const { width } = this.getWindowDimensions();
    if (width <= 768) {
      this.setState({
        isOpen: false
      });
    }
    // }
  };

  userDropdown() {
    const { signOut, router } = this.props;
    return (
      <div className="m-right-auto flex drop-header">
        <UncontrolledDropdown>
          <DropdownToggle tag="a" className="nav-link" caret>
            كامل حمد
          </DropdownToggle>
          <DropdownMenu>
            <Link href="/me/about">
              <DropdownItem
                active={router.pathname === '/me/about'}
                onClick={this.closeMobile}
              >
                معلومات الشخصية
              </DropdownItem>
            </Link>
            <Link href="/me/notifications">
              <DropdownItem
                active={router.pathname === '/me/notifications'}
                onClick={this.closeMobile}
              >
                اشعارات
              </DropdownItem>
            </Link>
            <Link href="/me/shared">
              <DropdownItem
                active={router.pathname === '/me/shared'}
                onClick={this.closeMobile}
              >
                مشاركاتي
              </DropdownItem>
            </Link>
            <Link href="/me/awards">
              <DropdownItem
                active={router.pathname === '/me/awards'}
                onClick={this.closeMobile}
              >
                اوسمتي
              </DropdownItem>
            </Link>
            <Link href="/me/follow">
              <DropdownItem
                active={router.pathname === '/me/follow'}
                onClick={this.closeMobile}
              >
                متابعاتي
              </DropdownItem>
            </Link>
            <Link href="/me/groups">
              <DropdownItem
                active={router.pathname === '/me/groups'}
                onClick={this.closeMobile}
              >
                مجموعاتي
              </DropdownItem>
            </Link>
            <DropdownItem className="danger" onClick={signOut}>
              خروج
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <Media
          object
          src="/static/img/profile.jpg"
          className="image-avatar icon-image"
        />
      </div>
    );
  }

  render() {
    const { isAuthentcated, signOut, router } = this.props;

    return (
      <div className="fixed-navbar">
        <div className="header-nav">
          <div>قرار - وزارة العمل</div>
          {isAuthentcated ? (
            <div>
              <div
                style={{
                  cursor: 'pointer',
                  color: 'white',
                  display: 'inline-block'
                }}
                onClick={signOut}
              >
                خروج
              </div>
            </div>
          ) : (
            <div className="action-buttons">
              <Link href="/register">
                <a className="white-link scale-hover">انشاء حساب</a>
              </Link>
              {/* <a href="#"></a> */}
              <Link href="/login">
                <a className="white-link scale-hover">دخول</a>
              </Link>
            </div>
          )}
        </div>
        <Navbar color="light" light expand="md">
          <Link href="/">
            <a className="flex flex-align-center navbar-brand">
              <Media
                className="image-icon"
                object
                src="/static/img/brand/logo.svg"
              />
              <h4 className="brand-header">قرار</h4>
            </a>
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <div className="container">
              <Nav navbar>
                <NavItem
                  active={router.pathname === '/'}
                  onClick={this.closeMobile}
                >
                  <Link href="/">
                    <NavLink>الرئيسية</NavLink>
                  </Link>
                </NavItem>
                <NavItem
                  active={router.pathname === '/drafts'}
                  onClick={this.closeMobile}
                >
                  <Link href="/drafts">
                    <NavLink>قرارات تحت التصويت</NavLink>
                  </Link>
                </NavItem>
                <NavItem
                  active={router.pathname === '/decisions'}
                  onClick={this.closeMobile}
                >
                  <Link href="/decisions">
                    <NavLink>قرارات مطبقة</NavLink>
                  </Link>
                </NavItem>
                {/* <NavItem className="dp-items">
                  <NavLink>مكتبة القرارات</NavLink>
                  <div className="abs-content">
                    <Link exact to="/client/decision" >قرارات مطبقة حالياً</Link>
                    <Link exact to="/client/decision-draft" >قرارت مؤرشفة</Link>
                  </div>
                </NavItem> */}
                <NavItem
                  active={router.pathname === '/news'}
                  onClick={this.closeMobile}
                >
                  <Link href="/news">
                    <NavLink>اخبار المنصة</NavLink>
                  </Link>
                </NavItem>
                <NavItem
                  active={router.pathname === '/awards-system'}
                  onClick={this.closeMobile}
                >
                  <Link href="/awards-system">
                    <NavLink>الجوائز</NavLink>
                  </Link>
                </NavItem>
                <NavItem
                  active={router.pathname === '/social-reports'}
                  onClick={this.closeMobile}
                >
                  <Link href="/social-reports">
                    <NavLink>المشاركة المجتمعية</NavLink>
                  </Link>
                </NavItem>
                {isAuthentcated ? this.userDropdown() : ''}
              </Nav>
            </div>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

ClientHeader.propTypes = propTypes;
ClientHeader.defaultProps = defaultProps;

export default withRouter(ClientHeader);
