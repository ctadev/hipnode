import React from 'react';
import PostList from '../components/Posts/PostList';

export default function HomePage() {
  return (
    <main className="flex">
      {/* LeftSide */}
      <section className="w-[210px] bg-red-500 h-screen"></section>

      {/* Middle */}
      <section className="flex-1 bg-green-500 h-screen"></section>

      {/* RightSide */}
      <section className="w-[325px] bg-yellow-500 h-screen"></section>
    </main>
  );
}
