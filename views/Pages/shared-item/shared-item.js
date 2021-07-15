import React, { Component } from 'react';
import './shared-item.css';
import { Container, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import CardDraft from '../components/card-draft/card-draft';
const ClientSidebar = React.lazy(() =>
  import('../../../containers/ClientLayout/ClientSidebar')
);

class SharedItem extends Component {
  render() {
    return (
      <React.Fragment>
        <ClientSidebar />
        <div className="shared-item">
          <Container>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link exact to="/client/landing" tag={RRNavLink}>
                  لوحة التحكم
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link exact to="/client/landing" tag={RRNavLink}>
                  مشاركاتي
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>اشعاراتي</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-50-b">
              <h2>التشريعات التي قمت بالتعليق عليها</h2>
            </div>
            <CardDraft
              header=" سياسة السماح باستيراد السيارات الكهربائية"
              content={`
              لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
              أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
               أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابو
              رأس نيسي. سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم
               أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو
               أنفينتوري فيرأتاتيس #نقل ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو
              . نيمو أنيم أبسام فوليوباتاتيم كيواي فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت
               فيوجايت, سيد كيواي كونسيكيونتشر ماجناي دولارس أيوس كيواي راتاشن فوليوبتاتيم
               سيكيواي نيسكايونت. نيكيو بوررو#نقل كيوايسكيوم ايست,كيواي دولوريم ايبسيوم
               كيوا دولار #طاقة سايت أميت, كونسيكتيتيور,أديبايسكاي فيلايت, سيد كيواي نون
               نيومكيوام ايايوس موداي تيمبورا انكايديونت يوت لابوري أيت دولار ماجنام`}
              tags={[{ tag: 'نقل', id: 1 }]}
              date="12/4/2019"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
            />
            <CardDraft
              header=" سياسة السماح باستيراد السيارات الكهربائية"
              content={`
              لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
              أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
               أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابو
              رأس نيسي. سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم
               أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو
               أنفينتوري فيرأتاتيس #نقل ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو
              . نيمو أنيم أبسام فوليوباتاتيم كيواي فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت
               فيوجايت, سيد كيواي كونسيكيونتشر ماجناي دولارس أيوس كيواي راتاشن فوليوبتاتيم
               سيكيواي نيسكايونت. نيكيو بوررو#نقل كيوايسكيوم ايست,كيواي دولوريم ايبسيوم
               كيوا دولار #طاقة سايت أميت, كونسيكتيتيور,أديبايسكاي فيلايت, سيد كيواي نون
               نيومكيوام ايايوس موداي تيمبورا انكايديونت يوت لابوري أيت دولار ماجنام`}
              tags={[{ tag: 'نقل', id: 1 }]}
              date="12/4/2019"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
            />
            <CardDraft
              header=" سياسة السماح باستيراد السيارات الكهربائية"
              content={`
              لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
              أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
               أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابو
              رأس نيسي. سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم
               أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو
               أنفينتوري فيرأتاتيس #نقل ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو
              . نيمو أنيم أبسام فوليوباتاتيم كيواي فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت
               فيوجايت, سيد كيواي كونسيكيونتشر ماجناي دولارس أيوس كيواي راتاشن فوليوبتاتيم
               سيكيواي نيسكايونت. نيكيو بوررو#نقل كيوايسكيوم ايست,كيواي دولوريم ايبسيوم
               كيوا دولار #طاقة سايت أميت, كونسيكتيتيور,أديبايسكاي فيلايت, سيد كيواي نون
               نيومكيوام ايايوس موداي تيمبورا انكايديونت يوت لابوري أيت دولار ماجنام`}
              tags={[{ tag: 'نقل', id: 1 }]}
              date="12/4/2019"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
            />
            <CardDraft
              header=" سياسة السماح باستيراد السيارات الكهربائية"
              content={`
              لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
              أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
               أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابو
              رأس نيسي. سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم
               أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو
               أنفينتوري فيرأتاتيس #نقل ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو
              . نيمو أنيم أبسام فوليوباتاتيم كيواي فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت
               فيوجايت, سيد كيواي كونسيكيونتشر ماجناي دولارس أيوس كيواي راتاشن فوليوبتاتيم
               سيكيواي نيسكايونت. نيكيو بوررو#نقل كيوايسكيوم ايست,كيواي دولوريم ايبسيوم
               كيوا دولار #طاقة سايت أميت, كونسيكتيتيور,أديبايسكاي فيلايت, سيد كيواي نون
               نيومكيوام ايايوس موداي تيمبورا انكايديونت يوت لابوري أيت دولار ماجنام`}
              tags={[{ tag: 'نقل', id: 1 }]}
              date="12/4/2019"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
            />
            <CardDraft
              header=" سياسة السماح باستيراد السيارات الكهربائية"
              content={`
              لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو
              أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار
               أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابو
              رأس نيسي. سيت يتبيرسبايكياتيس يوندي أومنيس أستي ناتيس أيررور سيت فوليبتاتيم
               أكيسأنتييوم دولاريمكيو لايودانتيوم,توتام ريم أبيرأم,أيكيو أبسا كيواي أب أللو
               أنفينتوري فيرأتاتيس #نقل ايت كياسي أرشيتيكتو بيتاي فيتاي ديكاتا سيونت أكسبليكابو
              . نيمو أنيم أبسام فوليوباتاتيم كيواي فوليوبتاس سايت أسبيرناتشر أيوت أودايت أيوت
               فيوجايت, سيد كيواي كونسيكيونتشر ماجناي دولارس أيوس كيواي راتاشن فوليوبتاتيم
               سيكيواي نيسكايونت. نيكيو بوررو#نقل كيوايسكيوم ايست,كيواي دولوريم ايبسيوم
               كيوا دولار #طاقة سايت أميت, كونسيكتيتيور,أديبايسكاي فيلايت, سيد كيواي نون
               نيومكيوام ايايوس موداي تيمبورا انكايديونت يوت لابوري أيت دولار ماجنام`}
              tags={[{ tag: 'نقل', id: 1 }]}
              date="12/4/2019"
              subHeader="يغلق التصويت بتاريخ 25/8/2019"
            />

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
        </div>
      </React.Fragment>
    );
  }
}

export default SharedItem;
