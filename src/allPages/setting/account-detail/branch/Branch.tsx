"use client";

import { Table } from "antd";
import React from "react";
import { gymBranchData } from "@/constant/GymBranchData";
import Image from "next/image";
import Link from "next/link";

const Branch = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (statusType: any) => {
        return (
          <p
            className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-[#071726] flex justify-center items-center ${statusType && "bg-[#FFDE8F]"
              }`}
          >
            {statusType}
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
          <div className="cursor-pointer p-1">
            <Image
              src="/images/iconly/light/Edit.svg"
              alt="Edit"
              width={0}
              height={0}
              className="h-[20px] w-[20px]"
            />
          </div>
          <div className="cursor-pointer p-1">
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

  return (
    <div className="flex flex-col w-full gap-6 p-3 bg-white rounded-xl"
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      <div className="bg-[#F4F7FC] rounded-lg px-2 py-1 flex items-center justify-between">
        <div className="flex gap-2.5 items-center justify-between">
          <div className="h-[36px] w-[36px] bg-[#FFFFFF] border border-[#0000001A] rounded-full flex items-center justify-center">
            <Image
              src={`/images/iconly/light/buildings.svg`}
              alt="Arrow"
              width={20}
              height={20}
            />
          </div>
          <div className="text-[20px] font-bold text-[#071726]">
            Branch Space
          </div>
        </div>
        <Link href="/management/settings/account-details/branch/new">
          <div className="w-[168px] h-[28px] rounded-[66px] bg-white py-1.5 pl-3 pr-2 flex gap-2.5 items-center justify-center">
            <Image
              src={`/images/Add Circle.svg`}
              alt="Arrow"
              width={16}
              height={16}
            />
            <div className="text-[12px] font-semibold text-[#071726] leading-[100%]">
              Add New Branch
            </div>
          </div>
        </Link>
      </div>

      <div className="w-full flex flex-col flex-1">
        <Table
          columns={columns}
          dataSource={gymBranchData}
          pagination={false}
          scroll={{ y: "calc(100vh - 370px)" }}
          className="custom-small-table"
        />
      </div>
    </div>
  );
};

export default Branch;
