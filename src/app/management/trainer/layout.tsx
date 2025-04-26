'use client'
import Tabs from '@/components/Tabs';
import { trainerTabs } from '@/constant/tabsData';
import React from 'react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full flex flex-col gap-2 flex-1">
      <Tabs tabs={trainerTabs} />
      {children}
    </main>
  )
}
