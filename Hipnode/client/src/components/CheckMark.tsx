import React, { useState } from 'react';

import { checkMark } from '../assets';

const CheckMark = ({ name, handler }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    const checked = !isChecked;
    setIsChecked((prevIsChecked) => !prevIsChecked);
    if (checked) {
      handler((prev) => [...prev, name]);
    }
    else {
      handler(prev => prev.filter(item => item !== name)); 
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheck}
      className={`w-6 h-6 border-2 border-[#97989D] rounded ${
        isChecked ? 'bg-[#FF4401] border-0' : ''
      }`}
    >
      {isChecked && (
        <img className="w-4 pt-1" src={checkMark} alt="Check Mark" />
      )}
    </button>
  );
};

export default CheckMark;
