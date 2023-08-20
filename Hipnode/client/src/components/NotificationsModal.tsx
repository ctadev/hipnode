import React, { useEffect, useState } from 'react';

import { NotificationItem } from '.';
import {
  like, comment, mention, edit, avatar1, avatar2, avatar3, checked,
} from '../assets';
import { INotification, IPost } from '../../types/index';
import { useGetPost } from '../../hooks/usePosts';
import { useClearNotifications } from '../../hooks/useNotifications';
import { notificationTypes } from '../constants/general';
import { User } from '../../types';

type Props = {
  notifications: INotification[];
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
  userData: User
}

const NotificationsModal = ({ notifications, setNotifications, userData }: Props) => {
  const [post, setPost] = useState<IPost>(null);
  const [selectedNotificationType, setSelectedNotificationType] = useState<string>('All Notifications');
  const [filteredNotifications, setFilteredNotifications] = useState<INotification[]>([]);
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}')
  const clearNotifications = useClearNotifications()

  const handleClearNotifications = async () => {
    try {
      await clearNotifications.mutateAsync({
        data: {
          user_id: loggedInUser.id
        },
        token: loggedInUser.token
      })
    } catch (error) {
      console.log('Error clearing notifications', error)
    }
  }

  const filterNotifications = () => {
    const filteredByUser = notifications?.filter((notification) => {
      return notification.userId === userData.id
    }) || [];

    if (selectedNotificationType === 'All Notifications') return setFilteredNotifications(filteredByUser)
    if (selectedNotificationType === 'Reactions') return setFilteredNotifications(filteredByUser.filter((notification) => notification.type === 'like'))
    if (selectedNotificationType === 'Comments') return setFilteredNotifications(filteredByUser.filter((notification) => notification.type === 'comment'))
    if (selectedNotificationType === 'Mentions') return setFilteredNotifications(filteredByUser.filter((notification) => notification.type === 'mention'))
    if (selectedNotificationType === 'Edits') return setFilteredNotifications(filteredByUser.filter((notification) => notification.type === 'edit'))
    if (selectedNotificationType === 'Follows') return setFilteredNotifications(filteredByUser.filter((notification) => notification.type === 'follow'))
  }


  useEffect(() => {
    filterNotifications()
  }, [selectedNotificationType])

  return (
    <main className="bg-white dark:bg-dark-black-4 p-5 lg:p-[30px] rounded-lg absolute w-[335px] lg:w-[589px] lg:right-[70px] z-50 right-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="capitalize font-semibold lg:text-[26px] dark:text-white">{filteredNotifications.length} Notifications</h2>
        <div className="flex rounded-lg p-[11px] gap-[11px] bg-grey-2 dark:bg-dark-black-3">
          <span className="self-center mr-1">
            <img src={checked} alt="checked-icon" />
          </span>
          <button
            onClick={handleClearNotifications}
            className='flex rounded-md font-semibold text-sm lg:text-base dark:text-white  text-dark-grey-3'
          > Mark All Read</button>
        </div>
      </header>
      <hr className="mb-4" />
      <ul className="flex justify-between mb-4 dark:text-[#ff6833] overflow-x-scroll gap-[35px] hide-scrollbar">
        {notificationTypes.map((type) => (
          <li
            key={type.type}
            onClick={() => setSelectedNotificationType(type.type)}
            className={`cursor-pointer flex gap-[9px] items-center shrink-0 ${selectedNotificationType === type.type && 'text-alt-10'}`}
          >
            {type.img && <img src={type.img} alt={type.type} className='mr-1 object-contain' />}
            <span>{type.type}</span>
          </li>
        ))}
      </ul>

      {filteredNotifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </main>
  );
};

export default NotificationsModal;
