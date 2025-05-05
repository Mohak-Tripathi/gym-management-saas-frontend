"use client"
import SubscriptionCard from "@/components/SubscriptionCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getRequest } from "@/lib/services/request";

const SubscriptionDetail = () => {

  const [subscriptionDetailsData, setSubscriptionDetailsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"


  useEffect(() => {
    const fetchAllSubscriptionPlan = async () => {
      setLoading(true);
      try {
        const data = await getRequest(`/api/memberships?gymBranchId=${currentGymBranchId}`);
        console.log(data, "subscriptionPlan");
        setSubscriptionDetailsData(data); // Adjust if your API response is wrapped (e.g., data.items)
      } catch (error) {
        // Optionally handle error
        setSubscriptionDetailsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSubscriptionPlan();
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full grid grid-cols-3 gap-6">
      {subscriptionDetailsData.map((planDetail:any, index:number) => {
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
    </div>
  );
};

export default SubscriptionDetail;
