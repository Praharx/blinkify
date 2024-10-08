'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import MainContent from "@/components/App/MainContent"
function Page({open}: {open?: boolean}) {
  console.log(open, "From Page")
  const {selectedOption} = useParams();
  return (
    <div>
      <MainContent selectedOption={selectedOption as string}/>
    </div>
  )
}

export default Page
