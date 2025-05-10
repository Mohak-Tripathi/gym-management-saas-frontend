'use client'
import Leads from '@/allPages/crm/leads';
import React from 'react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Leads />
            {children}
        </>
    )
}
