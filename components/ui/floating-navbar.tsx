"use client";
import { SignInButton,SignOutButton,SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "./button";
import {useUser} from "@clerk/nextjs";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const { scrollYProgress } = useScroll();
  const [visible, setDropDownVisible] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false); // New state for dropdown visibility
  const {isSignedIn, isLoaded, user} = useUser();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      setDropDownVisible(current <= 0.05);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: 10,
          opacity: visible ? 1 : 0.8,
        }}
        transition={{
          duration: 1,
        }}
        className={cn(
          "flex max-w-4xl justify-between  fixed top-0 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center  space-x-4",
          className
        )}
      >
        <Logo/>   
        <div className="flex items-center space-x-4">
            {publicKey && isSignedIn ? (
              <div className="relative">
                <Button
                  className="border text-sm font-medium relative border-neutral-200 border-white/[0.2] text-white px-4 py-2 rounded-full"
                  onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                  <span>{`${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`}</span>
                  <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
                </Button>
                {dropdownVisible && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-white/[0.2] rounded-md shadow-lg z-50">
                    <Button onClick={() => disconnect()} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700">Disconnect Wallet</Button>
                    <Button onClick={() => setVisible(true)} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700">Change Wallet</Button>
                    <Button onClick={() => navigator.clipboard.writeText(publicKey.toString())} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-700">Copy Address</Button>
                  </div>
                )}
              </div>
            ) : 
              <Button onClick={() => setVisible(true)} className="border text-sm font-medium relative border-neutral-200 border-white/[0.2] text-white px-4 py-2 rounded-full">
                <span>Select Wallet</span>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
              </Button>
            }
            {!isSignedIn ? (
              <Link href={`https://civil-spaniel-15.accounts.dev/sign-in?redirect_url=https%3A%2F%2Fmain.blinkify.pages.dev%2Fdashboard`}>
                <Button className="border text-sm font-medium relative border-neutral-200 border-white/[0.2] text-white px-4 py-2 rounded-full">
                  <span>Login</span>
                  <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button className="border text-sm font-medium relative border-neutral-200 border-white/[0.2] text-white px-4 py-2 rounded-full">
                  <span>Dashboard</span>
                  <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
                </Button>
              </Link>
            )}
            {!isSignedIn ?<Link href={`https://civil-spaniel-15.accounts.dev/sign-up?redirect_url=https%3A%2F%2Fmain.blinkify.pages.dev%2Fdashboard`}>
            <Button className="border text-sm font-medium relative border-neutral-200 border-white/[0.2] text-white px-4 py-2 rounded-full">
              <span>SignUp</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
            </Button>
            </Link>
            :
              <SignOutButton>
                <Button className="border text-sm font-medium relative border-neutral-200 border-white/[0.2] text-white px-4 py-2 rounded-full">
                  <span>Log out</span>
                  <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
                </Button>
              </SignOutButton>
          }
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const Logo = () => {
  return (
    <Link href="/" className="flex items-center mr-14 space-x-2">
      <span className="text-white font-bold text-xl">Blinkify</span>
    </Link>
  );
};