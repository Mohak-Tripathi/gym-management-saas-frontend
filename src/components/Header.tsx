import { Avatar, Popover, Select } from 'antd'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'

const managemnet = [
  {
    'title': 'Dashboard',
    'src': '/management/dashboard',
    'activeIcon': '/images/iconly/bold/Category.svg',
    'inactiveIcon': '/images/iconly/light/Category.svg'
  },
  {
    'title': 'Members',
    'src': '/management/members/members',
    'activeIcon': '/images/iconly/bold/profile.svg',
    'inactiveIcon': '/images/iconly/light/profile.svg'
  },
  {
    'title': 'Trainer',
    'src': '/management/trainer/trainer',
    'activeIcon': '/images/iconly/bold/trainer.svg',
    'inactiveIcon': '/images/iconly/light/trainer.svg'
  },
  {
    'title': 'Revenue',
    'src': '/management/revenue/members',
    'activeIcon': '/images/iconly/bold/revenue.svg',
    'inactiveIcon': '/images/iconly/light/revenue.svg'
  },
]

const moreMenu = [
  {
    'title': 'Notification',
    'src': '/management/notification',
    'activeIcon': '/images/iconly/bold/bell.svg',
    'inactiveIcon': '/images/iconly/light/bell.svg'
  },
  {
    'title': 'Settings',
    'src': '/management/settings/account-details/branch',
    'activeIcon': '/images/iconly/bold/setting.svg',
    'inactiveIcon': '/images/iconly/light/setting.svg'
  },
]

const Header = () => {

  const handleChange = (value: string) => {
  };

  const pathname = usePathname();
  const currentPath = pathname.split('/')[2];

  const avatarPopover = () => {
      return (
        <>
          <div className="flex flex-col gap-3 text-sm leading-5 whitespace-nowrap bg-white rounded-xl text-teal-950 box-border">
            {/* <Link href={`/settings/groups/${recordId}`} passHref> */}
            <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border">
              <div className="flex items-center gap-2 text-[14px] leading-[20px]">
                <Image
                  src="/images/iconly/light/lock.svg"
                  alt="Invoice"
                  width={20}
                  height={20}
                />
                <div>Change Password</div>
              </div>
            </div>
            {/* </Link> */}
  
            <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border">
              <div className="flex items-center gap-2 text-[14px] leading-[20px]">
                <Image
                  src="/images/iconly/light/logout.svg"
                  alt="Email"
                  width={20}
                  height={20}
                />
                <div>Logout</div>
              </div>
            </div>
  
          </div>
        </>
      )
    }

  return (
    <header className='w-full h-[60px] min-h-[60px] max-h-[60px] bg-white rounded-b-xl flex justify-between items-center px-4 '
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      {/* branhc dropdown */}
      <div className='w-1/3'>
        <Select
          aria-label="Select Branch"
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
      </div>

      {/* navigation pill */}
      <nav className='w-1/3'>
        <ul className='!m-0 flex gap-4'>
          {managemnet.map((record, index) => {
            return (
              <li
                key={index}
                className={`w-auto h-[32px] px-3 rounded-[66px] border-[1px] border-solid ${currentPath === record.title.toLocaleLowerCase() ? 'border-black-primary bg-black-primary text-white' : 'border-[#0000001A] bg-transparent text-black-primary'} flex gap-2.5 items-center justify-center cursor-pointer transition-all duration-200`}
              >
                <Link href={record.src} className='flex gap-2.5 items-center justify-center' >
                  <Image
                    src={currentPath === record.title.toLocaleLowerCase() ? record.activeIcon : record.inactiveIcon}
                    height={20}
                    width={20}
                    alt={record.title}
                  />
                  <p className='text-[12px] leading-[100%] font-[600] !m-0 '>{record.title}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* notification, setting, avatar */}
      <nav className='w-1/3 flex justify-end'>
        <ul className='!m-0 flex gap-4'>
          {moreMenu.map((record, index) => {
            return (
              <li
                key={index}
                className={`w-auto h-[32px] rounded-[66px] border-[1px] border-solid ${currentPath === record.title.toLocaleLowerCase() ? 'px-3 border-black-primary bg-black-primary text-white' : 'px-1 border-[#0000001A] bg-transparent text-black-primary'} flex gap-2.5 items-center justify-center cursor-pointer transition-all duration-200`}
              >
                <Link href={record.src} className='flex gap-2.5 items-center justify-center'>
                  <Image
                    src={currentPath === record.title.toLocaleLowerCase() ? record.activeIcon : record.inactiveIcon}
                    height={20}
                    width={20}
                    alt={record.title}
                  />
                  {currentPath === record.title.toLocaleLowerCase() && (
                    <p className='text-[12px] leading-[100%] font-[600] !m-0 '>{record.title}</p>
                  )}
                </Link>
              </li>
            )
          })}
          <li>
            <Popover
              placement="bottomRight"
              content={() => avatarPopover()}
              trigger="click"
              rootClassName="sidebar-popover"
              arrow={false}
            >
              <Avatar className='cursor-pointer' style={{ backgroundColor: '#071726', verticalAlign: 'middle' }} size="default">
                U
              </Avatar>
            </Popover>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
