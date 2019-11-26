import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import TagPage from '../../views/Pages/tag-details/tag-details';

const Tag = () => {
  const router = useRouter();
  const { tagId } = router.query;
  return (
    <div>
      <div>
        <Head>
          <title> وسم - قرار- وزارة العمل</title>
        </Head>
        <TagPage tagId={tagId} />
      </div>
    </div>
  );
};

export default Tag;
