import Link from 'next/link';

const Form = ({ type, blog, setBlog, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl text-left">
        <span>{type} Blog</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 rounded-xl border border-gray-200 bg-slate-800 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-200">
            Blog
          </span>

          <textarea
            value={blog.blog}
            onChange={(e) => setBlog({ ...blog, blog: e.target.value })}
            placeholder="Write your blog here"
            required
            className="w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-200">
            Tag{' '}
            <span className="font-normal">
              (#development, #music, #sports, etc.)
            </span>
          </span>
          <input
            value={blog.tag}
            onChange={(e) => setBlog({ ...blog, tag: e.target.value })}
            type="text"
            placeholder="Write a tag without #"
            required
            className="w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0"
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-200">
            Image
          </span>
          <input
            onChange={(e) =>
              setBlog({ ...blog, image: e.target.files[0].name })
            }
            type="file"
            className="w-full flex rounded-lg mt-2 p-3 text-sm bg-white text-gray-500 outline-0"
          />
        </label>

        <div className="mx-3 mb-5">
          <Link href="/" className="text-gray-500">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-lg"
          >
            {submitting ? 'Submitting...' : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
