'use client'
import FormSelect from '@/components/filterComponents/FilterSelect'
import { useRouter } from 'next/navigation';
import { Popover, Table } from 'antd'
import Image from 'next/image'
import React from 'react'
import { membersData } from '@/constant/membersData'
import FilterSearchInput from '@/components/filterComponents/FilterSearchInput';
import { paymentOption, statusOption } from '@/constant/filterData';
import RevenueMemberGraphChart from '@/components/revenueChart/RevenueMemberGraphChart';
import RevenueOrderGraphChart from '@/components/revenueChart/RevenueOrderGraphChart';
import PendingOrderGraphChart from '@/components/revenueChart/PendingOrderGraphChart';

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

const Members = () => {

  const router = useRouter();

  const threeDotPopover = (recordId: any) => {
    return (
      <>
        <div className="flex flex-col gap-3 text-sm leading-5 whitespace-nowrap bg-white rounded-xl text-teal-950 box-border md:w-[150px] action-buttons">
          {/* <Link href={`/settings/groups/${recordId}`} passHref> */}
          <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border">
            <div className="flex items-center justify-between gap-2 text-[14px] leading-[20px]">
              <div>Invoice</div>
              <Image
                src="/images/invoice.svg"
                alt="Invoice"
                width={20}
                height={20}
              />
            </div>
          </div>
          {/* </Link> */}

          <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border">
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

          <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border">
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
            src={`/images/iconly/light/user.svg`}
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
      title: 'Joined Date',
      dataIndex: 'joinedDate',
      key: 'joinedDate',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => {
        return (
          <p className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center ${status === 'Active' ? 'bg-green-secondary' : 'bg-pink-pastel'}`}>
            {status}
          </p>
        );
      },
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
      render: (payment: any) => {
        return (
          <p className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex gap-2 justify-center items-center ${payment === 'Paid' ? 'bg-green-pastel' : payment === 'Overdue' ? 'bg-pink-secondary' : 'bg-yellow-pastel'}`}>
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
      render: (_: any, record: any, index: number) => {
        return (
          <div className="flex justify-end gap-4 items-center action-buttons">
            <div className="cursor-pointer p-1">
              <Image
                src="/images/iconly/light/Edit.svg"
                alt="Edit"
                width={0}
                height={0}
                className="h-[20px] w-[20px]"
              // onClick={() => handleEdit(record.key)}
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
                  className="h-[20px] w-[20px]"
                />
              </div>
            </Popover>
          </div>
        )
      },
    },
  ];

  return (
    <main className='w-full flex-1 flex flex-col gap-6'>
      {/* graph */}
      <div className='grid grid-cols-4 gap-4'>
        {/* Members Revenue */}
        <div className='bg-white rounded-xl p-3 col-span-2'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          {/* heading */}
          <div className='flex flex-col gap-4'>
            {/* <div className='flex justify-between items-start gap-2'>
              <p className='font-semibold text-[14px] text-black-primary'>Members Revenue</p>
            </div> */}
            <div className="flex justify-between items-start gap-2">
              <p className="font-semibold text-[14px] text-black-primary">
                Members Revenue
              </p>
              <div className='p-1 border-[0.5px] border-solid border-black-10 rounded-[8px]'>
                <ul className='flex items-center gap-1 !m-0'>
                  <li className='text-[14px] text-black-primary leading-[100%] !m-0 font-normal cursor-pointer '>
                    Today
                  </li>
                  <li className='text-[14px] text-black-primary leading-[100%] !m-0 font-normal cursor-pointer '>
                    Week
                  </li>
                  <li className={`text-[14px] text-black-primary leading-[100%] !m-0 font-normal cursor-pointer p-1 bg-blue-secondary rounded-[8px]`}>
                    Month
                  </li>
                  <li className='text-[14px] text-black-primary leading-[100%] !m-0 font-normal cursor-pointer '>
                    Year
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* graph */}
          <div>
            <RevenueMemberGraphChart />
          </div>

        </div>

        {/* Revenue From Order */}
        <div className='bg-white rounded-xl p-3'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          {/* heading */}
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-start gap-2'>
              <p className='font-semibold text-[14px] text-black-primary'>Revenue From Order</p>
            </div>
          </div>

          {/* graph */}
          <div>
            <RevenueOrderGraphChart />
          </div>

        </div>

        {/* Pending Orders */}
        <div className='bg-white rounded-xl p-3'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          {/* heading */}
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-start gap-2'>
              <p className='font-semibold text-[14px] text-black-primary'>Pending Orders</p>
            </div>
          </div>

          {/* graph */}
          <div>
            <PendingOrderGraphChart />
          </div>

        </div>
      </div>

      {/* table */}
      <div className='w-full flex-1 flex flex-col gap-4'>
        {/* filters */}
        <div className='w-full flex justify-between items-end gap-4'>
          {/* inputs */}
          <div className='flex gap-6'>

            <FilterSearchInput
              label='Search for members'
              name='searchMember'
            />

            <FormSelect
              label='Status'
              name='status'
              options={statusOption}
            />

            <FormSelect
              label='Membership type'
              name='membershipType'
              options={selectOptions}
            />

            <FormSelect
              label='Payment'
              name='payment'
              options={paymentOption}
            />
          </div>

          {/* add member btn */}
          <button
            className='w-[171px] h-[32px] rounded-xl border-[0.5px] border-solid border-black-10 bg-blue-secondary cursor-pointer flex justify-center items-center gap-2'
          >
            <Image
              src={`/images/invoice.svg`}
              height={20}
              width={20}
              alt={`invoice`}
            />
            <p className='!text-[12px] leading-[100%] text-black-primary font-[600] !m-0'>
              Billing History
            </p>
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
                Total Members
              </p>
              <p className='!m-0 px-2 py-1 rounded-full bg-count '>
                565 count
              </p>
            </div>

            <div className='w-full flex flex-col flex-1'>
              <Table
                rowKey={(record) => record.key}
                columns={columns}
                dataSource={membersData}
                pagination={false}
                className="custom-small-table"
                onRow={(record) => {
                  return {
                    onClick: (e) => {
                      const target = e.target as HTMLElement;

                      if (target.closest('.action-buttons')) return;

                      // Otherwise, navigate
                      // router.push(`/management/members/${record.key}/member-profile`);
                    },
                  };
                }}
              />
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}

export default Members
