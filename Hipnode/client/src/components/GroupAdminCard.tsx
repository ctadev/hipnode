import React from 'react';
import { user1, addUser } from '../assets';

const GroupAdminCard = ({ admin }) => {
  return (
    <div className="bg-white dark:bg-dark-black-3 w-full p-[10px] lg:p-5 rounded-2xl lg:max-w-[214px] flex flex-col lg:gap-5 gap-[14px]">
      <h3 className="font-semibold dark:text-white">Admins</h3>
      <div className="flex flex-col gap-[10px]">
        <div className="flex justify-between">
          <div className="flex items-center gap-[10px]">
            <img src={user1} alt="user" className="w-[30px] h-[30px]" />
            <h4 className="font-semibold text-sm dark:text-white">
              {admin?.first_name && admin?.last_name
                ? `${admin.first_name} ${admin.last_name}`
                : admin?.username}
            </h4>
          </div>
          <img src={addUser} alt="add user" className="w-[30px] h-[30px]" />
        </div>
      </div>
    </div>
  );
};

export default GroupAdminCard;
