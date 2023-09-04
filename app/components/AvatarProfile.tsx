import React from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useState, useRef, ChangeEvent } from 'react';
import willow from './willow.jpg';
import Image from 'next/image';
import Button from './Button';
import { useMyContext } from '@/MyContext';
import DeleteAvatarProfileModal from './DeleteAvatarProfileModal';
import { useWindowSize } from 'react-use';

const UploadAvatar = (): JSX.Element => {
  const [image, setImage] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<AvatarEditor | null>(null);
  const [croppedImage, setCroppedImage] = useState<string>('');
  const { profileAvatar, setProfileAvatar } = useMyContext();
  const [showCropButton, setShowCropButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { width } = useWindowSize();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setShowCropButton(true);
    }
  };

  const handleScaleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    setScale(newScale);
  };

  const handleCrop = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      // You can now use the canvas to get the cropped image data
      const croppedImage = canvas.toDataURL();

      setCroppedImage(croppedImage);
    }
  };

  const handleSaveProfileImage = () => {
    setProfileAvatar(croppedImage);

    localStorage.setItem('profileAvatar', croppedImage);

    setCroppedImage('');
    setImage(null);
    setShowCropButton(false);
  };

  const handleDeleteProfileAvatar = () => {
    setProfileAvatar(undefined);
  };

  const cropPreview = width < 480 ? 100 : width < 768 ? 150 : 200;

  return (
    <main>
      <div>
        <div>
          <div className='flex'>
            <div className='flex flex-col'>
              <div className='container'>
                <div className='flex flex-col  '>
                  <div className='grid grid-cols-2 '>
                    <div className='flex w-full'>
                      <label
                        htmlFor='fileInput'
                        className=' text-center font-bold px-4 py-2 text-white bg-purple-500 rounded-md cursor-pointer hover:bg-purple-600 '
                      >
                        {profileAvatar ? 'Change Image' : 'Upload Image'}
                        {/* Upload Image */}
                      </label>
                      <input
                        type='file'
                        id='fileInput'
                        onChange={handleImageChange}
                        className='hidden'
                      />
                    </div>

                    <div className='ml-4 w-full '>
                      {profileAvatar && (
                        <Button
                          onClick={() => {
                            setShowModal(true);
                          }}
                          color='red'
                        >
                          Delete Image
                        </Button>
                      )}
                    </div>
                  </div>

                  <DeleteAvatarProfileModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />

                  {/* example ending */}

                  {showCropButton && (
                    <input
                      type='range'
                      min='1'
                      max='3'
                      step='0.01'
                      value={scale}
                      className='bg-purple-600 mb-5 mt-5 accent-purple-700  w-32 md:w-full '
                      onChange={handleScaleChange}
                    />
                  )}
                </div>

                <div className=' container relative right-7 md:right-0'>
                  {image && (
                    <AvatarEditor
                      ref={editorRef}
                      image={image}
                      width={cropPreview}
                      height={cropPreview}
                      border={50}
                      color={[255, 255, 255, 0.6]} // RGBA
                      scale={scale}
                      rotate={0}
                    />
                  )}

                  {showCropButton && (
                    <div className='mt-5 md:relative md:left-12'>
                      <Button color='purple' onClick={handleCrop}>
                        Crop
                      </Button>
                    </div>
                  )}
                </div>

                {/* crop photo button */}
                <div className='relative flex justify-center  container md:left-full md:bottom-64'>
                  {/* displaying crop avatar demo */}
                  {croppedImage && (
                    <div className='flex flex-col'>
                      <Image
                        className=' rounded-full relative  border-black border-4 mb-5'
                        src={croppedImage}
                        alt='Rounded avatar'
                        width={100}
                        height={100}
                      />

                      <Button onClick={handleSaveProfileImage} color='purple'>
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UploadAvatar;
