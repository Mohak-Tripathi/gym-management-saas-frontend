"use client";

import { Modal, Skeleton, Table } from "antd";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteRequest, getRequest } from "@/lib/services/request";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import dayjs from 'dayjs';

const ScheduleEquipment = () => {

  const [scheduleEquipmentsData, setScheduleEquipmentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleteScheduleEquipmentId, setDeleteScheduleEquipmentId] = useState('')
  const { selectedBranch } = useSelector((state: any) => state.selectedBranch);

  const fetchScheduleEquipments = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`/api/maintenance-schedule?gymBranchId=${selectedBranch.id}`);
      setScheduleEquipmentsData(data.data);
    } catch (error) {
      setScheduleEquipmentsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScheduleEquipments();
  }, [selectedBranch]);

  const deleteIconClick = (branchId: string) => {
    setDeleteScheduleEquipmentId(branchId)
    setConfirmDeleteVisible(true)
  }

  const handleDeleteScheduleEquipment = async () => {
    try {
      const response = await deleteRequest(`/api/maintenance-schedule/${deleteScheduleEquipmentId}?gymBranchId=${selectedBranch.id}`);
      toast.success("Schedule equipment deleted successfully.")
      await fetchScheduleEquipments();
    } catch (error) {
      toast.error("Failed to delete schedule equipment.")
      console.error("schedule equipment deletion failed:", error);
    }
    setDeleteScheduleEquipmentId('')
    setConfirmDeleteVisible(false)
  }

  const handleCancel = () => {
    setDeleteScheduleEquipmentId('')
    setConfirmDeleteVisible(false)
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <div>
          {record?.equipment?.name}
        </div>
      )
    },
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (_: any, record: any) => (
        <div>
          {record?.equipment?.serialNumber}
        </div>
      )
    },
    {
      title: "Next Service Date",
      dataIndex: "nextDueDate",
      key: "nextDueDate",
      render: (nextDueDate: any) => {
        return (
          <div>
            {dayjs(nextDueDate).format('DD-MM-YYYY')}
          </div>
        )
      }
    },
    {
      title: "Last Service Date",
      dataIndex: "lastServicedAt",
      key: "lastServicedAt",
      render: (lastServicedAt: any) => {
        return (
          <div>
            {dayjs(lastServicedAt).format('DD-MM-YYYY')}
          </div>
        )
      }
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status: any) => {
    //     return (
    //       <p
    //         className={`rounded-xl !m-0 !p-1.5 !text-[12px] leading-[100%] !font-[500] !text-black-primary flex justify-center items-center ${status === 'WORKING' ? "bg-[#C0FFD3]" : "bg-[#FFC8CD]"
    //           }`}
    //       >
    //         {status}
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
            href={`/management/settings/equipment-details/schedule-equipment/${record.id}`}
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
                src={`/images/iconly/light/scheduleEquipments.svg`}
                alt="Arrow"
                width={20}
                height={20}
              />
            </div>
            <div className="text-[20px] font-bold text-black-primary">
              Schedule Equipments
            </div>
          </div>
          <Link href="/management/settings/equipment-details/schedule-equipment/add">
            <div className="h-[28px] rounded-[66px] border border-solid border-black-10 bg-white py-1.5 pl-3 pr-2 flex gap-2 items-center justify-center">
              <Image
                src={`/images/iconly/light/equipmentGear.svg`}
                alt="Arrow"
                width={16}
                height={16}
              />
              <div className="text-[12px] font-semibold text-black-primary leading-[100%]">
                Schedule Equipment
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full overflow-auto">
          <Table
            columns={columns}
            dataSource={scheduleEquipmentsData}
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
        onOk={handleDeleteScheduleEquipment}
        onCancel={() => handleCancel()}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this equipment?</p>
      </Modal>
    </div>
  );
};

export default ScheduleEquipment;

