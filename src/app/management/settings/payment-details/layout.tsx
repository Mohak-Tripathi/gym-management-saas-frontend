'use client'
import PaymentDetaile from '@/allPages/setting/payment-details';
import React from 'react'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <PaymentDetaile />
            {children}
        </>
    )
}
