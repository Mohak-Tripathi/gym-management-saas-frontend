'use client'

import SubscriptionCard from '@/components/SubscriptionCard';
import React from 'react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="px-4 pb-4 w-full h-full flex gap-10">
            <div className='w-[30%]'>
            <SubscriptionCard/>
            </div>
            {children}
        </main>
    )
}
