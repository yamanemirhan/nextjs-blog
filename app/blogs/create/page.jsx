'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';

const CreateBlog = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [blog, setBlog] = useState({ blog: '', tag: '', image: '' });

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/blogs/create', {
        method: 'POST',
        body: JSON.stringify({
          blog: blog.blog,
          userId: session?.user.id,
          tag: blog.tag,
          image: blog.image,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      blog={blog}
      setBlog={setBlog}
      submitting={submitting}
      handleSubmit={handleCreateBlog}
    />
  );
};

export default CreateBlog;
