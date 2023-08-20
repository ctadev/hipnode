type Props = {
    tag: {
        type: string;
        image: string;
        count: number;
    };
};

const TagCard = ({ tag }: Props) => {
    return (
        <div className="flex gap-[10px]">
            <img src={tag.image} width={32} height={32} alt="tag" className="object-contain"
            />
            <div className="flex flex-col text-dark-grey-3">
                <p className="font-semibold text-xs dark:text-grey-2">#{tag.type}</p>
                <p className="text-[10px] dark:text-dark-grey-2">{tag.count} posted by this tag</p>
            </div>
        </div>
    )
}

export default TagCard
