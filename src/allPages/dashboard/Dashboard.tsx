"use client";
import BubbleChart from '@/components/dashboardChart/BubbleChart'
import DonutChart from '@/components/dashboardChart/DonutChart'
import GraphChart from '@/components/dashboardChart/GraphChart';
import PieCharts from '@/components/dashboardChart/PieCharts';
import { communityFeedData } from '@/constant/communityFeedData';
import { newMemberData } from '@/constant/newMemberData';
import { soldProductData } from '@/constant/soldProductData';
import { Divider } from 'antd';
import Image from 'next/image'
import React from 'react'
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user, token } = useSelector((state: any) => state.user.loggedinUserData);
  return (
    <main className="w-full flex-1 flex flex-col gap-4 h-[calc(100%-52px)] max-h-[calc(100%-52px)]">
      {/* matrix panel */}
      <div className="w-full grid grid-cols-4 gap-4">
        {/* Members */}
        <div
          className="flex flex-col justify-between gap-3 bg-white rounded-xl px-3 pt-3"
          style={{
            boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-end items-center gap-1">
              <p className="!m-0 font-semibold text-[12px] leading-[100%] text-black-primary">
                Members
              </p>
              <Image
                src={`/images/boldMember.svg`}
                height={20}
                width={20}
                alt={`calender`}
              />
            </div>
            <div className="flex justify-between items-end">
              <div className="flex gap-1 items-end">
                <p className="font-semibold text-[32px] text-black-primary leading-[100%] !-mb-1 ">
                  125
                </p>
                <p className="font-normal text-[12px] text-green-primary leading-[100%] !m-0">
                  ▲ +2.3%
                </p>
              </div>
              <p className="font-normal text-[11px] text-black-60 leading-[100%] !m-0 ">
                New member on this week
              </p>
            </div>
          </div>
          <div>
            <p className="px-1.5 py-1 bg-yellow-warm font-normal text-[12px] leading-[100%] text-black-primary rounded-t-md !m-0">
              This Month: <span className="font-semibold">445</span>
            </p>
          </div>
        </div>

        {/* Expired */}
        <div
          className="flex flex-col justify-between gap-3 bg-white rounded-xl px-3 pt-3"
          style={{
            boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-end items-center gap-1">
              <p className="!m-0 font-semibold text-[12px] leading-[100%] text-black-primary">
                Expired
              </p>
              <Image
                src={`/images/boldExpired.svg`}
                height={20}
                width={20}
                alt={`expired`}
              />
            </div>
            <div className="flex justify-between items-end">
              <div className="flex gap-1 items-end">
                <p className="font-semibold text-[32px] text-black-primary leading-[100%] !-mb-1 ">
                  08
                </p>
                <p className="font-normal text-[12px] text-red-primary leading-[100%] !m-0">
                  ▼ +2.3%
                </p>
              </div>
              <p className="font-normal text-[11px] text-black-60 leading-[100%] !m-0 ">
                Bookings on this week
              </p>
            </div>
          </div>
          <div>
            <p className="px-1.5 py-1 bg-pink-primary font-normal text-[12px] leading-[100%] text-black-primary rounded-t-md !m-0">
              This Month: <span className="font-semibold">45</span>
            </p>
          </div>
        </div>

        {/* Earning */}
        <div
          className=" flex flex-col justify-between gap-3 bg-white rounded-xl px-3 pt-3"
          style={{
            boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-end items-center gap-1">
              <p className="!m-0 font-semibold text-[12px] leading-[100%] text-black-primary">
                Earning
              </p>
              <Image
                src={`/images/boldEarning.svg`}
                height={20}
                width={20}
                alt={`earning`}
              />
            </div>
            <div className="flex justify-between items-end">
              <div className="flex gap-1 items-end">
                <p className="font-semibold text-[32px] text-black-primary leading-[100%] !-mb-1 ">
                  ₹ 7213
                </p>
                <p className="font-normal text-[12px] text-green-primary leading-[100%] !m-0">
                  ▲ +2.3%
                </p>
              </div>
              <p className="font-normal text-[11px] text-black-60 leading-[100%] !m-0 ">
                Earning on this week
              </p>
            </div>
          </div>
          <div>
            <p className="px-1.5 py-1 bg-purple-secondary font-normal text-[12px] leading-[100%] text-black-primary rounded-t-md !m-0">
              This Month: <span className="font-semibold">₹ 32245</span>
            </p>
          </div>
        </div>

        {/* Classes Booked */}
        <div
          className="flex flex-col justify-between gap-3 bg-white rounded-xl px-3 pt-3"
          style={{
            boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-end items-center gap-1">
              <p className="!m-0 font-semibold text-[12px] leading-[100%] text-black-primary">
                Classes Booked
              </p>
              <Image
                src={`/images/boldBlocked.svg`}
                height={20}
                width={20}
                alt={`blocked`}
              />
            </div>
            <div className="flex justify-between items-end">
              <div className="flex gap-1 items-end">
                <p className="font-semibold text-[32px] text-black-primary leading-[100%] !-mb-1 ">
                  76
                </p>
                <p className="font-normal text-[12px] text-green-primary leading-[100%] !m-0">
                  ▲ +2.3%
                </p>
              </div>
              <p className="font-normal text-[11px] text-black-60 leading-[100%] !m-0 ">
                New bookings on this week
              </p>
            </div>
          </div>
          <div>
            <p className="px-1.5 py-1 bg-green-mint font-normal text-[12px] leading-[100%] text-black-primary rounded-t-md !m-0">
              This Month: <span className="font-semibold">345</span>
            </p>
          </div>
        </div>
      </div>

      {/* graph panel */}
      <div className="w-full grid grid-cols-4 gap-4">
        {/* Revenue */}
        <div
          className="bg-white rounded-xl p-3 col-span-2"
          style={{
            boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
          }}
        >
          {/* heading */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start gap-2">
              <p className="font-semibold text-[14px] text-black-primary">
                Revenue
              </p>
              <div className='p-1 border-[0.5px] border-solid border-black-10 rounded-[8px]'>
                <ul className='flex items-center gap-1 !m-0'>
                  <li className='text-[14px] text-black-primary leading-[100%] !m-0 font-normal cursor-pointer '>
                    Today
                  </li>
                  <li className='text-[14px] text-black-primary leading-[100%] !m-0 font-normal cursor-pointer '>
                    Week
                  </li>
                  <li className={`text-[14px] text-black-primary leading-[100%] !m-0 font-normal cursor-pointer p-1 bg-yellow-secondary rounded-[8px]`}>
                    Month
                  </li>
                  <li className='text-[14px] text-black-primary leading-[100%] !m-0 font-normal cursor-pointer '>
                    Year
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* graph */}
          <div>
            <GraphChart />
          </div>
        </div>

        {/* Age Range */}
        <div
          className="bg-white rounded-xl p-3"
          style={{
            boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
          }}
        >
          {/* heading */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start gap-2">
              <p className="font-semibold text-[14px] text-black-primary">
                Age Range
              </p>
            </div>
          </div>

          {/* graph */}
          <div>
            <PieCharts />
          </div>
        </div>

        {/* Members Activity */}
        <div
          className="bg-white rounded-xl p-3"
          style={{
            boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
          }}
        >
          {/* heading */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start gap-2">
              <p className="font-semibold text-[14px] text-black-primary">
                Members Activity
              </p>
            </div>
          </div>

          {/* graph */}
          <div className='h-auto'>
            <DonutChart />
          </div>

        </div>
      </div>

      {/* table panel */}
      <div className="w-full grid grid-cols-4 gap-4">
        {/* Community Feed */}
        <div
          className="bg-white rounded-xl p-3 flex flex-col flex-1"
          style={{
            boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
          }}
        >
          {/* heading */}
          <div className="flex flex-col gap-4 h-10">
            <div className="flex justify-between items-start gap-2">
              <p className="font-semibold text-[14px] text-black-primary">
                Community Feed
              </p>
              <p className="font-semibold text-[12px] text-black-primary cursor-pointer">
                See All
              </p>
            </div>
          </div>

          {/* graph */}
          <div className='flex flex-1 flex-col gap-2 h-36 max-h-40 pr-2 overflow-y-scroll'>
            {communityFeedData.map((post, index) => {
              return (
                <div key={index}>
                  <div className='flex gap-2'>
                    <Image
                      src={post.userSrc}
                      height={0}
                      width={0}
                      alt={``}
                      className="h-[36px] w-[36px] rounded object-cover"
                    />
                    <div className='flex flex-col gap-1 w-full'>
                      <div className='flex justify-between gap-1 items-center'>
                        <p className='text-[14px] font-semibold leading-[100%] text-black-primary !m-0'>{post.title}</p>
                        <p className='text-[12px] font-normal leading-[100%] text-black-primary !m-0'>{post.time}, {post.date}</p>
                      </div>
                      <p className='text-[14px] font-normal leading-[100%] text-black-primary !m-0'>{post.description}.</p>
                    </div>
                  </div>
                  <Divider className='!my-3' />
                </div>
              )
            })}
          </div>
        </div>

        {/* Trainers Time Schedule */}
        <div
          className="bg-white rounded-xl p-3 col-span-2"
          style={{
            boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
          }}
        >
          {/* heading */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start gap-2">
              <p className="font-semibold text-[14px] text-black-primary">
                Trainers Time Schedule
              </p>
              <p className="font-semibold text-[12px] text-black-primary cursor-pointer">
                See All
              </p>
            </div>
          </div>

          {/* graph */}
          <div></div>
        </div>

        {/* others */}
        <div className="flex flex-col gap-3">
          {/* Top Sold Products */}
          <div
            className="bg-white rounded-xl p-3 col-span-2"
            style={{
              boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
            }}
          >
            {/* heading */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start gap-2">
                <p className="font-semibold text-[14px] text-black-primary">
                  Top Sold Products
                </p>
              </div>
            </div>

            {/* sold product picture */}
            <div className='flex gap-2'>
              {soldProductData.slice(0, 7).map((product, index) => {
                const isLastVisible = index === 6;
                const remaining = soldProductData.length - 7;

                return (
                  <div key={index} className="relative">
                    <Image
                      src={product.productSrc}
                      height={0}
                      width={0}
                      alt={product.productName}
                      className="h-[45px] w-[45px] rounded object-cover"
                    />
                    {isLastVisible && remaining > 0 && (
                      <div className="absolute inset-0 bg-black-primary bg-opacity-60 flex items-center justify-center text-white text-sm font-semibold rounded cursor-pointer">
                        +{remaining}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* New Members */}
          <div
            className="bg-white rounded-xl p-3 col-span-2"
            style={{
              boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
            }}
          >
            {/* heading */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start gap-2">
                <p className="font-semibold text-[14px] text-black-primary">
                  New Members
                </p>
              </div>
            </div>

            {/* New Members picture */}
            <div className='flex gap-2'>
              {newMemberData.slice(0, 7).map((member, index) => {
                const isLastVisible = index === 6;
                const remaining = newMemberData.length - 7;

                return (
                  <div key={index} className="relative">
                    <Image
                      src={member.memberSrc}
                      height={0}
                      width={0}
                      alt={member.memberName}
                      className="h-[45px] w-[45px] rounded object-cover"
                    />
                    {isLastVisible && remaining > 0 && (
                      <div className="absolute inset-0 bg-black-primary bg-opacity-60 flex items-center justify-center text-white text-sm font-semibold rounded cursor-pointer">
                        +{remaining}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
