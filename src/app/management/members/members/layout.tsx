'use client'
import Memebers from '@/allPages/member/members';
import React from 'react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Memebers />
            {children}
        </>
    )
}