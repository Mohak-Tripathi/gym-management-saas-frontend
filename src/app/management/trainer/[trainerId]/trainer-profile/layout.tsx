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
      <div className='flex items-center'>
        <div 
        onClick={() => router.push(`/management/trainer/trainer`)}
        className='flex gap-2 items-center cursor-pointer'>
          <Image
            src={"/images/iconly/light/Arrow.svg"}
            alt="back"
            width={0}
            height={0}
            className='w-5 h-5'
          />
          <p className='text-[14px] text-black-primary font-normal flex items-center gap-1 !m-0'>
            Trainer
          </p>
        </div>
        <p className='text-[14px] text-black-primary font-bold flex items-center gap-1 !m-0'>
          <Image
            src={`/images/iconly/light/arrowBlack.svg`}
            alt="back"
            width={0}
            height={0}
            className='w-5 h-5'
          />
          Trainer Profile Details
        </p>
      </div>
      <div className="w-full max-h-[calc(100%-40px)] h-[calc(100%-40px)] min-h-[calc(100%-40px)] flex gap-4">
        <TrainerProfileSideBar />
        {children}
      </div>
    </main>
  )
}
