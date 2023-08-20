import React, { useEffect, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { usePostNotification } from '../../../hooks/useNotifications';
import { User } from '../../types';
import {
  profilebackground,
  memoji1,
  web,
  twitter,
  facebook,
  instagram,
  profile,
} from '../../assets';
import { timeAgo } from '../../..//utils/formateDate';
import ProfileFollowingAvatars from './ProfileFollowingAvatars';
import { UserProfile } from '../../../common.types';

interface Props {
  user: UserProfile;
}

const ProfileDataComponent: React.FC<Props> = ({ user }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState<User>();
  const [otherFollowings, setOtherFollowings] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const navigate = useNavigate();
  const { profileId } = useParams();
  const profileIdAsInt = parseInt(profileId, 10);
  const loggedIn = JSON.parse(localStorage.getItem('user') || '{}');
  const addNotification = usePostNotification();
  const joined = timeAgo(user.joined_date);

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        const fetchLoggedInUser = await fetch(
          `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${user.id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
            },
          },
        );
        const data = await fetchLoggedInUser.json();
        setUserData(data);
        if (data.id === user.id) {
          setIsAuth(true);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    getLoggedInUser();
  }, [user.id]);

  useEffect(() => {
    const getIsFollowingUsers = async () => {
      try {
        const fetchFollowings = await fetch(
          `${import.meta.env.VITE_DEV_BACKEND_URL}/follows/${
            loggedIn?.id
          }/following`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
            },
          },
        );
        const data = await fetchFollowings.json();
        const followingsAsIntegers = data.map((obj) =>
          parseInt(obj.following_id, 10),
        );
        setFollowings(followingsAsIntegers);
        const profileIdAsInt = parseInt(profileId, 10);
        const isFollowing = data.some(
          (obj) => obj.following_id === profileIdAsInt,
        );
        setIsFollowingProfile(isFollowing);
      } catch (error) {
        console.error('Error fetching followings:', error);
      }
    };
    getIsFollowingUsers();
  }, [user.id, profileId]);

  useEffect(() => {
    const getOtherProfileFollowings = async () => {
      try {
        const fetchFollowings = await fetch(
          `${
            import.meta.env.VITE_DEV_BACKEND_URL
          }/follows/${profileId}/following`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem('user')).token
              }`,
            },
          },
        );
        const data = await fetchFollowings.json();
        const followingsAsIntegers = data?.map((obj) =>
          parseInt(obj.following_id, 10),
        );
        setOtherFollowings(followingsAsIntegers);
      } catch (error) {
        console.error('Error fetching followings:', error);
      }
    };
    getOtherProfileFollowings();
  }, [user.id, profileId]);

  const handleFollow = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${
        import.meta.env.VITE_DEV_BACKEND_URL
      }/follows/${profileIdAsInt}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user')).token
          }`,
        },
      },
    );
    addNotification.mutate({
      data: {
        type: 'follow',
        user_id: user.id,
        from_user_id: userData.id,
      },
      token: loggedIn.token,
    });
    setIsFollowingProfile(true);
    navigate(`/profiles/${profileId}`);
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    const res = await axios.delete(
      `${
        import.meta.env.VITE_DEV_BACKEND_URL
      }/follows/${profileIdAsInt}/unfollow`,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user') ?? '').token
          }`,
        },
      },
    );
    setIsFollowingProfile(false);
    navigate(`/profiles/${profileId}`);
  };

  const handleEdit = () => {
    navigate(`/edit-profile/${user.id}`, { state: userData });
  };

  if (Object.keys(user).length === 0) {
    // Render a loading state or placeholder while data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="flex lg:justify-end items-center justify-center">
      <div className="md:w-[210px] w-full bg-white dark:bg-[#262D34] rounded-lg md:p-0">
        {/* profile picture*/}
        <section className="md:h-[212px] relative">
          <img src={profilebackground} alt="background" className="w-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center justify-center bg-[#F9DFC0] h-[120px] w-[120px] rounded-full border-2 border-white">
              <img
                src={user.avatar ? user.avatar : memoji1}
                alt="profile-pic"
                className="w-[80px] h-[80px] rounded-full"
              />
            </div>
          </div>
          <div></div>
        </section>
        {/* Info */}

        <section className="flex flex-col items-center justify-center md:-mt-10 text-black dark:text-white">
          <div className="text-[20px] font-bold ">
            {user.first_name} {user.last_name}
          </div>
          <div className="text-[12px]">@{user.username}</div>
        </section>
        {/* buttons */}
        <section className="mt-4">
          <div className="flex items-center justify-center pr-4 lg:pr-8">
            <button
              type="submit"
              className="mx-6 bg-[#347AE2] text-white w-[124px] h-[36px] rounded-lg"
              onClick={
                isAuth
                  ? handleEdit
                  : isFollowingProfile
                  ? handleUnfollow
                  : handleFollow
              }
            >
              {isAuth ? 'Edit' : isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
            <button
              type="submit"
              className="-mx-4 w-[36px] h-[36px] bg-[#EBF2FC] rounded-lg"
            >
              <div className="flex items-center justify-center">
                <FaCommentDots />
              </div>
            </button>
          </div>
        </section>

        {/* followers */}
        <section className="text-[#3F4354] dark:text-white text-bold text-[14px] flex items-center justify-center mt-4">
          33 Followers • 501 Points
        </section>

        {/* following */}
        {isAuth ? (
          <section className="mt-4">
            <div className="flex items-center justify-center dark:text-white">
              Following {followings.length}
            </div>
            {/* avatars */}
            <div className="flex flex-wrap justify-center items-center gap-2 p-4 w-[200px]">
              {/* in here i will pull the following and map over it */}
              {followings?.slice(0, 8).map((following, index) => (
                <ProfileFollowingAvatars
                  followingProfileId={following}
                  key={index}
                />
              ))}
            </div>
          </section>
        ) : (
          <section className="mt-4">
            <div className="flex items-center justify-center dark:text-white">
              Following {otherFollowings.length}
            </div>
            {/* avatars */}
            <div className="flex flex-wrap justify-center gap-2 p-4 w-[200px]">
              {/* in here i will pull the following and map over it */}
              {otherFollowings?.slice(0, 8).map((following, index) => (
                <ProfileFollowingAvatars
                  followingProfileId={following}
                  key={index}
                />
              ))}
            </div>
          </section>
        )}
        {/* Description */}
        <section className="dark:text-white">
          <div className="flex items-center justify-center p-4 text-[#97989D] text-[14px]">
            {user.occupation}
          </div>
          <div className="flex items-center justify-center text-[14px]">
            <img src={web} alt="web" className="w-[14px] h-[14px]" />
            <div className="mx-2">
              <button
                onClick={() => {
                  if (user.website) {
                    window.open(user.website, '_blank');
                  } else {
                    window.open('http://www.Hipnode.com', '_blank');
                  }
                }}
              >
                {user.website ? 'Portfolio' : 'www.Hipnode.com'}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <img
              src={twitter}
              alt="twitter"
              className="h-[20px] w-[20px]"
              onClick={() => {
                if (user.twitter_url) {
                  window.open(user.twitter_url, '_blank');
                }
              }}
            />
            <img
              src={facebook}
              alt="facebook"
              className="h-[20px] w-[20px]"
              onClick={() => {
                if (user.facebook_url) {
                  window.open(user.facebook_url, '_blank');
                }
              }}
            />
            <img
              src={instagram}
              alt="instagram"
              className="h-[20px] w-[20px]"
              onClick={() => {
                if (user.instagram_url) {
                  window.open(user.instagram_url, '_blank');
                }
              }}
            />
          </div>

          {/* border */}
          <div className="w-[170px] h-[1px] bg-[#F7F7F7] mx-auto flex items-center justify-center mt-10" />

          {/* joined */}
          <section className="flex items-center justify-center p-4 text-[#97989D] text-[14px]">
            Joined {joined}
          </section>
        </section>
      </div>
    </div>
  );
};

export default ProfileDataComponent;
