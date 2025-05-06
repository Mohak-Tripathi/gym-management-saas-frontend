"use client"
import SubscriptionCard from "@/components/SubscriptionCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { deleteRequest, getRequest } from "@/lib/services/request";
import { usePathname } from "next/navigation";
import { message, Modal } from "antd";

const SubscriptionDetail = () => {

  const [subscriptionDetailsData, setSubscriptionDetailsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname()
  const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"

  const fetchAllSubscriptionPlan = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`/api/memberships?gymBranchId=${currentGymBranchId}`);
      console.log(data, "subscriptionPlan");
      setSubscriptionDetailsData(data);
    } catch (error) {
      // Optionally handle error
      setSubscriptionDetailsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSubscriptionPlan();
  }, []);

  useEffect(() => {
    fetchAllSubscriptionPlan()
  }, [pathname])

  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [deleteBranchId, setDeleteBranchId] = useState('')
  const [deleteSubscriptionId, setDeleteSubscriptionId] = useState('')

  const deleteIconClick = (branchId: any, subscriptionId: any) => {
    setDeleteBranchId(branchId)
    setDeleteSubscriptionId(subscriptionId)
    setConfirmDeleteVisible(true)
  }
  const handleDeleteSubscriptionPlan = async () => {
    try {
      const response = await deleteRequest(`/api/memberships/${deleteSubscriptionId}?gymBranchId=${deleteBranchId}`);
      message.success(`Branch ${response.message}`)
      fetchAllSubscriptionPlan();
      console.log(response, "branch updated");
    } catch (error) {
      console.error("Branch creation failed:", error);
    }
    setDeleteBranchId('')
    setConfirmDeleteVisible(false)
  }

  const handleCancel = () => {
    setConfirmDeleteVisible(false)
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full grid grid-cols-3 gap-6">
      {subscriptionDetailsData.map((planDetail: any, index: number) => {
        return (
          <div key={index}>
            <SubscriptionCard
              planTitle={planDetail?.name}
              duration="Monthly"
              actualPrice={planDetail?.actualPrice}
              discountedPrice={planDetail?.actualPrice}
              classesCount={planDetail?.baseDuration}
              backgroundColor="bg-[#F7F7F5]"
              textColor='text-[#86867D]'
              subscriptionId={planDetail?.id}
              branchId={planDetail?.gymBranchId}
              deleteIconClick={deleteIconClick}
            />
          </div>
        )
      })}
      {/* <SubscriptionCard
        planTitle="Silver Plan"
        duration="Half Year"
        actualPrice={18999}
        discountedPrice={15999}
        classesCount="30"
        backgroundColor="bg-[#F4F7FC]"
        textColor='text-[#2C7CC8]'
      />
      <SubscriptionCard
        planTitle="Gold Plan"
        duration="Yearly"
        actualPrice={35999}
        discountedPrice={29999}
        classesCount="Unlimited"
        backgroundColor="bg-[#FFF5D5]"
        textColor='text-[#AC8606]'
      /> */}
      <Link
        href={`/management/settings/subscription-details/add`}
        className="min-h-[180px] bg-white border border-dashed border-black px-3.5 py-4 flex justify-center items-center rounded-xl cursor-pointer"
        style={{
          boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
        }}
      >
        <div className="bg-blue-light w-full h-full rounded-lg px-2 py-1 flex flex-col gap-2.5 justify-center items-center ">
          <div className="h-[36px] w-[36px] bg-white border border-[#0000001A] rounded-full flex items-center justify-center">
            <Image
              src='/images/iconly/light/plusCircleBlack.svg'
              width={0}
              height={0}
              alt="Profile"
              className="w-[24px] h-[24px]"
            />
          </div>

          <p className="!font-semibold text-[14px] text-black-primary">Add New Plan</p>
        </div>
      </Link>

      {/* Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={confirmDeleteVisible}
        onOk={handleDeleteSubscriptionPlan}
        onCancel={() => handleCancel()}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this subscription plan?</p>
      </Modal>

    </div>
  );
};

export default SubscriptionDetail;
