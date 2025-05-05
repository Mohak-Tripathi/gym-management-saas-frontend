"use client";
import React, { useState } from "react";
import { Radio } from "antd";
import FormInput from "@/components/formComponents/FormInput";
import { Form, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { postRequest } from "@/lib/services/request";
import { useRouter } from "next/navigation";

const BranchId = () => {
  const [form] = Form.useForm();
  const router = useRouter()

  const handleFinish = async (values: any) => {
    console.log(values, "values");
    try {
      const payload = { name: "New Branch", address: "Somewhere" };
      const response = await postRequest("/api/gym-branch", values);

      message.success("New Branch creared successfully")
      router.push("/management/settings/account-details/branch")
      console.log(response, "branch created");
    } catch (error) {
      console.error("Branch creation failed:", error);
    }
  };

  const handleCancel = () => {
    console.log("Form Submitted");
  };

  return (
    <main
      className="flex flex-col w-full h-full gap-6 p-3 bg-white rounded-xl"
      style={{
        boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
      }}
    >
      <Form
        className="w-full h-full flex flex-col gap-6 justify-between"
        form={form}
        onFinish={handleFinish}
      >
        <div className="w-full flex flex-col gap-4">
          <div className="bg-[#F4F7FC] rounded-lg px-2 py-1 flex items-center justify-between">
            <div className="flex gap-2.5 items-center justify-between">
              <div className="h-[36px] w-[36px] bg-white border border-[#0000001A] rounded-full flex items-center justify-center">
                <Image
                  src={`/images/iconly/light/buildings.svg`}
                  alt="Arrow"
                  width={20}
                  height={20}
                />
              </div>
              <div className="text-[20px] font-bold text-black-primary">
                Create New Branch
              </div>
            </div>
          </div>

          <div className="w-full p-3 rounded-xl border border-[#D9D9D999] gap-6 flex flex-col">
            <div className="flex flex-col gap-2">
              <h2 className="text-[14px] text-black-primary font-semibold leading-[100%] !m-0">
                Branch
              </h2>
              <p className="text-[14px] font-normal text-black-60 leading-[100%] !m-0">
                You can add multiple branches as your need and assigned the
                person
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <FormInput label="Branch Name" name="name" />
              <FormInput label="Location" name="address" />
              {/* <div className="w-full col-span-2">
                <FormInput label="Description" name="description" />
              </div> */}
            </div>
          </div>

          <div className="w-full p-3 rounded-xl border border-[#D9D9D999] gap-6 flex flex-col">
            <div className="flex flex-col gap-2">
              <h2 className="text-[14px] text-black-primary font-semibold leading-[100%] !m-0">
                Branch
              </h2>
              <p className="text-[14px] font-normal text-black-60 leading-[100%] !m-0">
                You can add multiple branches as your need and assigned the
                person
              </p>
            </div>

            <Form.Item
              name="isMainBranch"
              // label="Is Active?"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Radio.Group className="w-full !flex flex-col gap-4">
                <Radio
                  value={true}
                  className="text-[14px] text-black-primary font-semibold leading-[100%] !m-0"
                >
                  Yes
                </Radio>
                <Radio
                  value={false}
                  className="text-[14px] text-black-primary font-semibold leading-[100%] !m-0"
                >
                  No
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>

        {/* buttons */}
        <div className="flex gap-4">
          <Link href="/management/settings/account-details/branch">
            <button
              type="button"
              className=" w-[147px] h-[40px] !bg-blue-secondary !text-black-primary rounded-lg px-4 py-2 cursor-pointer"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className=" w-[147px] h-[40px] !bg-black-primary !text-white rounded-lg px-4 py-2 cursor-pointer"
          >
            Add Branch
          </button>
        </div>
      </Form>
    </main>
  );
};

export default BranchId;
