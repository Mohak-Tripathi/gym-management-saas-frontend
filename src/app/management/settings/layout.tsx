'use client'
import Tabs from '@/components/Tabs';
import { settingTabs } from '@/constant/tabsData';
import React from 'react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className=" w-full h-full flex flex-col gap-4">
            <Tabs tabs={settingTabs} />
            {children}
        </main>
    )
}
