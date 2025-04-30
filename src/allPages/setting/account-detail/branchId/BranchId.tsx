"use client";

import { Image } from "antd";
import React, { useState } from "react";
import { Radio } from "antd";
import FormInput from "@/components/formComponents/FormInput";
import { Form } from "antd";

const BranchId = () => {
  const [value, setValue] = useState(null);
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Form Submitted");
  };

  const handleCancel = () => {
    console.log("Form Submitted");
  };

  return (
    <div className="flex flex-col gap-6 shadow-md p-6 w-full">
      <div className="flex gap-4 items-center">
        <div>
          <Image
            // src={`/images/iconly/light/SettingLightArrow.png`}
            src={`/images/ph_buildings.svg`}
            alt="Arrow"
            width={20}
            height={20}
            preview={false}
          />
        </div>
        <div className="font-['Roboto] text-xl font-bold">
          {" "}
          Create New Branch{" "}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <div className="font-['Roboto] text-[14px] font-semibold">
            Branch{" "}
          </div>
          <div className="font-['Roboto] text-[14px] font-normal text-[#07172699]/60">
            You can add multiple branches as your need and assigned the person
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
              <div className="w-full grid grid-cols-2 gap-x-4">
                <FormInput label="User name" name="username" />
                <FormInput label="Role" name="role" />
                
                <FormInput label="Branch" name="branch" />

                <FormInput label="Location" name="location" />

              </div>
            </div>

            {/* buttons */}
          </Form>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex gap-2">
            <div className="font-['Roboto] text-[14px] font-semibold">
              Select Branch
            </div>
            <div className="font-['Roboto] text-[14px] font-[400] ">
              Would you like to create this branch primary branch?
            </div>
          </div>
          {/* <div>Yes</div>
          <div>No</div> */}

          <Radio.Group
            onChange={(e) => setValue(e.target.value)}
            value={value}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </div>

        <div className="flex gap-4">
          <button className="px-12 py-3 bg-[#EAEEF8] rounded-2xl">
            Cancel{" "}
          </button>
          <button
            type="submit"
            className="px-12 py-3 bg-black rounded-xl !text-white"
            onClick={() => form.submit()}
          >
            Save{" "}
          </button>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default BranchId;
