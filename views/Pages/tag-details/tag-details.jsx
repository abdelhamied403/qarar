import React, { Component } from 'react';
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Col,
  Row,
  Button
} from 'reactstrap';

import CardDraft from '../components/card-draft/card-draft';

import './tag-details.css';

class TagDetails extends Component {
  componentDidMount() {
    this.getTag();
    this.getDrafts();
  }

  getTag = async () => {};

  getDrafts = async () => {};

  render() {
    return (
      <>
        <div className="tag-detailsHeader">
          <Container>
            <div className="flex flex-justifiy-sp">
              <h3>#طاقة</h3>
              <Button color="primary">متابعة</Button>
            </div>
          </Container>
        </div>
        <section>
          <Container>
            <Row>
              <Col xs="12">
                <CardDraft
                  header="سياسة السماح باستيراد السيارات الكهربائية"
                  subHeader="يغلق التصويت بتاريخ 25/8/2019"
                  content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
                  date=" "
                  link="/draft-details/draftId"
                  tags={[{ tag: 'نقل', id: 1 }]}
                />
              </Col>
              <Col xs="12">
                <CardDraft
                  header="سياسة السماح باستيراد السيارات الكهربائية"
                  subHeader="يغلق التصويت بتاريخ 25/8/2019"
                  content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
                  date=" "
                  link="/draft-details/draftId"
                  tags={[{ tag: 'نقل', id: 1 }]}
                />
              </Col>
              <Col xs="12">
                <CardDraft
                  header="سياسة السماح باستيراد السيارات الكهربائية"
                  subHeader="يغلق التصويت بتاريخ 25/8/2019"
                  content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
                  date=" "
                  link="/draft-details/draftId"
                  tags={[{ tag: 'نقل', id: 1 }]}
                />
              </Col>
              <Col xs="12">
                <CardDraft
                  header="سياسة السماح باستيراد السيارات الكهربائية"
                  subHeader="يغلق التصويت بتاريخ 25/8/2019"
                  content="مادة ١.١: لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور مادة ١.٣: أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم …"
                  tags={[{ tag: 'نقل', id: 1 }]}
                  date=" "
                  link="/draft-details/draftId"
                />
              </Col>
            </Row>
          </Container>
        </section>
        <Container>
          <div className="pagination-container">
            <Pagination>
              <PaginationItem>
                <PaginationLink previous tag="button" />
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink tag="button">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink tag="button">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next tag="button" />
              </PaginationItem>
            </Pagination>
          </div>
        </Container>
      </>
    );
  }
}

export default TagDetails;
