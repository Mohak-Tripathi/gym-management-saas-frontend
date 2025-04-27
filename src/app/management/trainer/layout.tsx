'use client'
import Tabs from '@/components/Tabs';
import { trainerTabs } from '@/constant/tabsData';
import { useParams } from 'next/navigation';
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  console.log('params', params);
  
  return (
    <main className={`w-full flex flex-col gap-2 ${params?.trainerId ? 'h-[calc(100%-80px)]' : 'flex-1'} `}>
      {!params?.trainerId && (
        <Tabs tabs={trainerTabs} />
      )}
      {children}
    </main> 
  )
}
