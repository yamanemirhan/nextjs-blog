'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@/components/Profile';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');

  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`/api/users/${params?.userId}/blogs`);
      const data = await response.json();

      setUserBlogs(data);
    };

    if (params?.userId) fetchBlogs();
  }, [params.id]);

  return <Profile name={userName} data={userBlogs} />;
};

export default UserProfile;
