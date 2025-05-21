"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { Form } from "antd";
import Image from "next/image";
import Link from "next/link";
import { getRequest, postRequest, putRequest } from "@/lib/services/request";
import { useParams, useRouter } from "next/navigation";
import { toast } from 'sonner';
import FormSelect from "@/components/formComponents/FormSelect";
import FormDate from "@/components/formComponents/FormDate";
import dayjs from 'dayjs';
import { useSelector } from "react-redux";

const ScheduleEquipmentId = () => {
  const [form] = Form.useForm();
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false);
  const [serialNumberData, setSerialNumberData] = useState<any>([])
  const [scheduleEquipmentData, setScheduleEquipmentData] = useState<any>({});

  const { selectedBranch } = useSelector((state: any) => state.selectedBranch);

  const { branches } = useSelector((state: any) => state.branch);

  const branchOptions = branches?.map((branch: any) => ({
    value: branch.id,
    label: branch.name,
  }));

  const frequencyOptions = [{
    value: "MONTHLY",
    label: "Monthly",
  },
  {
    value: "QUARTERLY",
    label: "Quarterly",
  },
  {
    value: "HALF_YEARLY",
    label: "Half Yearly",
  },
  {
    value: "YEARLY",
    label: "Yearly",
  }
  ]

  const fetchEquipments = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`/api/gym-equipments?gymBranchId=${selectedBranch.id}`);
      const serialNums = data.map((item: any) => {
        return {
          value: item.id,
          label: item.serialNumber,
        };
      });
      setSerialNumberData(serialNums);

    } catch (error) {
      setSerialNumberData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, [selectedBranch.id])

  useEffect(() => {

    if (params.scheduleEquipmentId === "add") return;

    const fetchEquipmentById = async () => {
      setLoading(true);
      try {
        const data = await getRequest(`/api/maintenance-schedule/${params.scheduleEquipmentId}?gymBranchId=${selectedBranch.id}`);
        setScheduleEquipmentData(data.data);
        console.log('dataid', data.data);

      } catch (error) {
        // Optionally handle error
        setScheduleEquipmentData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipmentById();
  }, [params.scheduleEquipmentId]);

  const handleFinish = async (values: any) => {
    if (params.scheduleEquipmentId != 'add') {
      const payload = {
        equipmentId: values.equipmentId || scheduleEquipmentData?.equipment?.id,
        frequency: values.frequency || scheduleEquipmentData?.frequency,
        lastServicedAt: values.lastServicedAt || scheduleEquipmentData?.lastServicedAt,
        nextDueDate: values.nextDueDate || scheduleEquipmentData?.nextDueDate,
        gymBranchId: values.gymBranchId || scheduleEquipmentData?.gymBranchId,
      }
      try {
        const response = await putRequest(`/api/maintenance-schedule/${params.scheduleEquipmentId}?gymBranchId=${selectedBranch.id}`, payload);

        toast.success("Equipment data updated successfully")
        router.push("/management/settings/equipment-details/schedule-equipment")
        console.log(response, "equipment updated");
      } catch (error) {
        toast.error("Equipment update failed")
        console.error("Equipment update failed:", error);
      }
    } else {

      try {
        const response = await postRequest("/api/maintenance-schedule", values)
        toast.success("Maintenance schedule successfully")
        router.push("/management/settings/equipment-details/schedule-equipment")
        console.log(response, "Maintenance schedule");
      } catch (error) {
        toast.error("Maintenance schedule failed")
        console.error("Maintenance schedule failed:", error);
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
                {params.scheduleEquipmentId === 'add' ? 'Add New Equipment' : 'Edit Equipment'}

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
              <FormSelect
                label="Serial Number"
                name="equipmentId"
                options={serialNumberData}
                initialValue={scheduleEquipmentData && scheduleEquipmentData?.equipment?.id}
              />

              <FormSelect
                label="Frequency"
                name="frequency"
                options={frequencyOptions}
                initialValue={scheduleEquipmentData && scheduleEquipmentData?.frequency}
              />

              <FormDate
                label="Last Serviced At"
                name="lastServicedAt"
                initialValue={scheduleEquipmentData && scheduleEquipmentData?.lastServicedAt && dayjs(scheduleEquipmentData?.lastServicedAt)}
              />

              <FormDate
                label="Next Due Date"
                name="nextDueDate"
                initialValue={scheduleEquipmentData && scheduleEquipmentData?.nextDueDate && dayjs(scheduleEquipmentData?.nextDueDate)}
              />

              <FormSelect
                label="Gym Branch"
                name="gymBranchId"
                options={branchOptions}
                initialValue={scheduleEquipmentData && scheduleEquipmentData?.gymBranchId}
              />

            </div>
          </div>
        </div>

        {/* buttons */}
        <div className="flex gap-4">
          <Link href="/management/settings/equipment-details/schedule-equipment">
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
            {params.scheduleEquipmentId === 'add' ? 'Add Equipment' : 'Edit Equipment'}
          </button>
        </div>
      </Form>
    </main>
  );
};

export default ScheduleEquipmentId;
