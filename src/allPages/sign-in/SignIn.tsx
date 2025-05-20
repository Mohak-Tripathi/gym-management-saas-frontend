"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Form, Input, Checkbox } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { fetchAllBranches } from "@/constant/reuseableFunction/branchFunction";

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleTraineeSignIn = async (values: {
    email: string;
    password: string;
    remember?: boolean;
  }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          email: values.email,
          password: values.password,
          remember: values.remember,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.data.token;
      localStorage.setItem("token", token);

      setCookie("token", token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      dispatch(setUser(response.data.data));
      fetchAllBranches(dispatch);
      router.push("/management/dashboard");
    } catch (error: any) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
      } else {
        console.error("An error occurred:", error.message);
      }
    }
  };

  return (
    <div className="bg-[url('/images/signInBackgroundImage.png')] bg-cover bg-center min-h-screen w-full">
      <div className="h-screen flex justify-center items-center w-full px-10">
        <div className="flex h-[60%] justify-between w-[60%] gap-16">
          <div className="text-white  flex flex-col   gap-32 w-[45%]">
            <Image
              src="/images/iconly/bold/logoWhite.svg"
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
                onFinish={handleTraineeSignIn}
                className="mt-8 !mb-0"
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
