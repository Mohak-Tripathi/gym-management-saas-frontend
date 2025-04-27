'use client'

import Sidebar from '@/components/Sidebar';
import React from 'react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="px-4 pb-4 w-full h-full flex gap-10">
            <div className='w-[30%]'>
            <Sidebar/>
            </div>
            {children}
        </main>
    )
}
