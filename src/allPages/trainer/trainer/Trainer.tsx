'use client'
import AddTrainer from '@/allPages/add-trainer'
import FormInput from '@/components/filterComponents/FilterInput'
import FormSelect from '@/components/filterComponents/FilterSelect'
import { trainersData } from '@/constant/trainerData'
import { deleteRequest, getRequest } from '@/lib/services/request'
import { Drawer, message, Modal, Popover, Table } from 'antd'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const selectOptions = [
  {
    value: '1',
    label: 'Not Identified',
  },
  {
    value: '2',
    label: 'Closed',
  },
]


const Trainer = () => {
  const router = useRouter();

  const [trainersData, setTrainersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname()
  const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"

   const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
   const [deleteTrainerId, setDeleteTrainerId] = useState('')
   const [deleteBranchId, setDeleteBranchId] = useState('')

  const fetchAllTrainersData = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`/api/trainers?gymBranchId=${currentGymBranchId}`);
      console.log(data.data, "TrainersData");
      setTrainersData(data.data);
    } catch (error) {
      // Optionally handle error
      setTrainersData([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteIconClick = (trainerId: any, branchId: any) => {
    setDeleteBranchId(branchId)
    setDeleteTrainerId(trainerId)
    setConfirmDeleteVisible(true)
  }

  const handleDeleteTrainer = async () => {
    try {
      const response = await deleteRequest(`/api/trainers/${deleteTrainerId}?gymBranchId=${deleteBranchId}`);
      message.success(`Branch ${response.message}`)
      fetchAllTrainersData();
      console.log(response, "branch updated");
    } catch (error) {
      console.error("Branch creation failed:", error);
    }
    setDeleteTrainerId('')
    setConfirmDeleteVisible(false)
  }

  const handleCancel = () => {
    setConfirmDeleteVisible(false)
  }

  useEffect(() => {
    fetchAllTrainersData();
  }, []);

  useEffect(() => {
    fetchAllTrainersData()
  }, [pathname])

  const threeDotPopover = (trainerId: string, branchId: string) => {
    return (
      <>
        <div className="flex flex-col gap-3 text-sm leading-5 whitespace-nowrap bg-white rounded-xl text-teal-950 box-border md:w-[150px] action-buttons">
          {/* <Link href={`/settings/groups/${recordId}`} passHref> */}
          <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border">
            <div className="flex items-center justify-between gap-2 text-[14px] leading-[20px]">
              <div>Invoice</div>
              <Image
                src="/images/invoice.svg"
                alt="Invoice"
                width={20}
                height={20}
              />
            </div>
          </div>
          {/* </Link> */}

          <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border">
            <div className="flex items-center justify-between gap-2 text-[14px] leading-[20px]">
              <div>Email</div>
              <Image
                src="/images/E-mail.svg"
                alt="Email"
                width={20}
                height={20}
              />
            </div>
          </div>

          <div 
          onClick={() => deleteIconClick(branchId, trainerId)}
          className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border">
            <div className="flex items-center justify-between gap-2 text-[14px] leading-[20px]">
              <div>Delete</div>
              <Image
                src="/images/iconly/light/delete.svg"
                alt="Delete"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'user',
      render: (_: any, record: any) => (
        <div className='flex items-center gap-3'>
          {/* Profile Image */}
          <Image
            src={`/images/iconly/light/trainer.svg`}
            width={0}
            height={0}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover"
          />

          {/* Name and Email */}
          <div className="flex flex-col">
            <p className="text-[14px] font-semibold text-black-primary !m-0">
              {record.user.fullName}
            </p>
            <p className="text-[12px] text-gray-500 !m-0">
              {record.user.email}
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: "120px",
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      render: (_: any, record: any) => (
        <div>+91 {record.user.phone}</div>
      )
    },
    {
      title: 'Work Type',
      dataIndex: 'workType',
      key: 'workType',
      width: "200px",
      render: (workType: any) => {
        return (
          <p className={`w-[100px] rounded-xl !m-0 !px-1.5 py-1 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center ${workType === 'Full Time' ? 'bg-yellow-primary' : 'bg-silver'}`}>
            {workType}
          </p>
        );
      },
    },
    {
      title: 'Joined Date',
      dataIndex: 'joiningDate',
      key: 'joiningDate',

    },
    // {
    //   title: 'Log in Time',
    //   dataIndex: 'logInTime',
    //   key: 'logInTime',
    // },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: "200px",
      render: (status: any) => {
        return (
          <p className={`w-[100px] rounded-xl !m-0 !px-1.5 py-1 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center ${status === 'Active' ? 'bg-green-secondary' : 'bg-pink-pastel'}`}>
            {status}
          </p>
        );
      },
    },
    // {
    //   title: 'Payment/Salary',
    //   dataIndex: 'payment',
    //   key: 'payment',
    //   width: "200px",
    //   render: (payment: any) => {
    //     return (
    //       <p className={`w-[120px] rounded-xl !m-0 !px-1.5 py-1 !text-[12px] !font-[500] !text-black-primary flex gap-2 justify-center items-center ${payment === 'Paid' ? 'bg-green-pastel' : payment === 'Overdue' ? 'bg-pink-secondary' : 'bg-yellow-pastel'}`}>
    //         <Image
    //           src={payment === 'Paid' ? `/images/Right.svg` : payment === 'Overdue' ? `/images/Overdue.svg` : `/images/iconly/light/TimeCircle.svg`}
    //           height={20}
    //           width={20}
    //           alt={`calender`}
    //         />
    //         {payment}
    //       </p>
    //     );
    //   },
    // },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (_: any, record: any, index: number) => {
        console.log('trainerRecord', record);
        
        return (
        <div className="flex justify-end gap-4 items-center action-buttons">

          <div className="cursor-pointer p-1">
            <Image
              src="/images/iconly/light/Edit.svg"
              alt="Edit"
              width={0}
              height={0}
              className='h-[20px] w-[20px] cursor-pointer'
              onClick={() => handleEdit(record.id)}
            />
          </div>

          <Popover
            placement="bottomRight"
            content={() => threeDotPopover(record.userId, record.gymBranchId)}
            trigger="click"
            rootClassName="sidebar-popover"
            arrow={false}
          >
            <div className="cursor-pointer p-1">
              <Image
                src="/images/iconly/light/moreCircle.svg"
                alt="more menu"
                width={0}
                height={0}
                className='h-[20px] w-[20px] cursor-pointer'
              />
            </div>
          </Popover>
        </div>
      )},
    },
  ];

  const handleEdit = (trainerId: string) => {
    router.push(`/management/trainer/trainer/${trainerId}`);
  }

  const handleAddTrainerClick = () => {
    router.push('/management/trainer/trainer/add');
  }

  return (
    <main className='w-full h-full flex flex-col gap-4'>
      {/* filters */}
      <div className='w-full flex justify-between items-end gap-4'>
        {/* inputs */}
        <div className='flex gap-6'>
          <FormInput
            label='Search for Trainer'
            name='trainer'
          />

          <FormSelect
            label='Status'
            name='status'
          // options={selectOptions}
          />

          <FormSelect
            label='Work Type'
            name='workType'
          // options={selectOptions}
          />

          <FormSelect
            label='Working'
            name='working'
          // options={selectOptions}
          />

          <FormSelect
            label='Payment'
            name='payment'
          // options={selectOptions}
          />
        </div>

        {/* add member btn */}
        <button
          onClick={() => handleAddTrainerClick()}
          className='w-[171px] h-[32px] rounded-xl bg-blue-secondary border-none !text-[12px] text-black-primary font-[600] cursor-pointer flex justify-center items-center gap-2'>
          <Image
            src={`/images/addNewMember.svg`}
            height={20}
            width={20}
            alt={`calender`}
          />
          Add New Trainer
        </button>
      </div>

      {/* table */}
      <div className='w-full bg-white rounded-xl flex flex-col flex-1 items-start p-3'
        style={{
          boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className='flex flex-col flex-1 gap-4 w-full'>
            <div className='flex gap-3 items-center !font-[600] text-[14px] text-black-primary'>
              <p className='!m-0  '>
                Total Trainer
              </p>
              <p className='!m-0 px-2 py-1 rounded-full bg-count '>
                105 count
              </p>
            </div>

            <div className='w-full flex flex-col flex-1'>
              <Table
                columns={columns}
                dataSource={trainersData}
                pagination={false}
                scroll={{ y: 'calc(100vh - 370px)' }}
                className="custom-small-table"
                onRow={(record) => {
                  return {
                    onClick: (e) => {
                      const target = e.target as HTMLElement;

                      if (target.closest('.action-buttons')) return;

                      // Otherwise, navigate
                      router.push(`/management/trainer/${record.key}/trainer-profile`);
                    },
                  };
                }}
              />
            </div>

            {/* <Drawer
            title={selectedTrainerData?.length > 0 ? "Edit Trainer" : 'Add New Trainer'}
            placement='right'
            width={700}
            onClose={onClose}
            open={open}
          >
            <AddTrainer
              onClose={onClose}
              open={open}
              selectedTrainerData={selectedTrainerData}
            />
          </Drawer> */}
          </div>
        )}

      </div>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={confirmDeleteVisible}
        onOk={handleDeleteTrainer}
        onCancel={() => handleCancel()}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this trainer?</p>
      </Modal>

    </main>
  )
}

export default Trainer
