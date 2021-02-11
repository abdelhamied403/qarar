import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProfilePage from '../../views/Pages/user-info/user-info';

const Profile = () => {
  const router = useRouter();
  const { profileId } = router.query;
  return (
    <div>
      <div>
        <Head>
          <title>الصفحة الشخصية - قرار- وزارة الشؤون البلدية والقروية</title>
        </Head>
        <ProfilePage profileId={profileId} />
      </div>
    </div>
  );
};

export default Profile;
