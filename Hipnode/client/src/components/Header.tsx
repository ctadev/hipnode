interface Props {
    text: string;
}

const Header = ({ text }: Props) => {
    return (
        <h3 className='text-textLight1 dark:text-grey-2 font-semibold text-lg lg:text-3xl max-w-sm'>
            {text}
        </h3>
    );
};

export default Header;
