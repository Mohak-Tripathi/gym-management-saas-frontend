"use client";

import { message, Modal, Table, notification, Skeleton } from "antd";

import React, { useEffect, useState } from "react";
import { userConfig } from "@/constant/userConfig";
import Image from "next/image";
import Link from "next/link";
import { deleteRequest, getRequest } from "@/lib/services/request";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const UserConfig = () => {
  const [value, setValue] = useState(null);

  const router = useRouter();
  const pathname = usePathname()
  const { branches } = useSelector((state: any) => state.branch);

  const [usersData, setUsersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState('')
  const [deleteBranchId, setDeleteBranchId] = useState('')
  const { selectedBranch } = useSelector((state: any) => state.selectedBranch);
  const currentGymBranchId = selectedBranch.id;

  const fetchAllUsersData = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`/api/auth?gymBranchId=${currentGymBranchId}`);

      const newUserData = data.data.filter((user: any) => {
        return user.role !== "TRAINER" && user.role !== "TRAINEE"

      })

      console.log('newUserData', newUserData);

      setUsersData(newUserData);
    } catch (error) {
      console.log('user data error', error);
      setUsersData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsersData();
  }, [selectedBranch]);

  const deleteIconClick = (userId: string, branchId: string) => {
    setDeleteBranchId(branchId)
    setDeleteUserId(userId)
    setConfirmDeleteVisible(true)
  }

  const handleDeleteUser = async () => {
    try {
      const response = await deleteRequest(`/api/auth/${deleteUserId}?gymBranchId=${deleteBranchId}`);
      notification.success({
        message: 'Success',
        description: `Branch ${response.message}`
      });

      message.success(`Branch ${response.message}`)
      fetchAllUsersData();
      console.log(response, "branch updated");
    } catch (error) {
      console.error("Branch creation failed:", error);
    }
    setDeleteUserId('')
    setConfirmDeleteVisible(false)
  }

  const handleCancel = () => {
    setConfirmDeleteVisible(false)
  }

  const columns = [
    {
      title: "",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (_: any, record: any,) => {
        return (
          <Image
            src={record?.imageUrl ? record?.imageUrl : record.gender === 'FEMALE' ? `/images/iconly/light/femaleUser.svg` : `/images/iconly/light/user.svg`}
            width={32}
            height={32}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        )
      }
    },

    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Branch",
      dataIndex: "gymBranchId",
      key: "gymBranchId",
      render: (gymBranchId: string) => {
        const branch = branches.find((branch: any) => branch.id === gymBranchId);
        return branch ? branch.name : "-";
      }
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Location",
      dataIndex: "gymBranchId",
      key: "gymBranchId",
      render: (gymBranchId: string) => {
        const branch = branches.find((branch: any) => branch.id === gymBranchId);
        return branch ? branch.address : "-";
      }
    },
    // {
    //   title: "Access Type",
    //   dataIndex: "accessType",
    //   key: "accessType",
    //   render: (accessType: any) => {
    //     return (
    //       <p
    //         className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center ${accessType == "super_admin" ? "bg-cyan-primary" : "bg-green-lime"
    //           }   `}
    //       >
    //         {accessType}
    //       </p>
    //     );
    //   },
    // },
    {
      title: "",
      dataIndex: "",
      key: "action",
      render: (_: any, record: any, index: number) => (
        <div className="flex justify-end gap-4 items-center">
          <Link
            href={`/management/settings/account-details/user-configuration/${record.id}`}
            className="cursor-pointer p-1">
            <Image
              src="/images/iconly/light/Edit.svg"
              alt="Edit"
              width={0}
              height={0}
              className="h-[20px] w-[20px]"
            />
          </Link>
          <div
            onClick={() => deleteIconClick(record.id, record.gymBranchId)}
            className="cursor-pointer p-1">
            <Image
              src="/images/iconly/light/Delete-1.svg"
              alt="delete"
              width={0}
              height={0}
              className="h-[20px] w-[20px]"
            />
          </div>
        </div>
      ),
    },
  ];

  return loading ? (
    <div className="flex flex-col w-full gap-6 p-3 bg-white rounded-xl"
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      <div>
        <Skeleton active />
      </div>
    </div>
  ) : (
    <div className="flex flex-col w-full gap-6 p-3 bg-white rounded-xl"
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >

      <div className="bg-blue-secondary rounded-lg px-2 py-1 flex items-center justify-between">
        <div className="flex gap-2.5 items-center justify-between">
          <div className="h-[36px] w-[36px] bg-white border border-black-10 rounded-full flex items-center justify-center">
            <Image
              src={`/images/iconly/light/3User.svg`}
              alt="Arrow"
              width={20}
              height={20}
            />
          </div>
          <div className="text-[20px] font-bold text-black-primary">
            User Configurations
          </div>
        </div>
        <Link href="/management/settings/account-details/user-configuration/add">
          <div className="w-[168px] h-[28px] rounded-[66px] border border-solid border-black-10 bg-white py-1.5 pl-3 pr-2 flex gap-2.5 items-center justify-center">
            <Image
              src={`/images/Add Circle.svg`}
              alt="Arrow"
              width={16}
              height={16}
            />
            <div className="text-[12px] font-semibold text-black-primary leading-[100%]">
              Add New User
            </div>
          </div>
        </Link>
      </div>

      <div className="w-full flex flex-col flex-1">
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={usersData}
          pagination={false}
          className="custom-small-table"
        />
      </div>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={confirmDeleteVisible}
        onOk={handleDeleteUser}
        onCancel={() => handleCancel()}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default UserConfig;
