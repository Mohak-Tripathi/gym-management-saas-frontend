"use client";

import { Image } from "antd";
import React, { useState } from "react";
import { Radio } from "antd";
import FormInput from "@/components/formComponents/FormInput";
import { Form } from "antd";

const UserConfigId = () => {
  const [value, setValue] = useState(null);

  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Form Submitted", values);
  };

  const handleCancel = () => {
    console.log("Form Submitted");
  };

  return (
    <div className="flex flex-col gap-6 shadow-md p-6 w-full">

      <div className="flex gap-4 items-center bg-[#F4F7FC] rounded-lg">
      <div className="h-[36px] w-[36px] bg-[#FFFFFF] border border-[#0000001A] rounded-full flex items-center justify-center">
          <Image
            src={`/images/iconly/light/buildings.svg`}
            alt="Arrow"
            width={20}
            height={20}
            preview={false}
          />
        </div>
        <div className="font-['Roboto] text-xl font-bold">
          {" "}
          Create New User{" "}
        </div>
      </div>


      <div className="border border-[#D9D9D999]">
        <div className="flex flex-col gap-2">
          <div className="font-['Roboto] text-[14px] font-semibold">
            User{" "}
          </div>
          <div className="font-['Roboto] text-[14px] font-[400px]">
          You can add multiple users as needed and assign each person accordingly.
          </div>
        </div>
 

        <div className="mt-4">
          {/* //form */}

          <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
            className="h-full flex flex-col justify-between gap-4"
          >
            {/* user data */}
            <div className="flex flex-col">
              <div className="w-full grid grid-cols-2 gap-4">
                <FormInput label="Branch name" name="branchName" />

                <FormInput label="Location" name="location" />

                <FormInput label="Description" name="description" />
              </div>
            </div>

            {/* buttons */}
          </Form>
        </div>
      </div>
      <div className="flex flex-col gap-10 border border-[#D9D9D999]">
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 flex-col">
            <div className="font-['Roboto] text-[14px] font-semibold">
              User Permission
            </div>
            <div className="font-['Roboto] text-[14px] font-[400px]">
            An Admin has full control over the system and user management, while a User has limited access restricted to their own activities.
            </div>
          </div>
          {/* <div>Yes</div>
          <div>No</div> */}

          <Radio.Group
            onChange={(e) => setValue(e.target.value)}
            value={value}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <Radio value="admin">Admin</Radio>
            <Radio value="user">User</Radio>
          </Radio.Group>
        </div>

        <div className="flex gap-4">
          <button className="px-12 py-3 bg-[#EAEEF8] rounded-2xl">
            Cancel{" "}
          </button>
          <button className="px-12 py-3 bg-black rounded-xl !text-white">
            Save{" "}
          </button>
        </div>
      </div>




      <div></div>
    </div>
  );
};

export default UserConfigId;


