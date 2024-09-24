import React, {useState} from 'react';
import axios from "axios"
import {toast, Toaster} from "sonner"

type Blink = {
  blinkName: string;
  imagePreview: string;
  id: string;
  userId: string;
};
export const runtime = "edge";

type UnverifiedBountiesProps = {
  blinks: Blink[];
};

const UnverifiedBounties: React.FC<UnverifiedBountiesProps> = ({ blinks }) => {
  const [indexes, setIndexes] = useState<number[]>([]);
  return (
    <section className="w-[90vw]">
      <h2 className="text-xl font-semibold mb-4">Unverified Blinks</h2>
      {blinks.length === 0 ? (
        <p>No blinks to verify</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b border-gray-500 p-2">Blink name</th>
              <th className="border-b border-gray-500 p-2">Blink id</th>
              <th className="border-b border-gray-500 p-2">Created by</th>
              <th className="border-b border-gray-500 p-2">ImagePreview</th>
            </tr>
          </thead>
          <tbody>
            {blinks.map((blink, index) => {  
              return (
              <tr key={index}>
                <td className="border-b border-gray-700 p-2">{blink.blinkName}</td>
                <td className="border-b border-gray-700 p-2">{blink.id}</td>
                <td className="border-b border-gray-700 p-2">{blink.userId}</td>
                <td className="border-b border-gray-700 p-2">{blink.imagePreview}</td>
                <td className="border-b border-gray-700 p-2">
                  <button  onClick={async () => {
                    const response = await axios.post(`${window.location.origin}/api/app/verifyBlink`, {
                      id: blink.id
                    }, {
                      withCredentials: true
                    })

                    if (!response.data.success) {
                      toast("Unable to update the user")
                      return
                    }
                    setIndexes(prevData => {
                      return [...prevData, index]
                    })
                    toast("verified")
                  }} className="bg-emerald-400 text-white py-1 px-3 rounded">
                    {indexes.includes(index) ? "Verified" : "Verify"}
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default UnverifiedBounties;