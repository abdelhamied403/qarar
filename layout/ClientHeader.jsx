import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import {
  Container,
  Row,
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

import dynamic from 'next/dynamic';

const ScrollToggle = dynamic(() => import('react-scroll-toggle'), {
  ssr: false
});

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
    const { signOut, router, name, profileImage } = this.props;
    return (
      <div className="m-right-auto flex drop-header">
        <UncontrolledDropdown>
          <DropdownToggle tag="a" className="nav-link" caret>
            {name}
          </DropdownToggle>
          <DropdownMenu>
            <Link href="/me/about">
              <a>
                <DropdownItem
                  active={router.pathname === '/me/about'}
                  onClick={this.closeMobile}
                >
                  معلومات الشخصية
                </DropdownItem>
              </a>
            </Link>
            <Link href="/me/notifications">
              <a>
                <DropdownItem
                  active={router.pathname === '/me/notifications'}
                  onClick={this.closeMobile}
                >
                  اشعارات
                </DropdownItem>
              </a>
            </Link>
            <Link href="/me/shared">
              <a>
                <DropdownItem
                  active={router.pathname === '/me/shared'}
                  onClick={this.closeMobile}
                >
                  مشاركاتي
                </DropdownItem>
              </a>
            </Link>
            <Link href="/me/awards">
              <a>
                <DropdownItem
                  active={router.pathname === '/me/awards'}
                  onClick={this.closeMobile}
                >
                  اوسمتي
                </DropdownItem>
              </a>
            </Link>
            <Link href="/me/follow">
              <a>
                <DropdownItem
                  active={router.pathname === '/me/follow'}
                  onClick={this.closeMobile}
                >
                  متابعاتي
                </DropdownItem>
              </a>
            </Link>
            <Link href="/me/groups">
              <a>
                <DropdownItem
                  active={router.pathname === '/me/groups'}
                  onClick={this.closeMobile}
                >
                  مجموعاتي
                </DropdownItem>
              </a>
            </Link>
            <DropdownItem className="danger" onClick={signOut}>
              خروج
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <Media
          object
          src={profileImage || '/static/img/avatar.png'}
          className="image-avatar icon-image"
        />
      </div>
    );
  }

  render() {
    const { isAuthentcated, signOut, router } = this.props;

    return (
      <div className="ministry">
        <div className="header-nav">
          <Container>
            <div className="flex">
              <a href="https://engage.balady.gov.sa" className="interactive">
                منصة بلدي التفاعلية
              </a>

              <a
                href="https://qarar.balady.gov.sa"
                className="afkarLink speech-bubble"
              >
                {/* <img src="/static/img/qararNew.svg" alt="" /> */}
                قرارك
              </a>

              <a href="https://eforms.balady.gov.sa" className="afkarLink">
                {/* <img src="/static/img/ethtbyanNew.svg" alt="" /> */}
                الاستبيانات
              </a>
            </div>
          </Container>
        </div>
        {/* <ScrollToggle
        className="SlideIn" //required property
        scroll={300} //by default distance before child element
    >  */}
        <Navbar expand="md" className="d-flex flex-row justify-content-between">
          <Container>
            <Link href="/">
              <a className="flex flex-align-center navbar-brand">
                <Media
                  className="image-icon"
                  object
                  src="/static/img/interactive/qarar-logo-white.svg"
                />
              </a>
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <div className="newNav mr-auto">
                <Nav navbar className="d-flex justify-content-end">
                  <NavItem active={router.pathname === '/'}>
                    <Link href="/">
                      <a>
                        <NavLink onClick={this.closeMobile}>الرئيسية</NavLink>
                      </a>
                    </Link>
                  </NavItem>
                  <NavItem active={router.pathname === '/about'}>
                    <Link href="/about">
                      <a>
                        <NavLink onClick={this.closeMobile}>عن قرار</NavLink>
                      </a>
                    </Link>
                  </NavItem>
                  <NavItem active={router.pathname === '/drafts'}>
                    <Link href="/drafts">
                      <a>
                        <NavLink onClick={this.closeMobile}>
                          قرارات تحت التصويت
                        </NavLink>
                      </a>
                    </Link>
                  </NavItem>
                  <NavItem active={router.pathname === '/decisions'}>
                    <Link href="/decisions">
                      <a>
                        <NavLink onClick={this.closeMobile}>
                          القرارات السابقة
                        </NavLink>
                      </a>
                    </Link>
                  </NavItem>
                  {/* <NavItem className="dp-items">
                  <NavLink>مكتبة القرارات</NavLink>
                  <div className="abs-content">
                    <Link exact to="/client/decision" >قرارات مطبقة حالياً</Link>
                    <Link exact to="/client/decision-draft" >قرارت مؤرشفة</Link>
                  </div>
                </NavItem> */}
                  <NavItem active={router.pathname === '/news'}>
                    <Link href="/news">
                      <a>
                        <NavLink onClick={this.closeMobile}>
                          اخبار المنصة
                        </NavLink>
                      </a>
                    </Link>
                  </NavItem>
                  {/* <NavItem active={router.pathname === '/awards-system'}>
                  <Link href="/awards-system">
                    <a>
                      <NavLink onClick={this.closeMobile}>الجوائز</NavLink>
                    </a>
              </Link>
                </NavItem> */}
                  <NavItem active={router.pathname === '/social-reports'}>
                    <Link href="/social-reports">
                      <a>
                        <NavLink onClick={this.closeMobile}>
                          المشاركة المجتمعية
                        </NavLink>
                      </a>
                    </Link>
                  </NavItem>
                  {!isAuthentcated && (
                    <NavItem active={router.pathname === '/login'}>
                      <Link href="https://apps.balady.gov.sa/UsersMgmt/login.aspx">
                        <a>
                          <NavLink onClick={this.closeMobile}> دخول</NavLink>
                        </a>
                      </Link>
                    </NavItem>
                  )}

                  {isAuthentcated ? this.userDropdown() : ''}
                </Nav>
              </div>
            </Collapse>
          </Container>
        </Navbar>
        {/* </ScrollToggle> */}
      </div>
    );
  }
}

ClientHeader.propTypes = propTypes;
ClientHeader.defaultProps = defaultProps;
const mapStateToProps = ({ auth: { name, profileImage } }) => ({
  name,
  profileImage
});
export default connect(mapStateToProps, null, null, { pure: false })(
  withRouter(ClientHeader)
);
