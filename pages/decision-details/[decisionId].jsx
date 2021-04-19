import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import DecisionDetailsPage from '../../views/Pages/decision-details/decision-details';

const DecisionDetails = () => {
  const router = useRouter();
  const { decisionId } = router.query;
  return (
    <div>
      <div>
        <Head>
          <title>مسودة عمل - قرار- وزارة الشؤون البلدية والقروية</title>
        </Head>
        <DecisionDetailsPage decisionId={decisionId} />
      </div>
    </div>
  );
};
export default DecisionDetails;
