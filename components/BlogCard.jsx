'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const BlogCard = ({ blog, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleProfileClick = () => {
    if (blog.creator._id === session?.user.id) return router.push('/profile');

    router.push(`/profile/${blog.creator._id}?name=${blog.creator.username}`);
  };

  return (
    <div className="blog_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={blog.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-amber-400">
              {blog.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-400">
              {blog.creator.email}
            </p>
          </div>
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-100">{blog.blog}</p>
      <p
        className="font-inter text-sm text-yellow-700 cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(blog.tag)}
      >
        #{blog.tag}
      </p>

      {session?.user.id === blog.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex justify-center items-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm text-green-500 cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm text-red-500 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
