"use client";

import { Image } from "antd";
import React, { useState } from "react";
import { Radio } from "antd";

const UserConfigId = () => {
  const [value, setValue] = useState(null);
  return (
    <div className="flex flex-col gap-6 shadow-md p-6 w-full">
      <div className="flex gap-4 items-center">
        <div>
          <Image
            // src={`/images/iconly/light/SettingLightArrow.png`}
            src={`/images/ph_buildings.svg`}
            alt="Arrow"
            width={20}
            height={20}
            preview={false}
          />
        </div>
        <div className="font-['Roboto] text-xl font-bold">
          {" "}
          Create New User{" "}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-2">
          <div className="font-['Roboto] text-[14px] font-semibold">
            User{" "}
          </div>
          <div className="font-['Roboto] text-[14px] font-[400px]">
          You can add multiple users as needed and assign each person accordingly.
          </div>
        </div>
        <div>{/* //form */}</div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex gap-2 flex-col">
            <div className="font-['Roboto] text-[14px] font-semibold">
              User Permission
            </div>
            <div className="font-['Roboto] text-[14px] font-[400px]">
            An Admin has full control over the system and user management, while a User has limited access restricted to their own activities.
            </div>
          </div>
          {/* <div>Yes</div>
          <div>No</div> */}

          <Radio.Group
            onChange={(e) => setValue(e.target.value)}
            value={value}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <Radio value="admin">Admin</Radio>
            <Radio value="user">User</Radio>
          </Radio.Group>
        </div>

        <div className="flex gap-4">
          <button className="px-12 py-3 bg-[#EAEEF8] rounded-2xl">
            Cancel{" "}
          </button>
          <button className="px-12 py-3 bg-black rounded-xl !text-white">
            Save{" "}
          </button>
        </div>
      </div>




      <div></div>
    </div>
  );
};

export default UserConfigId;


