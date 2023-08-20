interface Props {
    icon: string,
    text: string
}

const FeatureCard = ({ icon, text }: Props) => {
    return (
        <div className='text-textLight1 dark:text-grey-1 bg-white dark:bg-dark-black-3 p-5 flex rounded-lg gap-5 items-center'>
            <div className='bg-grey-1 dark:bg-dark-black-4 flex justify-center items-center rounded-lg p-5 shrink-0 max-h-[60px]'>
                <img src={icon} alt='icon' className="w-5 h-5" />
            </div>
            <p className='font-semibold text-sm lg:text-lg'>{text}</p>
        </div>
    )
}

export default FeatureCard