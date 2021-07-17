import React from 'react';
import Head from 'next/head';
import DraftsUnderVotePage from '../views/Pages/drafts-under-vote/drafts-under-vote';

const DraftsUnderVote = () => (
  <div>
    <Head>
      <title>
        التشريعات تحت التصويت - قرار - وزارة الشؤون البلدية والقروية
      </title>
    </Head>
    <DraftsUnderVotePage />
  </div>
);

export default DraftsUnderVote;
