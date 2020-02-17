import React from 'react';
import Head from 'next/head';
import AboutUpdate from '../../views/Pages/about-update/about-update';
import Auth from '../../layout/auth';

const About = () => (
  <Auth>
    <div>
      <Head>
        <title>عن المستخدم - قرار- وزارة الشؤون البلدية والقروية</title>
        <link href="/static/css/about-update.css" rel="stylesheet" />
      </Head>
      <AboutUpdate />
    </div>
  </Auth>
);

export default About;
