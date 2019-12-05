import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NewsDetailsPage from '../../views/Pages/platform-news-image/platform-news-image';

const NewsDetails = () => {
  const router = useRouter();
  const { newsId } = router.query;
  return (
    <div>
      <div>
        <Head>
          <title> خبر - قرار- وزارة الشؤون البلدية والقروية</title>
        </Head>
        <NewsDetailsPage newsId={newsId} />
      </div>
    </div>
  );
};
export default NewsDetails;
