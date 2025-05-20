'use client'
import { Skeleton, Switch } from 'antd'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { membersData } from '@/constant/membersData'
import { getRequest } from '@/lib/services/request'
import dayjs from 'dayjs';
import { useSelector } from 'react-redux'

const DealProfile = () => {

  const params = useParams()

  const [loading, setLoading] = useState(false);
  const [dealData, setDealData] = useState<any>({});
  const { selectedBranch } = useSelector((state: any) => state.selectedBranch);
  const currentGymBranchId = selectedBranch.id; 

  useEffect(() => {
    const fetchDealById = async () => {
      setLoading(true);
      try {
        const data = await getRequest(`/api/crm-lead/${params.dealId}?gymBranchId=${currentGymBranchId}`);
        setDealData(data);
      } catch (error) {
        // Optionally handle error
        setDealData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDealById();
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
            <h2 className={`text-[20px] text-black-primary font-semibold !m-0`}>{dealData?.name}</h2>
            <p className={`flex justify-center items-center w-auto h-[24px] rounded-lg text-[14px] leading-[100%] px-1 ${dealData?.status === 'NEW' ? 'bg-[#FFEC9F]' : dealData?.status === 'CONTACTED' ? 'bg-[#DDEF7B]' : dealData?.status === 'FOLLOW_UP' ? 'bg-[#E3D5F4]' : dealData?.status === 'CONVERTED' ? 'bg-green-secondary' : 'bg-[#FFC8CD]'} text-black-primary font-medium !m-0`}>{dealData?.status}</p>
          </div>
        </div>

        {/* <div className='flex gap-6 items-center'>
          <div className='flex gap-3 items-center'>
            <Image
              src="/images/iconly/light/Edit.svg"
              alt="Edit"
              width={0}
              height={0}
              className='h-[20px] w-[20px] cursor-pointer'
            />
          </div>
        </div> */}
      </div>

      {/* Personal Information */}
      <div className='w-full flex flex-col gap-2 border-1 border-solid border-[#D9D9D999] p-3 rounded-xl'>
        <h2 className='text-[14px] text-black-primary font-semibold'>Personal Information</h2>

        <div className='w-full grid grid-cols-4 gap-4'>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Contact Number</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{dealData?.contactNumber}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Whatsapp Number</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{dealData?.whatsappNumber}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Email Address</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{dealData?.email}</p>
          </div>


          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Expected Membership</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{dealData?.expectedMembership?.name}</p>
          </div>

        </div>

      </div>



      {/* Subscription Information */}
      <div className='w-full flex flex-col gap-2 border-1 border-solid border-[#D9D9D999] p-3 rounded-xl'>
        <h2 className='text-[14px] text-black-primary font-semibold'>Lead Information</h2>

        <div className='w-full grid grid-cols-4 gap-4'>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Branch</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{dealData?.gymBranch?.address}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Date</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{dealData?.createdAt ? dayjs(dealData?.createdAt).format('DD-MM-YY') : '--'}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Follow Update</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{dealData?.followUpDate ? dayjs(dealData?.followUpDate).format('DD-MM-YY') : '--'}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Conversion Date</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{dealData?.conversionDate ? dayjs(dealData?.conversionDate).format('DD-MM-YY') : '--'}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Lead Source</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{dealData?.leadSource}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Probability Percent</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{dealData?.probabilityPercent}%</p>
          </div>  

          <div className='flex flex-col gap-1'>
            <h2 className='text-[12px] text-black-60 font-[600] !m-0'>Notes</h2>
            <p className='text-[14px] text-black-primary font-[400] !m-0'>{dealData?.notes ? dealData.notes : '--'}</p>
          </div>  

        </div>

      </div>

    </main>
  )
}

export default DealProfile
