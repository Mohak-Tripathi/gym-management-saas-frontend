"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import FormInput from "@/components/formComponents/FormInput";
import { Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { getRequest, postRequest, putRequest } from "@/lib/services/request";
import { useParams, useRouter } from "next/navigation";
import { toast } from 'sonner';
import { useSelector } from "react-redux";
import FormDate from "@/components/formComponents/FormDate";
import FormSelect from "@/components/formComponents/FormSelect";
import dayjs from 'dayjs';

const EquipmentId = () => {
  const [form] = Form.useForm();
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false);
  const [equipmentData, setEquipmentData] = useState<any>({});
  const { selectedBranch } = useSelector((state: any) => state.selectedBranch);

  const { branches } = useSelector((state: any) => state.branch);

  const branchOptions = branches?.map((branch: any) => ({
    value: branch.id,
    label: branch.name,
  }));

  const statusOptions = [{
    value: "WORKING",
    label: "Working",
  },
  {

    value: "OUT_OF_ORDER",
    label: "Out Of Order",
  }
  ]

  useEffect(() => {

    if (params.equipmentId === "new") return; // Skip API call if creating new branch

    const fetchEquipmentById = async () => {
      setLoading(true);
      try {
        const data = await getRequest(`/api/gym-equipments/${params.equipmentId}?gymBranchId=${selectedBranch.id}`);
        setEquipmentData(data);
        console.log('equipmentData', data);

      } catch (error) {
        // Optionally handle error
        setEquipmentData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentById();
  }, [params.equipmentId]);


  const handleFinish = async (values: any) => {
    // return;
    if (params.equipmentId != 'add') {
      const payload = {
        name: values.name || equipmentData.name,
        serialNumber: values.serialNumber || equipmentData.serialNumber,
        purchaseDate: values.purchaseDate || equipmentData.purchaseDate,
        gymBranchId: values.gymBranchId || equipmentData.gymBranchId,
        status: values.status || equipmentData.status,
      }
      try {
        const response = await putRequest(`/api/gym-equipments/${params.equipmentId}?gymBranchId=${selectedBranch.id}`, payload);
        toast.success("Equipment data updated successfully")
        router.push("/management/settings/equipment-details/equipments")
      } catch (error) {
        toast.error("Equipment update failed")
        console.error("Equipment update failed:", error);
      }
    } else {
      const payload = {
        name: values.name,
        serialNumber: values.serialNumber,
        purchaseDate: values.purchaseDate,
        gymBranchId: values.gymBranchId,
        status: values.status,
      }
      try {
        const response = await postRequest("/api/gym-equipments", payload);
        toast.success("Equipment created successfully")
        router.push("/management/settings/equipment-details/equipments")
        console.log(response, "equipment created");
      } catch (error) {
        toast.error("Equipment creation failed")
        console.error("Equipment creation failed:", error);
      }
    }
  };

  return loading ? (
    <main
      className="flex flex-col w-full h-full gap-6 p-3 bg-white rounded-xl"
      style={{
        boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
      }}
    >
      <Skeleton active />
    </main>
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
                {params.equipmentId === 'add' ? 'Add New Equipment' : 'Edit Equipment'}

              </div>
            </div>
          </div>

          <div className="w-full p-3 rounded-xl border border-[#D9D9D999] gap-6 flex flex-col">
            {/* <div className="flex flex-col gap-2">
              <h2 className="text-[14px] text-black-primary font-semibold leading-[100%] !m-0">
                Branch
              </h2>
              <p className="text-[14px] font-normal text-black-60 leading-[100%] !m-0">
                You can add multiple branches as your need and assigned the
                person
              </p>
            </div> */}
            <div className="grid grid-cols-2 gap-6">
              <FormInput
                label="Equipment Name"
                name="name"
                initialValue={equipmentData && equipmentData?.name}
              />
              <FormInput
                label="Serial Number"
                name="serialNumber"
                initialValue={equipmentData && equipmentData?.serialNumber}
              />
              {/* <div className="w-full col-span-2"> */}
              <FormDate
                label="Purchase Date"
                name="purchaseDate"
                initialValue={equipmentData && equipmentData?.purchaseDate && dayjs(equipmentData?.purchaseDate)}
              />
              {/* </div> */}
              <FormSelect
                label="Gym Branch"
                name="gymBranchId"
                options={branchOptions}
                initialValue={equipmentData && equipmentData?.gymBranchId}
              />
              <FormSelect
                label="Status"
                name="status"
                options={statusOptions}
                initialValue={equipmentData && equipmentData?.status}
              />
            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex gap-4">
          <Link href="/management/settings/equipment-details/equipments">
            <button
              type="button"
              className=" w-[160px] h-[40px] !bg-blue-secondary !text-black-primary rounded-lg px-4 py-2 cursor-pointer"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className=" w-[160px] h-[40px] !bg-black-primary !text-white rounded-lg px-4 py-2 cursor-pointer"
          >
            {params.equipmentId === 'add' ? 'Add Equipment' : 'Update Equipment'}
          </button>
        </div>
      </Form>
    </main>
  );
};

export default EquipmentId;
