import BlogCard from './BlogCard';

const Profile = ({ name, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="text-3xl">{name} Profile</span>
      </h1>

      <div className="mt-10 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {data.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            handleEdit={() => handleEdit && handleEdit(blog)}
            handleDelete={() => handleDelete && handleDelete(blog)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
