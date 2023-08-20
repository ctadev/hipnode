import React, { useState } from 'react'

import { actives } from '../../constants/general'
import { PostsFilter, GroupsFilter, MeetupsFilter, PodcastsFilter } from './Filters';


const ProfilePostsFilter = () => {
    const [activated, setActivated] = useState('Posts');


    const handleTitleClick = (title) => {
        setActivated(title);
    };
    
    return (
        <>
            <div className='md:h-[80px] flex justify-between bg-white dark:bg-[#262D34] rounded-lg p-2 md:p-0 '>
                {actives.map((active, index) => (
                    <div
                        key={index}
                        className='flex items-center text-[10px] md:text-[16px] font-semibold text-[#97989D] px-2 md:px-6'
                        onClick={() => handleTitleClick(active.title)}
                    >
                        {activated === active.title ? (
                            <div className=" bg-[#FF6934] rounded-full lg:w-[82px] lg:h-[42px] h-[22px] flex items-center justify-center text-white cursor-pointer px-2">

                                {active.title}
                            </div>
                        ) : (
                            <div className="lg:w-[82px] lg:h-[42px] h-[28px] flex items-center justify-center cursor-pointer">
                                {active.title}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className='mt-4'>
                {activated === 'Posts' && <PostsFilter />}
                {activated === 'Meetups' && <MeetupsFilter />}
                {activated === 'Podcasts' && <PodcastsFilter />}
                {activated === 'Groups' && <GroupsFilter />}
            </div>
        </>
    )
}

export default ProfilePostsFilter