"use client";

import { message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import { gymBranchData } from "@/constant/GymBranchData";
import Image from "next/image";
import Link from "next/link";
import { deleteRequest, getRequest } from "@/lib/services/request";
import { useDispatch } from "react-redux";
import { setBranches } from "../../../../lib/store/slices/branchSlice"
import { toast } from "sonner";

const Branch = () => {

  const dispatch = useDispatch();
  const [branchesData, setBranchesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleteBranchId, setDeleteBranchId] = useState('')

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const data = await getRequest("/api/gym-branch");
      setBranchesData(data);
      // Only keep required fields
      const simplifiedBranches = data.map((branch: any) => ({
        id: branch.id,
        name: branch.name,
        address: branch.address
      }));

      // Dispatch to Redux
      dispatch(setBranches(simplifiedBranches));

    } catch (error) {
      setBranchesData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const deleteIconClick = (branchId: string) => {
    setDeleteBranchId(branchId)
    setConfirmDeleteVisible(true)
  }

  const handleDeleteBranch = async () => {
    try {
      const response = await deleteRequest(`/api/gym-branch/${deleteBranchId}`);
      toast.success("Branch data updated successfully")
      console.log(response, "branch updated");
      await fetchBranches();
    } catch (error) {
      console.error("Branch creation failed:", error);
    }
    setDeleteBranchId('')
    setConfirmDeleteVisible(false)
  }

  const handleCancel = () => {
    setDeleteBranchId('')
    setConfirmDeleteVisible(false)
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Owner",
    //   dataIndex: "owner",
    //   key: "owner",
    // },
    {
      title: "Location",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "isMainBranch",
      key: "isMainBranch",
      render: (isMainBranch: any) => {
        return (
          <p
            className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center ${isMainBranch && "bg-yellow-primary"
              }`}
          >
            {isMainBranch ? "Primary Branch" : ""}
          </p>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      key: "action",
      render: (_: any, record: any, index: number) => (
        <div className="flex justify-end gap-4 items-center">
          <Link
            href={`/management/settings/account-details/branch/${record.id}`}
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
            onClick={() => deleteIconClick(record.id)}
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
    <div
      className="flex flex-col w-full gap-6 p-3 bg-white rounded-xl"
      style={{
        boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
      }}
    >
      Loading...
    </div>
  ) : (
    <div
      className="flex flex-1  p-3 bg-white rounded-xl"
      style={{
        boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
      }}
    >
      <div className=" flex flex-col flex-1 gap-6 ">
        <div className="bg-blue-secondary rounded-lg px-2 py-1 flex items-center justify-between">
          <div className="flex gap-2.5 items-center justify-between">
            <div className="h-[36px] w-[36px] bg-white border border-black-10 rounded-full flex items-center justify-center">
              <Image
                src={`/images/iconly/light/buildings.svg`}
                alt="Arrow"
                width={20}
                height={20}
              />
            </div>
            <div className="text-[20px] font-bold text-black-primary">
              Branch Space
            </div>
          </div>
          <Link href="/management/settings/account-details/branch/new">
            <div className="w-[168px] h-[28px] rounded-[66px] border border-solid border-black-10 bg-white py-1.5 pl-3 pr-2 flex gap-2.5 items-center justify-center">
              <Image
                src={`/images/Add Circle.svg`}
                alt="Arrow"
                width={16}
                height={16}
              />
              <div className="text-[12px] font-semibold text-black-primary leading-[100%]">
                Add New Branch
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full overflow-auto">
          <Table
            columns={columns}
            dataSource={branchesData}
            pagination={false}
            rowKey="id"
            scroll={{ x: 'max-content' }}
            className="custom-small-table"
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={confirmDeleteVisible}
        onOk={handleDeleteBranch}
        onCancel={() => handleCancel()}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this branch?</p>
      </Modal>
    </div>
  );
};

export default Branch;
