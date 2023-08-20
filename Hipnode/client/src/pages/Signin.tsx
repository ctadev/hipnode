import React from 'react';
import { Link } from 'react-router-dom';

import { logoLight } from '../assets';
import {
    FeatureCard,
    Header,
    InputCard,
    SignupCard,
    Switch,
    TestingForm,
} from '../components';
import { features, signupOptions } from '../constants/general';

const Signin = () => {
    const handleClick = () => {
        // handle sign in
    };

    return (
        <div className='flex flex-col lg:flex-row h-screen bg-grey-2 dark:bg-dark-black-2'>
            <div className='bg-grey-2 dark:bg-dark-black-2 h-auto lg:h-screen pt-8 px-6 lg:pt-11 lg:px-10 flex flex-col lg:flex-row lg:w-1/2'>
                <div className='flex-1'>
                    <div className='flex justify-between'>
                        <img
                            src={logoLight}
                            alt='logo'
                            className='mb-[60px] w-[146px] h-[38px] object-contain'
                        />
                    </div>
                    <div className='flex flex-col xl:pl-[104px] xl:pr-[86px] md:px-16 lg:px-0 xl:pt-16'>
                        <Header text='Sign in to Hipnode.' />
                        <div className='flex flex-col gap-5 mb-20 mt-10'>
                            {features.slice(7, 9).map((feature, index) => (
                                <FeatureCard
                                    key={index}
                                    text={feature.text}
                                    icon={feature.icon}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-grey-2 dark:bg-dark-black-2 lg:bg-white dark:lg:bg-dark-black-3 lg:w-1/2 px-6 lg:px-10 lg:pt-11 xl:pl-[86px] xl:pr-[126px]'>
                <div className='lg:bg-white lg:dark:bg-dark-black-3 flex-1 lg:mt-[98px] md:px-16 lg:px-0 2xl:px-32 xl:pt-16'>
                    <TestingForm />
                    {/* <div className='mb-5'>
                        <InputCard
                            text='Email'
                            placeholder='Enter email address'
                            inputType='email'
                            name='email'
                        />
                    </div>
                    <InputCard
                        text='Password'
                        placeholder='Choose password'
                        inputType='password'
                        name='password'
                    />
                    <button
                        onClick={handleClick}
                        className='bg-alt-1 text-grey-2 py-[10px] px-10 rounded-lg mt-5 text-lg font-semibold'
                    >
                        Next
                    </button> */}

                    <p className='dark:text-grey-2 mt-5 text-sm mb-[30px]'>
                        Don't have an account yet?{' '}
                        <Link to='/signup'>

                            <span className='text-alt-2 font-semibold'>
                                Join the community!
                            </span>
                        </Link>

                    </p>
                    <div className='flex flex-col gap-5 pb-[30px]'>
                        <div className='flex items-center gap-5 mb-[30px]'>
                            <div className='bg-dark-grey-4 w-full h-[1px]' />
                            <p className='dark:text-grey-2 text-lg font-semibold'>
                                or
                            </p>
                            <div className='bg-dark-grey-4 w-full h-[1px]' />
                        </div>
                        {signupOptions.map((option, index) => (
                            <SignupCard
                                key={index}
                                text={option.text}
                                icon={option.icon}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
