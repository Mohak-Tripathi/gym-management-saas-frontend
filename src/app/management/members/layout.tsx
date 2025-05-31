'use client'
import Tabs from '@/components/Tabs';
import { membersTabs } from '@/constant/tabsData';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname()
  return (
    <main className={`w-full flex flex-col gap-2 ${params?.memberId ? 'h-[calc(100%-80px)]' : 'flex-1'} `}>
      {!params?.memberId && !pathname.includes('member-details') && !pathname.includes('member-payment-details') && (
        <Tabs tabs={membersTabs} />
      )}
      {children}
    </main>
  )
}
