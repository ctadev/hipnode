interface Props {
    text: string,
    icon: string,
}

const SignupCard = ({ text, icon }: Props) => {
    return (
        <div className='dark:text-grey-2 bg-white lg:bg-grey-1 dark:bg-dark-black-4 text-center py-3 rounded-lg flex items-center justify-center gap-[10px] font-semibold w-full mx-auto'>
            <img src={icon} alt='icon' className="w-5 h-5" />
            <p>Sign Up With {text}</p>
        </div>
    )
}

export default SignupCard