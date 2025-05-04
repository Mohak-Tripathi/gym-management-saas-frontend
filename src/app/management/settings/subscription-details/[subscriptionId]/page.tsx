'use client'
import AddSubscriptionCard from '@/allPages/setting/add-subscription-card'
import { Drawer } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [open, setOpen] = useState(true);
    const params = useParams();
    const router = useRouter();

    const onClose = () => {
        setOpen(false);
        router.push('/management/settings/subscription-details')
    };

    return (
        <Drawer
            title={params?.subscriptionId === 'add' ? 'Add New Plan' : 'Edit Plan'}
            placement='right'
            width={700}
            onClose={onClose}
            open={open}
        >
            <AddSubscriptionCard
                onClose={onClose}
                open={open}
            />
        </Drawer>
    )
}

export default page
