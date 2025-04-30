'use client'
import Memebers from '@/allPages/member/members';
import { useParams } from 'next/navigation';
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
