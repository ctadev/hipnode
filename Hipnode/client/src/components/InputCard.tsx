import React from 'react';

interface Props {
    text: string;
    placeholder: string;
    inputType?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}

const InputCard = ({ text, placeholder, inputType, name, value, onChange, required }: Props) => {
    return (
        <>
            <h3 className='dark:text-grey-2 font-semibold text-lg max-w-sm'>
                {text}
            </h3>
            <input
                type={inputType}
                placeholder={placeholder}
                className='bg-white dark:bg-dark-black-3 py-3 px-5 rounded-lg w-full text-sm mt-[10px] lg:bg-grey-1 dark:lg:bg-dark-black-2 dark:text-grey-2 outline-none'
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            />
        </>
    );
};

export default InputCard;
