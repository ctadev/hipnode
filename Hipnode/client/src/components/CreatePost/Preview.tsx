import { backarrow, view } from '../../assets/createpost-asset/index';

import React, { Dispatch, SetStateAction } from 'react';
import 'react-quill/dist/quill.snow.css';

interface Props {
  setPreview?: Dispatch<SetStateAction<boolean>>;
  title: string;
  covers: any;
  editor: string;
  tags: Array<string>;
}

const Preview = ({ title, covers, editor, tags, setPreview }: Props) => {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="bg-white dark:bg-dark-black-4 w-[900px] rounded-lg flex flex-col items-center justify-center py-8 px-6">
        <div className="w-full flex items-center gap-4 mb-6">
          <img
            src={backarrow}
            alt=""
            onClick={() => setPreview(false)}
            className="cursor-pointer"
          />

          <div className="flex gap-2">
            <img src={view} alt="" className='invert dark:invert-0'/>
            <p className="">Preview</p>
          </div>
        </div>

        {covers && (
          <img src={covers} alt="" className="h-[250px] w-full rounded-lg" />
        )}

        <div className="w-[80%]">
          <h1 className="text-3xl mt-4">{title}</h1>
          <ul className="flex gap-6 text-orange-400 mt-4">
            {tags?.map((item, index) => (
              <li key={index}>{`#${item}`}</li>
            ))}
          </ul>
          <div
            dangerouslySetInnerHTML={{ __html: editor }}
            className="text-slate-400 mt-4 preview-container"
          />
        </div>
      </section>
    </main>
  );
};

export default Preview;
