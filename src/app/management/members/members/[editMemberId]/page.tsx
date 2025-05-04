'use client'
import AddMember from '@/allPages/add-member'
import { Drawer } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [open, setOpen] = useState(true);
    const params = useParams();
    const router = useRouter();

    const onClose = () => {
        setOpen(false);
        router.push('/management/members/members')
    };

    return (
        <Drawer
            title={params?.editMemberId === 'add' ? 'Add New Member' : 'Edit Member'}
            placement='right'
            width={700}
            onClose={onClose}
            open={open}
        >
            <AddMember
                onClose={onClose}
                open={open}
            />
        </Drawer>
    )
}

export default page
