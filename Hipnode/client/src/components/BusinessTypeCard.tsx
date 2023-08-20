interface Props {
    text: string,
    onClick: (text: string) => void,
    isSelected: boolean
}

const BusinessTypeCard = ({ text, onClick, isSelected }: Props) => {
    const handleBusinessTypeSelect = () => {
        onClick(text);
    };
    return (
        <div
            onClick={handleBusinessTypeSelect}
            className={`${isSelected
                ? "bg-alt-2 text-grey-2"
                : "bg-white dark:bg-dark-black-3 lg:bg-grey-1 lg:dark:bg-dark-black-4 dark:text-grey-1"
                } p-4 flex rounded-lg gap-5 items-center cursor-pointer`}
        >
            <p className="font-semibold text-lg">{text}</p>
        </div>
    )
}

export default BusinessTypeCard