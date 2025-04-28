import Image from "next/image";
import React from "react";

const MembershipCard = ({
  planTitle: string,
  duration,
  actualPrice,
  discounedPrice,
}) => {
  return (
    <div className="w-[420px] px-3.5 py-4 h-[148px] shadow-md flex flex-col gap-4">
      <div className="flex items-center justify-between bg-[#F7F7F5]">
        <div className="flex gap-2">
          <Image
            src={`/images/Dumbell.svg`}
            width={0}
            height={0}
            alt="Profile"
            className="w-6 h-6 rounded-full object-cover"
          />

          <div>Basic Plan</div>
        </div>
        <div>Monthly</div>
      </div>
      <div className="flex items-center justify-start gap-2">
        <div className="font-['Roboto'] font-bold text-3xl">2999</div>
        <div className="font-['Roboto'] font-bold text-2xl text-[#07172699]/60">3215</div>
      </div>
      <div></div>
    </div>
  );
};

export default MembershipCard;
