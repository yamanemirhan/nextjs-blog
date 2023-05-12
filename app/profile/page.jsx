'use client';

import Profile from '@/components/Profile';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/blogs`);

      const data = await response.json();

      setMyBlogs(data);
    };

    if (session?.user.id) fetchBlogs();
  }, [session?.user.id]);

  const handleEdit = (blog) => {
    router.push(`/blogs/update?blogId=${blog._id}`);
  };

  const handleDelete = async (blog) => {
    const hasConfirmed = confirm('Are you sure you want to delete this blog?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/blogs/${blog._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredBlogs = myBlogs.filter((item) => item._id !== blog._id);

        setMyBlogs(filteredBlogs);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      data={myBlogs}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
