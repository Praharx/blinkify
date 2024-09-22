"use client"

import React from 'react'
import { SidebarDemo, Dashboard } from '@/components/App/Sidebar'
function page() {
  return (
    <div className='w-screen h-screen bg-black'>
      <SidebarDemo>
          <Dashboard />
      </SidebarDemo>
    </div>
  )
}

export default page
