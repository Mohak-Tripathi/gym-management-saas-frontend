"use client";

import Sidebar from "@/components/Sidebar";
import Tabs from "@/components/Tabs";
// import { settingTabs } from "@/constant/tabsData";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-4 pb-4 w-full h-full ">
     
      <div className="flex gap-10 mt-4">
        <div className="w-[30%]">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
}
