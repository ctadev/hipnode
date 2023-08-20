import React from 'react'

import { Navbar, ProfileDataComponent, ProfilePostsFilter, ProfilePerformance } from '../components'

const Profile = () => {
    return (
        <div className='relative'>
            <div className='bg-grey-1 dark:bg-[#151A1E] h-screen flex justify-between md:flex-col-3 flex-col-1'>
                {/* left handside */}
                <section className='mt-5'>
                    <ProfileDataComponent />
                </section>

                {/* posts  */}
                <section className='mt-5'>
                    <ProfilePostsFilter />
                </section>

                {/* performance */}
                <section className='mt-5'>
                    <ProfilePerformance />
                </section>
            </div>
        </div>
    )
}

export default Profile