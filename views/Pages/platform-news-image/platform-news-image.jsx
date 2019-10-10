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
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

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
    const { activeIndex } = this.state;

    const SLIDER = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img className="d-block w-100" src={item.src} alt={item.altText} />
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });
    return (
      <>
        <Breadcrumb title="اخبار المنصة" link="/client/platform-news" />

        <section>
          <Container className="carousel-body">
            <Card>
              <CardHeader>
                <Carousel
                  activeIndex={activeIndex}
                  next={this.next}
                  previous={this.previous}
                  ride="carousel"
                >
                  <CarouselIndicators
                    items={items}
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
                </Carousel>
              </CardHeader>
              <CardBody>
                <div className="header">
                  <h5>ثلاثة رواد اعمال يحصلون علي لابلاب لا</h5>
                  <span className="sub-header">
                    <i className="fa fa-calendar" />
                    25/8/2019
                  </span>
                </div>
                <p className="bg-font">
                  لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج
                  أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
                  ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير
                  سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو
                  كونسيكيوات . ديواس أيوتي أريري دولار إن ريبريهينديرأيت
                  فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت نيولا
                  باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون
                  بروايدينت ,سيونت ان كيولبا كيو أوفيسيا ديسيريونتموليت انيم
                  أيدي ايست لابوريوم. دولاريمكيو لايودانتيوم,توتام ريم
                  أبيرأم,أيكيو أبسا كيواي أب أللو أنفينتوري فيرأتاتيس ايت كياسي
                  أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو. نيمو أنيم أبسام
                  فوليوباتاتيم كيواي فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت
                  فيوجايت, سيد كيواي كونسيكيونتشر ماجناي دولارس أيوس كيواي
                  راتاشن فوليوبتاتيم سيكيواي نيسكايونت. نيكيو بوررو كيوايسكيوم
                  ايست,كيواي دولوريم ايبسيوم كيوا دولار سايت أميت,
                  كونسيكتيتيور,أديبايسكاي فيلايت, سيد كيواي نون نيومكيوام ايايوس
                  موداي تيمبورا انكايديونت يوت لابوري أيت دولار ماجنام ألايكيوام
                  كيوايرات فوليوبتاتيم. يوت اينايم أد مينيما فينيام, كيواس
                  نوستريوم أكسيركايتاشيم يلامكوربوريس سيوسكايبيت لابورايوسام,
                  نايساي يوت ألايكيوايد أكس أيا كوموداي كونسيكيواتشر؟ كيوايس
                  أيوتيم فيل أيوم أيوري ريبريهينديرايت كيواي ان إيا فوليوبتاتي
                  فيلايت ايسسي كيوم نايهايل موليستايا كونسيكيواتيو,فيلايليوم
                  كيواي دولوريم أ كيوبايداتات نون بروايدينت ,سيونت ان كيولبا كيو
                  أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم. دولاريمكيو
                  لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو
                  أنفينتوري فيرأتاتيس ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا
                  سيونت أكسبليكابو. نيمو أنيم أبسام فوليوباتاتيم كيواي فوليوبتاس
                  سايت أسبيرناتشر أيوت أودايت أيوت فيوجايت, سيد كيواي
                  كونسيكيونتشر ماجناي دولارس أيوس كيواي راتاشن فوليوبتاتيم
                  سيكيواي نيسكايونت. نيكيو بوررو كيوايسكيوم ايست,كيواي دولوريم
                  ايبسيوم كيوا دولار سايت أميت, كونسيكتيتيور,أديبايسكاي فيلايت,
                  سيد كيواي نون نيومكيوام ايايوس موداي تيمبورا انكايديونت يوت
                  لابوري أيت دولار ماجنام ألايكيوام كيوايرات فوليوبتاتيم. يوت
                  اينايم أد مينيما فينيام, كيواس نوستريوم أكسيركايتاشيم
                  يلامكوربوريس سيوسكايبيت لابورايوسام, نايساي يوت ألايكيوايد أكس
                  أيا كوموداي كونسيكيواتشر؟ كيوايس أيوتيم فيل أيوم أيوري
                  ريبريهينديرايت كيواي ان إيا فوليوبتاتي فيلايت ايسسي كيوم
                  نايهايل موليستايا كونسيكيواتيو,فيلايليوم كيواي دولوريم أ
                </p>
                <div>
                  <Link href="/tag/tagId">
                    <a className="sub-header"># طاقة</a>
                  </Link>
                  <Link href="/tag/tagId">
                    <a className="sub-header"># طاقة</a>
                  </Link>
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
