'use client'
import { getRequest } from '@/lib/services/request'
import { Divider, Skeleton } from 'antd'
import Image from 'next/image'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const LeadProfileSideBar = () => {
  const params = useParams();
  const router = useRouter();

  const [leadsData, setLeadsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname()
  const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"

  const fetchAllLeadsData = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`/api/crm-lead?gymBranchId=${currentGymBranchId}`);
      setLeadsData(data);
    } catch (error) {
      console.log('Leads data error', error);
      setLeadsData([]);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchAllLeadsData()
  }, [])

  const handleProfileClick = (key: string) => {
    router.push(`/management/crm/${key}/lead-profile`);
  }

  return loading ? (
    <main className={`w-[330px] h-[100%] flex flex-col gap-3 bg-white rounded-xl p-3 `}
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      <div>
        <Skeleton active />
      </div>
    </main>
  ) : (
    <main className={`w-[330px] h-[100%] flex flex-col gap-3 bg-white rounded-xl p-3 `}
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      <div className='flex flex-col gap-4 w-full'>
        <h2 className='text-[14px] text-black-primary font-[600] '>All Leads</h2>

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

        {leadsData.map((lead, index) => {
          return (
            <div
              key={index}
              onClick={() => handleProfileClick(lead.id)}
              className='w-full cursor-pointer'>
              <div className={`w-full flex justify-between items-center ${params?.leadId == lead.id ? 'bg-black-primary' : ''}  rounded-2xl p-1`}>
                <div className={`w-full flex gap-2 items-center`}>
                  <Image
                    src={params?.leadId == lead.id ? `/images/iconly/light/user.svg` : `/images/iconly/light/user.svg`}
                    height={0}
                    width={0}
                    alt={`profile`}
                    className='w-[24px] h-[24px] bg-white rounded-full'
                  />
                  <div className='flex flex-col gap-1'>
                    <h2 className={`${params?.leadId == lead.id ? 'text-white' : 'text-black-primary'} !text-[14px] leading-[100%] !font-[600] !mb-0`}>
                      {lead?.name}
                    </h2>
                    <p className={`${params?.leadId == lead.id ? 'text-white' : 'text-black-primary'} !text-[10px] leading-[100%] !font-normal !mb-0`}>
                      {lead.status}
                    </p>
                  </div>
                </div>
                {params?.leadId == lead.id && (
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

export default LeadProfileSideBar
