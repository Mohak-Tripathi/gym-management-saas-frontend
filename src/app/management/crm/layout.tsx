'use client'
import Tabs from '@/components/Tabs';
import { crmTabs } from '@/constant/tabsData';
import { useParams } from 'next/navigation';
import React from 'react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const params = useParams();
    return (
        <main className={`w-full flex flex-col gap-2 ${params?.leadId ? 'h-[calc(100%-80px)]' : 'flex-1'} `}>
            {(!params?.leadId && !params?.dealId) && (
                <Tabs tabs={crmTabs} />
            )}
            {children}
        </main>
    )
}
