import React, { Component } from 'react';
import Link from 'next/link';

import {
  Container,
  Carousel,
  CarouselCaption,
  CarouselControl,
  CarouselIndicators,
  CarouselItem,
  Card,
  CardBody,
  CardHeader
} from 'reactstrap';

import Breadcrumb from '../components/breadcrumb/breadcrumb';
import './platform-news-image.css';

import Api from '../../../api';

const items = [
  {
    src: '/static/img/GB-main-2.jpg'
  },
  {
    src: '/static/img/GB-main-2.jpg'
  },
  {
    src: '/static/img/GB-main-2.jpg'
  },
  {
    src: '/static/img/GB-main-2.jpg'
  }
];
class DecisionDraft extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, newsItem: {} };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount() {
    this.getNews();
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  getNews = async () => {
    const { newsId } = this.props;
    const newsResponse = await Api.get(
      `/qarar_api/load/node/${newsId}?_format=json`
    );

    if (newsResponse.ok) {
      const { data } = newsResponse.data;
      this.setState({ newsItem: data });
    }
  };

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex, newsItem } = this.state;

    /* const SLIDER = [
      <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={newsItem.image}
      >
        <img
          className="d-block w-100"
          src={newsItem.image}
          alt={newsItem.title}
        />
        <CarouselCaption captionHeader={newsItem.title} />
      </CarouselItem>
    ];
    */
    return (
      <>
        <Breadcrumb title="اخبار المنصة" link="/news" />

        <section>
          <Container className="carousel-body">
            <Card>
              <CardHeader>
                {/* <Carousel
                  activeIndex={activeIndex}
                  next={this.next}
                  previous={this.previous}
                  ride="carousel"
                >
                  <CarouselIndicators
                    items={[1]}
                    activeIndex={activeIndex}
                    onClickHandler={this.goToIndex}
                  />

                  {SLIDER}

                  <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={this.previous}
                  />
                  <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={this.next}
                  />
                </Carousel> */}
                <img
                  className="d-block w-100"
                  src={newsItem.image}
                  alt={newsItem.title}
                />
              </CardHeader>
              <CardBody>
                <div className="header">
                  <h5>{newsItem.title}</h5>
                  <span className="sub-header">
                    <i className="fa fa-calendar" />
                    {newsItem.date}
                  </span>
                </div>
                <p className="bg-font">{newsItem.body}</p>
                <div>
                  {newsItem.tags &&
                    newsItem.tags.map(tag => (
                      <Link href={`/tag/${tag.id}`}>
                        <a className="sub-header"># {tag.name}</a>
                      </Link>
                    ))}
                </div>
              </CardBody>
            </Card>
          </Container>
        </section>
      </>
    );
  }
}

export default DecisionDraft;
