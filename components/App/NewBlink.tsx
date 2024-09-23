'use client'

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DrawingCanvas from './BlinkCard';
import { Button } from "@/components/ui/button";
import { useDrag } from 'react-dnd';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
export const runtime = "edge";

interface DraggableButtonProps {
  content: string;
  type: string;
  options?: string[];
}


interface DroppedItem {
  id: number;
  content: string;
  type: string;
  options?: string[];
  isEditing?: boolean;
  question?: string; // New field for radio button question
}

interface SelectedOptions {
  content: string;
  type: string;
  options?: string[];
}

const DraggableButton: React.FC<DraggableButtonProps> = ({ content, type, options }) => {
  const [, drag] = useDrag({
    type: 'BUTTON',
    item: { content, type, options },
  });
  
  return (
    //@ts-ignore
    <Button ref={drag} className="w-full mb-2 bg-[#1F2226] text-white border border-gray-600 hover:bg-gray-700 transition-colors duration-200">
      {content}
    </Button>
  );
};


const NewBlink: React.FC = () => {
  const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
  const [amount, setAmount] = useState("10");
  const [blinkName, setBlinkName] = useState('<Blink Name>');
  const [blinkDescription, setBlinkDescription] = useState('<Blink Description>');
  const [imagePreview, setImagePreview] = useState("https://d70djocle7hv2.cloudfront.net//uploads/27/0.8158512747091613/image.jpg");
  const [submitText, setSubmitText] = useState(`Buy For ${amount} SOL`);
  const [buttonTypes, setButtonTypes] = useState([
    { content: "Text Input", type: "text" },
    { content: "Email Input", type: "email" },
    { content: "URL Input", type: "url" },
    { content: "Number Input", type: "number" },
    { content: "Checkbox", type: "checkbox", options: ["Option 1"] },
    { content: "Radio Button", type: "radio", options: ["Option 1", "Option 2"] },
    { content: "Textarea", type: "textarea" },
    { content: "Select Dropdown", type: "select", options: ["Option 1", "Option 2"] },
  ]);

  const handleSubmit = () => {
    const selectedOptions: SelectedOptions[] = droppedItems.map((items, index) => {
      if (items.type === "radio") {
        return {
          content: items.question as string,
          options: items.options,
          type: items.type,
        }
      } else if (items.type === "select") {
        return {
          content: items.content,
          options: items.options,
          type: items.type,
        }
      } else {
        return {
          content: items.content,
          type: items.type
        }
      }
    })
    console.log("selectedOptions:::::",selectedOptions);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='flex flex-col md:flex-row min-h-screen w-screen bg-neutral-900'>
        {/* Button Section */}
        <div className='w-full lg:w-1/6 p-4 border-b md:border-b-0 md:border-r border-neutral-700 flex flex-col overflow-y-auto'>
          {buttonTypes.map((button, index) => (
            <DraggableButton
              key={index}
              content={button.content}
              type={button.type}
              options={button.options}
            />
          ))}
        </div>

        {/* Drawing Canvas Section */}
        <div className='w-[10vw] relative flex flex-col items-center gap-4 lg:w-[10vw] p-4 flex-grow'>
          <DrawingCanvas droppedItems={droppedItems} setDroppedItems={setDroppedItems} blinkDescription={blinkDescription} blinkName={blinkName} submitText={submitText} imagePreview={imagePreview} setImagePreview={setImagePreview} setBlinkName={setBlinkName} setBlinkDescription={setBlinkDescription} setSubmitText={setSubmitText} amount={amount} />
          <div>
            {!Number(amount) ? <Label className='text-red-500'>Please enter a valid number</Label> : <Label>Amount for which to sell the product(in SOL)</Label>}
            <Input type="text" className="w-full" value={amount} onChange={(e) => {console.log(amount); setAmount(e.target.value)}} />
          </div>
          <Button onClick={handleSubmit} className="bg-[#1F2226] w-4/5 text-xl text-white border absolute bottom-4 border-gray-600 hover:bg-gray-700 transition-colors duration-200">Submit Blink</Button>
        </div>

        {/* Instructions Section */}
        <div className='hidden xl:block w-full lg:w-2/6 xl:w-1/5 mr-8 p-4 border-t xl:border-t-0 xl:border-l border-neutral-700'>
          <div className='bg-neutral-900 rounded p-4 font-serif text-gray-400 h-full flex flex-col'>
            <p className='mb-2 font-bold text-white text-xl'>Instructions</p>
            <div className='flex-grow overflow-y-auto mb-2 min-h-[100px] xl:min-h-0'>
              <ul className=' list-disc pl-5'>
                <li>Drag and drop elements from the left panel to the canvas.</li>
                <li>Use the canvas to arrange your elements as needed.</li>
                <li>Click on an element to edit its properties.</li>
                <li>For select dropdowns, radio buttons, and checkboxes, you can edit options after dragging.</li>
                <li>Save your work frequently to avoid losing progress.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

export default NewBlink;