import React from 'react';
import { message1, message2, message3, message4 } from '../assets';

type Props = {
  avatar: string | undefined;
  name: string;
  info: string;
  unRead: number;
  time: string;
};

const MessageCard = ({ avatar, name, info, unRead, time }: Props) => {
  return (
    <article className="flex  items-center mb-4 z-50">
      <div className="mr-2">
        <img src={avatar} alt="user" className="object-contain" />
      </div>
      <div className="mr-12">
        <h4 className='dark:text-white'>
          {name} <span className="text-[#97989D]">{time}</span>
        </h4>

        <p className="text-[#97989D]">{info}</p>
      </div>
      <div className="bg-[#FF6934] rounded-full h-6 w-6 text-white text-center">
        {unRead}
      </div>
    </article>
  );
};

const MessagesModal = () => {
  return (
    <main className="bg-[#F4F6F8] dark:bg-dark-black-4  p-2 px-3 rounded-lg sm:grid lg:w-3/12 lg:absolute lg:right-[100px] z-50">
      <h3 className="text-xl capitalize font-semibold mb-4 dark:text-white">messages</h3>
      <MessageCard
        name="Wade Warren"
        time="20 minutes ago"
        info="Congrats on your work anniversary!"
        avatar={message1}
        unRead={2}
      />
      <MessageCard
        name="Robert Fox"
        time="3 days ago"
        info="Congrats on your work anniversary!"
        avatar={message2}
        unRead={2}
      />
      <MessageCard
        name="Marvin Mckinney"
        time="9 hour ago"
        info="Congrats on your work anniversary!"
        avatar={message3}
        unRead={2}
      />
      <MessageCard
        name="Cameron"
        time="3 days ago"
        info="Congrats on your work anniversary!"
        avatar={message4}
        unRead={2}
      />

      <button className="text-[#347AE2] capitalize font-medium mt-3">
        see all in messages
      </button>
    </main>
  );
};

export default MessagesModal;
