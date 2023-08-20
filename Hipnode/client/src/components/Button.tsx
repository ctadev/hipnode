type Props = {
    handleClick?: () => void;
    text: string;
};

const Button = ({ handleClick, text }: Props) => {

    if (text === 'follow' || text === 'publish' || text === 'visit profile' || text === 'submit') return (
        <button onClick={handleClick} className="bg-primary-blue-1 p-[10px] font-semibold text-lg text-center text-white">
            {text}
        </button>
    )

    if (text === 'host a meetup' || text === 'submit a story') return (
        <button onClick={handleClick} className="bg-white text-center p-[9px] text-alt-2 font-semibold rounded-md">
            {text}
        </button>
    )

    if (text === "Create Posts") return (
        <button onClick={handleClick} className="bg-[#FF6934] text-[12px] md:text-[16px] text-white font-semibold rounded-md h-[44px] p-[9px]">
            {text}
        </button>
    )

    return (
        <button
            onClick={handleClick}
            className='bg-alt-1 text-grey-2 py-[10px] px-10 rounded-lg mt-5 text-lg font-semibold'
        >
            {text}
        </button>
    );
};

export default Button;
