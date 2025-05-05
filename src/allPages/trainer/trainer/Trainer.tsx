'use client'
import AddTrainer from '@/allPages/add-trainer'
import FormInput from '@/components/filterComponents/FilterInput'
import FormSelect from '@/components/filterComponents/FilterSelect'
import { trainersData } from '@/constant/trainerData'
import { Drawer, Popover, Table } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const selectOptions = [
  {
    value: '1',
    label: 'Not Identified',
  },
  {
    value: '2',
    label: 'Closed',
  },
]


const Trainer = () => {
  const router = useRouter();

  const threeDotPopover = (recordId: any) => {
    return (
      <>
        <div className="flex flex-col gap-3 text-sm leading-5 whitespace-nowrap bg-white rounded-xl text-teal-950 box-border md:w-[150px] action-buttons">
          {/* <Link href={`/settings/groups/${recordId}`} passHref> */}
          <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-[#F5FAFB] cursor-pointer box-border">
            <div className="flex items-center justify-between gap-2 text-[14px] leading-[20px]">
              <div>Invoice</div>
              <Image
                src="/images/Invoice.svg"
                alt="Invoice"
                width={20}
                height={20}
              />
            </div>
          </div>
          {/* </Link> */}

          <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-[#F5FAFB] cursor-pointer box-border">
            <div className="flex items-center justify-between gap-2 text-[14px] leading-[20px]">
              <div>Email</div>
              <Image
                src="/images/E-mail.svg"
                alt="Email"
                width={20}
                height={20}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-[#F5FAFB] cursor-pointer box-border">
            <div className="flex items-center justify-between gap-2 text-[14px] leading-[20px]">
              <div>Delete</div>
              <Image
                src="/images/iconly/light/delete.svg"
                alt="Delete"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <div className='flex items-center gap-3'>
          {/* Profile Image */}
          <Image
            src={`/images/iconly/light/trainer.svg`}
            width={0}
            height={0}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover"
          />

          {/* Name and Email */}
          <div className="flex flex-col">
            <p className="text-[14px] font-semibold text-black-primary !m-0">
              {record.name}
            </p>
            <p className="text-[12px] text-gray-500 !m-0">
              {record.email}
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Work Type',
      dataIndex: 'workType',
      key: 'workType',
      render: (workType: any) => {
        return (
          <p className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center ${workType === 'Full Time' ? 'bg-[#FFDE8F]' : 'bg-[#EFF6F8]'}`}>
            {workType}
          </p>
        );
      },
    },
    {
      title: 'Joined Date',
      dataIndex: 'joinedDate',
      key: 'joinedDate',
    },
    {
      title: 'Log in Time',
      dataIndex: 'logInTime',
      key: 'logInTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => {
        return (
          <p className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center ${status === 'Active' ? 'bg-[#D5F4DF]' : 'bg-[#F4D5D8]'}`}>
            {status}
          </p>
        );
      },
    },
    {
      title: 'Payment/Salary',
      dataIndex: 'payment',
      key: 'payment',
      render: (payment: any) => {
        return (
          <p className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex gap-2 justify-center items-center ${payment === 'Paid' ? 'bg-[#E1F4D5]' : payment === 'Overdue' ? 'bg-[#F4D5EE]' : 'bg-[#F4ECD5]'}`}>
            <Image
              src={payment === 'Paid' ? `/images/Right.svg` : payment === 'Overdue' ? `/images/Overdue.svg` : `/images/iconly/light/TimeCircle.svg`}
              height={20}
              width={20}
              alt={`calender`}
            />
            {payment}
          </p>
        );
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (_: any, record: any, index: number) => (
        <div className="flex justify-end gap-4 items-center action-buttons">

          <div className="cursor-pointer p-1">
            <Image
              src="/images/iconly/light/Edit.svg"
              alt="Edit"
              width={0}
              height={0}
              className='h-[20px] w-[20px] cursor-pointer'
              onClick={() => handleEdit(record.key)}
            />
          </div>

          <Popover
            placement="bottomRight"
            content={() => threeDotPopover(record.key)}
            trigger="click"
            rootClassName="sidebar-popover"
            arrow={false}
          >
            <div className="cursor-pointer p-1">
              <Image
                src="/images/iconly/light/moreCircle.svg"
                alt="more menu"
                width={0}
                height={0}
                className='h-[20px] w-[20px] cursor-pointer'
              />
            </div>
          </Popover>
        </div>
      ),
    },
  ];

  const handleEdit = (trainerId: string) => {
    router.push(`/management/trainer/trainer/${trainerId}`);
  }

  const handleAddTrainerClick = () => {
    router.push('/management/trainer/trainer/add');
  }

  return (
    <main className='w-full h-full flex flex-col gap-4'>
      {/* filters */}
      <div className='w-full flex justify-between items-end gap-4'>
        {/* inputs */}
        <div className='flex gap-6'>
          <FormInput
            label='Search for Trainer'
            name='trainer'
          />

          <FormSelect
            label='Status'
            name='status'
          // options={selectOptions}
          />

          <FormSelect
            label='Work Type'
            name='workType'
          // options={selectOptions}
          />

          <FormSelect
            label='Working'
            name='working'
          // options={selectOptions}
          />

          <FormSelect
            label='Payment'
            name='payment'
          // options={selectOptions}
          />
        </div>

        {/* add member btn */}
        <button
          onClick={() => handleAddTrainerClick()}
          className='w-[171px] h-[32px] rounded-xl bg-[#EAEEF8] border-none !text-[12px] text-black-primary font-[600] cursor-pointer flex justify-center items-center gap-2'>
          <Image
            src={`/images/addNewMember.svg`}
            height={20}
            width={20}
            alt={`calender`}
          />
          Add New Trainer
        </button>
      </div>

      {/* table */}
      <div className='w-full bg-white rounded-xl flex flex-col flex-1 items-start p-3'
        style={{
          boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
        }}
      >
        <div className='flex flex-col flex-1 gap-4 w-full'>
          <div className='flex gap-3 items-center !font-[600] text-[14px] text-black-primary'>
            <p className='!m-0  '>
              Total Trainer
            </p>
            <p className='!m-0 px-2 py-1 rounded-full bg-[#D5DFF4] '>
              105 count
            </p>
          </div>

          <div className='w-full flex flex-col flex-1'>
            <Table
              columns={columns}
              dataSource={trainersData}
              pagination={false}
              scroll={{ y: 'calc(100vh - 370px)' }}
              className="custom-small-table"
              onRow={(record) => {
                return {
                  onClick: (e) => {
                    const target = e.target as HTMLElement;

                    if (target.closest('.action-buttons')) return;

                    // Otherwise, navigate
                    router.push(`/management/trainer/${record.key}/trainer-profile`);
                  },
                };
              }}
            />
          </div>

          {/* <Drawer
            title={selectedTrainerData?.length > 0 ? "Edit Trainer" : 'Add New Trainer'}
            placement='right'
            width={700}
            onClose={onClose}
            open={open}
          >
            <AddTrainer
              onClose={onClose}
              open={open}
              selectedTrainerData={selectedTrainerData}
            />
          </Drawer> */}
        </div>

      </div>
    </main>
  )
}

export default Trainer
