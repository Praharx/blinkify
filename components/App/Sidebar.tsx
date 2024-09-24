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
  const [activeBlinkCards, setActiveBlinkCards] = useState([{
    id: 1,
    imagePreview: "https://via.placeholder.com/150",
    blinkName: "Blink 1",
    blinkDescription: "This is the first blink",
    amount: 100
  }]);
  console.log(open, "From Dashboard")

  useEffect(() => {
    // Fetch active blinks from API
    const fetchActiveBlinkCards = async () => {
      // try {
      //   const response = await axios.get('/api/active-blinks');
      //   setActiveBlinkCards(response.data);
      // } catch (error) {
      //   console.error('Error fetching active blinks:', error);
      // }
    };

    fetchActiveBlinkCards();
  }, []);

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-4 flex-1 w-full h-full">
        <h2 className="text-2xl font-bold text-white mb-4">Active Blinks</h2>
        {activeBlinkCards.length === 0 ? (
          <div className="text-neutral-400">No active blinks found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeBlinkCards.map((blink) => (
              <div key={blink.id} className="bg-neutral-800 rounded-lg p-4 shadow-md">
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
    </div>
  );
};
