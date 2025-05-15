'use client'
import { Skeleton, Switch } from 'antd'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { membersData } from '@/constant/membersData'
import { getRequest } from '@/lib/services/request'
import dayjs from 'dayjs';

const MemberProfile = () => {

  const params = useParams()

  const [loading, setLoading] = useState(false);
  const [memberData, setMemberData] = useState<any>({});
  const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"

  const member = membersData.find((member) => member.key === params.memberId);

  useEffect(() => {
    const fetchMemberById = async () => {
      setLoading(true);
      try {
        const data = await getRequest(`/api/trainees/${params.memberId}?gymBranchId=${currentGymBranchId}`);
        setMemberData(data.data);
      } catch (error) {
        // Optionally handle error
        setMemberData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberById();
  }, [])

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return loading ? (
    <main className={`h-[clac(100%-200px)] flex flex-col gap-4 flex-1 bg-white rounded-xl p-3 `}
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      <div>
        <Skeleton active />
      </div>
    </main>
  ) : (
    <main className={`h-[clac(100%-200px)] flex flex-col gap-4 flex-1 bg-white rounded-xl p-3 `}
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      <div className='w-full flex justify-between items-center gap-4'>
        <div className='flex flex-row items-center gap-1'>
          <Image
            src={`/images/iconly/light/user.svg`}
            height={0}
            width={0}
            alt={`profile`}
            className='w-20 h-20'
          />
          <div className='flex flex-col gap-2'>
            <h2 className={`text-[20px] text-black-primary font-semibold !m-0`}>{memberData?.user?.fullName}</h2>
            <p className={`flex justify-center items-center w-[80px] h-[24px] rounded-lg text-[14px] leading-[100%] bg-green-secondary text-black-primary font-medium !m-0`}>{memberData?.status}</p>
          </div>
        </div>

        <div className='flex gap-6 items-center'>
          {/* <div className='flex gap-2 items-center'>
            <h2 className='text-[14px] text-black-primary font-[500] !m-0 '>Send Payment Remainder</h2>
            <Switch onChange={onChange} />
          </div>

          <p
            className={`h-6 w-24 rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex gap-2 justify-center items-center ${member?.payment === 'Paid' ? 'bg-green-pastel' : member?.payment === 'Overdue' ? 'bg-pink-secondary' : 'bg-yellow-pastel'}`}
          >
            <Image
              src={member?.payment === 'Paid' ? `/images/Right.svg` : member?.payment === 'Overdue' ? `/images/Overdue.svg` : `/images/iconly/light/TimeCircle.svg`}
              height={16}
              width={16}
              alt={`calender`}
            />
            {member?.payment}
          </p> */}

          <div className='flex gap-3 items-center'>
            <Image
              src="/images/iconly/light/Edit.svg"
              alt="Edit"
              width={0}
              height={0}
              className='h-[20px] w-[20px] cursor-pointer'
            />

            {/* <Image
              src="/images/iconly/light/moreCircle.svg"
              alt="more menu"
              width={0}
              height={0}
              className='h-[20px] w-[20px] cursor-pointer'
            /> */}
          </div>

        </div>
      </div>

      {/* Personal Information */}
      <div className='w-full flex flex-col gap-2 border-1 border-solid border-[#D9D9D999] p-3 rounded-xl'>
        <h2 className='text-[14px] text-black-primary font-semibold'>Personal Information</h2>

        <div className='w-full grid grid-cols-4 gap-4'>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Gender</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{memberData?.gender}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Email Address</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{memberData?.user?.email}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Mobile No.</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{memberData?.user?.phone}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Reference Mobile No.</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{memberData?.referenceMobileNo}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Age</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{memberData?.age}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Health Issues</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{memberData?.healthIssues?.length ? memberData.healthIssues.join(', ') : '-'}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Personalized Goal</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'> {memberData?.personalizedGoal?.length ? memberData.personalizedGoal.join(', ') : '-'}</p>
          </div>

        </div>

      </div>

      {/* Address */}
      <div className='w-full flex flex-col gap-2 border-1 border-solid border-[#D9D9D999] p-3 rounded-xl'>
        <h2 className='text-[14px] text-black-primary font-semibold'>Address</h2>

        <div className='w-full grid grid-cols-4 gap-4'>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Country</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>India</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>State</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>Karnataka</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>City</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>Bengaluru</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Pin Code</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>560021</p>
          </div>
        </div>

      </div>

      {/* Subscription Information */}
      <div className='w-full flex flex-col gap-2 border-1 border-solid border-[#D9D9D999] p-3 rounded-xl'>
        <h2 className='text-[14px] text-black-primary font-semibold'>Subscription Information</h2>

        <div className='w-full grid grid-cols-4 gap-4'>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Expiry Date</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{memberData?.traineeMemberships?.length ? dayjs(memberData?.traineeMemberships[0]?.endDate).format('DD-MM-YY') : '--'}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Joined Date</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{memberData?.traineeMemberships?.length ? dayjs(memberData?.traineeMemberships[0]?.startDate).format('DD-MM-YY') : '--'}</p>
          </div>

          {/* <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Subscription Type</h2>
            <p
              className={`h-6 w-24 rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex gap-2 justify-center items-center ${memberData?.subscriptionType === 'Paid' ? 'bg-green-pastel' : memberData?.subscriptionType === 'Overdue' ? 'bg-pink-secondary' : 'bg-yellow-pastel'}`}
            >
              {memberData?.subscriptionType}
            </p>
          </div> */}

          <div className='flex flex-col gap-1'>
            <p
              className={`h-8 w-36 rounded-2xl !m-0 !p-1.5 !text-[12px] !font-[600] !text-black-primary flex gap-2 justify-center items-center bg-blue-secondary cursor-pointer`}
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
