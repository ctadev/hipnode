import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

import {
  FormState,
  UserProfile,
  SessionInterface,
} from '../../../common.types';
import ProfileFormField from './ProfileFormField';

type Props = {
  type: string;
  profile?: UserProfile;
};

const ProfileForm = ({ type, profile }: Props) => {
  const router = useNavigate();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    id: profile?.id || '',
    username: profile?.username || '',
    email: profile?.email || '',
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    occupation: profile?.occupation || '',
    avatar: profile?.avatar || '',
    twitter_url: profile?.twitter_url || '',
    website: profile?.website || '',
    facebook_url: profile?.facebook_url || '',
    instagram_url: profile?.instagram_url || '',
    current_stage: profile?.current_stage || '',
    coding_ability: profile?.coding_ability || '',
    joined_date: profile?.joined_date || '',
  });

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await axios.patch(
      `${import.meta.env.VITE_DEV_BACKEND_URL}/users/${profile.id}/update`,
      form,
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('user') ?? '').token
          }`,
        },
      },
    );
        if (res.status === 400 || res.status === 404 || res.status=== 500) {
      // handle failure
    }
    
    router(`/profiles/${profile.id}`);
  };

  const handleChangeImage = async (e) => {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (!file) return;
    if (!file.type.includes('image')) {
      return alert('Please upload an image file');
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'aowex17c');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dlsvcai7e/image/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();
      handleStateChange('avatar', data.secure_url);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    }
  };

  const handleImageClick = () => {
    // When the image preview is clicked, trigger the file input click event
    const fileInput = document.getElementById('avatar');
    if (fileInput) fileInput.click();
  };

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex items-center text-black justify-start flex-col w-full lg:pt-10 pt-12 gap-10 text-lg max-w-5xl mx-auto"
    >
      <div className="flex items-center justify-start w-full lg:min-h-[400px] min-h-[200px] relative">
        <label
          htmlFor="avatar"
          className="flex justify-center items-center z-10 text-center w-full h-full p-20 text-black border-2 bg-gray-100 border-gray-50 border-dashed"
        >
          {!form.avatar && 'Choose a profile picture'}
          {form.avatar && (
            <img
              src={form.avatar}
              className="sm:p-10 object-contain z-20 cursor-pointer"
              alt="avatar"
              onClick={handleImageClick}
            />
          )}
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          required={type === 'create'}
          className="absolute z-30 w-full opacity-0 h-full cursor-pointer"
          onChange={handleChangeImage}
        />
      </div>

      <div className="grid grid-cols-2 w-full gap-8">
        <ProfileFormField
          title="Email Address"
          state={form.email}
          placeholder={profile?.email || 'Email'}
          setState={(value) => handleStateChange('email', value)}
        />
        <ProfileFormField
          title="Username"
          state={form.username}
          placeholder={profile?.username || 'Username'}
          setState={(value) => handleStateChange('username', value)}
        />

        <ProfileFormField
          title="First Name"
          state={form.first_name}
          placeholder="Adrian"
          setState={(value) => handleStateChange('first_name', value)}
        />

        <ProfileFormField
          title="Last Name"
          state={form.last_name}
          placeholder="Mateo"
          setState={(value) => handleStateChange('last_name', value)}
        />

        <ProfileFormField
          type="url"
          title="Occupation"
          state={form.occupation}
          placeholder="Doctor"
          setState={(value) => handleStateChange('occupation', value)}
        />

        <ProfileFormField
          type="url"
          title="Twitter URL"
          state={form.twitter_url}
          placeholder="https://github.com/adrianhajdin"
          setState={(value) => handleStateChange('twitter_url', value)}
        />

        <ProfileFormField
          type="url"
          title="Website Url"
          state={form.website}
          placeholder="https://github.com/adrianhajdin"
          setState={(value) => handleStateChange('website', value)}
        />
        <ProfileFormField
          type="url"
          title="Facebook URL"
          state={form.facebook_url}
          placeholder="https://github.com/adrianhajdin"
          setState={(value) => handleStateChange('facebook_url', value)}
        />
        <ProfileFormField
          type="url"
          title="Instagram URL"
          state={form.instagram_url}
          placeholder="https://github.com/adrianhajdin"
          setState={(value) => handleStateChange('instagram_url', value)}
        />

        <ProfileFormField
          title="Current Stage"
          state={form.current_stage}
          placeholder="https://github.com/adrianhajdin"
          setState={(value) => handleStateChange('current_stage', value)}
        />
        <ProfileFormField
          title="Coding Ability"
          state={form.coding_ability}
          placeholder="https://github.com/adrianhajdin"
          setState={(value) => handleStateChange('coding_ability', value)}
        />
        <ProfileFormField
          type="url"
          title="Date Joined"
          state={form.joined_date}
          placeholder="https://github.com/adrianhajdin"
          setState={(value) => handleStateChange('joined_date', value)}
        />
      </div>
      <div className="flexStart w-full">
        <button
          className="bg-gray-100 w-[80px] h-10 rounded-lg"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
