import React, { useState, useRef, SetStateAction, Dispatch } from 'react';
import { useLocation } from 'react-router-dom';

import {
  cover,
  arrowdown,
  close,
  interviews,
} from '../../assets/createpost-asset/index';
import ToggleGroup from './ToggleGroup';
import ToggleCategory from './ToggleCategory';

interface Props {
  covers: any;
  setCover: Dispatch<SetStateAction<any>>;
  setCoverUrl?: Dispatch<SetStateAction<string>>;
  category: string;
  setCategory?: Dispatch<SetStateAction<string>>;
  group: string;
  setGroup?: Dispatch<SetStateAction<string>>;
  groupId: number;
  setGroupId?: Dispatch<SetStateAction<number>>;
  audioUrl: any;
  setAudioUrl: Dispatch<SetStateAction<any>>;
}

const MenuPost = ({
  covers,
  setCover,
  setCoverUrl,
  category,
  setCategory,
  group,
  setGroup,
  groupId,
  setGroupId,
  setAudioUrl,
  audioUrl,
}: Props) => {
  const [togglePost, setTogglePost] = useState(false);
  const [toggleGroup, setToggleGroup] = useState(false);
  const [getMusicFile, setGetMusicFile] = useState(null);
  const imageRef = useRef(null);
  const audioRef = useRef(null);
  const location = useLocation();

  const toggleGroupMenu = () => {
    setToggleGroup(!toggleGroup);
    setTogglePost(false);
  };

  const togglePostMenu = () => {
    setTogglePost(!togglePost);
    setToggleGroup(false);
  };

  const setCovers = () => {
    imageRef.current.click();
    setToggleGroup(false);
    setTogglePost(false);
  };

  const getImage = (e) => {
    setCover(URL.createObjectURL(e.target.files[0]));
    setCoverUrl(e.target.files[0]);
  };

  const setAudioFile = () => {
    audioRef.current.click();
    setToggleGroup(false);
    setTogglePost(false);
  };

  const getAudio = (e) => {
    setAudioUrl(e.target.files[0]);
  };

  const clearCoverImage = () => {
    setCover(null);
    setCoverUrl(null);
  };

  return (
    <main>
      <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start md:gap-6 mt-[20px]">
        <section className="createpost-tabs" onClick={setCovers}>
          <img
            src={cover as unknown as string}
            alt=""
            className="invert dark:invert-0"
          />
          <p>Set Cover</p>
          <input
            name="images"
            type="file"
            accept="image/*"
            onChange={getImage}
            required
            hidden
            ref={imageRef}
          />
        </section>

        {category == 'Podcasts' && (
          <section className="createpost-tabs" onClick={setAudioFile}>
            <img
              src={interviews as unknown as string}
              alt=""
              className="invert dark:invert-0"
            />
            <p className="">{`${audioUrl ? audioUrl.name : 'Add Audio'}`}</p>
            <input
              name="audios"
              type="file"
              accept="audio/*"
              onChange={getAudio}
              required
              hidden
              ref={audioRef}
            />
          </section>
        )}

        {category == 'Post' && (
          <section className="createpost-tabs relative">
            <div className="flex gap-2" onClick={toggleGroupMenu}>
              <p>{`Select Group${group && ` - ${group}`}`}</p>
              <img
                src={arrowdown as unknown as string}
                alt=""
                className="invert dark:invert-0 mt-1"
              />
            </div>

            <ToggleGroup
              toggleGroup={toggleGroup}
              setGroup={setGroup}
              group={group}
              groupId={groupId}
              setGroupId={setGroupId}
              setToggleGroup={setToggleGroup}
            />
          </section>
        )}

        {location.pathname.includes('/create-post') && (
          <ToggleCategory
            togglePost={togglePost}
            togglePostMenu={togglePostMenu}
            category={category}
            setCategory={setCategory}
          />
        )}
      </div>
      {covers && (
        <aside className="mt-6 relative">
          <img
            src={covers}
            className="w-full h-[300px] rounded-lg object-cover"
          />
          <div
            className="absolute right-2 top-2 cursor-pointer"
            onClick={clearCoverImage}
          >
            <img src={close} className="h-[20px] md:h-[30px]" />
          </div>
        </aside>
      )}
    </main>
  );
};

export default MenuPost;
