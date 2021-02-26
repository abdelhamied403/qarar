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

const TabsOptions = props => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="opt-tabs">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            الغرض منه
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
            السمات المعنية
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
            الاثر المتوقع
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل
          وليس المحتوى) ويُستخدم في صناعات المطابع ودلشكلي منذ القلشكلي منذ
          القور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن
          الخامس عشر عندما قامت
        </TabPane>
        <TabPane tabId="2">
          لوريم إيبسوم(Lorلشكلي منذ القلشكلي منذ القem Ipsum) هو ببساطة نص شكلي
          (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع
          ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن
          الخامس عشر عندما قامت
        </TabPane>
        <TabPane tabId="3">
          لوريم إيبسوم(Lorem Ipsum) هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل
          وليس المحتوى) ويُستخدم في صناعات المطابع لشكلي منذ القلشكلي منذ
          القلشكلي منذ القودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص
          الشكلي منذ القرن الخامس عشر عندما قامت
        </TabPane>
      </TabContent>
    </div>
  );
};

export default TabsOptions;
