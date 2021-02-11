import React, { Component } from 'react';
import './invitaion.css';
import {
  Container,
  Input,
  Label,
  FormGroup,
  Row,
  Col,
  Button
} from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import avatar from '../../../assets/img/avatar.png';
const ClientSidebar = React.lazy(() =>
  import('../../../containers/ClientLayout/ClientSidebar')
);

const CardPointsEdit = React.lazy(() =>
  import('../components/card-points-edit/cards-points-edit')
);
const TagItem = React.lazy(() => import('../components/tag-item/tag-item'));
const Breadcrumb = React.lazy(() =>
  import('../components/breadcrumb/breadcrumb')
);
class Invitaion extends Component {
  render() {
    return (
      <React.Fragment>
        <ClientSidebar />

        <div className="invitaion">
          <Breadcrumb title="كل مجموعاتي" link="/client/me/groups" />
          <Container>
            <div className="header-content">
              <h2>مناقشة سياسة النقل العام</h2>
              <div className="sub-header">
                <i className="fa fa-calendar "></i>
                <span>تاريخ الإصدار 25/8/2019</span>
              </div>
              <div className="flex">
                <div className="sub-header">
                  <i className="fa fa-clock-o "></i>
                  <span>الوقت المتبقي لإلغاء الدعوة</span>
                </div>
                <span> 6 ايام </span>
              </div>
            </div>

            <Row>
              <Col xs="12" md="8" className="m-tb-50">
                <div>
                  لقد تم دعوتك إلى مناقشة مسودة سرية لم يتم نشرها بعد. إذا كنت
                  ترغب في المتابعة والمشاركة في عرض التفاصيل والتعاون. يرجى
                  الموافقة على الشروط أدناه والمتابعة لإضافة هذه المسودة إلى
                  مجموعاتك. لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا
                  يسكينج أليايت,سيت دو أيوسمود تيمبور نكايديديونتيوت لابوري ات
                  دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد
                  أكسير سيتاشن يللأمكو لابورأس نيسي يت أليكيوب أكس أيا كوممودو
                  كونسيكيوات . ديواس أيوتي أريري دولار إن ريبريهينديرأيت
                  فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت نيولا
                  باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون
                  بروايدينت ,سيونت ان كيولبا كيو أوفيسيا ديسيريونتموليت انيم
                  أيدي ايست لابوريوم." "سيت يتبيرسبايكياتيس يوندي أومنيس أستي
                  ناتيس أيررور سيت فوليبتاتيم أكيسأنتييوم دولاريمكيو
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
                  نايهايل موليستايا كونسيكيواتيو,فيلايليوم كيواي دولوريم أيوم
                  فيوجايات كيو فوليوبتاس نيولا باراياتيور.
                </div>
              </Col>
              <Col md="9">
                <FormGroup check className="checkbox">
                  <Input
                    className="form-check-input"
                    type="checkbox"
                    id="checkbox1"
                    name="checkbox1"
                    value="option1"
                  />
                  <Label check className="form-check-label" htmlFor="checkbox1">
                    أوافق على جميع الشروط المذكورة أعلاه
                  </Label>
                </FormGroup>
              </Col>
            </Row>
            <div className="text-center m-tb-50">
              <Button
                exact
                to="/client/me/group"
                tag={RRNavLink}
                color="primary"
              >
                التالي
              </Button>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Invitaion;
