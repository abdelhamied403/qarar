import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DraftDetailsPage from '../../views/Pages/draft-details-info/draft-details-info';

const DraftDetails = () => {
  const router = useRouter();
  const { draftId } = router.query;
  return (
    <div>
      <div>
        <Head>
          <title>مسودة عمل - قرار- وزارة الشؤون البلدية والقروية</title>
        </Head>
        <DraftDetailsPage draftId={draftId} />
      </div>
    </div>
  );
};
export default DraftDetails;
