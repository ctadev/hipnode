import { arrowDark } from "../assets"

type Props = {
    title: string
}

const Title = ({ title }: Props) => {

    return (
        <div className='flex dark:text-grey-2 font-semibold gap-[7px] items-center'>
            <h2>{title}</h2>
            <img src={arrowDark} alt='arrow' className='object-contain w-3 h-[10px]' />
        </div>
    )
}

export default Title