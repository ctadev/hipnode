import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import {
  arrow,
  groupBanner,
  groupCreate,
  groupMedia,
  groupSort1,
  groupSort2,
  groupType1,
  leave,
  user1,
} from '../assets';
import {
  GroupAboutCard,
  GroupAdminCard,
  Navbar,
  PostCard,
  TagCard,
  Title,
} from '../components';
import { popularTags, groups } from '../constants/group';
import { useParams } from 'react-router';
import { IGroup } from '../../types/index';
import { useGetPosts } from '../../hooks/usePosts';
import { useGetUsers } from '../../hooks/useUsers';
import { Post, User } from '../../types';
import axios from 'axios';

const Group = () => {
  const [reportModalShowing, setReportModalShowing] = useState(false);
  const [group, setGroup] = useState<IGroup>({
    id: 0,
    name: '',
    about: '',
    description: '',
    content: '',
    user_id: 0,
    created_at: new Date(),
    updated_at: new Date(),
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const getPosts = useGetPosts();
  const getUsers = useGetUsers();
  const { groupId } = useParams();
  const URL = `${import.meta.env.VITE_DEV_BACKEND_URL}/groups/${groupId}`;
  const { id } = JSON.parse(localStorage.getItem('user') ?? '');
  const [isMember, setIsMember] = useState(false);
  const [getMembers, setGetMembers] = useState([]);

  useEffect(() => {
    getPosts.mutateAsync().then((result) => {
      setPosts(result);
    });
    getUsers.mutateAsync().then((result) => {
      setUsers(result);
    });
    const fetchGroup = async () => {
      try {
        const response = await fetch(URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = (await response.json()) as IGroup;
        setGroup(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const checkMemberShip = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_DEV_BACKEND_URL
          }/groups/${groupId}/isMember?user_id=${id}`,
        );
        if (response.data.isMember) {
          setIsMember(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkMemberShip();
    fetchGroup();
  }, []);

  useEffect(() => {
    const getAllMembers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_DEV_BACKEND_URL}/groups/${groupId}/members`,
        );
        setGetMembers(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllMembers();
  }, [isMember]);

  //from this group, get what you want to display.

  const { data: groupAdmin } = useQuery('users', async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/groups/${groupId}/admin`,
    );
    return res.data;
  });

  const handleReportToggle = () => {
    setReportModalShowing((prev) => !prev);
  };

  const joinGroup = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/groups/${groupId}/join`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user') ?? '').token
            }`,
          },
        },
      );
      if (response.status === 201) {
        setIsMember(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const leaveGroup = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/groups/${groupId}/leave`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user') ?? '').token
            }`,
          },
        },
      );
      if (response.status === 200) {
        setIsMember(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLeavingGroup = () => {
    leaveGroup();
    setReportModalShowing(false);
  };

  return (
    <div className="bg-grey-2 dark:bg-dark-black-2 h-auto relative">
      <div
        className={`flex flex-col lg:flex-row lg:items-start p-5 lg:py-[30px] lg:px-10 gap-5 lg:justify-center pb-20 ${
          reportModalShowing && 'blur-sm'
        }`}
      >
        <div className="hidden lg:flex lg:flex-col gap-5">
          <GroupAboutCard about={group?.about} />
          <GroupAdminCard admin={groupAdmin} />
          <div className="hidden lg:flex md:flex-col bg-white dark:bg-dark-black-3 p-[10px] md:p-5 rounded-[10px] justify-between">
            <div className="mb-5">
              <Title title="Popular Tags" />
            </div>
            <div className="flex flex-col gap-[12px]">
              {popularTags.map((tag, index) => (
                <TagCard key={index} tag={tag} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-white dark:bg-dark-black-3 w-full p-[10px] rounded-2xl flex flex-col lg:gap-5 gap-[14px]">
            <img
              src={group?.image_url}
              alt="group banner"
              className="rounded-[10px] w-full object-cover min-w-[315px] max-h-[174px]"
            />
            <div className="flex items-start justify-between lg:items-center px-[10px]">
              <div className="flex gap-[14px] lg:pb-[10px] items-center">
                <img
                  src={group?.logo_url}
                  alt="group"
                  className="flex lg:hidden w-10 h-10 object-cover rounded-full"
                />
                <img
                  src={group?.logo_url}
                  alt="group"
                  className="hidden lg:flex w-[70px] h-[70px] object-cover rounded-full"
                />
                <div className="flex flex-col">
                  <h2 className="font-semibold lg:text-[26px] dark:text-white">
                    {group?.name}
                  </h2>
                  <p className="text-[10px] lg:text-sm lg:text-dark-grey-2 dark:text-white">
                    Created by{' '}
                    <span className="font-semibold text-xs lg:text-black lg:dark:text-grey-2 md:text-lg">
                      {groupAdmin?.username}
                    </span>
                  </p>
                </div>
              </div>
              {isMember ? (
                <div
                  className="p-[10px] bg-grey-2 dark:bg-dark-black-4 flex items-center justify-center gap-[10px] rounded cursor-pointer"
                  onClick={handleReportToggle}
                >
                  <img src={leave} alt="leave" className="w-5 h-5" />
                  <p className="font-semibold text-dark-grey-2">Leave</p>
                </div>
              ) : (
                <div
                  className="p-[10px] bg-grey-2 dark:bg-dark-black-4 flex items-center justify-center gap-[10px] rounded cursor-pointer"
                  onClick={joinGroup}
                >
                  <img src={leave} alt="leave" className="w-5 h-5" />
                  <p className="font-semibold text-dark-grey-2">Join</p>
                </div>
              )}
            </div>
          </div>
          <img
            src={groupCreate}
            alt="group create"
            className="rounded-[10px] object-cover mx-auto flex lg:hidden w-[335px] h-[168px]"
          />
          <div className="bg-white dark:bg-dark-black-3 w-full p-[10px] lg:p-5 rounded-2xl flex lg:gap-5 gap-[14px] items-center justify-between">
            <h2 className="font-semibold dark:text-white">Explore</h2>
            <div className="flex gap-[14px] dark:text-white">
              <div className="flex gap-[10px] items-center bg-grey-2 dark:bg-dark-black-4 p-[6px] rounded">
                <img src={groupSort1} alt="group sort" className="w-5 h-5" />
                <p className="font-semibold text-xs">New</p>
              </div>
              <div className="flex gap-[10px] items-center bg-backgroundAlt3 p-[6px] rounded">
                <img src={groupSort2} alt="group sort" className="w-5 h-5" />
                <p className="font-semibold text-xs text-alt-2">Popular</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            {posts?.items?.map((post, index) => (
              <PostCard
                key={index}
                post={post}
                user={users.find((user) => user?.id === post?.user_id)}
              />
            ))}
          </div>
          <div className="flex gap-[14px] items-center">
            <p className="text-[10px] text-dark-grey-2">See more</p>
            <img
              src={arrow}
              alt="arrow"
              className="object-contain w-3 h-[10px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <img
            src={groupCreate}
            alt="group create"
            className="rounded-[10px] object-cover mx-auto hidden lg:flex w-[325px] h-[168px]"
          />
          <div className="bg-white dark:bg-dark-black-3 w-full p-5 rounded-2xl lg:max-w-[325px] flex flex-col lg:gap-5 gap-[14px]">
            <h3 className="font-semibold dark:text-white">Active Members</h3>
            <div className="flex flex-wrap gap-5">
              {getMembers?.map((member) => (
                <div
                  key={member?.id}
                  className="flex flex-col items-center gap-2"
                >
                  <img
                    src={member?.avatar || user1}
                    alt="user"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <p className="text-sm dark:text-white">{member?.username}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-dark-black-3 w-full p-5 rounded-2xl lg:max-w-[325px] flex flex-col lg:gap-5 gap-[14px]">
            <h3 className="font-semibold dark:text-white">Recent Media</h3>
            <div className="flex flex-wrap ">
              {[...Array(10)].map((_, index) => (
                <img
                  key={index}
                  src={groupMedia}
                  alt="media"
                  className="rounded object-cover h-[88px] w-[88px]"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:hidden">
            <GroupAboutCard about={group.about} />
            <GroupAdminCard admin={groupAdmin} />
          </div>
        </div>
      </div>
      {reportModalShowing && (
        <div className="w-full max-w-[366px] lg:max-w-[388px] bg-white dark:bg-dark-black-4 rounded-2xl absolute z-40 left-1/2 -translate-x-1/2 top-48 lg:top-32 p-5 lg:p-[30px]">
          <h3 className="font-semibold text-lg dark:text-white">
            Are you sure you want to leave this group?
          </h3>
          <div className="mt-[30px] flex gap-5">
            <button
              type="submit"
              className="bg-primary-blue-1 py-[10px] w-[160px] text-white rounded-md font-semibold text-lg"
              onClick={handleLeavingGroup}
            >
              Leave Group
            </button>
            <button
              type="button"
              className="text-dark-grey-2 text-lg"
              onClick={handleReportToggle}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Group;
