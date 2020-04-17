import React from 'react';
import Head from 'next/head';
import AboutPage from '../../views/Pages/about/about';
import Auth from '../../layout/auth';

const About = () => (
  <Auth>
    <div>
      <Head>
        <title>عن المستخدم - قرار- وزارة الشؤون البلدية والقروية</title>
        <link href="/static/css/about.css" rel="stylesheet" />
      </Head>
      <AboutPage />
    </div>
  </Auth>
);

export default About;
