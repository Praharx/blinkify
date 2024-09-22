import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DrawingCanvas from './BlinkCard';
import { Button } from "@/components/ui/button";
import { useDrag } from 'react-dnd';
export const runtime = "edge";
interface DraggableButtonProps {
  content: string;
  type: string;
}

const DraggableButton: React.FC<DraggableButtonProps> = ({ content, type }) => {
  const [, drag] = useDrag({
    type: 'BUTTON',
    item: { content, type },
  });

  return (
    //@ts-ignore
    <Button ref={drag} className="w-full mb-2 bg-[#1F2226] text-white border border-gray-600 hover:bg-gray-700 transition-colors duration-200">
      {content}
    </Button>
  );
};

const NewBlink: React.FC = () => {
  const buttonTypes = [
    { content: "Text Input", type: "text" },
    { content: "Email Input", type: "email" },
    { content: "URL Input", type: "url" },
    { content: "Number Input", type: "number" },
    { content: "Date Input", type: "date" },
    { content: "DateTime Input", type: "datetime-local" },
    { content: "Checkbox", type: "checkbox" },
    { content: "Radio Button", type: "radio" },
    { content: "Textarea", type: "textarea" },
    { content: "Select Dropdown", type: "select" },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='flex flex-col md:flex-row min-h-screen w-screen bg-neutral-900'>
        {/* Button Section */}
        <div className='w-full md:w-1/4 lg:w-1/5 p-4 border-b md:border-b-0 md:border-r border-neutral-700 flex flex-col overflow-y-auto'>
          {buttonTypes.map((button, index) => (
            <DraggableButton
              key={index}
              content={button.content}
              type={button.type}
            />
          ))}
        </div>

        {/* Drawing Canvas Section */}
        <div className='w-full md:w-3/4 lg:w-4/5 xl:w-3/5 p-4 flex-grow'>
          <DrawingCanvas />
        </div>

        {/* Instructions Section */}
        <div className='hidden xl:block w-full xl:w-1/5 mr-8 p-4 border-t xl:border-t-0 xl:border-l border-neutral-700'>
          <div className='bg-neutral-900 rounded p-4 font-serif text-gray-400 h-full flex flex-col'>
            <p className='mb-2 font-bold text-white text-xl'>Instructions</p>
            <div className='flex-grow overflow-y-auto mb-2 min-h-[100px] xl:min-h-0'>
              <ul className=' list-disc pl-5'>
                <li>Drag and drop elements from the left panel to the canvas.</li>
                <li>Use the canvas to arrange your elements as needed.</li>
                <li>Click on an element to edit its properties.</li>
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