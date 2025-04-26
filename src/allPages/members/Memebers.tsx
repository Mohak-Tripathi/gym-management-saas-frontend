import FormSelect from '@/components/formComponents/FormSelect'
import { Input, Select, Table } from 'antd'
import Image from 'next/image'
import React from 'react'
import Title from 'antd/es/typography/Title';
import FormInputSearch from '@/components/formComponents/FormInputSearch';

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

const Memebers = () => {
  return (
    <main className='w-full h-full flex flex-col gap-4'>
      {/* filters */}
      <div className='w-full flex justify-between items-end gap-4'>
        {/* inputs */}
        <div className='flex gap-6'>
          <div className='flex flex-col gap-1.5'>
            <Title className="!text-[#071726] !text-[12px] !font-normal !mb-0">
              Search for members
            </Title>
            <Input
              rootClassName='customSearch'
              placeholder="search"
              className='!w-[200px] !h-8 !rounded-2xl !bg-transparent !text-[12px] !text-[#071726] f!ont-[400] cursor-pointer'
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
        <button className='w-[171px] h-[32px] rounded-xl bg-[#EAEEF8] border-none !text-[12px] text-[#071726] font-[600] cursor-pointer flex justify-center items-center gap-2'>
          <Image
            src={`/images/addNewMember.svg`}
            height={20}
            width={20}
            alt={`calender`}
          />
          Add New Member
        </button>
      </div>

      {/* table */}
      <div className='w-full bg-white rounded-xl flex flex-col flex-1 items-start p-3'
        style={{
          boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
        }}
      >
        <div className='flex flex-col w-full'>
          <div className='flex gap-3 items-center !font-[600] text-[14px] text-[#071726]'>
            <p className='!m-0  '>
            Total Members 
            </p>
            <p className='!m-0 px-2 py-1 rounded-full bg-[#D5DFF4] '>
              565 count
            </p>
          </div>

          {/* <Table<DataType> columns={columns} dataSource={data} /> */}
        </div>

      </div>
    </main>
  )
}

export default Memebers
