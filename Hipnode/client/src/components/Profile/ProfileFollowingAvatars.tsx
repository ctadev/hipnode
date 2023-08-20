import React, { useEffect, useState } from 'react';

import { memoji1 } from '../../assets';
import { useNavigate } from 'react-router';


const ProfileFollowingAvatars = ({ followingProfileId }: { followingProfileId: number }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileQuery = await fetch(`${import.meta.env.VITE_DEV_BACKEND_URL}/users/${parseInt(followingProfileId)}/profile`);
                const authUser = await profileQuery.json();
                setUser(authUser)
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
        }, [followingProfileId]);

    return (
        <div className='flex flex-start'>
            <img
                src={user.avatar ? user.avatar : memoji1}
                alt='Following Avatar'
                className='w-[30px] h-[30px] flex object-contain'
                onClick={()=> {
                    navigate(`/profiles/${followingProfileId}`);
                    window.location.reload();
                }}
            />
        </div>
    )
}

export default ProfileFollowingAvatars