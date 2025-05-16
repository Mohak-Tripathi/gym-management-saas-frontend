'use client'
import AddLeads from '@/allPages/crm/add-leads'
import { Drawer } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [open, setOpen] = useState(true);
    const params = useParams();
    const router = useRouter();

    const onClose = () => {
        setOpen(false);
        router.push('/management/crm/leads')
    };

    return (
        <Drawer
            title={params?.editLeadId === 'add' ? 'Add New Lead' : 'Edit Lead'}
            placement='right'
            width={700}
            onClose={onClose}
            open={open}
        >
            <AddLeads
                onClose={onClose}
                open={open}
            />
        </Drawer>
    )
}

export default page