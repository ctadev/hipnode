interface Props {
    text: string;
    onClick: (text: string) => void;
    isSelected: boolean;
}

const DescriptionCard = ({ text, onClick, isSelected }: Props) => {
    const handleDescriptionSelection = () => {
        onClick(text);
    };
    return (
        <div
            onClick={handleDescriptionSelection}
            className={`${isSelected
                ? "bg-alt-2 text-grey-2"
                : "bg-white dark:bg-dark-black-3 lg:bg-grey-1 lg:dark:bg-dark-black-4 dark:text-grey-1"
                } p-5 flex rounded-lg gap-5 items-center mb-5 cursor-pointer`}
        >
            <p className="font-semibold text-sm lg:text-lg">{text}</p>
        </div>
    )
}

export default DescriptionCard