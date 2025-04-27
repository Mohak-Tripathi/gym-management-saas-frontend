'use client'
import MemberProfileSideBar from '@/components/MemberProfileSideBar';
import Image from 'next/image';
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex flex-col gap-3 flex-1">
      <div className='flex items-center gap-2'>
        <Image
          src={"/images/iconly/light/Arrow.svg"}
          alt="back"
          width={0}
          height={0}
          className='w-5 h-5'
        />
        <p className='text-[14px] text-[#071726] font-normal flex items-center gap-1 !m-0'>
          Member
          <Image
            src={`/images/Dropdown-2.svg`}
            alt="back"
            width={0}
            height={0}
            className='w-5 h-5'
          />
          <span className='text-[14px] text-[#071726] font-bold '>
            Member Profile Details
          </span>
        </p>
      </div>
      <div className="w-full flex flex-row gap-3 flex-1">
        <MemberProfileSideBar />
        {children}
      </div>
    </main>
  )
}
