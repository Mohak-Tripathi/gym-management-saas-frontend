'use client'
import Header from '@/components/Header'
import React from 'react'
import { Toaster } from 'sonner'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Toaster position="top-center" />
            <main className="px-4 pb-4 w-full h-full flex flex-col gap-4">
                <Header />
                {children}
            </main>
        </>
    )
}
