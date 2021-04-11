import React, { useState } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import './styles.css';
import { translate } from '../../../../utlis/translation';

const TabsOptions = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  const project = (props?.project);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return ( project ?
    <div className="opt-tabs">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            {translate('draftDetails.purpose')}
        
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '2',
              borderright0: true
            })}
            onClick={() => {
              toggle('2');
            }}
          >
           {translate('draftDetails.entities')}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === '3',
              borderright0: true
            })}
            onClick={() => {
              toggle('3');
            }}
          >  
           {translate('draftDetails.effect')}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" className="bold">
          {project?.project_target || ""}
        </TabPane>
        <TabPane tabId="2" className="bold">
          {project?.entity_name || ""}
        </TabPane>
        <TabPane tabId="3" className="bold">
          {project?.project_effect || ""}
        </TabPane>
      </TabContent>
    </div>
   : <></>);
};

export default TabsOptions;
