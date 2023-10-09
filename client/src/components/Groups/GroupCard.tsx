import React from 'react';
import { IGroup } from '../../../types/index';
import { formattedDate } from '../../helpers/date';

interface GroupCardProps {
  group: IGroup;
}

export default function GroupCard({ group }: GroupCardProps) {
  const { name, description, logo_url, image_url, created_at } = group;
  return (
    <main className="p-[10px] break-inside-avoid rounded-[16px] bg-white dark:bg-dark-main-bg flex flex-col gap-3 mb-4 hover:shadow-lg dark:hover:shadow-[0_10px_15px_-3px_rgba(255,255,255,0.8)]">
      <section className="flex gap-3 items-center">
        <img
          src="https://cohort3-tech-titans-hip-node.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fddr5vqfte%2Fimage%2Fupload%2Fv1692057644%2FHipNode%2520Post%2520Cover%2520Image%2Fett9kryhg80uhssczvi9.png&w=48&q=75"
          alt="user photo"
          className="min-h-[34px] min-w-[34px] rounded-full"
        />
        <aside>
          <h1 className="font-semibold text-dark-grey-1 dark:text-grey-2 text-[12px]">
            {name}
          </h1>
          <p className="text-dark-grey-1 dark:text-grey-2 text-[10px]">
            Benjamin
          </p>
        </aside>
      </section>

      <section>
        <img
          src={image_url}
          alt={name}
          className="w-full max-h-[176px] lg:max-h-[250px] rounded-[10px] object-cover"
        />
      </section>

      <section>
        <p className="text-dark-grey-1 dark:text-grey-2 text-[12px]">
          {description}
        </p>
        <span className="text-dark-grey-2 text-[12px]">
          {formattedDate(created_at)}
        </span>
      </section>
    </main>
  );
}
