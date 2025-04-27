'use client'
import TrainerProfileSideBar from '@/components/TrainerProfileSideBar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <main className="w-full h-[100%] flex flex-col gap-3">
      <div className='flex items-center gap-2'>
        <Image
          src={"/images/iconly/light/Arrow.svg"}
          alt="back"
          width={0}
          height={0}
          className='w-5 h-5'
          onClick={() => router.push(`/management/trainer/trainer`)}
        />
        <p className='text-[14px] text-[#071726] font-normal flex items-center gap-1 !m-0'>
          Trainer
          <Image
            src={`/images/Dropdown-2.svg`}
            alt="back"
            width={0}
            height={0}
            className='w-5 h-5'
          />
          <span className='text-[14px] text-[#071726] font-bold '>
            Trainer Profile Details
          </span>
        </p>
      </div>
      <div className="w-full max-h-[calc(100%-40px)] flex gap-4">
        <TrainerProfileSideBar />
        {children}
      </div>
    </main>
  )
}
