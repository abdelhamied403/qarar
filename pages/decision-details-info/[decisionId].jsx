import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DecisionDetailsInfoPage from '../../views/Pages/decision-details-info/decision-details-info';

const DecisionDetailsInfo = () => {
  const router = useRouter();
  const { decisionId } = router.query;
  return (
    <div>
      <div>
        <Head>
          <title>مسودة عمل - قرار- وزارة الشؤون البلدية والقروية</title>
        </Head>
        <DecisionDetailsInfoPage decisionId={decisionId} />
      </div>
    </div>
  );
};
export default DecisionDetailsInfo;
