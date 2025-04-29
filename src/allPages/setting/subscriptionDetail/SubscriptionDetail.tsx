import SubscriptionCard from "@/components/SubscriptionCard";
import Image from "next/image";
import React from "react";

const SubscriptionDetail = () => {
  return (
    // <div>
    //   <SubscriptionCard planTitle="Basic Plan" duration="Monthly" actualPrice="32500" discountedPrice="2850"/>
    // </div>

    <div className="grid grid-cols-3 gap-6">
      <SubscriptionCard
        planTitle="Basic Plan"
        duration="Monthly" // if "Monthly" means 1 month
        actualPrice={32500}
        discountedPrice={2850}
        classesCount="16 classess per month"
        backgroundColor="#F7F7F5"
      />
      <SubscriptionCard
        planTitle="Basic Plan"
        duration="Half Year" // if "Monthly" means 1 month
        actualPrice={32500}
        discountedPrice={2850}
        classesCount="32 classess per month"
        backgroundColor="#F4F7FC"
      />
      <SubscriptionCard
        planTitle="Basic Plan"
        duration="Yearly" // if "Monthly" means 1 month
        actualPrice={32500}
        discountedPrice={2850}
        classesCount="Unlimited classess per month"
        backgroundColor="#FFF5D5"
      />

      <div className="min-w-[300px] min-h-[180px] w-[450px] px-3.5 py-5 flex-col shadow-md flex gap-3 justify-center items-center rounded-xl">
        {/* <div className="flex items-center justify-between bg-[{backgroundColor}] p-2 rounded-xl"> */}
        <Image
            src={`/images/Add Circle.svg`}
            width={0}
            height={0}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover"
          />
          <div className="font-['Roboto'] font-semibold text-[14px]">Add New Plan</div>
      </div>
    </div>
  );
};

export default SubscriptionDetail;
