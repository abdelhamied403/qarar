import React, { Component } from 'react';
import {
  Container,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Media,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  FormText,
  Alert,
  CustomInput
} from 'reactstrap';
import Link from 'next/link';
import { connect } from 'react-redux';
import Api from '../../../api';
import ClientSidebar from '../../../layout/ClientSidebar';
class AboutUpdate extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      countries: [],
      cities: [],
      eLevels: {},
      labors: {},
      maritals: {},
      pass: [{ existing: '', value: '' }]
    };
  }

  componentDidMount() {
    this.getUser();
    this.getCountries();
    this.getCities();
    this.getELevels();
    // this.getGenders();
    this.getLabors();
    this.getMaritals();
  }

  getUser = async () => {
    const { uid } = this.props;
    const response = await Api.get(`/qarar_api/load/user/${uid}?_format=json`);

    if (response.ok) {
      const { data } = response;
      const user = {
        mail: [{ value: data.mail }],
        field_full_name: [{ value: data.full_name }],
        field_job: [{ value: data.job }],
        field_labor_sector: [{ value: data.labor_sector }],
        field_neighborhood: [{ value: data.neighborhood }],
        field_country: [{ target_id: data.country ? data.country.id : '' }],
        field_city: [{ target_id: data.city ? data.city.id : '' }],
        field_educational_level: [{ value: data.educational_level }],
        field_social_status: [{ value: data.social_status }]
      };
      this.setState({ user, userDefault: user });
    }
  };

  getCountries = async () => {
    const countriesResponse = await Api.get(
      '/qarar_api/load/vocabulary/country?_format=json'
    );
    if (countriesResponse.ok) {
      this.setState({ countries: countriesResponse.data });
    }
  };

  getCities = async () => {
    const citiesResponse = await Api.get(
      '/qarar_api/load/vocabulary/city?_format=json'
    );
    if (citiesResponse.ok) {
      this.setState({ cities: citiesResponse.data });
    }
  };

  getELevels = async () => {
    const eLevelsResponse = await Api.get(
      '/qarar_api/field-options/user/field_educational_level?_format=json'
    );
    if (eLevelsResponse.ok) {
      this.setState({ eLevels: eLevelsResponse.data });
    }
  };

  getGenders = async () => {
    const gendersResponse = await Api.get(
      '/qarar_api/field-options/user/field_gender?_format=json'
    );
    if (gendersResponse.ok) {
      this.setState({ genders: gendersResponse.data });
    }
  };

  getLabors = async () => {
    const laborsResponse = await Api.get(
      '/qarar_api/field-options/user/field_labor_sector?_format=json'
    );
    if (laborsResponse.ok) {
      this.setState({ labors: laborsResponse.data });
    }
  };

  getMaritals = async () => {
    const maritalsResponse = await Api.get(
      '/qarar_api/field-options/user/field_social_status?_format=json'
    );
    if (maritalsResponse.ok) {
      this.setState({ maritals: maritalsResponse.data });
    }
  };

  saveUser = async () => {
    this.setState({ successSave: false, errorSave: false });
    const { uid, accessToken } = this.props;
    const { user } = this.state;
    const response = await Api.patch(`/user/${uid}?_format=json`, user, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (response.ok) {
      this.setState({ successSave: true });
    } else {
      this.setState({ errorSave: true });
    }
  };

  savePassword = async () => {
    this.setState({ successSavePassword: false, errorSavePassword: false });
    const { uid, accessToken } = this.props;
    const { pass } = this.state;

    const response = await Api.patch(
      `/user/${uid}?_format=json`,
      { pass },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    if (response.ok) {
      this.setState({
        successSavePassword: true,
        pass: [{ existing: '', value: '' }]
      });
    } else {
      this.setState({ errorSavePassword: true });
    }
  };

  render() {
    const {
      user,
      userDefault,
      labors,
      maritals,
      countries,
      cities,
      eLevels,
      successSave,
      errorSave,
      successSavePassword,
      errorSavePassword,
      pass
    } = this.state;
    return (
      <>
        <ClientSidebar />
        <div className="aboutheader"></div>
        <div className="about-update shared">
          <Container>
            <Breadcrumb className="px-0" listClassName="px-0">
              <BreadcrumbItem>
                <Link href="/me/about">
                  <a>لوحة التحكم</a>
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>معلوماتي الشخصية</BreadcrumbItem>
            </Breadcrumb>
            <div className="flex flex-justifiy-sp m-50-b">
              <h2>معلوماتي الشخصية</h2>
              <div className="flex flex-row">
                <Button
                  onClick={() => this.setState({ user: userDefault })}
                  color="primary m-10-lr"
                  outline
                  style={{ width: '67px' }}
                >
                  إلغاء
                </Button>
                <Button onClick={this.saveUser} color="primary m-10-lr">
                  حفظ التعديلات
                </Button>
              </div>
            </div>
            {successSave && (
              <Alert color="success">تم حفظ البيانات بنجاح</Alert>
            )}
            {errorSave && (
              <Alert color="danger">حدث خطأ ما أثناء حفظ البيانات</Alert>
            )}
            <div className="userinfo flex flex-align-center m-50-b">
              <div className="uploadImg" onClick={() => this.fileInput.click()}>
                <Media
                  object
                  src="/static/img/avatar.png"
                  className="image-avatar"
                />
                <img
                  className="overlayImg"
                  src="/static/img/interactive/change photo.png"
                  alt=""
                />
              </div>

              <input
                style={{ display: 'none' }}
                type="file"
                name="file"
                ref={fileInput => (this.fileInput = fileInput)}
                onChange={this.fileSelect}
                className=""
              />

              <div className="felx flex-col">
                {/* <h3>{user.field_full_name && user.field_full_name[0].value}</h3> */}
                <h6 className="sub-header">الأسم </h6>

                <Input
                  type="text"
                  id="text-input"
                  name="text-input"
                  onChange={e =>
                    this.setState({
                      user: {
                        ...user,
                        field_full_name: [{ value: e.target.value }]
                      }
                    })
                  }
                  value={user.field_full_name && user.field_full_name[0].value}
                />
              </div>
            </div>
            <Row>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">البريد الالكتروني</h6>
                  <Input
                    type="email"
                    id="email-input"
                    name="email-input"
                    onChange={e =>
                      this.setState({
                        user: {
                          ...user,
                          mail: [{ value: e.target.value }]
                        }
                      })
                    }
                    value={user.mail && user.mail[0].value}
                    autoComplete="email"
                  />
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">البلد </h6>
                  {/* <h4>المملكة العربية السعودية</h4> */}
                  <Input
                    type="select"
                    name="selectLg"
                    id="selectLg"
                    bsSize="md"
                    onChange={e =>
                      this.setState({
                        user: {
                          ...user,
                          field_country: [{ target_id: e.target.value }]
                        }
                      })
                    }
                    value={
                      user.field_country && user.field_country[0].target_id
                    }
                  >
                    {countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </Input>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">المدينة</h6>
                  {/* <h4>الرياض</h4> */}
                  <Input
                    type="select"
                    name="selectLg"
                    id="selectLg"
                    bsSize="md"
                    onChange={e =>
                      this.setState({
                        user: {
                          ...user,
                          field_city: [{ target_id: e.target.value }]
                        }
                      })
                    }
                    value={user.field_city && user.field_city[0].target_id}
                  >
                    {cities.map(city => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Input>
                </div>
              </Col>

              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">منطقة السكن</h6>
                  <Input
                    type="text"
                    id="text-input"
                    name="text-input"
                    placeholder="أضف منطقة السكن"
                    onChange={e =>
                      this.setState({
                        user: {
                          ...user,
                          field_neighborhood: [{ value: e.target.value }]
                        }
                      })
                    }
                    value={
                      user.field_neighborhood &&
                      user.field_neighborhood[0].value
                    }
                  />
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">أعلى مستوى تعليمي</h6>
                  <Input
                    type="select"
                    name="selectLg"
                    id="selectLg"
                    bsSize="md"
                    value={
                      user && user.field_educational_level
                        ? user.field_educational_level[0].value
                        : ''
                    }
                    onChange={e =>
                      this.setState({
                        user: {
                          ...user,
                          field_educational_level: [{ value: e.target.value }]
                        }
                      })
                    }
                  >
                    {Object.keys(eLevels).map(level => (
                      <option key={level} value={level}>
                        {eLevels[level]}
                      </option>
                    ))}
                  </Input>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">الوظيفة</h6>
                  <Input
                    type="text"
                    id="text-input"
                    name="text-input"
                    onChange={e =>
                      this.setState({
                        user: {
                          ...user,
                          field_job: [{ value: e.target.value }]
                        }
                      })
                    }
                    value={user.field_job && user.field_job[0].value}
                  />
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">قطاع العمل</h6>
                  <div className="flex">
                    {Object.keys(labors).map(labor => (
                      <FormGroup
                        key={labor}
                        check
                        className="radio d-flex align-items-center "
                      >
                        <CustomInput
                          type="checkbox"
                          className="form-check-input"
                          type="radio"
                          id={labor}
                          name="labors"
                          value={labor}
                          onChange={e =>
                            this.setState({
                              user: {
                                ...user,
                                field_labor_sector: [{ value: e.target.value }]
                              }
                            })
                          }
                          checked={
                            user &&
                            user.field_labor_sector &&
                            user.field_labor_sector[0].value === labor
                          }
                        />
                        <Label
                          check
                          className="form-check-label ml-4"
                          htmlFor={labor}
                        >
                          {labor}
                        </Label>
                      </FormGroup>
                    ))}
                  </div>
                </div>
              </Col>
              <Col xs="12" md="6">
                <div className="about-update-card flex flex-col flex-justifiy-sp">
                  <h6 className="sub-header">الحالة الاجتماعية</h6>
                  <div className="d-flex">
                    {Object.keys(maritals).map(marital => (
                      <FormGroup
                        key={marital}
                        check
                        className="radio d-flex align-items-center mr-4"
                      >
                        <CustomInput
                          type="radio"
                          className="form-check-input"
                          id={marital}
                          name="maritals"
                          value={marital}
                          onChange={e =>
                            this.setState({
                              user: {
                                ...user,
                                field_social_status: [{ value: e.target.value }]
                              }
                            })
                          }
                          checked={
                            user &&
                            user.field_social_status &&
                            user.field_social_status[0].value === marital
                          }
                        />
                        <Label
                          check
                          className="form-check-label ml-4"
                          htmlFor={marital}
                        >
                          {marital}
                        </Label>
                      </FormGroup>
                    ))}
                  </div>
                </div>
              </Col>
              <Col xs="11" className="changePassNew">
                {successSavePassword && (
                  <Alert color="success">تم تغيير كلمة السر بنجاح</Alert>
                )}
                {errorSavePassword && (
                  <Alert color="danger">حدث خطأ ما أثناء حفظ كلمة السر</Alert>
                )}
                <div className="bout-update-carda flex flex-col flex-justifiy-sp changePass">
                  <h6 className="sub-header m-50-b">تغيير كلمة المرور</h6>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">كلمة السر الحالية</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="password"
                        id="password-input"
                        name="password-input"
                        placeholder="اكتب كلمة السر التي تود تغييرها هنا"
                        autoComplete="new-password"
                        onChange={e =>
                          this.setState({
                            pass: [{ ...pass[0], existing: e.target.value }]
                          })
                        }
                        value={pass && pass[0].existing}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">كلمة السر الجديدة</Label>
                    </Col>
                    <Col xs="12" md="8">
                      <Input
                        type="password"
                        id="password-input"
                        name="password-input"
                        placeholder="لوريم ايبسوم دولار سيت أميت"
                        autoComplete="new-password"
                        onChange={e =>
                          this.setState({
                            pass: [{ ...pass[0], value: e.target.value }]
                          })
                        }
                        value={pass && pass[0].value}
                      />
                      <FormText className="help-block red">
                        ٧ أحرف أو أكثر بالإضافة لرقم
                      </FormText>
                    </Col>
                  </FormGroup>
                  <div className="flex flex-justifiy-end">
                    <Button color="primary" onClick={this.savePassword} outline>
                      تغيير كلمة السر
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
const mapStateToProps = ({ auth: { uid, accessToken } }) => ({
  uid,
  accessToken
});
export default connect(mapStateToProps)(AboutUpdate);
