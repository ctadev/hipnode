import {
  groupLogo,
  view,
  write,
  share,
} from '../../assets/createpost-asset/index';
import React, {
  Dispatch,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';

import Editor from './Editor';
import Tags from './Tags';
import { useNavigate } from 'react-router';
import MenuPost from './MenuPost';

interface IProps {
  preview: boolean;
  setPreview?: Dispatch<SetStateAction<boolean>>;
  title: string;
  setTitle?: Dispatch<SetStateAction<string>>;
  covers: any;
  setCover?: Dispatch<SetStateAction<null>>;
  editor: string;
  setEditor?: Dispatch<SetStateAction<string>>;
  tags: Array<string>;
  setTags?: Dispatch<SetStateAction<string[]>>;
  category: string;
  setCategory?: Dispatch<SetStateAction<string>>;
  group: string;
  setGroup?: Dispatch<SetStateAction<string>>;
  groupId: number;
  setGroupId?: Dispatch<SetStateAction<number>>;
}

const Posts = ({
  setPreview,
  title,
  setTitle,
  covers,
  setCover,
  editor,
  setEditor,
  tags,
  setTags,
  category,
  setCategory,
  group,
  setGroup,
  groupId,
  setGroupId,
}: IProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorState, setErrorState] = useState(false);
  const [artist, setArtist] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [episodeNumber, setEpisodeNumber] = useState(0);
  const [logo, setLogo] = useState(null);
  const [about, setAbout] = useState('');
  const [location, setLocation] = useState('');
  const [coverUrl, setCoverUrl] = useState(null);
  const imageRef = useRef(null);
  const [postRoute, setPostRoute] = useState('');
  const [logoImageUrl, setLogoImageUrl] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    fulltime: false,
    parttime: false,
    internship: false,
    remote: false,
    contract: false,
    free: false,
  });

  const [checkboxes2, setCheckboxes2] = useState({
    indiebites: false,
    softwaresocial: false,
    hipnode: false,
    free: false,
  });

  const resetForm = () => {
    setPreview(false);
    setTitle('');
    setCover(null);
    setEditor(null);
    setTags([]);
    setGroup('');
    setGroupId(null);
    setArtist('');
    setStartDate(null);
    setEpisodeNumber(0);
    setLogo(null);
    setAbout('');
    setLocation('');
    setCoverUrl(null);
    setLogoImageUrl(null);
    setAudioUrl(null);
    setCheckboxes({
      fulltime: false,
      parttime: false,
      internship: false,
      remote: false,
      contract: false,
      free: false,
    });
    setCheckboxes2({
      indiebites: false,
      softwaresocial: false,
      hipnode: false,
      free: false,
    });
    toast.success('Your post have been created!', {
      position: 'bottom-center',
      duration: 3000,
    });
  };

  const navigate = useNavigate();

  const getImage = (e) => {
    setLogo(URL.createObjectURL(e.target.files[0]));
    setLogoImageUrl(e.target.files[0]);
  };

  useEffect(() => {
    switch (category) {
      case 'Post':
        setPostRoute(`groups/${groupId}/posts`);
        break;
      case 'Meetup':
        setPostRoute('meetups');
        break;
      case 'Podcasts':
        setPostRoute('podcasts');
        break;
      case 'Groups':
        setPostRoute('groups');
        break;
    }
  }, [category, groupId]);

  const getCloudinaryURL = async (url) => {
    if (!url) return;

    try {
      const formData = new FormData();
      formData.append('file', url);
      formData.append('upload_preset', 'aowex17c');

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dlsvcai7e/auto/upload',
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();
      setErrorState(false);
      return data.secure_url;
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      setErrorMessage(error);
      setErrorState(true);
    }
  };

  const mutation = useMutation(
    async (newTodo) => {
      const response = await axios.post(
        `${import.meta.env.VITE_DEV_BACKEND_URL}/${postRoute}`,
        newTodo,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem('user')).token
            }`,
          },
        },
      );
      return response.data;
    },
    {
      onSuccess: (data: any) => {
        console.log('success', data);
        resetForm();
        setErrorState(false);
        setIsLoading(false);
        navigate('/');
      },
      onError: (error: any) => {
        console.log('Failure', error.response.data.message);
        setErrorMessage(error.response.data.message);
        setErrorState(true);
        setIsLoading(false);
      },
    },
  ) as any;

  const handleCheckboxChange = (event) => {
    const name = event.target.name;
    setCheckboxes({
      ...checkboxes,
      [name]: event.target.checked,
    });
  };

  const handleCheckboxChange2 = (event) => {
    const name = event.target.name;
    setCheckboxes2({
      ...checkboxes2,
      [name]: event.target.checked,
    });
  };

  const addGroup = async () => {
    switch (category) {
      case 'Post':
        setIsLoading(true);
        mutation.mutate({
          title,
          content: editor,
          image_url: await getCloudinaryURL(coverUrl),
          tags,
        });
        break;
      case 'Meetup':
        setIsLoading(true);
        mutation.mutate({
          name: title,
          content: editor,
          location,
          image_url: await getCloudinaryURL(coverUrl),
          date: startDate,
          is_fulltime: checkboxes.fulltime,
          is_parttime: checkboxes.parttime,
          is_internship: checkboxes.internship,
          is_remote: checkboxes.remote,
          is_contract: checkboxes.contract,
          is_free: checkboxes.free,
        });
        break;
      case 'Podcasts':
        setIsLoading(true);
        mutation.mutate({
          title,
          content: editor,
          artist,
          image_url: await getCloudinaryURL(coverUrl),
          audio_url: await getCloudinaryURL(audioUrl),
          episode_number: episodeNumber,
          is_indie_bites: checkboxes2.indiebites,
          is_software_social: checkboxes2.softwaresocial,
          is_hipnode: checkboxes2.hipnode,
          is_free: checkboxes2.free,
        });
        break;
      case 'Groups':
        setIsLoading(true);
        mutation.mutate({
          name: title,
          about,
          description: editor,
          image_url: await getCloudinaryURL(coverUrl),
          logo_url: await getCloudinaryURL(logoImageUrl),
        });
        break;
    }
  };

  // const meetupErrors = () => {
  //   if (category == 'Meetup' && !location && !date) {
  //   }
  // };

  return (
    <main className="flex items-center justify-center dark:bg-dark-black-1 min-h-screen py-8 px-8 md:px-2 relative">
      <section className="w-full max-w-[1200px] flex items-center flex-col gap-4">
        <div className="w-full max-w-[880px] bg-white dark:bg-dark-black-3 p-6 rounded-[16px]">
          <input
            type="text"
            placeholder="Title..."
            className="w-full rounded-md font-bold h-[60px] bg-grey-2 dark:bg-dark-black-4 px-4 placeholder:text-xl text-dark-grey-2 dark:text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <MenuPost
            covers={covers}
            setCover={setCover}
            category={category}
            setCategory={setCategory}
            group={group}
            setGroup={setGroup}
            groupId={groupId}
            setGroupId={setGroupId}
            setCoverUrl={setCoverUrl}
            setAudioUrl={setAudioUrl}
            audioUrl={audioUrl}
          />

          {errorState && (
            <section className="mt-5 w-full text-center">
              <h1 className="text-red-600 text-xl font-bold underline">
                Error: {errorMessage}
              </h1>
            </section>
          )}

          <section
            className={`flex items-center justify-between ${
              errorState ? 'mt-2' : 'mt-10'
            } mb-6`}
          >
            <ul className="flex gap-6 flex-wrap">
              <li className="createpost-editor-tabs">
                <img src={write as unknown as string} alt="" />
                <h3>Write</h3>
              </li>
              <li
                className="createpost-editor-tabs"
                onClick={() => setPreview(true)}
              >
                <img
                  src={view as unknown as string}
                  alt=""
                  className="invert dark:invert-0"
                />
                <h3>Preview</h3>
              </li>
              <li className="createpost-editor-tabs">
                <h3>Code of Conduct</h3>
              </li>
            </ul>
          </section>

          {category == 'Meetup' && (
            <section>
              <div className="mt-2">
                <h3 className="ml-1 mb-2">Location:</h3>
                <input
                  type="text"
                  className="w-full bg-transparent border border-dark-grey-4 dark:border-white rounded-lg p-2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <h3 className="ml-1 mb-2">Date:</h3>
                <DatePicker
                  selected={startDate}
                  onChange={setStartDate}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full bg-transparent border rounded-lg p-2 border-dark-grey-4 dark:border-white"
                />
              </div>

              <div className="flex gap-4 flex-wrap mt-6">
                <label className="flex items-center gap-1 bg-grey-2 dark:bg-dark-black-4 p-2 rounded-md cursor-pointer">
                  Full-Time
                  <input
                    type="checkbox"
                    name="fulltime"
                    checked={checkboxes.fulltime}
                    onChange={handleCheckboxChange}
                  />
                </label>
                <label className="flex items-center gap-1 bg-grey-2 dark:bg-dark-black-4 p-2 rounded-md cursor-pointer">
                  Part-Time
                  <input
                    type="checkbox"
                    name="parttime"
                    checked={checkboxes.parttime}
                    onChange={handleCheckboxChange}
                  />
                </label>
                <label className="flex items-center gap-1 bg-grey-2 dark:bg-dark-black-4 p-2 rounded-md cursor-pointer">
                  Internship
                  <input
                    type="checkbox"
                    name="internship"
                    checked={checkboxes.internship}
                    onChange={handleCheckboxChange}
                  />
                </label>
                <label className="flex items-center gap-1 bg-grey-2 dark:bg-dark-black-4 p-2 rounded-md cursor-pointer">
                  Remote
                  <input
                    type="checkbox"
                    name="remote"
                    checked={checkboxes.remote}
                    onChange={handleCheckboxChange}
                  />
                </label>
                <label className="flex items-center gap-1 bg-grey-2 dark:bg-dark-black-4 p-2 rounded-md cursor-pointer">
                  Contract
                  <input
                    type="checkbox"
                    name="contract"
                    checked={checkboxes.contract}
                    onChange={handleCheckboxChange}
                  />
                </label>
                <label className="flex items-center gap-1 bg-grey-2 dark:bg-dark-black-4 p-2 rounded-md cursor-pointer">
                  Free
                  <input
                    type="checkbox"
                    name="free"
                    checked={checkboxes.free}
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div>
            </section>
          )}

          {category == 'Podcasts' && (
            <section>
              <div className="mt-2">
                <h3 className="ml-1 mb-2">Artist:</h3>
                <input
                  type="text"
                  className="w-full bg-transparent border  rounded-lg p-2 border-dark-grey-4 dark:border-white"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <h3 className="ml-1 mb-2">Episode Number:</h3>
                <input
                  type="number"
                  className="w-full bg-transparent border border-dark-grey-4 dark:border-white rounded-lg p-2"
                  value={episodeNumber}
                  onChange={(e) => setEpisodeNumber(Number(e.target.value))}
                />
              </div>

              <div className="flex gap-4 flex-wrap mt-6">
                <label className="flex items-center gap-1 bg-grey-2 dark:bg-dark-black-4 p-2 rounded-md cursor-pointer">
                  Indie Bites
                  <input
                    type="checkbox"
                    name="indiebites"
                    checked={checkboxes2.indiebites}
                    onChange={handleCheckboxChange2}
                  />
                </label>
                <label className="flex items-center gap-1 bg-grey-2 dark:bg-dark-black-4 p-2 rounded-md cursor-pointer">
                  Software Social
                  <input
                    type="checkbox"
                    name="softwaresocial"
                    checked={checkboxes2.softwaresocial}
                    onChange={handleCheckboxChange2}
                  />
                </label>
                <label className="flex items-center gap-1 bg-grey-2 dark:bg-dark-black-4 p-2 rounded-md cursor-pointer">
                  Hipnode
                  <input
                    type="checkbox"
                    name="hipnode"
                    checked={checkboxes2.hipnode}
                    onChange={handleCheckboxChange2}
                  />
                </label>
                <label className="flex items-center gap-1 bg-grey-2 dark:bg-dark-black-4 p-2 rounded-md cursor-pointer">
                  Free
                  <input
                    type="checkbox"
                    name="free"
                    checked={checkboxes2.free}
                    onChange={handleCheckboxChange2}
                  />
                </label>
              </div>
            </section>
          )}

          {category == 'Groups' && (
            <section>
              <div
                className="createpost-tabs w-fit"
                onClick={() => imageRef.current.click()}
              >
                <img
                  src={logo ? logo : groupLogo}
                  alt=""
                  className="invert-0 dark:invert max-h-[50px] max-w-[50px]"
                />
                <p>Set Group Logo</p>
                <input
                  name="images"
                  type="file"
                  accept="image/*"
                  onChange={getImage}
                  hidden
                  ref={imageRef}
                />
              </div>

              <div className="mt-2">
                <h3 className="ml-1 mb-2">About:</h3>
                <input
                  type="text"
                  className="w-full bg-transparent border border-dark-grey-4 dark:border-white rounded-lg p-2"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
            </section>
          )}

          <Editor editor={editor} setEditor={setEditor} />

          {category == 'Post' && <Tags tags={tags} setTags={setTags} />}

          <section className="flex gap-4 mt-6">
            <button
              className="w-[132px] h-[44px] bg-blue-500 rounded-md text-white"
              onClick={addGroup}
            >
              Publish
            </button>
            <button>Cancel</button>
          </section>
        </div>
      </section>
      {isLoading && (
        <div className="absolute bg-black/90 h-full w-full flex items-center justify-center">
          <img src={share} alt="share" className="animate-spin" />
        </div>
      )}
    </main>
  );
};

export default Posts;
