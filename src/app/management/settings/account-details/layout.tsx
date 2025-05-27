"use client";

import Sidebar from "@/components/Sidebar";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full ">
      <div className="h-full w-full flex gap-4">
        <div className="w-[35%] min-w-[310px] max-w-[400px] ">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
}
