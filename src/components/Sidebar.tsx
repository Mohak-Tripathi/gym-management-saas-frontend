import { Image } from "antd";
import React from "react";

const Sidebar = () => {

    const ActiveRoute = true

const SidebarDetails = [{
    "titleImageLight": "/images/ph_buildings.svg",
    "titleImageDark": "/images/ph_buildings.svg",
    title: "Branch Space",
    "description": "multiple branches as you need",
    "action": "Set",
    "actionImageLight": "/images/iconly/light/SettingLightArrow.png",
    "actionImageDark": "/images/iconly/light/SettingLightArrow.png"


}, 
{
  
    "titleImageLight": "/images/iconly/light/3User.svg",
    "titleImageDark": "/images/ph_buildings.svg",
    title: "User Configurations",
    "description": "User Information",
    "action": "Set",
    "actionImageLight": "/images/iconly/light/SettingLightArrow.png",
    "actionImageDark": "/images/iconly/light/SettingLightArrow.png"


},
{
    "titleImageLight": "/images/iconly/light/Time Circle.svg",
    "titleImageDark": "/images/ph_buildings.svg",
    title: "Send Payment Remainders",
    "description": "At customisable Intervals",
    "action": "Off",
    "actionImageLight": "/images/iconly/light/SettingLightArrow.png",
    "actionImageDark": "/images/iconly/light/SettingLightArrow.png"


},
{
    
    "titleImageLight": "/images/iconly/light/Time Circle.svg",
    "titleImageDark": "/images/ph_buildings.svg",
    title: "Change Late Fees",
    "description": "Percentage or Flat Rate Fees",
    "action": "0.0%",
    "actionImageLight": "/images/iconly/light/SettingLightArrow.png",
    "actionImageDark": "/images/iconly/light/SettingLightArrow.png"


},
{
    "titleImageLight": "/images/iconly/light/Time Circle.svg",
    "titleImageDark": "/images/ph_buildings.svg",
    title: "Currency & Language",
    "description": "INR. English",
    "action": "0.0%",
    "actionImageLight": "/images/iconly/light/SettingLightArrow.png",
    "actionImageDark": "/images/iconly/light/SettingLightArrow.png"


},
{
    "titleImageLight": "/images/iconly/light/Time Circle.svg",
    "titleImageDark": "/images/ph_buildings.svg",
    title: "Invoice Attachments",
    "description": "Attach PDF Copy to Emails",
    "action": "Set",
    "actionImageLight": "/images/iconly/light/SettingLightArrow.png",
    "actionImageDark": "/images/iconly/light/SettingLightArrow.png"


}
]

  return (
    <div className="flex flex-col gap-6">

        {SidebarDetails.map((sidebar, index)=>{
            return (
                //text-white bg-black
                <div key={index}  className="p-4 flex items-center justify-between  rounded-xl shadow-md">
                <div className="flex gap-3">
                    <div className="flex items-center justify-center">
                  <Image
        
                    // src={`/images/ph_buildings.svg`}
                    src={sidebar.titleImageLight}
                    alt={sidebar.title}
                    className="bg-white rounded-full "
                    // className="w-[302px] h-24"
                    width={25}
                    height={25}
                    preview={false} 
                  />
                  </div>
        
                  <div className="flex flex-col gap-1">
                    <div className="font-['Roboto'] text-[14px] font-[600px]">
                      {sidebar.title}
                    </div>
                    <div className="font-['Roboto'] text-[12px] font-[400px]">
                      {" "}
                  
                      {sidebar.description}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 items-center justify-start">
                  <div className="font-['Roboto'] text-[14px] font-[600px]">{sidebar.action}</div>
                  <Image
                    // src={`/images/iconly/light/SettingLightArrow.png`}
                    src={sidebar.actionImageLight}
                    alt="Arrow"
                    width={10}
                    height={10}
                    preview={false} 
                  />
                </div>
              </div>
            )
        })}
    
{/* 
      <div className="p-2 flex items-center justify-between border-2">
        <div className="flex">
          <Image
            src="/images/SettingAccountDetailsBuilding.svg"
            alt="imageBuilding"
            className="w-[302px] h-24"
            width={0}
            height={0}
          />

          <div className="flex flex-col">
            <div>Branch Space</div>
            <div> multiple branches as per your need</div>
          </div>
        </div>
        <div> Set </div>
      </div> */}

    </div>
  );
};

export default Sidebar;
