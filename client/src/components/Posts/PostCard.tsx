import React, { useState } from 'react';
import UserHeader from '../User/UserHeader';
import { lovelight, loveddark, lovedark, lovedlight } from '../../assets';
import { useSelector } from 'react-redux';

export default function PostCard({ post }) {
  const { id, title, content, image_url, user_id } = post;
  const [liked, setLiked] = useState(false);
  const { theme } = useSelector((state) => state.themeState);

  return (
    <article className="flex gap-6 p-[20px] bg-white dark:bg-dark-main-bg rounded-[16px] hover:shadow-lg dark:hover:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.8)]">
      <section>
        <div className="h-[56px] w-[56px] sm:h-[100px] sm:w-[100px] xl:h-[156px] xl:w-[156px] rounded-[16px] border dark:border-white">
          <img
            src={image_url}
            alt=""
            className="h-full w-full rounded-[16px]"
          />
        </div>
      </section>

      <section className="flex flex-col justify-between w-full">
        <main className="">
          <div className="flex items-center justify-between relative">
            <h3 className="font-semibold text-[12px] md:text-[18px] leading-[26px] text-dark-grey-1 dark:text-white">
              {title}
            </h3>
            <img
              src="https://cohort3-tech-titans-hip-node.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddr5vqfte%2Fimage%2Fupload%2Fv1692057644%2FHipNode%2520Post%2520Cover%2520Image%2Fett9kryhg80uhssczvi9.png&w=32&q=75"
              alt="user avatar"
              className="rounded-full lg:hidden"
            />
            {liked ? (
              <img
                src={theme ? loveddark : lovedlight}
                className="cursor-pointer absolute right-0 top-0 hidden lg:block"
                onClick={() => setLiked(!liked)}
              />
            ) : (
              <img
                src={theme ? lovedark : lovelight}
                className="cursor-pointer absolute right-0 top-0 hidden lg:block"
                onClick={() => setLiked(!liked)}
              />
            )}
          </div>

          <div className="mt-2">
            <ul className="flex gap-4 flex-wrap">
              <li className="rounded-full bg-main-bg dark:bg-dark-secondary-bg dark:text-dark-grey-4 text-grey-3 py-[4px] px-[10px] font-semibold text-[10px]">
                Tags1
              </li>
              <li className="rounded-full bg-main-bg dark:bg-dark-secondary-bg dark:text-dark-grey-4 text-grey-3 py-[4px] px-[10px] font-semibold text-[10px]">
                TagsTwo
              </li>
              <li className="rounded-full bg-main-bg dark:bg-dark-secondary-bg dark:text-dark-grey-4 text-grey-3 py-[4px] px-[10px] font-semibold text-[10px]">
                TagsThree
              </li>
            </ul>
          </div>

          <p className="mt-2 text-grey-3 dark:text-grey-2 text-[14px] line-clamp-1 mb-4 xl:mb-0">
            {content}
          </p>
        </main>

        <div className="flex flex-col gap-4 items-start xl:flex-row xl:gap-0 xl:items-center justify-between mt-4 lg:mt-0">
          <aside className="hidden lg:block">
            <UserHeader user_id={user_id} />
          </aside>

          <ul className="flex gap-8">
            <li className="text-[9px] md:text-[14px] text-dark-grey-2 dark:text-dark-grey-4 text-center">
              244,320 Views
            </li>
            <li className="text-[9px] md:text-[14px] text-dark-grey-2 dark:text-dark-grey-4 text-center">
              10,223 Likes
            </li>
            <li className="text-[9px] md:text-[14px] text-dark-grey-2 dark:text-dark-grey-4 text-center">
              2454 comments
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}
