'use client'
import Tabs from '@/components/Tabs';
import { membersTabs } from '@/constant/tabsData';
import { useParams } from 'next/navigation';
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  return (
    <main className="w-full flex flex-col gap-2 flex-1">
      {!params?.memberId && (
        <Tabs tabs={membersTabs} />
      )}
      {children}
    </main>
  )
}
