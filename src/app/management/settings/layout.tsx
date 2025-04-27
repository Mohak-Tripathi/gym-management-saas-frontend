'use client'
import Header from '@/components/Header'
import Tabs from '@/components/Tabs';
import React from 'react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="px-4 pb-4 w-full h-full flex flex-col gap-4">
            {/* <Tabs/> */}
            {children}
        </main>
    )
}
