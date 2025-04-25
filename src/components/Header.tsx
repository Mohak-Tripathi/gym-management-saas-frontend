import { Avatar, Select } from 'antd'
import Image from 'next/image';
import Link from 'next/link';
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
    'src': '/management/members',
    'activeIcon': '/images/iconly/bold/profile.svg',
    'inactiveIcon': '/images/iconly/light/profile.svg'
  },
  {
    'title': 'Trainers',
    'src': '/management/trainers',
    'activeIcon': '/images/iconly/bold/trainer.svg',
    'inactiveIcon': '/images/iconly/light/trainer.svg'
  },
  {
    'title': 'Revenue',
    'src': '/management/revenue',
    'activeIcon': '/images/iconly/bold/revenue.svg',
    'inactiveIcon': '/images/iconly/light/revenue.svg'
  },
]

const moreMenu = [
  {
    'title': 'Notification',
    'src': '/management/notifications',
    'activeIcon': '/images/iconly/bold/bell.svg',
    'inactiveIcon': '/images/iconly/light/bell.svg'
  },
  {
    'title': 'Setting',
    'src': '/management/setting',
    'activeIcon': '/images/iconly/bold/setting.svg',
    'inactiveIcon': '/images/iconly/light/setting.svg'
  },
]

const Header = () => {

  const [pills, setPills] = useState('Dashboard');

  const handlePillClick = (pillName: string) => {
    setPills(pillName);
  }

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <header className='w-full h-[60px] bg-white rounded-b-xl flex justify-between items-center px-4 '
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      {/* branhc dropdown */}
      <div className='w-1/3'>
        <Select
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

      {/* navigation pills */}
      <div className='w-1/3'>
        <ul className='!m-0 flex gap-4'>
          {managemnet.map((record, index) => {
            return (
              <Link href={record.src} key={index} >
              <li
                key={index}
                className={`w-auto h-[32px] px-3 rounded-[66px] border-[1px] border-solid ${pills === record.title ? 'border-[#071726] bg-[#071726] text-white' : 'border-[#0000001A] bg-transparent text-[#071726]'} flex gap-2.5 items-center justify-center cursor-pointer transition-all duration-200`}
                onClick={() => handlePillClick(record.title)}
              >
                <Image
                  src={pills === record.title ? record.activeIcon : record.inactiveIcon}
                  height={20}
                  width={20}
                  alt={record.title}
                />
                <p className='text-[12px] font-[600] !m-0 '>{record.title}</p>
              </li>
              </Link>
            )
          })}
        </ul>
      </div>

      {/* notification, setting, avatar */}
      <div className='w-1/3 flex justify-end'>
        <ul className='!m-0 flex gap-4'>
          {moreMenu.map((record, index) => {
            return (
              <Link href={record.src} key={index}>
                <li
                  key={index}
                  className={`w-auto h-[32px] rounded-[66px] border-[1px] border-solid ${pills === record.title ? 'px-3 border-[#071726] bg-[#071726] text-white' : 'px-1 border-[#0000001A] bg-transparent text-[#071726]'} flex gap-2.5 items-center justify-center cursor-pointer transition-all duration-200`}
                  onClick={() => handlePillClick(record.title)}
                >
                  <Image
                    src={pills === record.title ? record.activeIcon : record.inactiveIcon}
                    height={20}
                    width={20}
                    alt={record.title}
                  />
                  {pills === record.title && (
                    <p className='text-[12px] font-[600] !m-0 '>{record.title}</p>
                  )}
                </li>
              </Link>
            )
          })}
          <li>
            <Avatar style={{ backgroundColor: '#071726', verticalAlign: 'middle' }} size="default">
              U
            </Avatar>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
