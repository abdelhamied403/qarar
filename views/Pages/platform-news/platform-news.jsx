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
import moment from 'moment';
import CardBlog from '../components/card-blog/card-blog';
import './platform-news.css';

import Api from '../../../api';

class DecisionDraft extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
      news: [],
      page: 1,
      newsPageSize: 10
    };
  }

  componentDidMount() {
    this.getNews();
  }

  getNews = async () => {
    const { page, newsPageSize } = this.state;
    const newsResponse = await Api.get(
      `/qarar_api/data/news/${newsPageSize}/DESC/${page}?_format=json`
    );
    if (newsResponse.ok) {
      this.setState({ news: newsResponse.data });
    }
    console.log(newsResponse);
  };

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
  }

  render() {
    const { news } = this.state;
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
              {news.map(newsItem => (
                <Col xs="12" md="6">
                  <CardBlog
                    image={newsItem.image}
                    header={newsItem.title}
                    date={moment(newsItem.creatednode * 1000).format(
                      'DD/MM/YYYY'
                    )}
                    content={newsItem.body.substr(0, 200)}
                    tag="عمالةـوافدة"
                    subHeaderIcon="/static/img/Icon - most active - views Copy 3.svg"
                  />
                </Col>
              ))}
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
