import React from 'react';
import Head from 'next/head';
import AboutPage from '../../views/Pages/about/about';
import Auth from '../../layout/auth';

const About = () => (
  <Auth>
    <div>
      <Head>
        <title>عن المستخدم - قرار- وزارة العمل</title>
      </Head>
      <AboutPage />
    </div>
  </Auth>
);

export default About;
