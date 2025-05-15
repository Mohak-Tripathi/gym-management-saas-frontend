"use client";
import React, { useEffect, useState } from "react";
import { Radio, Skeleton } from "antd";
import FormInput from "@/components/formComponents/FormInput";
import { Form, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { getRequest, postRequest, putRequest } from "@/lib/services/request";
import { useParams, useRouter } from "next/navigation";
import { toast } from 'sonner';
import { fetchAllBranches } from "@/constant/reuseableFunction/branchFunction";
import { useDispatch } from "react-redux";

const BranchId = () => {
  const [form] = Form.useForm();
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false);
  const [branchData, setBranchData] = useState<any>({});
  const dispatch = useDispatch();

  useEffect(() => {

    if (params.branchId === "new") return; // Skip API call if creating new branch

    const fetchBranchById = async () => {
      setLoading(true);
      try {
        const data = await getRequest(`/api/gym-branch/${params.branchId}`);
        setBranchData(data); // Adjust if your API response is wrapped (e.g., data.items)
      } catch (error) {
        // Optionally handle error
        setBranchData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBranchById();
  }, [params.branchId]);


  const handleFinish = async (values: any) => {
    // return;
    if (params.branchId != 'new') {
      const payload = {
        name: values.name || branchData?.name,
        address: values.address || branchData?.address,
        isMainBranch: values.isMainBranch || branchData?.isMainBranch,
        description: values.description || branchData?.description,
      }
      try {
        const response = await putRequest(`/api/gym-branch/${params.branchId}`, payload);

        toast.success("Branch data updated successfully")
        router.push("/management/settings/account-details/branch")
        console.log(response, "branch updated");
        fetchAllBranches(dispatch);
      } catch (error) {
        toast.error("Branch creation failed")
        console.error("Branch creation failed:", error);
      }
    } else {
      try {
        // const payload = { name: "New Branch", address: "Somewhere" };
        // const payload = {
        //   name: values.name || branchData?.name,
        //   address: values.address || branchData?.address,
        //   isMainBranch: values.isMainBranch || branchData?.isMainBranch,
        // }
        const response = await postRequest("/api/gym-branch", values);


        toast.success("Branch created successfully")
        router.push("/management/settings/account-details/branch")
        console.log(response, "branch created");
        fetchAllBranches(dispatch);
      } catch (error) {
        toast.success("Branch updation failed successfully")
        console.error("Branch updation failed:", error);
      }
    }
  };

  return loading ? (
    <div>
      <Skeleton active />
    </div>
  ) : (
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
          <div className="bg-blue-secondary rounded-lg px-2 py-1 flex items-center justify-between">
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
                {params.branchId === 'new' ? 'Create New Branch' : 'Edit Branch'}

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
              <FormInput
                label="Branch Name"
                name="name"
                initialValue={branchData && branchData?.name}
              />
              <FormInput
                label="Location"
                name="address"
                initialValue={branchData && branchData?.address}
              />
              <div className="w-full col-span-2">
                <FormInput label="Description" name="description"
                  initialValue={branchData && branchData?.description} />

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

            <Form.Item
              name="isMainBranch"
              // label="Is Active?"
              rules={[{ required: true, message: "Please select an option" }]}
              initialValue={branchData && branchData?.isMainBranch}
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
            {params.branchId === 'new' ? 'Add Branch' : 'Edit Branch'}
          </button>
        </div>
      </Form>
    </main>
  );
};

export default BranchId;
