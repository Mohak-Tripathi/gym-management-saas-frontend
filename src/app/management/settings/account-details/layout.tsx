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
    <main className="w-full h-full ">
      <div className="h-full w-full flex gap-4">
        <div className="w-[35%] min-w-[310px] ">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
}
