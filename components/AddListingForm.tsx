import React, { ChangeEvent, useState } from 'react';
import { FormHeader } from './FormContainer';
import { InputComponent } from './Input';
import { Book, BookImage, FileUser, Locate, ReceiptText } from 'lucide-react';
import MapComponent from './map';
import UploadBox from './UploadBox';
import DescriptionInput from './DescriptionInput';

const AddListingForm = () => {
  // Basic Information State
  const [listingTitle, setListingTitle] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleListingTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setListingTitle(e.target.value);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLogo(e.target.files[0]);
    }
  };
  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCategory(e.target.value);
  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  // Location State
  const [address, setAddress] = useState('');
  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAddress(e.target.value);

  // Gallery State
  const [images, setImages] = useState<File[]>([]);
  const handleImagesChange = (newImages: File[]) => setImages(newImages);

  // Details State
  const [description, setDescription] = useState(''); // Managed by DescriptionInput
  const [video, setVideo] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [xHandle, setXHandle] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instagram, setInstagram] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) =>
    setVideo(e.target.value);
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPhone(e.target.value);
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handleWebsiteChange = (e: ChangeEvent<HTMLInputElement>) =>
    setWebsite(e.target.value);
  const handleFacebookChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFacebook(e.target.value);
  const handleXChange = (e: ChangeEvent<HTMLInputElement>) =>
    setXHandle(e.target.value);
  const handleWhatsappChange = (e: ChangeEvent<HTMLInputElement>) =>
    setWhatsapp(e.target.value);
  const handleInstagramChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInstagram(e.target.value);
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMinPrice(e.target.value);
  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    setMaxPrice(e.target.value);

  // Step State
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="w-full mx-auto p-4">
      {/* Step Navigation */}
      <div className="flex justify-between items-center mb-6 relative">
        <div
          className={`flex flex-col items-center z-10 cursor-pointer ${
            activeStep === 1 ? 'text-red-600' : 'text-yellow-500'
          }`}
          onClick={() => setActiveStep(1)}
        >
          <div
            className={`w-16 h-16 text-lg rounded-full flex items-center justify-center ${
              activeStep === 1 ? 'bg-red-600 text-white' : 'bg-yellow-200'
            }`}
          >
            1
          </div>
          <span className="text-sm mt-2">Listing Essentials</span>
        </div>
        <div
          className={`flex flex-col items-center z-10 cursor-pointer ${
            activeStep === 2 ? 'text-red-600' : 'text-yellow-500'
          }`}
          onClick={() => setActiveStep(2)}
        >
          <div
            className={`w-16 h-16 text-lg rounded-full flex items-center justify-center ${
              activeStep === 2 ? 'bg-red-600 text-white' : 'bg-yellow-200'
            }`}
          >
            2
          </div>
          <span className="text-sm mt-2">Offerings & Schedule</span>
        </div>
        <div
          className={`flex flex-col items-center z-10 cursor-pointer ${
            activeStep === 3 ? 'text-red-600' : 'text-yellow-500'
          }`}
          onClick={() => setActiveStep(3)}
        >
          <div
            className={`w-16 h-16 text-lg rounded-full flex items-center justify-center ${
              activeStep === 3 ? 'bg-red-600 text-white' : 'bg-yellow-200'
            }`}
          >
            3
          </div>
          <span className="text-sm mt-2">Final Details</span>
        </div>
      </div>

      {/* Step Content */}
      {activeStep === 1 && (
        <div>
          {/* BASIC INFO */}
          <div className="w-full border rounded-md mt-6">
            <FormHeader title="Basic Information" icon={FileUser} />

            <section className="px-3 py-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                <InputComponent
                  inputType="text"
                  labelText="Listing title"
                  tooltipText="The title of your listing, containing its unique feature"
                  value={listingTitle}
                  onChange={handleListingTitleChange}
                  fileInput={false}
                />

                <InputComponent
                  inputType="text"
                  labelText="Logo"
                  tooltipText="The title of your listing, containing its unique feature"
                  fileInput={true}
                  fileOnChange={handleFileChange}
                />

                <InputComponent
                  inputType="text"
                  labelText="Category (optional)"
                  tooltipText="The title of your listing, containing its unique feature"
                  value={category}
                  onChange={handleCategoryChange}
                  fileInput={false}
                />

                <InputComponent
                  inputType="text"
                  labelText="Keyword (optional)"
                  tooltipText="The title of your listing, containing its unique feature"
                  value={keyword}
                  onChange={handleKeywordChange}
                  fileInput={false}
                />
              </div>
            </section>
          </div>

          {/* LOCATION */}
          <div className="w-full border rounded-md mt-6">
            <FormHeader title="Location" icon={Locate} />

            <div className="h-[25rem] border border-red-600">
              <MapComponent />
            </div>

            <section className="px-3 py-4">
              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                <InputComponent
                  inputType="text"
                  labelText="Address (optional)"
                  tooltipText="The address of your business"
                  value={address}
                  onChange={handleAddressChange}
                  fileInput={false}
                />
              </div>
            </section>
          </div>

          {/* GALLERY */}
          <div className="w-full border rounded-md mt-6">
            <FormHeader title="Gallery" icon={BookImage} />

            <section className="px-3 py-4">
              <UploadBox onImagesChange={handleImagesChange} />
            </section>
          </div>

          {/* DETAILS SECTION */}
          <div className="w-full border rounded-md mt-4">
            <FormHeader title="Details" icon={ReceiptText} />

            <section className="px-3 py-4 my-4 ">
              <DescriptionInput />

              <section className="flex flex-col gap-x-6 gap-y-8">
                <InputComponent
                  inputType="text"
                  labelText="Video (optional)"
                  tooltipText="URL to embed on supported device"
                  value={video}
                  onChange={handleVideoChange}
                  fileInput={false}
                />

                {/* PHONE EMAIL AND WEBSITE SECTION */}
                <div className="grid grid-cols-3 gap-4">
                  <InputComponent
                    inputType="text"
                    labelText="Phone (optional)"
                    tooltipText="Your phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                    fileInput={false}
                  />
                  <InputComponent
                    inputType="text"
                    labelText="Email (optional)"
                    tooltipText="Your business email"
                    value={email}
                    onChange={handleEmailChange}
                    fileInput={false}
                  />
                  <InputComponent
                    inputType="text"
                    labelText="Website (optional)"
                    tooltipText="Your business website"
                    value={website}
                    onChange={handleWebsiteChange}
                    fileInput={false}
                  />
                </div>

                {/* SOCIAL MEDIA SECTION */}
                <div className="grid grid-cols-4 gap-4">
                  <InputComponent
                    inputType="text"
                    labelText="Facebook (optional)"
                    tooltipText="Your facebook"
                    value={facebook}
                    onChange={handleFacebookChange}
                    fileInput={false}
                  />
                  <InputComponent
                    inputType="text"
                    labelText="X (optional)"
                    tooltipText="Your x account"
                    value={xHandle}
                    onChange={handleXChange}
                    fileInput={false}
                  />
                  <InputComponent
                    inputType="text"
                    labelText="Whatsapp (optional)"
                    tooltipText="Your business whatsapp"
                    value={whatsapp}
                    onChange={handleWhatsappChange}
                    fileInput={false}
                  />
                  <InputComponent
                    inputType="text"
                    labelText="Instagram (optional)"
                    tooltipText="Your business instagram"
                    value={instagram}
                    onChange={handleInstagramChange}
                    fileInput={false}
                  />
                </div>

                {/* PRICE RANGE SECTION */}
                <div className="grid grid-cols-2 gap-4">
                  <InputComponent
                    inputType="text"
                    labelText="Minimum price (optional)"
                    tooltipText="Your service minimum price"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    fileInput={false}
                  />
                  <InputComponent
                    inputType="text"
                    labelText="Maximum price (optional)"
                    tooltipText="Your service maximum price"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    fileInput={false}
                  />
                </div>
              </section>
            </section>
          </div>
        </div>
      )}
      {activeStep === 2 && (
        <div className="w-full border rounded-md mt-6">
          <FormHeader title="Pricing & Bookable Services" icon={Book} />
          <p>Step 2</p>
        </div>
      )}
      {activeStep === 3 && (
        <div>
          <p>Step 3</p>
        </div>
      )}
    </section>
  );
};

export default AddListingForm;
