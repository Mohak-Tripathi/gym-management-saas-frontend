'use client'
import { trainersData } from '@/constant/trainerData'
import { Divider } from 'antd'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const TrainerProfileSideBar = () => {
  const params = useParams();
  const router = useRouter();

  const handleProfileClick = (key: string) => {
    router.push(`/management/trainer/${key}/trainer-profile`);
  }
  return (
    <main className={`w-[330px] h-[100%] flex flex-col gap-3 bg-white rounded-xl p-3 `}
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      <div className='flex flex-col gap-4 w-full'>
        <h2 className='text-[14px] text-black-primary font-[600] '>All Trainers</h2>

        <div className='flex gap-2 border-1 border-solid border-[#0000001A] rounded-2xl px-1.5 py-2'>
          <Image
            src={`/images/iconly/light/Search.svg`}
            height={0}
            width={0}
            alt={`Search`}
            className='w-[20px] h-[20px]'
          />
          <input
            type="text"
            placeholder='Search'
            className='!w-full !bg-transparent !text-[14px] !text-black-primary !font-[400] cursor-pointer focus:outline-none'
          />
        </div>
      </div>

      <div className='flex flex-1 flex-col w-full overflow-y-scroll'>

        {trainersData.map((member, index) => {
          return (
            <div
              key={index}
              onClick={() => handleProfileClick(member.key)}
              className='w-full cursor-pointer'>
              <div className={`w-full flex justify-between items-center ${params?.memberId == member.key ? 'bg-black-primary' : ''}  rounded-2xl p-1`}>
                <div className={`w-full flex gap-2 items-center`}>
                  <Image
                    src={params?.memberId == member.key ? `/images/iconly/bold/profile.svg` : `/images/iconly/light/profile.svg`}
                    height={0}
                    width={0}
                    alt={`profile`}
                    className='w-[20px] h-[20px]'
                  />
                  <div className='flex flex-col gap-1'>
                    <h2 className={`${params?.memberId == member.key ? 'text-white' : 'text-black-primary'} !text-[14px] !font-[600] !mb-0`}>
                      {member.name}
                    </h2>
                    <p className={`${params?.memberId == member.key ? 'text-white' : 'text-black-primary'} !text-[12px] !font-normal !mb-0`}>
                      {member.status}
                    </p>
                  </div>
                </div>
                {params?.memberId == member.key && (
                  <Image
                    src={`/images/iconly/bold/arrowWhite.svg`}
                    height={0}
                    width={0}
                    alt={`lightArrow`}
                    className='w-[12px] h-[12px]'
                  />
                )}
              </div>
              <Divider className='!my-3 w-full' />
            </div>
          )
        })}


      </div>

    </main>
  )
}

export default TrainerProfileSideBar
