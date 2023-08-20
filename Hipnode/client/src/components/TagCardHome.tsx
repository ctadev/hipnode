
type Props = {
    tag: {
        tag: string,
        image: string,
        timesPosted: number
        backgroundColor: string
    }
    selectedTag?: string
    setSelectedTag?: (selectedTag: string) => void
}

const TagCardHome = ({ tag, selectedTag, setSelectedTag }: Props) => {
    const formattedTimesPosted = tag.timesPosted.toLocaleString(); // Format timesPosted with commas

    const handleTagToggle = () => {
        if (setSelectedTag) {
            if (selectedTag === tag.tag) {
                setSelectedTag('');
            } else {
                setSelectedTag(tag.tag);
            }
        }
    }

    return (
        <div className='bg-white dark:bg-dark-black-3 rounded-[10px] flex items-start' onClick={handleTagToggle}>
            <div className={`bg-[${tag.backgroundColor}] w-[45px] h-[45px] flex items-center justify-center rounded-lg`}>
                <img src={tag.image} alt='post' className='object-contain shrink-0 flex w-[32px] h-[32px]' />
            </div>
            <div className='flex flex-col lg:mb-[20px] px-4'>
                <div className='flex items-start lg:justify-between'>
                    <h2 className={`text-[14px] ${selectedTag === tag.tag ? 'text-alt-8' : 'dark:text-grey-2'}`}>
                        {tag.tag}
                    </h2>
                </div>
                <div className={`flex gap-[10px] text-[9px] ${selectedTag === tag.tag ? 'text-alt-8' : 'dark:text-grey-2'}`}>
                    {formattedTimesPosted} Posted by this tag
                </div>
            </div>
        </div>
    )
}

export default TagCardHome;
