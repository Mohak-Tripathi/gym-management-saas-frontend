import { SidebarDetails } from "@/constant/sidebarData";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {

  const pathName = usePathname();
  const currentTab = pathName.split('/')[4];

  return (
    <div className="flex flex-col gap-4">

      {SidebarDetails.map((sidebar, index) => {
        return (
          <Link
            href={sidebar.link}
            key={index} className={`bg-white p-2 flex items-center justify-center rounded-xl cursor-pointer`}
            style={{ boxShadow: '0px 4px 8px 0px rgba(193, 224, 255, 0.25)' }}
          >
            <div className={`${currentTab === sidebar.tabName ? 'bg-black-primary border-black-primary' : 'bg-white border-[#130F261A]'} w-full border  rounded-lg p-2 flex items-center justify-between`}>
              <div className="flex gap-3">
                <div className="h-[36px] w-[36px] rounded-full bg-white border border-[#130F261A] flex items-center justify-center">
                  <Image
                    loading="lazy"
                    src={sidebar.imgSrc}
                    alt={sidebar.title}
                    className="bg-white rounded-full"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="flex flex-col justify-between gap-1">
                  <div className={`text-[14px] font-semibold ${currentTab === sidebar.tabName ? 'text-white' : 'text-black-primary'}`}>
                    {sidebar.title}
                  </div>
                  <div className={`text-[12px] font-normal ${currentTab === sidebar.tabName ? 'text-[#FFFFFF99]' : 'text-black-60'}`}>
                    {sidebar.description}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center justify-start">
                <Image
                  loading="lazy"
                  src={currentTab === sidebar.tabName ? '/images/iconly/bold/arrowWhite.svg' : '/images/iconly/light/arrowBlack.svg'}
                  alt="Arrow"
                  width={12}
                  height={12}
                />
              </div>
            </div>
          </Link>
        )
      })}

    </div>
  );
};

export default Sidebar;
