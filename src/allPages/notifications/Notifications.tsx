import { Divider } from 'antd'
import Image from 'next/image'
import React from 'react'

const notifications = [
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
  {
    'title': 'Successfully booked class',
    'desc': 'Class was successfully booked on Tuesday 23, 2025 at 6:00PM!',
  },
]

const Notifications = () => {
  return (
    <main className='w-full h-[calc(100%-80px)] flex flex-1 flex-col gap-3'>
      <h1 className='!m-0 !font-[600] text-[20px] text-[#071726]'>
        Notification
      </h1>

      <div className='w-full h-[calc(100%-112px)] bg-white rounded-xl flex flex-col flex-1 items-start p-3'
        style={{
          boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
        }}
      >
        <div className='flex flex-col w-full'>
          <div className='flex gap-3 items-center !font-[600] text-[14px] text-[#071726]'>
            <p className='!m-0  '>
              Total Notification
            </p>
            <p className='!m-0 px-2 py-1 rounded-full bg-[#D5DFF4] '>
              05 count
            </p>
          </div>
          <Divider className='!my-2' />
        </div>

        <div className='w-full overflow-y-scroll h-auto flex flex-1 flex-col'>
          {notifications.map((data, index) => {
            return (
              <div key={index} className='flex flex-col w-full'>
                <div className='w-full flex justify-between items-center hover:bg-[#F5FAFB] px-1 py-2 rounded-md group transition-all duration-200'>
                  <div className='flex gap-2 items-center'>
                    <div className='p-1 flex justify-center items-center rounded-full border border-solid border-[#0000001A] bg-transparent'>
                      <Image
                        src={`/images/iconly/light/calendar.svg`}
                        height={24}
                        width={24}
                        alt={`calender`}
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <p className='!m-0 !font-[600] text-[14px] text-[#071726]'>
                        {data.title}
                      </p>
                      <p className='!m-0 !font-[400] text-[12px] text-[#071726]'>
                        {data.desc}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <button className='w-[147px] h-[32px] rounded-xl bg-[#EAEEF8] border-none !text-[12px] text-[#071726] font-[600] cursor-pointer '>Mark as Read</button>
                    <button className='w-[147px] h-[32px] rounded-xl bg-[#071726] border-none !text-[12px] !text-white font-[600] cursor-pointer '>View Changes</button>
                    <Image
                      src={`/images/iconly/light/delete.svg`}
                      height={20}
                      width={20}
                      alt={`delete`}
                      className='cursor-pointer'
                    />
                  </div>

                </div>
                <Divider className='!my-2' />
              </div>
            )
          })}
        </div>

      </div>
    </main>
  )
}

export default Notifications
