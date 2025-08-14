'use client';

import React, { useState } from 'react';

interface ToggleMenuProps {
  options: string[];
  defaultIndex?: number;
  onChange?: (selected: string) => void;
}

const ToggleMenu: React.FC<ToggleMenuProps> = ({
  options,
  defaultIndex = 0,
  onChange,
}) => {
  const [selected, setSelected] = useState(defaultIndex);

  const handleSelect = (index: number) => {
    setSelected(index);
    if (onChange) onChange(options[index]);
  };

  return (
    <div className="flex bg-gray-100 rounded-full p-1 w-fit">
      {options.map((option, index) => {
        const isActive = selected === index;
        return (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`px-4 py-1 rounded-full font-medium transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-gray-700 hover:text-gray-900'
            }`}
            style={{
              backgroundColor: isActive ? '#f58220' : 'transparent',
            }}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default ToggleMenu;
