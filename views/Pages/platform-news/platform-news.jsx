import React, { Component } from 'react';
import {
  Container,
  Button,
  Col,
  Row,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  ButtonDropdown
} from 'reactstrap';
import CardBlog from '../components/card-blog/card-blog';
import './platform-news.css';

class DecisionDraft extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false)
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
  }

  render() {
    return (
      <>
        <div className="decisionHeader">
          <Container>
            <h3>اخبار المنصة</h3>
          </Container>
        </div>
        <div className="platform-news">
          <Container>
            <div className="button-group left cust-d">
              <ButtonDropdown
                className="mr-1"
                isOpen={this.state.dropdownOpen[1]}
                toggle={() => {
                  this.toggle(1);
                }}
              >
                <DropdownToggle caret color="primary">
                  احدث الاخبار
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>احدث الاخبار</DropdownItem>
                  <DropdownItem>احدث الاخبار</DropdownItem>
                  <DropdownItem>احدث الاخبار</DropdownItem>
                  <DropdownItem>احدث الاخبار</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </div>
            <Row>
              <Col xs="12" md="6">
                <CardBlog
                  image="/static/img/bg.jpg"
                  header="تم إقرار مسودة تصاريح العمل للوا…"
                  date="12/4/2019"
                  content="تقام هذه الجائزة السنوية منذ خمسة أعوام، بحيث أصبحت جزءاً رئيسياً من هويتنا. ونسعى من خلالها للاحتفال بروّاد الأعمال المميزين، والاستماع إلى قصص نجاحهم، ومساعدتهم على التعريف عن شركاتهم المزيد …لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج ,سيت دو أيوسمود"
                  tag="عمالةـوافدة"
                  subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                />
              </Col>
              <Col xs="12" md="6">
                <CardBlog
                  image="/static/img/bg.jpg"
                  header="تم إقرار مسودة تصاريح العمل للوا…"
                  date="12/4/2019"
                  content="تقام هذه الجائزة السنوية منذ خمسة أعوام، بحيث أصبحت جزءاً رئيسياً من هويتنا. ونسعى من خلالها للاحتفال بروّاد الأعمال المميزين، والاستماع إلى قصص نجاحهم، ومساعدتهم على التعريف عن شركاتهم المزيد …لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج ,سيت دو أيوسمود"
                  tag="عمالةـوافدة"
                  subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                />
              </Col>
              <Col xs="12" md="6">
                <CardBlog
                  image="/static/img/bg.jpg"
                  header="تم إقرار مسودة تصاريح العمل للوا…"
                  date="12/4/2019"
                  content="تقام هذه الجائزة السنوية منذ خمسة أعوام، بحيث أصبحت جزءاً رئيسياً من هويتنا. ونسعى من خلالها للاحتفال بروّاد الأعمال المميزين، والاستماع إلى قصص نجاحهم، ومساعدتهم على التعريف عن شركاتهم المزيد …لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج ,سيت دو أيوسمود"
                  tag="عمالةـوافدة"
                  subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                />
              </Col>
              <Col xs="12" md="6">
                <CardBlog
                  image="/static/img/bg.jpg"
                  header="تم إقرار مسودة تصاريح العمل للوا…"
                  date="12/4/2019"
                  content="تقام هذه الجائزة السنوية منذ خمسة أعوام، بحيث أصبحت جزءاً رئيسياً من هويتنا. ونسعى من خلالها للاحتفال بروّاد الأعمال المميزين، والاستماع إلى قصص نجاحهم، ومساعدتهم على التعريف عن شركاتهم المزيد …لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج ,سيت دو أيوسمود"
                  tag="عمالةـوافدة"
                  subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                />
              </Col>
            </Row>

            <div className="button-group center">
              <Button color="primary">تحميل المزيد</Button>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default DecisionDraft;
