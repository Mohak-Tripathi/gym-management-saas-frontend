'use client'
import Tabs from '@/components/Tabs';
import { revenueTabs } from '@/constant/tabsData';
import { useParams } from 'next/navigation';
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  return (
    <main className={`w-full flex flex-col gap-2 ${params?.memberId ? 'h-[calc(100%-80px)]' : 'flex-1'} `}>
      <Tabs tabs={revenueTabs} />
      {/* {!params?.memberId && (
      )} */}
      {children}
    </main>
  )
}
