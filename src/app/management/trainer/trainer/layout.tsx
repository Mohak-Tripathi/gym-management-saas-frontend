'use client'
import Trainer from '@/allPages/trainer/trainer';
import Tabs from '@/components/Tabs';
import { trainerTabs } from '@/constant/tabsData';
import { useParams } from 'next/navigation';
import React from 'react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Trainer />
            {children}
        </>
    )
}
