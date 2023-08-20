type Props = {
    placeholder: string
}

const Input = ({ placeholder }: Props) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className="bg-white dark:bg-dark-black-3 py-3 px-5 rounded-lg w-full text-sm mt-[10px] lg:bg-grey-1 dark:lg:bg-dark-black-2 dark:text-grey-2 outline-none"
        />
    )
}

export default Input