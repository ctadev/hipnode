import React from 'react';

const CreatePostForm = () => {
  return (
    <main className="flex gap-3 md:gap-6 items-center p-[20px] bg-white dark:bg-dark-main-bg rounded-[16px]">
      <img
        src="https://cohort3-tech-titans-hip-node.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddr5vqfte%2Fimage%2Fupload%2Fv1692057644%2FHipNode%2520Post%2520Cover%2520Image%2Fett9kryhg80uhssczvi9.png&w=48&q=75"
        alt=""
        className="h-[40px] w-[40px] object-cover rounded-full"
      />
      <input
        type="text"
        placeholder="Lets share whats going on your mind..."
        className="w-full bg-main-bg dark:bg-dark-secondary-bg rounded-[6px] py-[8px] px-[8px] md:p-[12px] outline-none dark:text-white"
      />
      <button className="whitespace-nowrap rounded-[6px] font-medium py-[8px] px-[12px] md:py-[12px] md:px-[16px] bg-alt-2 hover:bg-primary-orange text-white">
        Create Post
      </button>
    </main>
  );
};

export default CreatePostForm;
