'use client';

import { useState, useEffect } from 'react';

import BlogCard from './BlogCard';

const BlogCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
      {data.map((blog) => (
        <BlogCard key={blog._id} blog={blog} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Hero = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchBlogs = async () => {
    const response = await fetch('/api/blogs');
    const data = await response.json();

    setAllBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filterBlogs = (searchtext) => {
    const regex = new RegExp(searchtext, 'i');
    return allBlogs.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.blog)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterBlogs(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterBlogs(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="hero">
      <form className="relative w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for a tag, content or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="block w-full rounded-md border border-gray-200 text-black py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 peer"
        />
      </form>

      {searchText ? (
        <BlogCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <BlogCardList data={allBlogs} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Hero;
