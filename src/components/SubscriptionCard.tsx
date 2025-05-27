import Image from "next/image";
import Link from "next/link";
import React from "react";

type SubscriptionCardProps = {
  planTitle: string;
  duration: string;
  actualPrice: number;
  membershipDiscountedPrice: number;
  backgroundColor: string;
  classesCount: string;
  textColor: string;
  subscriptionId: string;
  branchId: string;
  deleteIconClick: any;
}

const SubscriptionCard = ({
  planTitle,
  duration,
  actualPrice,
  membershipDiscountedPrice,
  backgroundColor = "#F7F7F5",
  classesCount,
  textColor,
  subscriptionId,
  branchId,
  deleteIconClick,
}: SubscriptionCardProps) => {

  return (
    <div className="min-h-[180px] bg-white px-3.5 py-4 flex flex-col gap-4 rounded-xl"
      style={{
        boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
      }}
    >
      <div
        className={`flex items-center justify-between p-2 rounded-lg ${backgroundColor} `}
      // style={{ backgroundColor }}
      >
        <div className="flex gap-3 items-center">
          <div className="h-[36px] w-[36px] bg-white border border-[#0000001A] rounded-full flex items-center justify-center">
            <Image
              src={`/images/Dumbell.svg`}
              width={0}
              height={0}
              alt="Profile"
              className="w-[24px] h-[24px]"
            />
          </div>
          <h2 className="text-[14px] !font-semibold text-black-primary leading-[100%] !m-0">{planTitle}</h2>
        </div>
        <h2 className={`!font-semibold text-[14px] ${textColor} leading-[100%] !m-0`}>
          {duration}
        </h2>
      </div>

      <div className="flex items-start justify-start gap-2">
        <h2 className="!font-bold text-[32px] text-black-primary leading-[100%] "> ₹ {actualPrice} </h2>
        <h3 className="!font-bold text-[20px] text-black-60 line-through leading-[100%]">
          ₹ {membershipDiscountedPrice}
        </h3>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-black-primary !font-semibold text-[14px] leading-[100%] !m-0">
          {classesCount} classess per month
        </p>
        <div className="flex gap-4 items-center">
          <Link
            href={`/management/settings/subscription-details/${subscriptionId}`}
          >
            <Image
              src={`/images/iconly/light/Edit.svg`}
              width={0}
              height={0}
              alt="Profile"
              className="w-[20px] h-[20px] cursor-pointer"
            />
          </Link>

          <Image
            src={`/images/iconly/light/Delete-1.svg`}
            width={0}
            height={0}
            alt="Profile"
            className="w-[20px] h-[20px] cursor-pointer"
            onClick={() => deleteIconClick(branchId, subscriptionId)}
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
