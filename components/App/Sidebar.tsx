"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import {  SignedIn,UserButton,useUser } from '@clerk/nextjs'
import Image from "next/image";
import { cn } from "@/lib/utils";
import {toast, Toaster} from "sonner";
import axios from "axios";
import { Button } from "../ui/button";
import ToggleSwitch from "../animata/button/toggle-switch";
export const runtime = "edge";
export function SidebarDemo({children}: {children: any}) {
  const { user, isLoaded, isSignedIn } = useUser();
  const [open, setOpen] = useState(false);
  if(!isLoaded || !isSignedIn) {
    return null;
  }
console.log(open, "From Sidebar")
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "New Blink",
      href: "/dashboard/newBlink",
      icon: (
        <IconUserBolt className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className=" text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className=" text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row  bg-neutral-800 flex-1 mx-auto border border-neutral-700 overflow-hidden",
        "h-screen w-screen" 
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
          <SidebarLink
              link={{
                label: `${user?.username}`,
                href: "#",
                icon: (
                <SignedIn>
                  <UserButton />
                </SignedIn>
                ),
              }}
            />
          
          </div>
        </SidebarBody>
      </Sidebar>
      {React.cloneElement(children, { open })}
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium   text-white whitespace-pre"
      >
        Blinkify
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <div>
      
    </div>
  );
};

export const Dashboard = ({open}: {open?: boolean}) => {
  const [activeBlinkCards, setActiveBlinkCards] = useState<any[]>([]);
  const [filterVerified, setFilterVerified] = useState(false);
  const { user } = useUser();
  console.log(open, "From Dashboard")

  useEffect(() => {
    // Fetch active blinks from API
    const fetchActiveBlinkCards = async () => {
      try {
        const response = await axios.get('/api/app/getUserBlinks',  {
          withCredentials: true,
          headers: {
            "Authorization": "sk_test_lAcxYuFjIzlH30eyImE5V70A4Wdpt0f18MWZvB2A6B",
            "userId": user?.id
          }
        })
        console.log(response.data.data)
        setActiveBlinkCards(response.data.data)
      }catch(err) {
        toast.error("Error fetching active blinks")
        console.log(err)
      }
    };

    fetchActiveBlinkCards();
  }, []);

  const filteredBlinks = filterVerified 
    ? activeBlinkCards.filter(blink => blink.isVerified) 
    : activeBlinkCards;

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-4 flex-1 w-full">
        <h2 className="text-2xl font-bold text-white mb-4">Active Blinks</h2>
        <div className="mb-4 flex items-center">
          <label className="text-white mr-2">Show Verified Only</label>
          <ToggleSwitch
            defaultChecked={filterVerified}
            onChange={() => setFilterVerified(!filterVerified)}
            toggleVal={filterVerified}
            changeToggleVal={setFilterVerified}
          />
        </div>
        {filteredBlinks.length === 0 ? (
          <div className="text-neutral-400 text-center">
            <p>No active blinks found.</p>
            <div className="mt-4">
              <p className="text-neutral-400">It looks like you don't have any active blinks at the moment. To create a new blink, please follow the instructions below:</p>
              <ol className="list-decimal list-inside text-neutral-400 mt-2 text-left">
                <li>Go to the "New Blink" option in the sidebar.</li>
                <li>Fill in the required details such as blink name, description, and image.</li>
                <li>Click on the "Create Blink" button to save your new blink.</li>
              </ol>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300 mt-4"
                onClick={() => window.location.href = '/new-blink'}
              >
                Create New Blink
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlinks.map((blink) => (
              <div key={blink.id} className="bg-neutral-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src={blink.imagePreview} alt={blink.blinkName} className="w-full h-40 object-cover rounded-md mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{blink.blinkName}</h3>
                <p className="text-neutral-400 mb-3">{blink.blinkDescription}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">{blink.amount} SOL</span>
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Toaster/>
    </div>
  );
};
