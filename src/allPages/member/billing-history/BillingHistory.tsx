'use client'
import FormSelect from '@/components/filterComponents/FilterSelect'
import { Input, Popover, Table } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import Title from 'antd/es/typography/Title';
import { membersBillingData, membersData } from '@/constant/membersData'

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

const BillingHistory = () => {

  const columns = [
    {
      title: 'Invoice',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <div className='flex items-center gap-3'>
          {/* Profile Image */}
          <Image
            src={`/images/iconly/light/profile.svg`}
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
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Billing Date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
    },
    {
      title: 'Subscription Type',
      dataIndex: 'subscriptionType',
      key: 'subscriptionType',
      render: (subscriptionType: any) => {
        return (
          <p className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center ${subscriptionType === 'Basic' ? 'bg-gray-basic' : subscriptionType === 'Silver' ? 'bg-silver' : 'bg-yellow-primary'}`}>
            {subscriptionType}
          </p>
        );
      },
    },
    {
      title: 'Invoice Name',
      dataIndex: 'invoiceName',
      key: 'invoiceName',
    },
    {
      title: 'Accounts No.',
      dataIndex: 'accountsNo',
      key: 'accountsNo',
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (_: any, record: any, index: number) => (
        <div className="flex justify-end gap-3 items-center">

          <div className="cursor-pointer p-1">
            <Image
              src="/images/iconly/light/Show.svg"
              alt="Edit"
              width={0}
              height={0}
              className="h-[20px] w-[20px]"
            />
          </div>

          <div className="cursor-pointer p-1">
            <Image
              src="/images/iconly/light/delete.svg"
              alt="more menu"
              width={0}
              height={0}
              className="h-[20px] w-[20px]"
            />
          </div>
        </div>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys as (string | number)[]);
    },
  };


  return (
    <main className='w-full h-full flex flex-col gap-4'>
      {/* filters */}
      <div className='w-full flex justify-between items-end gap-4'>
        {/* inputs */}
        <div className='flex gap-6'>
          <div className='flex flex-col gap-1.5'>
            <Title className="!text-black-primary !text-[12px] !font-normal !mb-0">
              Search for members
            </Title>
            <Input
              rootClassName='customSearch'
              placeholder="Search"
              style={{ width: 200, height: 32 }}
              className='!w-[200px] !rounded-2xl !bg-transparent !text-[14px] !text-black-primary !font-[400] cursor-pointer'
            />
          </div>

          <FormSelect
            label='Status'
            name='status'
            options={selectOptions}
          />

          <FormSelect
            label='Subscription type'
            name='subscriptionType'
            options={selectOptions}
          />

          <FormSelect
            label='Payment'
            name='payment'
            options={selectOptions}
          />
        </div>

        {/* add member btn */}
        <button className='w-[171px] h-[32px] rounded-xl bg-blue-secondary border-none !text-[12px] text-black-primary font-[600] cursor-pointer flex justify-center items-center gap-2'>
          <Image
            src={`/images/download.svg`}
            height={20}
            width={20}
            alt={`download`}
          />
          Download
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
              Billing History
            </p>
            <p className='!m-0 px-2 py-1 rounded-full bg-count '>
              24 count
            </p>
          </div>

          <div className='w-full flex flex-col flex-1'>
            <Table
              columns={columns}
              dataSource={membersBillingData}
              pagination={false}
              rowSelection={rowSelection}
              className="custom-small-table"
            />
          </div>
        </div>

      </div>
    </main>
  )
}

export default BillingHistory
