import { Avatar, Divider, Tooltip } from 'antd'
import Image from 'next/image'
import React from 'react'

const Community = () => {
  return (
    <main className='w-full flex gap-6 flex-1'>

      {/* sidebar */}
      <div className='min-w-[330px] w-[25%] bg-white rounded-xl flex flex-col items-start p-3'
        style={{
          boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
        }}
      >
        <div className='flex flex-col gap-4 w-full'>
          <h2 className='text-[16px] text-[#071726] font-semibold leading-[100%] !m-0 '>Community Feed</h2>
          <div className='flex items-center gap-2.5'>
            <Image
              src='/images/iconly/light/logoLock.svg'
              alt='plus'
              height={74}
              width={74}
              className='cursor-pointer'
            />
            <div className='flex flex-col gap-2'>
              <h2 className='text-[24px] text-[#071726] font-semibold leading-[100%] !m-0 '>LiftUp</h2>
              <div className='flex gap-4'>
                <p className='text-[12px] text-[#727272] font-normal leading-[100%] !m-0 '>What you want to share.</p>
                <p className='text-[13px] text-[#727272] font-normal leading-[100%] !m-0 '>What you want to share.</p>
              </div>
            </div>
          </div>
          <div className='w-full flex items-center justify-between'>
            <p className='text-[14px] text-[#071726] font-semibold leading-[100%] !m-0'>Event</p>
            <p className='text-[14px] text-[#071726] font-semibold leading-[100%] !m-0'>See All</p>
          </div>

          <div className='flex flex-col gap-4 w-full h-[calc(100vh-300px)] overflow-y-scroll'>

            <div>
              <div className='flex gap-1 group transition-all duration-200'>
                <div className='w-0.5 bg-[#0717261A]'></div>
                <div className='flex flex-1 justify-between items-center'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>10:45 - 11:30 AM</p>
                    <p className='text-[14px] text-[#071726] font-semibold !m-0'>Beginner Fit session</p>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>Sara Fisher</p>
                  </div>
                  <Image
                    src='/images/iconly/light/moreCircle.svg'
                    alt='plus'
                    height={24}
                    width={24}
                    className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                  />
                </div>
              </div>
              <Divider />
            </div>

            <div>
              <div className='flex gap-1 group transition-all duration-200'>
                <div className='w-0.5 bg-[#0717261A]'></div>
                <div className='flex flex-1 justify-between items-center'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>10:45 - 11:30 AM</p>
                    <p className='text-[14px] text-[#071726] font-semibold !m-0'>Beginner Fit session</p>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>Sara Fisher</p>
                  </div>
                  <Image
                    src='/images/iconly/light/moreCircle.svg'
                    alt='plus'
                    height={24}
                    width={24}
                    className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                  />
                </div>
              </div>
              <Divider />
            </div>

            <div>
              <div className='flex gap-1 group transition-all duration-200'>
                <div className='w-0.5 bg-[#0717261A]'></div>
                <div className='flex flex-1 justify-between items-center'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>10:45 - 11:30 AM</p>
                    <p className='text-[14px] text-[#071726] font-semibold !m-0'>Beginner Fit session</p>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>Sara Fisher</p>
                  </div>
                  <Image
                    src='/images/iconly/light/moreCircle.svg'
                    alt='plus'
                    height={24}
                    width={24}
                    className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                  />
                </div>
              </div>
              <Divider />
            </div>

            <div>
              <div className='flex gap-1 group transition-all duration-200'>
                <div className='w-0.5 bg-[#0717261A]'></div>
                <div className='flex flex-1 justify-between items-center'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>10:45 - 11:30 AM</p>
                    <p className='text-[14px] text-[#071726] font-semibold !m-0'>Beginner Fit session</p>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>Sara Fisher</p>
                  </div>
                  <Image
                    src='/images/iconly/light/moreCircle.svg'
                    alt='plus'
                    height={24}
                    width={24}
                    className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                  />
                </div>
              </div>
              <Divider />
            </div>

            <div>
              <div className='flex gap-1 group transition-all duration-200'>
                <div className='w-0.5 bg-[#0717261A]'></div>
                <div className='flex flex-1 justify-between items-center'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>10:45 - 11:30 AM</p>
                    <p className='text-[14px] text-[#071726] font-semibold !m-0'>Beginner Fit session</p>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>Sara Fisher</p>
                  </div>
                  <Image
                    src='/images/iconly/light/moreCircle.svg'
                    alt='plus'
                    height={24}
                    width={24}
                    className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                  />
                </div>
              </div>
              <Divider />
            </div>

            <div>
              <div className='flex gap-1 group transition-all duration-200'>
                <div className='w-0.5 bg-[#0717261A]'></div>
                <div className='flex flex-1 justify-between items-center'>
                  <div className='flex flex-col gap-1'>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>10:45 - 11:30 AM</p>
                    <p className='text-[14px] text-[#071726] font-semibold !m-0'>Beginner Fit session</p>
                    <p className='text-[12px] text-[#071726] font-normal !m-0'>Sara Fisher</p>
                  </div>
                  <Image
                    src='/images/iconly/light/moreCircle.svg'
                    alt='plus'
                    height={24}
                    width={24}
                    className='cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                  />
                </div>
              </div>
              <Divider />
            </div>

          </div>
        </div>
      </div>

      {/* feed */}
      <div className='flex flex-col flex-1 px-10 overflow-y-scroll'>

        <div className='flex flex-col gap-6 bg-white rounded-xl h-auto p-4'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          {/* heading */}
          <div className='w-full flex items-center justify-between'>
            <div className='flex flex-col gap-2'>
              <h2 className='text-[20px] font-semibold leading-[100%] text-[#071726] !m-0'>Welcome Back, Alex Mason 👋</h2>
              <p className='text-[14px] font-normal leading-[100%] text-[#07172699] !m-0 '>What you want to share.</p>
            </div>
            <div className='flex items-center gap-4'>
              <Tooltip title='Attachment' placement='top' color='#071726' mouseEnterDelay={0.5}>
                <Image
                  src='/images/plusGray.svg'
                  alt='plus'
                  height={24}
                  width={24}
                  className='cursor-pointer'
                />
              </Tooltip>

              <Tooltip title='Voice' placement='top' color='#071726' mouseEnterDelay={0.5}>
                <Image
                  src='/images/micGray.svg'
                  alt='plus'
                  height={24}
                  width={24}
                  className='cursor-pointer'
                />
              </Tooltip>

              <Tooltip title='Emoji' placement='top' color='#071726' mouseEnterDelay={0.5}>
                <Image
                  src='/images/emojiGray.svg'
                  alt='plus'
                  height={24}
                  width={24}
                  className='cursor-pointer'
                />
              </Tooltip>

              <Tooltip title='Images' placement='top' color='#071726' mouseEnterDelay={0.5}>
                <Image
                  src='/images/paperGray.svg'
                  alt='plus'
                  height={24}
                  width={24}
                  className='cursor-pointer'
                />
              </Tooltip>

              <Tooltip title='Schedule' placement='top' color='#071726' mouseEnterDelay={0.5}>
                <Image
                  src='/images/iconly/light/TimeCircle.svg'
                  alt='plus'
                  height={24}
                  width={24}
                  className='cursor-pointer'
                />
              </Tooltip>

            </div>
          </div>

          {/* input */}
          <div className='w-full flex items-end gap-1'>
            <Avatar className='cursor-pointer' style={{ backgroundColor: '#071726', verticalAlign: 'middle' }} size="default">
              U
            </Avatar>
            <textarea
              className='w-full h-full p-1.5 rounded-xl border border-[#0000001A] !resize-none !text-[14px] !font-normal text-[#071726] outline-none'
              placeholder='What’s on your mind?'
              rows={3}
            />
            <button className='flex gap-1.5 items-center w-24 justify-center !bg-[#071726] !text-[12px] font-semibold !text-[#fff] rounded-lg px-2 py-1.5 cursor-pointer'>
              <Image
                src='/images/iconly/bold/send.svg'
                alt='plus'
                height={24}
                width={24}
                className='cursor-pointer'
              />
              Post
            </button>
          </div>
        </div>

      </div>

    </main>
  )
}

export default Community
