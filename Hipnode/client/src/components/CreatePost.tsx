import { avatar } from '../assets';

avatar;

const CreatePost = () => {
    return (
        <main>
            <div>
                <img src={avatar} alt='user avatar' />
                <input
                    type='text'
                    placeholder={`let's share what is in your mind...`}
                />
                <button type='button'>create post</button>
            </div>
        </main>
    );
};

export default CreatePost;
