'use client'
import { Switch } from 'antd'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import { membersData } from '@/constant/membersData'

const MemberProfile = () => {

  const params = useParams();

  const member = membersData.find((member) => member.key === params.memberId);

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <main className={`h-[clac(100%-200px)] flex flex-col gap-4 flex-1 bg-white rounded-xl p-3 `}
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      <div className='w-full flex justify-between items-center gap-4'>
        <div className='flex flex-row items-center gap-1'>
          <Image
            src={`/images/iconly/light/profile.svg`}
            height={0}
            width={0}
            alt={`profile`}
            className='w-20 h-20'
          />
          <div className='flex flex-col gap-1'>
            <h2 className={`text-[20px] text-black-primary font-semibold !m-0`}>{member?.name}</h2>
            <p className={`w-20 h-6 rounded-lg text-[14px] text-black-primary font-medium flex items-center !m-0`}>{member?.status}</p>
          </div>
        </div>

        <div className='flex gap-6 items-center'>
          <div className='flex gap-2 items-center'>
            <h2 className='text-[14px] text-black-primary font-[500] !m-0 '>Send Payment Remainder</h2>
            <Switch onChange={onChange} />
          </div>

          <p
            className={`h-6 w-24 rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex gap-2 justify-center items-center ${member?.payment === 'Paid' ? 'bg-[#E1F4D5]' : member?.payment === 'Overdue' ? 'bg-[#F4D5EE]' : 'bg-[#F4ECD5]'}`}
          >
            <Image
              src={member?.payment === 'Paid' ? `/images/Right.svg` : member?.payment === 'Overdue' ? `/images/Overdue.svg` : `/images/iconly/light/TimeCircle.svg`}
              height={16}
              width={16}
              alt={`calender`}
            />
            {member?.payment}
          </p>

          <div className='flex gap-3 items-center'>
            <Image
              src="/images/iconly/light/Edit.svg"
              alt="Edit"
              width={0}
              height={0}
              className='h-[20px] w-[20px] cursor-pointer'
            />

            <Image
              src="/images/iconly/light/moreCircle.svg"
              alt="more menu"
              width={0}
              height={0}
              className='h-[20px] w-[20px] cursor-pointer'
            />
          </div>

        </div>
      </div>

      {/* Personal Information */}
      <div className='w-full flex flex-col gap-2 border-1 border-solid border-[#D9D9D999] p-3 rounded-xl'>
        <h2 className='text-[14px] text-black-primary font-semibold'>Personal Information</h2>

        <div className='w-full grid grid-cols-4 gap-4'>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>Gender</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{member?.gender}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>Email Address</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{member?.email}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>Mobile No.</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{member?.mobileNumber}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>Date of Birth</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>12/04/1990</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>Aadhar Number</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>2346 2434 5667</p>
          </div>

        </div>

      </div>

       {/* Address */}
       <div className='w-full flex flex-col gap-2 border-1 border-solid border-[#D9D9D999] p-3 rounded-xl'>
        <h2 className='text-[14px] text-black-primary font-semibold'>Address</h2>

        <div className='w-full grid grid-cols-4 gap-4'>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>Country</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>India</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>State</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>Karnataka</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>City</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>Bengaluru</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>Pin Code</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>560021</p>
          </div>
        </div>

      </div>

      {/* Subscription Information */}
      <div className='w-full flex flex-col gap-2 border-1 border-solid border-[#D9D9D999] p-3 rounded-xl'>
        <h2 className='text-[14px] text-black-primary font-semibold'>Subscription Information</h2>

        <div className='w-full grid grid-cols-4 gap-4'>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>Expiry Date</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{member?.expiryDate}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>Joined Date</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{member?.joinedDate}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-[#07172699] font-[600] !m-0'>Subscription Type</h2>
            <p
            className={`h-6 w-24 rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex gap-2 justify-center items-center ${member?.subscriptionType === 'Paid' ? 'bg-[#E1F4D5]' : member?.subscriptionType === 'Overdue' ? 'bg-[#F4D5EE]' : 'bg-[#F4ECD5]'}`}
          >
            {member?.subscriptionType}
          </p>
          </div>

          <div className='flex flex-col gap-1'>
          <p
            className={`h-8 w-36 rounded-2xl !m-0 !p-1.5 !text-[12px] !font-[600] !text-black-primary flex gap-2 justify-center items-center bg-[#EAEEF8] cursor-pointer`}
          >
            Upgrade Plan
          </p>
          </div>
        </div>

      </div>

    </main>
  )
}

export default MemberProfile
