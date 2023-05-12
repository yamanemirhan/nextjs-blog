import Hero from '@/components/Hero';
import React from 'react';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl text-center">
        Share and Find
      </h1>
      <Hero />
    </section>
  );
};

export default Home;
