'use client'
import AddPaymentDetail from '@/allPages/add-payment-detail'
import { Drawer } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [open, setOpen] = useState(true);
    const params = useParams();
    const router = useRouter();

    const onClose = () => {
        setOpen(false);
        router.push('/management/settings/payment-details')
    };

    return (
        <Drawer
            title={params?.subscriptionId === 'add' ? 'Add New Card' : 'Edit Card'}
            placement='right'
            width={700}
            onClose={onClose}
            open={open}
        >
            <AddPaymentDetail
                onClose={onClose}
                open={open}
            />
        </Drawer>
    )
}

export default page
