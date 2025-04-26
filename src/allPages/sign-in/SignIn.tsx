"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import backgroundImage from "@/public/images/Add New Member.svg";
import { Form, Input, Button, Checkbox } from "antd";

const SignIn = () => {
  return (
    // <div className="min-h-screen flex">
    //   {/* Left side with background image */}
    //   <div className="hidden lg:block lg:w-1/2 relative">
    //     <Image
    //       src="/images/signInBackgroundImage.png"
    //       alt="Background"
    //       fill
    //       className="object-cover"
    //       priority
    //     />
    //   </div>

    //   {/* Right side with sign-in form */}
    //   <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 py-12">
    //     {/* Logo */}
    //     <div className="mb-8">
    //       <Image
    //         src="/path-to-your-logo.png"
    //         alt="Logo"
    //         width={48}
    //         height={48}
    //         priority
    //       />
    //     </div>

    //     {/* Welcome text */}
    //     <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
    //     <p className="text-gray-600 mb-8">Please enter your details to sign in</p>

    //     {/* Sign In Form */}
    //     <form className="w-full max-w-md">
    //       {/* Email Input */}
    //       <div className="mb-4">
    //         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           id="email"
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="Enter your email"
    //         />
    //       </div>

    //       {/* Password Input */}
    //       <div className="mb-4">
    //         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
    //           Password
    //         </label>
    //         <input
    //           type="password"
    //           id="password"
    //           className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //           placeholder="Enter your password"
    //         />
    //       </div>

    //       {/* Remember me and Forgot Password */}
    //       <div className="flex items-center justify-between mb-6">
    //         <div className="flex items-center">
    //           <input
    //             type="checkbox"
    //             id="remember"
    //             className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    //           />
    //           <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
    //             Remember me
    //           </label>
    //         </div>
    //         <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
    //           Forgot Password?
    //         </Link>
    //       </div>

    //       {/* Sign In Button */}
    //       <button
    //         type="submit"
    //         className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    //       >
    //         Sign In
    //       </button>

    //       {/* Sign Up Link */}
    //       <p className="mt-6 text-center text-sm text-gray-600">
    //         Don't have an account?{' '}
    //         <Link href="/signup" className="text-blue-600 hover:text-blue-500">
    //           Sign Up
    //         </Link>
    //       </p>
    //     </form>
    //   </div>
    // </div>

    //You're not centering the outer div itself — you're making it take up the full screen and centering its children inside it.
    // <div className="w-full">
    <div className="bg-[url('/images/signInBackgroundImage.png')] bg-cover bg-center min-h-screen w-full">
      {/* <div className="flex justify-between items-center h-full w-[70%] border-2 border-white"> */}

      <div className="h-screen flex justify-center items-center w-full px-10">
        <div className="flex h-[60%] justify-between w-[60%] gap-16">
          <div className="text-white  flex flex-col   gap-32 w-[45%]">
            <Image
              src="/images/Logo.svg"
              alt="Background"
              className="w-[302px] h-24"
              width={0}
              height={0}
            />

            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <div className="font-['Roboto'] font-bold text-[39.06px] leading-[46.87px] align-bottom">
                  Building the Future...
                </div>
                <div>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
                </div>
              </div>

              <div className="bg-white/20 p-2.5 rounded-xl font-['Roboto'] font-medium text-[14px]">
                {" "}
                © 2025 LeftUp, All Rights Reserved.{" "}
              </div>
            </div>
          </div>

          <div className=" bg-white p-8  w-[45%] flex flex-col gap-3 rounded-2xl">
            {/* Right side content */}
            <div className="flex flex-col gap-2">
              <div className="font-['Roboto'] text-[13px] font-[400px]">
                {" "}
                Welcome Back{" "}
              </div>
              <div className="font-['Roboto'] text-2xl font-medium">
                Log In to your Account
              </div>
            </div>

            <div>
              <Form
                layout="vertical"
                onFinish={(values) => {
                  // Handle form submission here
                  console.log("Form values:", values);
                }}
                className="mt-8 
                
                !mb-0"
                rootClassName="customizedFormStyling"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  className="!mb-2"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  className="!mb-2"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                {/* Remember me and Forgot Password */}
                <div className="flex items-center justify-between mb-3">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    {/* <Input type="checkbox" className="mr-2 p-0" /> */}
                    <Checkbox className="font-['Roboto'] text-[14px]">
                      {" "}
                      Remember me{" "}
                    </Checkbox>
                  </Form.Item>
                  <Link
                    href="/forgot-password"
                    className="text-blue-600 hover:underline text-[14px] font-['Roboto']"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Form.Item>
                  <button
                    type="submit"
                    className="w-full bg-black !text-white p-[10px] rounded-xl font-['Roboto'] text-[14px] font-bold"
                  >
                    CONTINUE
                  </button>
                </Form.Item>
              </Form>
            </div>

            <div className="flex items-center w-full gap-2">
              <div className="flex-1 h-px bg-black/20" />
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-black/20" />
            </div>

            <div className="flex justify-center items-center">
              <div className="font-['Roboto] text-[14px] font-light">
                Registration for New Branch?{" "}
                <span className="font-['Roboto] text-[14px] font-bold underline">
                  REQUEST HERE
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
