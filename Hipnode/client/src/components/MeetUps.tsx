import { BsArrowRight } from 'react-icons/bs';

import { Button } from '.';
import { meetUpsMockData } from '../constants/general';

const MeetUps = () => {
    return (
        <main>
            <div>
                <h3>
                    meetups{' '}
                    <span>
                        <BsArrowRight />
                    </span>
                </h3>
            </div>

            {meetUpsMockData.map(({ date, title, logo, subtitle }, index) => {
                return (
                    <article key={index}>
                        <h4>{date}</h4>
                        <div>
                            <h3>{title}</h3>
                            <div>
                                {logo}
                                <h4>{subtitle}</h4>
                                <div>
                                    <Button text='remote' />
                                    <Button text='part time' />
                                    <Button text='worldwide' />
                                </div>
                            </div>
                        </div>
                    </article>
                );
            })}
        </main>
    );
};

export default MeetUps;
