import React, { FC } from 'react';

type MeetupsDateProps = {
  month: string;
  day: string;
};

const MeetupsDate: FC<MeetupsDateProps> = ({ month, day }) => {
  return (
    <div className="bg-[#FFF] dark:bg-dark-black-4 dark:text-white border-2 dark:border-dark-black-4 w-auto h-auto py-1 px-2 rounded-md">
      <ul className="flex flex-col items-center">
        <li>
          <p>{month}</p>
        </li>
        <li>
          <p className="text-[#347AE2] text-xl font-bold">{day}</p>
        </li>
      </ul>
    </div>
  );
};

export default MeetupsDate;
