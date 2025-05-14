'use client'
import Trainer from '@/allPages/trainer/trainer';
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
