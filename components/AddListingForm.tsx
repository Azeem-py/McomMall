import React, { ChangeEvent, useState } from 'react';
import { FormHeader } from './FormContainer';
import { InputComponent, InputLabel } from './Input';
import {
  Book,
  BookImage,
  FileUser,
  Locate,
  ReceiptText,
  Edit,
  Trash,
} from 'lucide-react';
import MapComponent from './map';
import UploadBox from './UploadBox';
import DescriptionInput from './DescriptionInput';
import SingleImageInput from './SingleImageInput';
import { Switch } from './ui/switch';
import { Button } from './ui/button';

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

  // Step 2 State
  const [services, setServices] = useState<
    {
      id: number;
      image: string | null;
      title: string;
      description: string;
      price: string;
      isBookable: boolean;
    }[]
  >([]);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [tempTitle, setTempTitle] = useState('');
  const [tempDescription, setTempDescription] = useState('');
  const [tempPrice, setTempPrice] = useState('');
  const [isBookable, setIsBookable] = useState(false);

  const handleAddOrUpdateService = () => {
    if (editingServiceId !== null) {
      setServices(
        services.map(service =>
          service.id === editingServiceId
            ? {
                ...service,
                image: tempImage,
                title: tempTitle,
                description: tempDescription,
                price: tempPrice,
                isBookable,
              }
            : service
        )
      );
      setEditingServiceId(null);
    } else {
      setServices([
        ...services,
        {
          id: Date.now(),
          image: tempImage,
          title: tempTitle,
          description: tempDescription,
          price: tempPrice,
          isBookable,
        },
      ]);
    }
    setTempImage(null);
    setTempTitle('');
    setTempDescription('');
    setTempPrice('');
    setIsBookable(false);
  };

  const handleEditService = (id: number) => {
    const service = services.find(s => s.id === id);
    if (service) {
      setEditingServiceId(id);
      setTempImage(service.image);
      setTempTitle(service.title);
      setTempDescription(service.description);
      setTempPrice(service.price);
      setIsBookable(service.isBookable);
    }
  };

  const handleDeleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
    if (editingServiceId === id) {
      setEditingServiceId(null);
      setTempImage(null);
      setTempTitle('');
      setTempDescription('');
      setTempPrice('');
      setIsBookable(false);
    }
  };

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
          <div className="p-4">
            {/* Added Services Table */}
            {services.length > 0 && (
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm text-left text-gray-700 border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b">Image</th>
                      <th className="py-2 px-4 border-b">Title</th>
                      <th className="py-2 px-4 border-b">Description</th>
                      <th className="py-2 px-4 border-b">Price</th>
                      <th className="py-2 px-4 border-b">Bookable</th>
                      <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map(service => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">
                          {service.image ? (
                            <img
                              src={service.image}
                              alt="Service"
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            <span className="text-gray-400">No Image</span>
                          )}
                        </td>
                        <td className="py-2 px-4 border-b">{service.title}</td>
                        <td className="py-2 px-4 border-b">
                          {service.description}
                        </td>
                        <td className="py-2 px-4 border-b">{service.price}</td>
                        <td className="py-2 px-4 border-b">
                          {service.isBookable ? 'Yes' : 'No'}
                        </td>
                        <td className="py-2 px-4 border-b flex space-x-2">
                          <button
                            onClick={() => handleEditService(service.id)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Input Section */}
            <section className="flex flex-col md:flex-row items-center gap-3 p-5 bg-gray-50 rounded-lg">
              <div className="w-[4rem] h-[4rem] flex-shrink-0">
                <SingleImageInput
                  onImageChange={image => setTempImage(image)}
                />
              </div>

              <InputComponent
                inputType="text"
                labelText="Title"
                tooltipText="Title of the service"
                value={tempTitle}
                onChange={e => setTempTitle(e.target.value)}
                fileInput={false}
              />

              <InputComponent
                inputType="text"
                labelText="Description"
                tooltipText="Description of the service"
                value={tempDescription}
                onChange={e => setTempDescription(e.target.value)}
                fileInput={false}
              />

              <InputComponent
                inputType="text"
                labelText="Price"
                tooltipText="Price of the service"
                value={tempPrice}
                onChange={e => setTempPrice(e.target.value)}
                fileInput={false}
              />

              <div className="flex items-center gap-2">
                <InputLabel
                  labelText="Enable Booking Widget"
                  tooltipText="Will make it bookable in the booking widget"
                />
                <Switch
                  className="w-[3rem] h-[1.5rem]"
                  checked={isBookable}
                  onCheckedChange={setIsBookable}
                />
              </div>
            </section>

            <Button
              className="bg-red-500 hover:bg-red-600 h-[3rem] w-[5rem] rounded-2xl mt-4 md:mt-6"
              onClick={handleAddOrUpdateService}
            >
              {editingServiceId ? 'Update' : 'Add'}
            </Button>
          </div>
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
