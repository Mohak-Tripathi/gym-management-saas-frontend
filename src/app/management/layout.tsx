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
        <main className="px-4 pb-4 w-full h-full flex flex-col gap-4">
            <Toaster position="top-center" />
            <Header />
            {children}
        </main>
    )
}
