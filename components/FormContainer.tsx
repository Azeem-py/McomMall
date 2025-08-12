import { FileUser, LucideIcon } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react';
import { InputComponent } from './Input';

interface FormHeaderProps {
  title: string;
  icon: LucideIcon;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  title,
  icon: Icon,
}) => {
  return (
    <header className="w-full bg-[#FCFCFC] flex gap-2 items-center font-medium text-2xl h-24 py-6 px-4 border-b sm:text-xl md:text-2xl lg:text-3xl">
      <Icon size={24} />
      <h2>{title}</h2>
    </header>
  );
};

const FormContainer = () => {
  const [inputValue, setInputValue] = useState('');
  const [fileValue, setFileValue] = useState<File | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileValue(e.target.files[0]);
    }
  };

  return (
    <div className="w-full border rounded-md mt-6">
      <FormHeader title="Basic Information" icon={FileUser} />

      <InputComponent
        inputType="text"
        labelText="Listing tile"
        tooltipText="The title of your listing, containing its unique feature"
        value={inputValue}
        onChange={handleInputChange}
        fileInput={false}
      />

      <InputComponent
        inputType="text"
        labelText="Listing tile"
        tooltipText="The title of your listing, containing its unique feature"
        fileInput={true}
        fileOnChange={handleFileChange}
      />
    </div>
  );
};

export default FormContainer;
