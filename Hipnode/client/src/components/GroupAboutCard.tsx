const GroupAboutCard = ({ about }) => {
  return (
    <div className="bg-white dark:bg-dark-black-3 w-full p-[10px] lg:p-5 rounded-2xl lg:max-w-[214px] flex flex-col lg:gap-5 gap-[14px]">
      <h3 className="font-semibold dark:text-white">About</h3>
      <p className="text-xs dark:text-grey-2">{about}</p>
    </div>
  );
};

export default GroupAboutCard;
