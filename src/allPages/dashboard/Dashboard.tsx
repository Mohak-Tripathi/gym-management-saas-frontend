import BubbleChart from '@/components/chart/BubbleChart'
import DonutChart from '@/components/chart/DonutChart'
import Image from 'next/image'
import React from 'react'

const Dashboard = () => {
  return (
    <main className='w-full flex-1 flex flex-col gap-4'>
      {/* matrix panel */}
      <div className='w-full grid grid-cols-4 gap-4'>
        {/* Members */}
        <div className='flex flex-col justify-between gap-3 bg-white rounded-xl px-3 pt-3'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          <div className='flex flex-col gap-3'>
            <div className='flex justify-end items-center gap-1'>
              <p className='!m-0 font-semibold text-[12px] leading-[100%] text-[#071726]'>Members</p>
              <Image
                src={`/images/boldMember.svg`}
                height={20}
                width={20}
                alt={`calender`}
              />
            </div>
            <div className='flex justify-between items-end'>
              <div className='flex gap-1 items-end'>
                <p className='font-semibold text-[32px] text-[#071726] leading-[100%] !-mb-1 '>
                  125
                </p>
                <p className='font-normal text-[12px] text-[#127F62] leading-[100%] !m-0'>
                  ▲ +2.3%
                </p>
              </div>
              <p className='font-normal text-[11px] text-[#07172699] leading-[100%] !m-0 '>
                New member on this week
              </p>
            </div>
          </div>
          <div>
            <p className='px-1.5 py-1 bg-[#FFDD6E] font-normal text-[12px] leading-[100%] text-[#071726] rounded-t-md !m-0'>
              This Month:{" "}
              <span className='font-semibold'>445</span>
            </p>
          </div>
        </div>

        {/* Expired */}
        <div className='flex flex-col justify-between gap-3 bg-white rounded-xl px-3 pt-3'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          <div className='flex flex-col gap-3'>
            <div className='flex justify-end items-center gap-1'>
              <p className='!m-0 font-semibold text-[12px] leading-[100%] text-[#071726]'>Expired</p>
              <Image
                src={`/images/boldExpired.svg`}
                height={20}
                width={20}
                alt={`expired`}
              />
            </div>
            <div className='flex justify-between items-end'>
              <div className='flex gap-1 items-end'>
                <p className='font-semibold text-[32px] text-[#071726] leading-[100%] !-mb-1 '>
                  08
                </p>
                <p className='font-normal text-[12px] text-[#E14942] leading-[100%] !m-0'>
                  ▼ +2.3%
                </p>
              </div>
              <p className='font-normal text-[11px] text-[#07172699] leading-[100%] !m-0 '>
                Bookings on this week
              </p>
            </div>
          </div>
          <div>
            <p className='px-1.5 py-1 bg-[#FFC8E4] font-normal text-[12px] leading-[100%] text-[#071726] rounded-t-md !m-0'>
              This Month:{" "}
              <span className='font-semibold'>45</span>
            </p>
          </div>
        </div>


        {/* Earning */}
        <div className=' flex flex-col justify-between gap-3 bg-white rounded-xl px-3 pt-3'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          <div className='flex flex-col gap-3'>
            <div className='flex justify-end items-center gap-1'>
              <p className='!m-0 font-semibold text-[12px] leading-[100%] text-[#071726]'>Earning</p>
              <Image
                src={`/images/boldEarning.svg`}
                height={20}
                width={20}
                alt={`earning`}
              />
            </div>
            <div className='flex justify-between items-end'>
              <div className='flex gap-1 items-end'>
                <p className='font-semibold text-[32px] text-[#071726] leading-[100%] !-mb-1 '>
                  ₹ 7213
                </p>
                <p className='font-normal text-[12px] text-[#127F62] leading-[100%] !m-0'>
                  ▲ +2.3%
                </p>
              </div>
              <p className='font-normal text-[11px] text-[#07172699] leading-[100%] !m-0 '>
                Earning on this week
              </p>
            </div>
          </div>
          <div>
            <p className='px-1.5 py-1 bg-[#D9D2FF] font-normal text-[12px] leading-[100%] text-[#071726] rounded-t-md !m-0'>
              This Month:{" "}
              <span className='font-semibold'>₹ 32245</span>
            </p>
          </div>
        </div>

        {/* Classes Booked */}
        <div className='flex flex-col justify-between gap-3 bg-white rounded-xl px-3 pt-3'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          <div className='flex flex-col gap-3'>
            <div className='flex justify-end items-center gap-1'>
              <p className='!m-0 font-semibold text-[12px] leading-[100%] text-[#071726]'>Classes Booked</p>
              <Image
                src={`/images/boldBlocked.svg`}
                height={20}
                width={20}
                alt={`blocked`}
              />
            </div>
            <div className='flex justify-between items-end'>
              <div className='flex gap-1 items-end'>
                <p className='font-semibold text-[32px] text-[#071726] leading-[100%] !-mb-1 '>
                  76
                </p>
                <p className='font-normal text-[12px] text-[#127F62] leading-[100%] !m-0'>
                  ▲ +2.3%
                </p>
              </div>
              <p className='font-normal text-[11px] text-[#07172699] leading-[100%] !m-0 '>
                New bookings on this week
              </p>
            </div>
          </div>
          <div>
            <p className='px-1.5 py-1 bg-[#C7F5BC] font-normal text-[12px] leading-[100%] text-[#071726] rounded-t-md !m-0'>
              This Month:{" "}
              <span className='font-semibold'>345</span>
            </p>
          </div>
        </div>
      </div>

      {/* graph panel */}
      <div className='w-full grid grid-cols-4 gap-4'>
        {/* Revenue */}
        <div className='bg-white rounded-xl p-3 col-span-2'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          {/* heading */}
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-start gap-2'>
              <p className='font-semibold text-[14px] text-[#071726]'>Revenue</p>
            </div>
          </div>

          {/* graph */}
          <div>

          </div>

        </div>

        {/* Age Range */}
        <div className='bg-white rounded-xl p-3'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          {/* heading */}
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-start gap-2'>
              <p className='font-semibold text-[14px] text-[#071726]'>Age Range</p>
            </div>
          </div>

          {/* graph */}
          <div>
            <BubbleChart />
          </div>
        </div>

        {/* Members Activity */}
        <div className='bg-white rounded-xl p-3'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          {/* heading */}
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-start gap-2'>
              <p className='font-semibold text-[14px] text-[#071726]'>Members Activity</p>
            </div>
          </div>

          {/* graph */}
          <div className='h-auto'>
            <DonutChart />
          </div>

        </div>
      </div>

      {/* table panel */}
      <div className='w-full grid grid-cols-4 gap-4'>
        {/* Community Feed */}
        <div className='bg-white rounded-xl p-3'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          {/* heading */}
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-start gap-2'>
              <p className='font-semibold text-[14px] text-[#071726]'>Community Feed</p>
              <p className='font-semibold text-[12px] text-[#071726] cursor-pointer'>See All</p>
            </div>
          </div>

          {/* graph */}
          <div>

          </div>

        </div>

        {/* Trainers Time Schedule */}
        <div className='bg-white rounded-xl p-3 col-span-2'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          {/* heading */}
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-start gap-2'>
              <p className='font-semibold text-[14px] text-[#071726]'>Trainers Time Schedule</p>
              <p className='font-semibold text-[12px] text-[#071726] cursor-pointer'>See All</p>
            </div>
          </div>

          {/* graph */}
          <div>

          </div>

        </div>

        {/* others */}
        <div className='flex flex-col gap-3'>
          {/* Top Sold Products */}
          <div className='bg-white rounded-xl p-3 col-span-2'
            style={{
              boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
            }}
          >
            {/* heading */}
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between items-start gap-2'>
                <p className='font-semibold text-[14px] text-[#071726]'>Top Sold Products</p>
              </div>
            </div>

            {/* graph */}
            <div>

            </div>

          </div>

          {/* New Members */}
          <div className='bg-white rounded-xl p-3 col-span-2'
            style={{
              boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
            }}
          >
            {/* heading */}
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between items-start gap-2'>
                <p className='font-semibold text-[14px] text-[#071726]'>New Members</p>
              </div>
            </div>

            {/* graph */}
            <div>

            </div>

          </div>

        </div>
      </div>
    </main>
  )
}

export default Dashboard
