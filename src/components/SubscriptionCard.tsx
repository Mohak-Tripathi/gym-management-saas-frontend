import Image from "next/image";
import React from "react";

type SubscriptionCardProps = {
  planTitle: string;
  duration: string;
  actualPrice: number;
  discountedPrice: number;
};

const SubscriptionCard = ({
  planTitle,
  duration,
  actualPrice,
  discountedPrice,
}: SubscriptionCardProps) => {
  return (
    <div className="w-[430px] px-3.5 py-5 shadow-md flex flex-col gap-4 rounded-xl">
      <div className="flex items-center justify-between bg-[#F7F7F5] p-2 rounded-xl">
        <div className="flex gap-3">
          <Image
            src={`/images/Dumbell.svg`}
            width={0}
            height={0}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover"
          />

          <div>{planTitle}</div>
        </div>
        <div className="font-['Roboto']  font-semibold text-[14px] text-[#86867D]/60">
          {duration}
        </div>
      </div>
      <div className="flex items-center justify-start gap-2">
        <div className="font-['Roboto'] font-bold text-3xl "> ₹{discountedPrice}</div>
        <div className="font-['Roboto'] font-bold text-2xl text-[#07172699]/60 line-through">
          ₹{actualPrice}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-[#071726] font-['Roboto']  font-semibold text-[14px]">
          16 class per month
        </div>

        <Image
          src={`/images/iconly/light/Edit.svg`}
          width={0}
          height={0}
          alt="Profile"
          className="w-6 h-6 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default SubscriptionCard;
