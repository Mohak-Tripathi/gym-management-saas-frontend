'use client'
import Deals from '@/allPages/crm/deals';
import React from 'react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Deals />
            {children}
        </>
    )
}
