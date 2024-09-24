import React from 'react';

type AdminLayoutProps = {
  children: React.ReactNode;
};
export const runtime = "edge";

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen  bg-zinc-800 text-white">
      <header className="p-4">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
      </header>
      <div className="p-4 bg-zinc-800">
        <div className=" rounded-lg p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;