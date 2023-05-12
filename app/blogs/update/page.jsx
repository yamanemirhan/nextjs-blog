'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@/components/Form';

const UpdateBlog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get('blogId');

  const [blog, setBlog] = useState({ blog: '', tag: '', image: '' });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getBlogDetails = async () => {
      const response = await fetch(`/api/blogs/${blogId}`);
      const data = await response.json();

      setBlog({
        blog: data.blog,
        tag: data.tag,
        image: data.image,
      });
    };

    if (blogId) getBlogDetails();
  }, [blogId]);

  const updateBlog = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!blogId) return alert('Missing BlogId!');

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          blog: blog.blog,
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
      type="Edit"
      blog={blog}
      setBlog={setBlog}
      submitting={submitting}
      handleSubmit={updateBlog}
    />
  );
};

export default UpdateBlog;
