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

import { translate } from '../utlis/translation';
import Api from '../api';
import axios from 'axios';

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
      viewWidth: 800,
      englang: true
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
      <div className="flex drop-header">
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
                  {translate('header.navBar.personalInfo')}
                </DropdownItem>
              </a>
            </Link>
            <Link href="/me/notifications">
              <a>
                <DropdownItem
                  active={router.pathname === '/me/notifications'}
                  onClick={this.closeMobile}
                >
                  {translate('header.navBar.notifications')}
                </DropdownItem>
              </a>
            </Link>
            <Link href="/me/shared">
              <a>
                <DropdownItem
                  active={router.pathname === '/me/shared'}
                  onClick={this.closeMobile}
                >
                  {translate('header.navBar.notifications')}
                </DropdownItem>
              </a>
            </Link>
            <Link href="/me/awards">
              <a>
                <DropdownItem
                  active={router.pathname === '/me/awards'}
                  onClick={this.closeMobile}
                >
                  {translate('header.navBar.honors')}
                </DropdownItem>
              </a>
            </Link>
            <Link href="/me/follow">
              <a>
                <DropdownItem
                  active={router.pathname === '/me/follow'}
                  onClick={this.closeMobile}
                >
                  {translate('header.navBar.following')}
                </DropdownItem>
              </a>
            </Link>
            <Link href="/me/groups">
              <a>
                <DropdownItem
                  active={router.pathname === '/me/groups'}
                  onClick={this.closeMobile}
                >
                  {translate('header.navBar.groups')}
                </DropdownItem>
              </a>
            </Link>
            <DropdownItem className="danger" onClick={signOut}>
              {translate('header.navBar.logout')}
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

  async getLang() {
    let token = JSON.parse(JSON.parse(localStorage['persist:primary']).auth)
      .accessToken;
    return await axios.get(
      'https://qarar-backend.sharedt.com/qarar_api/hide-lang',
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  componentDidMount() {
    this.getLang().then(res => {
      this.setState({ englang: res.data });
    });
  }

  render() {
    const { isAuthentcated, signOut, router } = this.props;

    const gotoLang = lang => {
      localStorage.setItem('LANG', lang);
      location.replace(`?lang=${lang}`);
    };

    return (
      <div className="ministry">
        <div className="header-nav">
          <Container
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div className="flex">
              <a
                href="https://engage.balady.gov.sa"
                dir={translate('dir')}
                className="interactive"
              >
                {translate('header.navBar.balady')}
              </a>

              <a
                href="https://qarar.balady.gov.sa"
                className="afkarLink speech-bubble"
              >
                {translate('header.navBar.yourDecision')}
              </a>

              <a href="https://eforms.balady.gov.sa" className="afkarLink">
                {translate('header.navBar.questionnaires')}
              </a>
            </div>
            {!this.state.englang && (
              <div className="flex">
                <span
                  className="afkarLink englishlink"
                  onClick={() => gotoLang('en')}
                >
                  English
                </span>
                <span
                  className="afkarLink arabiclink"
                  onClick={() => gotoLang('ar')}
                  s
                >
                  ????????
                </span>
              </div>
            )}
          </Container>
        </div>
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
                        <NavLink onClick={this.closeMobile}>
                          {translate('header.navBar.home')}
                        </NavLink>
                      </a>
                    </Link>
                  </NavItem>
                  <NavItem active={router.pathname === '/about'}>
                    <Link href="/about">
                      <a>
                        <NavLink onClick={this.closeMobile}>
                          {translate('header.navBar.about')}
                        </NavLink>
                      </a>
                    </Link>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar className={'drop-nav'}>
                    <DropdownToggle nav caret>
                      {translate('header.navBar.drafts')}
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="/drafts-under-vote">
                        {translate('header.navBar.votingDrafts')}
                      </DropdownItem>
                      <DropdownItem href="/drafts-applied">
                        {translate('header.navBar.appliedVoting')}
                      </DropdownItem>
                      <DropdownItem href="/archived-drafts">
                        {translate('header.navBar.archievedDraft')}
                      </DropdownItem>
                      <DropdownItem href="/decisions-library">
                        {translate('header.navBar.libQara')}
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem active={router.pathname === '/news'}>
                    <Link href="/news">
                      <a>
                        <NavLink onClick={this.closeMobile}>
                          {translate('header.navBar.platform')}
                        </NavLink>
                      </a>
                    </Link>
                  </NavItem>
                  <NavItem active={router.pathname === '/social-reports'}>
                    <Link href="/social-reports">
                      <a>
                        <NavLink onClick={this.closeMobile}>
                          {translate('header.navBar.socialParticipation')}
                        </NavLink>
                      </a>
                    </Link>
                  </NavItem>
                  {!isAuthentcated && (
                    <NavItem active={router.pathname === '/login'}>
                      <Link href="/login">
                        <a>
                          <NavLink onClick={this.closeMobile}>
                            {translate('header.navBar.login')}
                          </NavLink>
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
