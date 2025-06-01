'use client'
import FormSelect from '@/components/filterComponents/FilterSelect'
import { usePathname, useRouter } from 'next/navigation';
import { Modal, Popover, Skeleton, Table } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import FilterSearchInput from '@/components/filterComponents/FilterSearchInput';
import { deleteRequest, getRequest } from '@/lib/services/request';
import Link from 'next/link';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { paymentOption, statusOption } from '@/constant/filterData';
import { useSelector } from 'react-redux';

const Memebers = () => {
  const router = useRouter();
  const pathname = usePathname()
  const { selectedBranch } = useSelector((state: any) => state.selectedBranch);
  
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false); 
  const [deleteMemberId, setDeleteMemberId] = useState('') 
  const [deleteBranchId, setDeleteBranchId] = useState('')
  const [subscriptionDetailsData, setSubscriptionDetailsData] = useState<any[]>([]);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  // const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"

  const fetchAllSubscriptionPlan = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`/api/memberships?gymBranchId=${selectedBranch.id}`);
      // Extract only id and name
      const filteredData = data.map((plan: any) => ({
        value: plan.id,
        label: plan.name,
        price: plan.actualPrice,
      }));

      setSubscriptionDetailsData(filteredData);

    } catch (error) {
      // Optionally handle error
      setSubscriptionDetailsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSubscriptionPlan();
  }, [selectedBranch]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`api/trainees?gymBranchId=${selectedBranch.id}`);
      console.log('memberdata', data.data);

      setMembers(data.data); // Adjust if your API response is wrapped (e.g., data.items)
    } catch (error) {
      // Optionally handle error
      console.log(error, "error");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [selectedBranch]);

  useEffect(() => {
    fetchMembers()
  }, [pathname, selectedBranch])


  const deleteIconClick = (traineeId: any, branchId: any) => {
    setDeleteMemberId(traineeId)
    setDeleteBranchId(branchId)
    setConfirmDeleteVisible(true)
  }

  const handleDeleteTrainee = async () => {
    try {
      const response = await deleteRequest(`/api/trainees/${deleteMemberId}?gymBranchId=${deleteBranchId}`);
      toast.success("Member deleted successfully")
      fetchMembers();
      console.log(response, "branch updated");
    } catch (error) {
      console.error("Branch creation failed:", error);
      toast.error("Failed to delete member")
    }
    setDeleteBranchId('')
    setConfirmDeleteVisible(false)
  }

  const handleCancel = () => {
    setConfirmDeleteVisible(false)
  }


  const threeDotPopover = (traineeId: string, branchId: string) => {
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

          <div onClick={() => deleteIconClick(traineeId, branchId)} className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border">
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
            src={record?.imageUrl ? record?.imageUrl : record.gender === 'FEMALE' ? `/images/iconly/light/femaleUser.svg` : `/images/iconly/light/user.svg`}
            width={24}
            height={24}
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
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
      render: (_: any, record: any) => (
        <div>+91 {record.user.phone}</div>
      )
    },

    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    //   render: (_: any, record: any) => (
    //     <div>{record.user.email}</div>
    //   )
    // },
    // {
    //   title: 'Subscription Type',
    //   dataIndex: 'subscriptionType',
    //   key: 'subscriptionType',
    //   render: (subscriptionType: any) => {
    //     return (
    //       <p className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center ${subscriptionType === 'Basic' ? 'bg-gray-basic' : subscriptionType === 'Silver' ? 'bg-silver' : 'bg-yellow-primary'}`}>
    //         {subscriptionType}
    //       </p>
    //     );
    //   },
    // },
    {
      title: 'Joined Date',
      dataIndex: 'startDate',
      key: 'startDate',
      // render: (date: string) => dayjs(date).format('DD-MM-YYYY'),

      render: (_: any, record: any) => {
        const rawDate = record?.traineeMemberships?.[0]?.startDate;
        return rawDate ? dayjs(rawDate).format('DD-MM-YYYY') : '-';
      }
    },
    {
      title: 'Expiry Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (_: any, record: any) => {
        const rawDate = record?.traineeMemberships?.[0]?.endDate;
        return rawDate ? dayjs(rawDate).format('DD-MM-YYYY') : '-';
      }
    },
    {
      title: 'Subscription',
      dataIndex: 'subscriptionType',
      key: 'subscriptionType',
      render: (_: any, record: any) => {
        const rawDate = record?.traineeMemberships?.[0]?.membership?.name;
        return rawDate ? rawDate : '-';
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',

      render: (_: any, record: any) => {
        const endDate = record?.traineeMemberships?.[0]?.endDate;
        const isActive = endDate ? dayjs().isBefore(dayjs(endDate)) : false;
        const displayStatus = isActive ? 'ACTIVE' : 'EXPIRED';

        return (
          <p
            className={`w-[100px] rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center ${isActive ? 'bg-green-secondary' : 'bg-pink-pastel'
              }`}
          >
            {displayStatus}
          </p>
        );
      },

      // render: (status: any) => {
      //   return (
      //     <p className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center ${status === 'Active' ? 'bg-green-secondary' : 'bg-pink-pastel'}`}>
      //       {status}
      //     </p>
      //   );
      // },
    },
    // {
    //   title: 'Payment',
    //   dataIndex: 'payment',
    //   key: 'payment',
    //   render: (payment: any) => {
    //     return (
    //       <p className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex gap-2 justify-center items-center ${payment === 'Paid' ? 'bg-green-pastel' : payment === 'Overdue' ? 'bg-pink-secondary' : 'bg-yellow-pastel'}`}>
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
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (_: any, record: any, index: number) => {
        return (
          <div className="flex justify-end gap-3 items-center">

            <Link href={`/management/members/members/${record.id}`} className="cursor-pointer p-1 action-buttons">
              <Image
                src="/images/iconly/light/Edit.svg"
                alt="Edit"
                width={0}
                height={0}
                className="h-[20px] w-[20px]"
              />
            </Link>

            <Popover
              placement="bottomRight"
              content={() => threeDotPopover(record.id, record.gymBranchId)}
              trigger="click"
              rootClassName="sidebar-popover"
              arrow={false}
            >
              <div className="cursor-pointer p-1 action-buttons">
                <Image
                  src="/images/iconly/light/moreCircle.svg"
                  alt="more menu"
                  width={0}
                  height={0}
                  className="h-[20px] w-[20px]"
                />
              </div>
            </Popover>

            {/* <Link href={`/management/members/members/${record.id}`} className="cursor-pointer p-1"> */}
            <Image
              src="/images/iconly/light/arrowBlack.svg"
              alt="arrowBlack"
              width={0}
              height={0}
              className="h-[20px] w-[20px] cursor-pointer"
            />
            {/* </Link> */}
          </div>
        )
      },
    },
  ];

  const handleAddMemberClick = () => {
    // router.push('/management/members/members/add');
    router.push('/management/members/member-details');
  }

  return (
    <main className='w-full h-full flex flex-col gap-4'>
      {/* filters */}
      <div className='w-full flex justify-between items-end gap-4'>
        {/* inputs */}
        <div className='flex gap-6'>

          <FilterSearchInput
            label='Search for members'
            name='searchMember'
          />

          <FormSelect
            label='Status'
            name='status'
            options={statusOption}
          />

          <FormSelect
            label='Subscription Type'
            name='subscriptionType'
            options={subscriptionDetailsData}
          />

          <FormSelect
            label='Payment'
            name='payment'
            options={paymentOption}
          />
        </div>

        {/* add member btn */}
        <button
          onClick={() => handleAddMemberClick()}
          className='w-[171px] h-[32px] rounded-xl border-[0.5px] border-solid border-black-10 bg-blue-secondary cursor-pointer flex justify-center items-center gap-2'>
          <Image
            src={`/images/addNewMember.svg`}
            height={20}
            width={20}
            alt={`calender`}
          />
          <p className='!text-[12px] leading-[100%] text-black-primary font-[600] !m-0'>
            Add New Member
          </p>
        </button>
      </div>
      {loading ? (
        <div className='w-full bg-white rounded-xl flex flex-col flex-1 items-start p-3'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          <Skeleton active />
        </div>
      ) : (
        <div className='w-full bg-white rounded-xl flex flex-col flex-1 items-start p-3'
          style={{
            boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
          }}
        >
          <div className='flex flex-col flex-1 gap-4 w-full'>
            <div className='flex gap-3 items-center !font-[600] text-[14px] text-black-primary'>
              <p className='!m-0  '>
                Total Members
              </p>
              <p className='!m-0 px-2 py-1 rounded-full bg-count '>
                {members && members.length} count
              </p>
            </div>

            <div className='w-full flex flex-col flex-1'>
              <Table
                columns={columns}
                dataSource={members}
                pagination={false}
                rowKey={(record) => record.user.email}
                scroll={{ y: 'calc(100vh - 370px)' }}

                className="custom-small-table"
                onRow={(record) => {
                  return {
                    onClick: (e) => {
                      const target = e.target as HTMLElement;

                      if (target.closest('.action-buttons')) return;

                      // Otherwise, navigate
                      router.push(`/management/members/${record.id}/member-profile`);
                    },
                  };
                }}
              />
            </div>
          </div>

        </div>
      )
      }


      {/* Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={confirmDeleteVisible}
        onOk={handleDeleteTrainee}
        onCancel={() => handleCancel()}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this trainer?</p>
      </Modal>
    </main >
  );
}

export default Memebers
