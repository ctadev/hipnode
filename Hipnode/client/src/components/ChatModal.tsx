import {useState} from "react";

import { UserAvatar, UserAvatar2, Expand, Vector, Voice, link, microphone, send } from "../assets";


const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }

  return ( 
    <main className="bg-white max-w-[335px] h-auto flex flex-col rounded-lg shadow-md p-6">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img className="cursor-pointer" src={UserAvatar} alt="User Avatar" />
          <div>
            <p className="text-md font-semibold-14">Jonathan Swift</p>
            <p className="text-xs text-[#0ECC8D]">Online</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button>
            <img src={Expand} alt="Expand Icon" />
          </button>
          <button onClick={handleClick}>
            <img src={Vector} alt="Vector Icon" />
          </button>
        </div>
      </div>
      {isOpen && (
      <div>
        <hr  className="my-4"/>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <img className="cursor-pointer" src={UserAvatar} />
            <div className="bg-[#FFECE6] rounded-lg p-2">
              <p className="text-[#FF6934] text-sm">What is the update?</p>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <div className="bg-[#FF6934] rounded-lg p-2">
              <p className="text-white text-sm">Did you check the last update?</p>
            </div>
            <img className="cursor-pointer" src={UserAvatar2} alt="User Avatar" />
          </div>
          <div className="flex gap-4">
            <img className="cursor-pointer" src={UserAvatar} alt="User Avatar" />
            <div>
              <img src={Voice} alt="Voice Message" />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <div className="bg-[#FF6934] rounded-lg p-2">
              <p className="text-white text-sm">Yup, it's completed</p>
            </div>
            <img className="cursor-pointer" src={UserAvatar2} alt="User Avatar" />
          </div>
        </div>
        <div className="flex mt-4 gap-3">
          <div className="border-[1px] border-[#858EAD] rounded-lg w-full p-2 px-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <button>
                  <img src={link} alt="link logo" />
                </button>
                <input type="text" placeholder="Type here your message..." className="text-xs px-6" />
              </div>
              <button>
                <img src={microphone} alt="microphone icon" />
              </button>
            </div>
          </div>
          <button>
            <img src={send} alt="send icon" />
          </button>
        </div>
      </div>
      )}
    </main>
   );
}
 
export default ChatModal;