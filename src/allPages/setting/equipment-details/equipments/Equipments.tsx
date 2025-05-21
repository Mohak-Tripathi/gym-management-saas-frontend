"use client";

import { Modal, Skeleton, Table } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteRequest, getRequest } from "@/lib/services/request";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchAllBranches } from "@/constant/reuseableFunction/branchFunction";

const Equipments = () => {

  const dispatch = useDispatch();
  const [equipmentsData, setEquipmentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleteEquipmentId, setDeleteEquipmentId] = useState('')
  const { selectedBranch } = useSelector((state: any) => state.selectedBranch);

  const fetchEquipments = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`/api/gym-equipments?gymBranchId=${selectedBranch.id}`);
      setEquipmentsData(data);

    } catch (error) {
      setEquipmentsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, [selectedBranch]);

  const deleteIconClick = (branchId: string) => {
    setDeleteEquipmentId(branchId)
    setConfirmDeleteVisible(true)
  }

  const handleDeleteEquipment = async () => {
    try {
      const response = await deleteRequest(`/api/gym-equipments/${deleteEquipmentId}?gymBranchId=${selectedBranch.id}`);
      toast.success("Branch data updated successfully")
      console.log(response, "branch updated");
      await fetchEquipments();
      fetchAllBranches(dispatch);
    } catch (error) {
      console.error("Branch creation failed:", error);
    }
    setDeleteEquipmentId('')
    setConfirmDeleteVisible(false)
  }

  const handleCancel = () => {
    setDeleteEquipmentId('')
    setConfirmDeleteVisible(false)
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Purchase Date",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: any) => {
        return (
          <p
            className={`rounded-xl !m-0 !p-1.5 !text-[12px] leading-[100%] !font-[500] !text-black-primary flex justify-center items-center ${status === 'WORKING' ? "bg-[#C0FFD3]" : "bg-[#FFC8CD]"
              }`}
          >
            {status}
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
            href={`/management/settings/equipment-details/equipments/${record.id}`}
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
      <div>
        <Skeleton active />
      </div>
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
              Equipments
            </div>
          </div>
          <Link href="/management/settings/equipment-details/equipments/add">
            <div className="h-[28px] rounded-[66px] border border-solid border-black-10 bg-white py-1.5 pl-3 pr-2 flex gap-2.5 items-center justify-center">
              <Image
                src={`/images/Add Circle.svg`}
                alt="Arrow"
                width={16}
                height={16}
              />
              <div className="text-[12px] font-semibold text-black-primary leading-[100%]">
                Add New Equipment
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full overflow-auto">
          <Table
            columns={columns}
            dataSource={equipmentsData}
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
        onOk={handleDeleteEquipment}
        onCancel={() => handleCancel()}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this equipment?</p>
      </Modal>
    </div>
  );
};

export default Equipments;
