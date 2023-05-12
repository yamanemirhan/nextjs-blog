import Blog from '@/models/blog';
import { connectToDB } from '@/utils/connectToDB';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const blogs = await Blog.find({ creator: params.userId }).populate(
      'creator'
    );

    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch blogs created by user', {
      status: 500,
    });
  }
};
