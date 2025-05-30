import { setSelectedBranch } from '@/lib/store/slices/selectedBranchSlice';
import { Avatar, Drawer, Popover, Select } from 'antd'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { deleteCookie } from "cookies-next";
import { clearUser } from '@/lib/store/slices/userSlice';
import AddMember from '@/allPages/add-member';
import ContactUs from '@/allPages/contact-us';

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
  {
    'title': 'CRM',
    'src': '/management/crm/leads',
    'activeIcon': '/images/iconly/bold/crmWhite.svg',
    'inactiveIcon': '/images/iconly/light/crm.svg'
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
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { branches } = useSelector((state: any) => state.branch);
  const { selectedBranch } = useSelector((state: any) => state.selectedBranch);

  const branchOptions = branches?.map((branch: any) => ({
    value: branch.id,
    label: branch.name,
  }));

  const handleChange = (value: string) => {
    const selectedBranch = branches.find((branch: any) => branch.id === value);
    dispatch(setSelectedBranch(selectedBranch));
  };

  const onClose = () => {
    setOpen(false);
    router.push('/management/members/members')
  };

  const pathname = usePathname();
  const currentPath = pathname.split('/')[2];

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("token");

    // Remove cookie
    deleteCookie("token");

    // Clear user data in Redux store
    dispatch(clearUser());

    // Redirect to sign-in
    router.push("/sign-in");
  };

  const changePasswordClick = () => {
    router.push("/change-password");
  }

  const avatarPopover = () => {
    return (
      <>
        <div className="flex flex-col gap-1 text-sm leading-5 whitespace-nowrap bg-white rounded-xl text-teal-950 box-border">
          {/* <Link href={`/settings/groups/${recordId}`} passHref> */}
          <div
            onClick={changePasswordClick}
            className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border transition-all duration-200"
          >
            <div className="flex justify-between items-center gap-6 text-[14px] leading-[20px]">
              <div className="flex items-center gap-2 text-[14px] leading-[20px]">
                <Image
                  src="/images/iconly/light/lock.svg"
                  alt="Invoice"
                  width={20}
                  height={20}
                />
                <div>Change Password</div>
              </div>
              <Image
                src="/images/iconly/light/arrowBlack.svg"
                alt="Contact Us"
                width={20}
                height={20}
              />
            </div>
          </div>
          {/* </Link> */}

          {/* <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border transition-all duration-200">
            <div className="flex items-center gap-2 text-[14px] leading-[20px]">
              <Image
                src="/images/iconly/light/notes.svg"
                alt="Feedback"
                width={20}
                height={20}
              />
              <div>Feedback</div>
            </div>
          </div> */}

          <div
            onClick={() => { setPopoverOpen(false); setOpen(true); }}
            className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border transition-all duration-200">
            <div className="flex justify-between items-center gap-6 text-[14px] leading-[20px]">
              <div className="flex items-center gap-2 text-[14px] leading-[20px]">
                <Image
                  src="/images/iconly/light/call.svg"
                  alt="Contact Us"
                  width={20}
                  height={20}
                />
                <div>Contact Us</div>
              </div>

              <Image
                src="/images/iconly/light/arrowBlack.svg"
                alt="Contact Us"
                width={20}
                height={20}
              />
            </div>
          </div>

          <div
            onClick={() => logout()}
            className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-red-50 cursor-pointer box-border transition-all duration-200">
            <div className="flex justify-between items-center gap-6 text-[14px] leading-[20px]">
              <div className="flex items-center gap-2 text-[14px] leading-[20px]">
                <Image
                  src="/images/iconly/light/logout.svg"
                  alt="Logout"
                  width={20}
                  height={20}
                />
                <div>Logout</div>
              </div>
              <Image
                src="/images/iconly/light/arrowBlack.svg"
                alt="Contact Us"
                width={20}
                height={20}
              />
            </div>
          </div>

        </div>
      </>
    )
  }

  return (
    <>
      <header className='w-full xl:h-[60px] xl:min-h-[60px] xl:max-h-[60px] h-[52px] min-h-[52px] max-h-[52px] bg-white rounded-b-xl flex justify-between items-center px-4 '
        style={{
          boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
        }}
      >
        {/* branhc dropdown */}
        <div className='w-1/4'>
          <div className='flex gap-2 items-center'>
            <Image
              src={`/images/iconly/light/logoBlack.svg`}
              height={0}
              width={0}
              alt={`logo`}
              className='xl:w-[80px] xl:h-[32px] w-[72px] h-[28px]'
            />
            <p className='!m-0'>-</p>
            <Select
              aria-label="Select Branch"
              rootClassName='branchSelect'
              variant='borderless'
              style={{ width: 120 }}
              onChange={handleChange}
              options={branchOptions}
              suffixIcon={
                <Image
                  loading="lazy"
                  src="/images/dropdown.svg"
                  width={16}
                  height={16}
                  className={`w-4`}
                  alt="down Arrow"
                />
              }
              defaultValue={selectedBranch && selectedBranch.id}
              className='flex flex-1 max-w-[200px]'
            />
          </div>
        </div>

        {/* navigation pill */}
        <nav className='w-2/4 flex justify-center'>
          <ul className='!m-0 flex gap-4'>
            {managemnet.map((record, index) => {
              return (
                <Link
                  key={index}
                  href={record.src} className='flex gap-2.5 items-center justify-center' >
                  <li
                    className={`w-auto xl:h-[32px] h-[28px] !px-3 rounded-[66px] border-[1px] border-solid ${currentPath === record.title.toLocaleLowerCase() ? 'border-black-primary bg-black-primary text-white' : 'border-[#0000001A] bg-transparent text-black-primary'} flex gap-2.5 items-center justify-center cursor-pointer transition-all duration-200`}
                  >
                    <Image
                      src={currentPath === record.title.toLocaleLowerCase() ? record.activeIcon : record.inactiveIcon}
                      height={0}
                      width={0}
                      alt={record.title}
                      className='xl:w-[20px] xl:h-[20px] w-[18px] h-[18px]'
                    />
                    <p className='xl:text-[12px] text-[10px] leading-[100%] font-[600] !m-0 '>{record.title}</p>
                  </li>
                </Link>
              )
            })}
          </ul>
        </nav>

        {/* notification, setting, avatar */}
        <nav className='w-1/4 flex justify-end'>
          <ul className='!m-0 flex gap-4'>
            {moreMenu.map((record, index) => {
              return (
                <Link
                  key={index}
                  href={record.src} className='flex gap-2.5 items-center justify-center'>
                  <li
                    className={`w-auto xl:h-[32px] h-[28px] rounded-[66px] border-[1px] border-solid ${currentPath === record.title.toLocaleLowerCase() ? 'px-3 border-black-primary bg-black-primary text-white' : 'px-1 border-[#0000001A] bg-transparent text-black-primary'} flex gap-2.5 items-center justify-center cursor-pointer transition-all duration-200`}
                  >
                    <Image
                      src={currentPath === record.title.toLocaleLowerCase() ? record.activeIcon : record.inactiveIcon}
                      height={0}
                      width={0}
                      alt={record.title}
                      className='xl:w-[20px] xl:h-[20px] w-[18px] h-[18px]'
                    />
                    {currentPath === record.title.toLocaleLowerCase() && (
                      <p className='xl:text-[12px] text-[10px] leading-[100%] font-[600] !m-0 '>{record.title}</p>
                    )}
                  </li>
                </Link>
              )
            })}
            <li>
              <Popover
                placement="bottomRight"
                content={() => avatarPopover()}
                trigger="click"
                open={popoverOpen}
                onOpenChange={(visible) => setPopoverOpen(visible)}
                rootClassName="sidebar-popover"
                arrow={false}
              >
                <Avatar
                  src={`/images/iconly/light/user.svg`}
                  className='cursor-pointer'
                  style={{ backgroundColor: '#fff', verticalAlign: 'middle' }}
                  size="default">
                  U
                </Avatar>
              </Popover>
            </li>
          </ul>
        </nav>
      </header>

      <Drawer
        title={`Contact Us`}
        placement='right'
        width={700}
        onClose={onClose}
        open={open}
      >
        <ContactUs
          onClose={onClose}
          open={open}
        />
      </Drawer>
    </>
  )
}

export default Header
