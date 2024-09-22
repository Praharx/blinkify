import React,{useState, useEffect} from 'react';
import CurrentBlink from './CurrentBlinks';
import NewBlink from './NewBlink';
export const runtime = "edge";
const renderContent = (selectedOption:string) => {
    switch (selectedOption) {
      case "currentBlink":
        return <CurrentBlink />;
      case "newBlink":
        return (
          <NewBlink />
        );
      default:
        return <div>404 not found</div>;
    }
};

export default function MainContent({selectedOption}:{selectedOption:string}){
    return (
        <div>
            {renderContent(selectedOption)}
        </div>
    )
}