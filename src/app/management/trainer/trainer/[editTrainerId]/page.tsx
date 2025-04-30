'use client'
import AddTrainer from '@/allPages/add-trainer'
import { Drawer } from 'antd'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [open, setOpen] = useState(true);
    const params = useParams();
    console.log('params', params);

    const onClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            title={params?.editTrainerId === 'add' ? 'Add New Trainer' : 'Edit Trainer'}
            placement='right'
            width={700}
            onClose={onClose}
            open={open}
        >
            <AddTrainer
                onClose={onClose}
                open={open}
            />
        </Drawer>
    )
}

export default page
