import React from 'react'

type Props = {
    type?: string;
    title: string;
    state: string;
    placeholder: string;
    isTextArea?: boolean;
    setState: (value: string) => void;
}

const ProfileFormField = ({ type, title, state, placeholder, isTextArea, setState }: Props) => {
    return (
        <div className="flex items-center text-black justify-start flex-col w-full gap-4">
            <label className='w-full'>
                {title}
            </label>
            {isTextArea ? (
                <textarea
                    placeholder={placeholder}
                    value={state}
                    className="w-full outline-0 bg-gray-100 rounded-xl p-4"
                    required
                    onChange={(e) => setState(e.target.value)}
                />
            ) : (
                <input
                    type={type || "text"}
                    placeholder={placeholder}
                    required
                    value={state}
                    className="w-full outline-0 bg-gray-100 rounded-xl p-4"
                    onChange={(e) => setState(e.target.value)}
                />
            )}
        </div>
    )
}

export default ProfileFormField