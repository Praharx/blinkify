import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from 'axios';
import Image from 'next/image';

const CLOUDFRONT_URL = process.env.NEXT_PUBLIC_CLOUDFRONT_URL;
export const runtime = "edge";
interface DroppedItem {
  id: number;
  content: string;
  type: string;
}

interface DragItem {
  type: string;
  content: string;
}

interface UploadProps {
  uploading: Boolean,
  setUploading: Dispatch<SetStateAction<boolean>>,
  imagePreview: string | null,
  setImagePreview: Dispatch<SetStateAction<string | null>>
}

const DrawingCanvas: React.FC = () => {
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [blinkName, setBlinkName] = useState('<Blink Name>');
  const [blinkDescription, setBlinkDescription] = useState('<Blink Description>');
  const [submitText, setSubmitText] = useState('<Your Submit Text>');
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("https://wallpapercave.com/wp/wp9800926.jpg");

  const [, drop] = useDrop<DragItem, void, {}>({
    accept: 'BUTTON',
    drop: (item) => {
      const newItem: DroppedItem = { id: Date.now(), content: item.content, type: item.type };
      setDroppedItems((prevItems) => [...prevItems, newItem]);
    },
  });

  async function chooseFile(e: React.ChangeEvent<HTMLInputElement>) {
    setUploading(true);

    try {
      const response: any = await axios.get(`${window.location.origin}/api/app/getPresignedUrl`, {
        withCredentials: true,
        headers: {
          "Authorization": "sk_test_lAcxYuFjIzlH30eyImE5V70A4Wdpt0f18MWZvB2A6B"
        }
      });
      console.log(response);
      const preSignedUrl = response.data.preSignedUrl;
      const file = e.target.files?.[0];

      if (!file) {
        console.error('No file selected');
        return;
      }
      
      const formData = new FormData();
      formData.set("bucket", response.data.fields["bucket"]);
      formData.set("X-Amz-Algorithm", response.data.fields["X-Amz-Algorithm"]);
      formData.set("X-Amz-Credential", response.data.fields["X-Amz-Credential"]);
      formData.set("X-Amz-Date", response.data.fields["X-Amz-Date"]);
      formData.set("key", response.data.fields["key"]);
      formData.set("Policy", response.data.fields["Policy"]);
      formData.set("X-Amz-Signature", response.data.fields["X-Amz-Signature"]);
      formData.set("Content-Type", response.data.fields["Content-Type"]);
      formData.append("file", file);

      console.log(preSignedUrl, "::::", formData);
      const res = await axios.post(preSignedUrl, formData);

      console.log(`${CLOUDFRONT_URL}${response.data.fields.key}`)
      setImagePreview(`${CLOUDFRONT_URL}${response.data.fields.key}`);
      setUploading(false)

    } catch (e) {
      console.log(e);
      setUploading(false);
    }
  }

  const renderInput = (item: DroppedItem) => {
    const baseClassName = "w-full px-3 sm:px-4 py-2 text-sm sm:text-base text-white bg-[#1F2226] border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500";

    switch (item.type) {
      case 'checkbox':
      case 'radio':
        return (
          <div className="flex items-center">
            <input
              type={item.type}
              id={`${item.type}-${item.id}`}
              className="mr-2"
            />
            <label htmlFor={`${item.type}-${item.id}`} className="text-white">{item.content}</label>
          </div>
        );
      case 'textarea':
        return (
          <textarea
            placeholder={item.content}
            className={`${baseClassName} h-24 resize-none`}
          />
        );
      case 'select':
        return (
          <select className={baseClassName}>
            <option value="">{item.content}</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        );
      default:
        return (
          <input
            type={item.type}
            placeholder={item.content}
            className={baseClassName}
          />
        );
    }
  };

  return (
    //@ts-ignore
    <div ref={drop} className="bg-[#1F2226] shadow-blue-400 my-4 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[90vw] sm:max-w-sm mx-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="w-full relative">
          <img
            src={imagePreview}
            alt="Description of the image"
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={() => document.getElementById('fileInput')?.click()}
              className="bg-white p-2 rounded-full shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
          <input
            id="fileInput"
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                setUploading(true);
                await chooseFile(e);
                setUploading(false);
              }
            }}
            className="hidden"
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
              <div className="text-white">Uploading...</div>
            </div>
          )}
        </div>
        <input
          type="text"
          value={blinkName}
          onChange={(e) => setBlinkName(e.target.value)}
          className="text-lg sm:text-xl font-semibold text-white bg-transparent border-none text-center w-full"
        />
      </div>

      {/* Description */}
      <textarea
        value={blinkDescription}
        onChange={(e) => setBlinkDescription(e.target.value)}
        className="text-gray-400 text-xs sm:text-sm mb-4 w-full bg-transparent border-none resize-none"
      />

      {/* Form */}
      <form className="space-y-3 sm:space-y-4">
        {droppedItems.map((item) => (
          <div key={item.id}>
            {renderInput(item)}
          </div>
        ))}

        <input
          type="text"
          value={submitText}
          onChange={(e) => setSubmitText(e.target.value)}
          className="w-full py-2 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-700 transition duration-300 text-center cursor-pointer"
        />
      </form>
    </div>
  );
};

export default DrawingCanvas;