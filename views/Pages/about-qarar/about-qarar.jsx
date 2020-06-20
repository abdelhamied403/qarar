import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'reactstrap';
import renderHTML from 'react-render-html';
import './about-qarar.css';
import Api from '../../../api';

const AboutQarar = () => {
  const [aboutData, setAboutData] = useState({});
  const getAbout = async () => {
    const response = await Api.get('/qarar_api/load/node/904?_format=json');
    if (response.ok) {
      setAboutData(response.data);
    }
  };
  useEffect(() => {
    getAbout();
  }, []);

  return (
    <>
      <div className="about-qarar">
        <div className="draftHeader">
          <Container>
            <div>
              <h3>{aboutData.data ? aboutData.data.title : ''}</h3>
            </div>
          </Container>
        </div>

        <section className="about-qarar-sec">
          <Container>
            <Row>
              <Col xs="12" md="3" className="about-mockup">
                <img
                  src="../static/img/about-mockup.svg"
                  alt=""
                  className="mockup-image"
                />
              </Col>
              <Col xs="12" md="9" className="about-mockup-text">
                {/* {aboutData.data ? renderHTML(aboutData.data.body) : ''}  */}
                <h2> عن منصة "قرار" </h2>
                <p>
                  منصة "قرار" هي منصة إلكترونية مُبتكرة تهدف إلى الحصول على
                  مساندة المجتمع في مناقشة الأنظمة والتشريعات، من خلال مُساعدتهم
                  على صياغة مشاريع الأنظمة والتشريعات المناسبة قبل تنفيذها، عبر
                  معرفة آراء وتوجهات عموم المجتمع تجاهها، بما يجعلها أكثر فعالية
                  في تحقيق الأهداف المرجوة منها، وأكثر إحاطة بوجهات النظر
                  المتنوعة التي يُمكن أخذ الوجيه منها في الاعتبار أثناء إعداد
                  هذه المشاريع، وهو الأمر الذي يصب في صالح تحسين جودة حياة
                  المجتمع السعودي.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="about-qarar-sec paltform-importance">
          <Container>
            <Row>
              <Col xs="12">
                <h2> أهمية منصة "قرار"</h2>
                <p>
                  تخطو المملكة العربية السعودية خطوات حقيقية ورصينة نحو المستقبل
                  من خلال رؤيتها 2030، ومن ضمن ما ترتكز عليه هذه الخطوات، هو خلق
                  فعالية أكبر للقرارات والتشريعات عبر تدعيم المشاركة المجتمعية
                  في صياغتها من أجل ضمان أكبر فائدة عند تنفيذها، خاصة وأن
                  المملكة تحتل الآن المرتبة 44 في مؤشر الأمم المتحدة للمشاركة
                  المجتمعية الإلكترونية في صياغة الأنظمة. وفي هذا السياق، تجدر
                  الإشارة إلى الأمر الملكي الكريم الذي صدر في 30/11/1438هـ
                  والقاضي بمناقشة مشروعات الأنظمة مع عموم المجتمع، كخطوة عملية
                  من أجل رفع ترتيب المملكة في مؤشر المشاركة المجتمعية بصياغة
                  القرارات على المستوى العالمي.
                </p>

                <p>
                  من هنا، تأتي منصة "قرار" خدمة داعمة لهذا الاتجاه، حيث تم
                  تصميمها بمواصفات عالية الجودة للاستفادة من خدماتها بشكل مرن
                  وعملي وفعّال للغاية، مع العمل على تحديثها بشكل مستمر بما
                  يتماشى مع التطورات المتلاحقة عالميًا في هذا المجال، وبما
                  يتناسب أيضًا مع أهداف المملكة الساعية للارتقاء بمفهوم "الحكومة
                  الإلكترونية" وجعله أكثر إفادة وعملية يومًا بعد يوم.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="about-qarar-sec">
          <Container>
            <Row>
              <Col xs="12">
                <h2> خدمات منصة "قرار"</h2>
                <p>تتيح منصة "قرار" للمستفيدين منها خدمات فعّالة، مثل:</p>
              </Col>
            </Row>
            <Row className="qarar-services">
              <Col xs="12" md="3" className="item">
                <img src="../static/img/register.svg" alt="" />
                <h4> التسجيل</h4>
                <p>
                  حيث يمكن لأي فرد التسجيل في المنصة، ليتمكن من التفاعل مع
                  الخدمات المُقدمة فيها.
                </p>
              </Col>
              <Col xs="12" md="3" className="item">
                <img src="../static/img/people.svg" alt="" />
                <h4> تفاعل الجمهور</h4>
                <p>
                  يمكن من خلال المنصة طرح كل بنود أي نظام أو تشريع ما للجمهور،
                  مع إتاحة التعليق والنقاش على أي بند.
                </p>
              </Col>
              <Col xs="12" md="3" className="item">
                <img src="../static/img/filter.svg" alt="" />
                <h4> الفلترة </h4>
                <p>
                  يتمكن المستفيدون من المنصة من مراجعة الآراء والتعليقات، وتحديد
                  ما هو وجيه ومناسب، وذلك للاستفادة منها وتضمينها في تقرير نتائج
                  مناقشة النظام أو التشريع، واستبعاد التعليقات غير المفيدة عن
                  صانعي القرار، وذلك لضمان جودة المخرجات وتركيز الفائدة بأكبر
                  قدر ممكن.
                </p>
              </Col>
              <Col xs="12" md="3" className="item">
                <img src="../static/img/chart.svg" alt="" />
                <h4> التحفيز </h4>
                <p>
                  توفر المنصة أدوات خاصة لتحفيز الجمهور على التفاعل والمشاركة،
                  من خلال تجميع النقاط، التي تزداد في حال كثّف المستخدم
                  مشاركاته، أو أبدى آراءً وجيهة قابلة للاستفادة منها.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </>
  );
};

export default AboutQarar;
