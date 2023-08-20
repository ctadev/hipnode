import { Title, TagCardHome } from '../components';
import { followlogo, popularlogo, newlogo } from '../assets';
import { tags } from '../constants/general';

type InfoProps = {
  header: string;
  text: string;
  icon: string;
  filter: string;
  currentSortType: string;
  setCurrentSortType: (currentSortType: string) => void;
};

type MobileInfoProps = {
  header: string;
  icon: string;
  filter: string;
  currentSortType: string;
  setCurrentSortType: (currentSortType: string) => void;
};

type SidebarProps = {
  currentSortType: string;
  setCurrentSortType: (currentSortType: string) => void;
  selectedTag: string;
  setSelectedTag: (selectedTag: string) => void;
};

const Info = ({
  header,
  text,
  icon,
  currentSortType,
  setCurrentSortType,
}: InfoProps) => {
  return (
    <div
      className={`flex p-1 cursor-pointer ${
        header.split(' ')[0] === currentSortType &&
        'bg-grey-1 dark:bg-dark-black-4 dark:text-white rounded-md'
      }`}
      onClick={() => setCurrentSortType(header.split(' ')[0])}
    >
      <div className="flex items-center justify-center mx-2">
        <img src={icon} alt={icon} className="w-[20px] h-[20px]" />
      </div>
      <div className="p-1">
        <h3 className="font-semibold text-[14px]">{header}</h3>
        <p className="text-[9px] text-gray-400">{text}</p>
      </div>
    </div>
  );
};

const MobileInfo = ({
  header,
  icon,
  currentSortType,
  setCurrentSortType,
}: MobileInfoProps) => {
  return (
    <div
      className={`flex cursor-pointer p-1 items-center justify-center h-full ${
        header === currentSortType &&
        'bg-grey-1 dark:bg-dark-black-4 dark:text-white rounded-md'
      }`}
      onClick={() => setCurrentSortType(header)}
    >
      <div className="flex items-center justify-center mx-2">
        <img src={icon} alt={icon} className="w-[20px] h-[20px]" />
      </div>
      <div className="p-1">
        <h3 className="font-semibold text-[14px]">{header}</h3>
      </div>
    </div>
  );
};

const Sidebar = ({
  currentSortType,
  setCurrentSortType,
  selectedTag,
  setSelectedTag,
}: SidebarProps) => {
  return (
    <>
      {/* Desktop view */}

      <div className="lg:flex lg:justify-end items-center justify-center hidden">
        <div className="lg:w-[210px] lg:h-[180px]">
          {/* Dailies */}
          <section className="bg-white dark:bg-[#262D34] dark:text-white rounded-lg p-2">
            <Info
              icon={newlogo}
              header="Newest and recent"
              text="Find the latest update"
              filter=""
              currentSortType={currentSortType}
              setCurrentSortType={setCurrentSortType}
            />
            <Info
              icon={popularlogo}
              header="Popular of the day"
              text="Shots featured today by curators"
              filter=""
              currentSortType={currentSortType}
              setCurrentSortType={setCurrentSortType}
            />
            <Info
              icon={followlogo}
              header="Following"
              text="Explore from your favorite People"
              filter=""
              currentSortType={currentSortType}
              setCurrentSortType={setCurrentSortType}
            />
          </section>

          {/* tags */}
          <section className="flex flex-col mt-6">
            <div className="bg-white dark:bg-dark-black-3 rounded-[10px] p-5 lg:mt-0">
              <Title title="Popular Tags" />
              <div className="flex flex-col mt-5">
                {tags.map((tag, index) => (
                  <TagCardHome
                    tag={tag}
                    key={index}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Pinned Groups */}
          <section className="flex flex-col lg:max-w-[325px] mt-6">
            <div className="bg-white dark:bg-dark-black-3 rounded-[10px] p-5 lg:mt-0">
              <Title title="Pinned Groups" />
              <div className="flex flex-col mt-5">
                {tags.map((tag, index) => (
                  <TagCardHome tag={tag} key={index} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* mobile view */}

      <div className="bg-white h-[60px] flex flex-col justify-center rounded-lg md:hidden p-2">
        <div className="flex justify-between">
          <MobileInfo
            icon={newlogo}
            header="Newest"
            filter=""
            currentSortType={currentSortType}
            setCurrentSortType={setCurrentSortType}
          />
          <MobileInfo
            icon={popularlogo}
            header="Popular"
            filter=""
            currentSortType={currentSortType}
            setCurrentSortType={setCurrentSortType}
          />
          <MobileInfo
            icon={followlogo}
            header="Following"
            filter=""
            currentSortType={currentSortType}
            setCurrentSortType={setCurrentSortType}
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
