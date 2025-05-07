"use client";

import { Table } from "antd";

import React, { useState } from "react";
import { Radio } from "antd";
import { gymBranchData } from "@/constant/GymBranchData";
import { userConfig } from "@/constant/userConfig";
import Image from "next/image";
import Link from "next/link";

const UserConfig = () => {
  const [value, setValue] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location"
    },
    {
      title: "Access Type",
      dataIndex: "accessType",
      key: "accessType",
      render: (accessType: any) => {
        return (
          <p
            className={`rounded-xl !m-0 !p-1.5 !text-[12px] !font-[500] !text-black-primary flex justify-center items-center   ${accessType == "super_admin" ? "bg-cyan-primary" : "bg-green-lime"
              }   `}
          >
            {accessType}
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
              className="h-5 w-5"
            />
          </div>
          {/* 
          <Popover
            placement="bottomRight"
            content={() => threeDotPopover(record.id)}
            trigger="click"
            rootClassName="sidebar-popover"
            arrow={false}
          > */}
          <div className="cursor-pointer p-1">
            <Image
              src="/images/iconly/light/Delete-1.svg"
              alt="delete"
              width={0}
              height={0}
              className="h-5 w-5"
            />
          </div>
          {/* </Popover> */}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full  gap-6 p-6 shadow-md bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center justify-between">
          <Image
            src={`/images/iconly/light/3User.svg`}
            alt="Arrow"
            width={20}
            height={20}

          />
          <div className="font-['Roboto'] text-[20px] font-bold">
            User Configurations
          </div>
        </div>

        <div className="flex gap-2 items-center justify-between">
          <Image
            src={`/images/Add Circle.svg`}
            alt="Arrow"
            width={20}
            height={20}

          />
          <Link
          href={`/management/settings/account-details/user-configuration/add`}
          >
            <div className="font-['Roboto'] text-[12px] font-semibold">
              Add New User
            </div>
          </Link>
        </div>
      </div>

      <div className="w-full flex flex-col flex-1">
        <Table
          columns={columns}
          dataSource={userConfig}
          pagination={false}
          scroll={{ y: "calc(100vh - 370px)" }}
          className="custom-small-table"
        />
      </div>
    </div>
  );
};

export default UserConfig;
