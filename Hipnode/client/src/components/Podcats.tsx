import { BsArrowRight } from 'react-icons/bs';

import { mockData } from '../constants/general';

const Podcats = () => {
    return (
        <main>
            {mockData.map(({ title, img, author }, index) => {
                return (
                    <article key={index}>
                        <div>{img}</div>

                        <div>
                            <h3>{title}</h3>
                            <p>{author}</p>
                            <span>
                                <BsArrowRight />
                            </span>
                        </div>
                    </article>
                );
            })}
        </main>
    );
};

export default Podcats;
