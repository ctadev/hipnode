import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import { logoLight } from '../assets';
import {
    BusinessTypeCard,
    Button,
    DescriptionCard,
    FeatureCard,
    Header,
    InputCard,
    SignupCard,
    Switch,
} from '../components';
import { businessTypes, descriptions, features, signupOptions } from '../constants/general';
import { useLoginUser, useRegisterUser } from '../../hooks/useAuth';
import { isEmailValid } from '../../utils/isEmailValid';
import { isPasswordValid } from '../../utils/isPasswordValid';

const Signup = () => {
    const [signupStep, setSignupStep] = useState(1);
    const [selectedDescription, setSelectedDescription] = useState<
        string | null
    >(null);
    const [selectedBusinessType, setSelectedBusinessType] = useState<string[]>(
        []
    );
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
    })
    const navigate = useNavigate();
    const { login } = useLoginUser();
    const { register } = useRegisterUser();

    const handleDescriptionSelection = (description: string) => {
        setSelectedDescription(description);
    };

    const handleBusinessTypeSelection = (businessType: string) => {
        if (selectedBusinessType.includes(businessType)) {
            setSelectedBusinessType((prev) =>
                prev.filter((type) => type !== businessType)
            );
        } else {
            setSelectedBusinessType((prev) => [...prev, businessType]);
        }
    };

    const handleClick = async () => {
        if (signupStep === 1 && formData.username.trim() === '') {
            toast.error('Please enter a username');
            return;
        }

        if (signupStep < 5) {
            setSignupStep((prev) => prev + 1);
            return;
        }

        if (signupStep === 5) {
            if (!isEmailValid(formData.email)) {
                toast.error('Invalid email format. Please use the format: email@test.com');
                return;
            }

            if (!isPasswordValid(formData.password)) {
                toast.error('Password should be at least 8 characters long, contain an uppercase and lowercase letter, a digit, and a special character.');
                return;
            }
        }

        register(formData)
    };


    const renderHeaderText = () => {
        if (signupStep === 1) {
            return 'Join a thriving community of entrepreneurs and developers.';
        } else if (signupStep < 5) {
            return 'Tell us a little about yourself!';
        } else {
            return 'Almost done!';
        }
    };

    const renderFeatureCards = () => {
        const startIndex = signupStep === 1 ? 0 : signupStep < 5 ? 3 : 5;
        const endIndex = signupStep === 1 ? 3 : signupStep < 5 ? 5 : 7;

        return features
            .slice(startIndex, endIndex)
            .map((feature, index) => (
                <FeatureCard
                    key={`${feature.text}-${index}`}
                    icon={feature.icon}
                    text={feature.text}
                />
            ));
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
                        <Header text={renderHeaderText()} />
                        <div className='flex flex-col gap-5 mb-20 mt-10'>
                            {renderFeatureCards()}
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-grey-2 dark:bg-dark-black-2 lg:bg-white dark:lg:bg-dark-black-3 lg:w-1/2 px-6 lg:px-10 lg:pt-11 xl:pl-[86px] xl:pr-[126px]'>
                <div className='lg:bg-white lg:dark:bg-dark-black-3 flex-1 lg:mt-[98px] md:px-16 lg:px-0 2xl:px-32 xl:pt-16'>
                    {signupStep === 1 ? (
                        <InputCard
                            text='Choose a username'
                            placeholder='e.g. Hipnode123'
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                    ) : signupStep === 2 ? (
                        <div className='mb-10'>
                            <Header text="Which best describes the stage you're at right now?" />
                        </div>
                    ) : signupStep === 3 ? (
                        <div className='mb-10'>
                            <Header text='Do you know how to code?' />
                        </div>
                    ) : signupStep === 4 ? (
                        <div className='mb-5'>
                            <Header text='What types of businesses are you most interested in running?' />
                            <p className='mt-5 text-textAlt2 font-semibold dark:text-white'>
                                Choose as many as you like.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className='mb-5'>
                                <InputCard
                                    text='Email'
                                    placeholder='Enter email address'
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <InputCard
                                text='Password'
                                placeholder='Choose password'
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                inputType='password'
                            />
                        </>
                    )}
                    {(signupStep === 2 || signupStep === 3) &&
                        descriptions.slice(signupStep === 2 ? 0 : 5, signupStep === 2 ? 5 : 10).map((description, index) => (
                            <DescriptionCard
                                key={description + index}
                                text={description}
                                onClick={handleDescriptionSelection}
                                isSelected={selectedDescription === description}
                            />
                        ))}
                    {signupStep === 4 && (
                        <div className="flex flex-row flex-wrap gap-5">
                            {businessTypes.map((businessType, index) => (
                                <BusinessTypeCard key={businessType + index} text={businessType} onClick={handleBusinessTypeSelection}
                                    isSelected={selectedBusinessType.includes(businessType)}
                                />
                            ))}
                        </div>
                    )}
                    <Button text={signupStep === 5 ? 'Register' : 'Next'} handleClick={handleClick} />
                    <p className='text-textLight1 dark:text-grey-2 mt-5 text-sm mb-[30px]'>
                        Already have an account?{' '}
                        <Link to='/signin'>
                            <span className='text-alt-2 font-semibold'>
                                Sign in.
                            </span>
                        </Link>
                    </p>
                    {(signupStep === 1 || signupStep === 5) && (
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
                                    key={option.text + index}
                                    text={option.text}
                                    icon={option.icon}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Signup;
