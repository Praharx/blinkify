'use client'
import type { Metadata } from "next";
import { SidebarDemo } from '@/components/App/Sidebar'
import { useParams } from "next/navigation";
import { useState } from "react";
import CurrentBlink from "@/components/App/CurrentBlinks";
import NewBlink from "@/components/App/NewBlink";
import AdminPage from "@/components/App/Admin";
import { useUser } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {user} = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const {selectedOption} = useParams();
  const renderContent = (selectedOption:string) => {
    switch (selectedOption) {
      case "currentBlink":
        return <CurrentBlink />;
      case "newBlink":
        return (
          <NewBlink />
        );
      case "admin":
        return <AdminPage userEmail={userEmail as string} />
      default:
        return <div>404 not found</div>;
    }
};
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
      <SidebarDemo>
        {renderContent(selectedOption as string)}
      </SidebarDemo> 

      </body>
    </html>
  );
}
