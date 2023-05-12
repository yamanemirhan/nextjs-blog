import Blog from '@/models/blog';
import { connectToDB } from '@/utils/connectToDB';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const blog = await Blog.findById(params.blogId).populate('creator');
    if (!blog) return new Response('Blog Not Found', { status: 404 });

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { blog, tag, image } = await request.json();

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingBlog = await Blog.findById(params.blogId);

    if (!existingBlog) {
      return new Response('Blog not found', { status: 404 });
    }

    existingBlog.blog = blog;
    existingBlog.tag = tag;
    existingBlog.image = image;

    await existingBlog.save();

    return new Response('Successfully updated the Blog', { status: 200 });
  } catch (error) {
    return new Response('Error Updating Blog', { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Blog.findByIdAndRemove(params.blogId);

    return new Response('Blog deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Error deleting blog', { status: 500 });
  }
};
