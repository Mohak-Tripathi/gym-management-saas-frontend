'use client'
import FormSelect from '@/components/filterComponents/FilterSelect'
import { usePathname, useRouter } from 'next/navigation';
import { Drawer, Input, message, Modal, Popover, Skeleton, Table } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Title from 'antd/es/typography/Title';
import { membersData } from '@/constant/membersData'
import FilterSearchInput from '@/components/filterComponents/FilterSearchInput';
import { deleteRequest, getRequest } from '@/lib/services/request';
import BranchId from '@/allPages/setting/account-detail/branchId';
import Link from 'next/link';
import { statusOption } from '@/constant/filterData';
import { leadssData } from '@/constant/leadsData';
import dayjs from 'dayjs';
import { toast } from 'sonner';

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

const Leads = () => {
  const router = useRouter();
  const pathname = usePathname()
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleteLeadId, setDeleteLeadId] = useState('')
  const [deleteBranchId, setDeleteBranchId] = useState('')

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`api/crm-lead?gymBranchId=${currentGymBranchId}`);
      console.log(data, "leadsdata");
      setLeads(data); // Adjust if your API response is wrapped (e.g., data.items)
    } catch (error) {
      // Optionally handle error
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    fetchLeads()
  }, [pathname])


  const deleteIconClick = (editLeadId: any, branchId: any) => {
    setDeleteLeadId(editLeadId)
    setDeleteBranchId(branchId)
    setConfirmDeleteVisible(true)
  }

  const handleDeleteLead = async () => {
    try {
      const response = await deleteRequest(`/api/crm-lead/${deleteLeadId}?gymBranchId=${deleteBranchId}`);
      toast.success("Lead deleted successfully");
      fetchLeads();
      console.log(response, "lead deleted");
    } catch (error) {
      console.error("Lead deletion failed:", error);
      toast.error("Failed to delete lead. Please try again.");
    }
    setDeleteBranchId('')
    setConfirmDeleteVisible(false)
  }

  const handleCancel = () => {
    setConfirmDeleteVisible(false)
  }


  const threeDotPopover = (recordId: any, leadBranchId: string) => {
    return (
      <>
        <div className="flex flex-col gap-3 text-sm leading-5 whitespace-nowrap bg-white rounded-xl text-teal-950 box-border md:w-[150px] action-buttons">
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

          <div className="flex flex-col justify-center px-2 py-1.5 w-full bg-white rounded-lg hover:bg-blue-light cursor-pointer box-border">
            <div className="flex items-center justify-between gap-2 text-[14px] leading-[20px]">
              <div>Call</div>
              <Image
                src="/images/iconly/light/call.svg"
                alt="call"
                width={20}
                height={20}
              />
            </div>
          </div>

          <div
            onClick={() => deleteIconClick(recordId, leadBranchId)}
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
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: any) => (
        <div className='flex items-center gap-3'>
          {/* Profile Image */}
          <Image
            src={`/images/iconly/light/user.svg`}
            width={0}
            height={0}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover"
          />

          {/* Name and Email */}
          <div className="flex flex-col">
            <p className="text-[14px] font-semibold text-black-primary !m-0">
              {record.name}
            </p>
            <p className="text-[12px] text-gray-500 !m-0">
              {record.email}
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Mobile Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      render: (value: any) => `+91 ${value}`,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: 'Probability of Conversation',
      dataIndex: 'probabilityPercent',
      key: 'probabilityPercent',
      render: (value: number) => `${value}%`,
    },
    {
      title: 'Lead Source',
      dataIndex: 'leadSource',
      key: 'leadSource',
    },
    {
      title: 'Follow Update',
      dataIndex: 'followUpDate',
      key: 'followUpDate',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: 'Lead Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => {
        return (
          <p className={`w-[100px] rounded-xl !m-0 !p-1.5 !text-[12px] leading-[100%] !font-[500] !text-black-primary flex justify-center items-center ${status === 'NEW' ? 'bg-[#FFEC9F]' : status === 'CONTACTED' ? 'bg-[#DDEF7B]' : status === 'FOLLOW_UP' ? 'bg-[#E3D5F4]' : status === 'CONVERTED' ? 'bg-green-secondary' : 'bg-[#FFC8CD]'}`}>
            {status}
          </p>
        );
      },
    },
    {
      title: '',
      dataIndex: '',
      key: 'action',
      render: (_: any, record: any, index: number) => {
        return (
          <div className="flex justify-end gap-3 items-center action-buttons">

            <Link
              href={`/management/crm/leads/${record.id}`}
              className="cursor-pointer p-1">
              <Image
                src="/images/iconly/light/Edit.svg"
                alt="Edit"
                width={0}
                height={0}
                className="h-[20px] w-[20px] cursor-pointer"
              />
            </Link>

            <Popover
              placement="bottomRight"
              content={() => threeDotPopover(record.id, record.gymBranchId)}
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
                  className="h-[20px] w-[20px] cursor-pointer"
                />
              </div>
            </Popover>
          </div>
        )
      },
    },
  ];

  const handleAddMemberClick = () => {
    router.push('/management/crm/leads/add');
  }

  return (
    <main className='w-full h-full flex flex-col gap-4'>
      {/* filters */}
      <div className='w-full flex justify-between items-end gap-4'>
        {/* inputs */}
        <div className='flex gap-6'>

          <FilterSearchInput
            label='Search for leads'
            name='searchMember'
          />

          <FormSelect
            label='Status'
            name='status'
            options={statusOption}
          />

          <FormSelect
            label='Date'
            name='date'
            options={selectOptions}
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
            Add New Lead
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
                New Leads
              </p>
              <p className='!m-0 px-2 py-1 rounded-full bg-count '>
                {leads.length} count
              </p>
            </div>

            <div className='w-full flex flex-col flex-1'>
              <Table
                rowKey={(record) => record.id}
                columns={columns}
                dataSource={leads}
                pagination={false}
                className="custom-small-table"
                onRow={(record) => {
                  return {
                    onClick: (e) => {
                      const target = e.target as HTMLElement;

                      if (target.closest('.action-buttons')) return;

                      // Otherwise, navigate
                      router.push(`/management/crm/${record.id}/lead-profile`);
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
        onOk={handleDeleteLead}
        onCancel={() => handleCancel()}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this lead?</p>
      </Modal>
    </main >
  );
}

export default Leads
