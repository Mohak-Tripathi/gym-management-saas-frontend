'use client'
import { trainersData } from '@/constant/trainerData'
import { getRequest } from '@/lib/services/request'
import { Divider } from 'antd'
import Image from 'next/image'
import { useParams, usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const TrainerProfileSideBar = () => {
  const params = useParams();
  const router = useRouter();

  const [trainersData, setTrainersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname()
  const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"

  const fetchAllTrainersData = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`/api/trainers?gymBranchId=${currentGymBranchId}`);
      console.log(data.data, "TrainersData");
      setTrainersData(data.data);
    } catch (error) {
      console.log('trainer data error', error);
      setTrainersData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTrainersData()
  }, [])

  const handleProfileClick = (key: string) => {
    router.push(`/management/trainer/${key}/trainer-profile`);
  }
  
  return (
    <main className={`w-[330px] min-h-[100%] h-full flex flex-col gap-3 bg-white rounded-xl p-3 `}
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className='flex flex-col flex-1 gap-3'>
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

            {trainersData.map((trainer, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleProfileClick(trainer.id)}
                  className='w-full cursor-pointer'>
                  <div className={`w-full flex justify-between items-center ${params?.trainerId == trainer.id ? 'bg-black-primary' : ''}  rounded-2xl p-1`}>
                    <div className={`w-full flex gap-2 items-center`}>
                      <Image
                        src={params?.trainerId == trainer.id ? `/images/iconly/bold/profile.svg` : `/images/iconly/light/profile.svg`}
                        height={0}
                        width={0}
                        alt={`profile`}
                        className='w-[20px] h-[20px]'
                      />
                      <div className='flex flex-col gap-1'>
                        <h2 className={`${params?.trainerId == trainer.id ? 'text-white' : 'text-black-primary'} !text-[14px] !font-[600] !mb-0`}>
                          {trainer?.user?.fullName}
                        </h2>
                        {/* <p className={`${params?.trainerId == trainer.id ? 'text-white' : 'text-black-primary'} !text-[12px] !font-normal !mb-0`}>
                          {trainer.status}
                        </p> */}
                      </div>
                    </div>
                    {params?.trainerId == trainer.id && (
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
        </div>
      )}

    </main>
  )
}

export default TrainerProfileSideBar
