"use client";
import React, { useState } from "react";
import { Radio } from "antd";
import FormInput from "@/components/formComponents/FormInput";
import { Form } from "antd";
import Image from "next/image";
import Link from "next/link";

const BranchId = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Form Submitted");
  };

  const handleCancel = () => {

    console.log("Form Submitted");
  };

  return (
    <main className="flex flex-col w-full h-full gap-6 p-3 bg-white rounded-xl"
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      <Form className="w-full h-full flex flex-col gap-6 justify-between" form={form} onFinish={handleFinish}>
        <div className="w-full flex flex-col gap-4">
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
                Create New Branch
              </div>
            </div>
          </div>

          <div className="w-full p-3 rounded-xl border border-[#D9D9D999] gap-6 flex flex-col">
            <div className="flex flex-col gap-2">
              <h2 className="text-[14px] text-[#071726] font-semibold leading-[100%] !m-0">Branch</h2>
              <p className="text-[14px] font-normal text-[#07172699] leading-[100%] !m-0">You can add multiple branches as your need and assigned the person</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <FormInput
                label="Branch Name"
                name="branchName"
              />
              <FormInput
                label="Location"
                name="location"
              />
              <div className="w-full col-span-2">
                <FormInput
                  label="Description"
                  name="description"
                />
              </div>
            </div>
          </div>

          <div className="w-full p-3 rounded-xl border border-[#D9D9D999] gap-6 flex flex-col">
            <div className="flex flex-col gap-2">
              <h2 className="text-[14px] text-[#071726] font-semibold leading-[100%] !m-0">Branch</h2>
              <p className="text-[14px] font-normal text-[#07172699] leading-[100%] !m-0">You can add multiple branches as your need and assigned the person</p>
            </div>
            <Radio.Group className="w-full !flex flex-col gap-4">
              <Radio value={'yes'} className="text-[14px] text-[#071726] font-semibold leading-[100%] !m-0">Yes</Radio>
              <Radio value={'no'} className="text-[14px] text-[#071726] font-semibold leading-[100%] !m-0">No</Radio>
            </Radio.Group>
          </div>
        </div>

        {/* buttons */}
        <div className='flex gap-4'>
          <Link href='/management/settings/account-details/branch'>
            <button
              type='button'
              className=' w-[147px] h-[40px] !bg-[#EAEEF8] !text-[#071726] rounded-lg px-4 py-2 cursor-pointer'
            >
              Cancel
            </button>
          </Link>
          <button
            type='submit'
            className=' w-[147px] h-[40px] !bg-[#071726] !text-white rounded-lg px-4 py-2 cursor-pointer'
          >
            Add Member
          </button>
        </div>
      </Form>
    </main>
  );
};

export default BranchId;
