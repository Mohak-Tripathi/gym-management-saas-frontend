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
        <div className="flex h-auto justify-between max-w-[1440px] p-10 lg:gap-16 gap-6">
          <div className="text-white flex flex-col justify-between lg:gap-4 gap-4 w-[45%]">
            <div>
              <Image
                src="/images/iconly/bold/logoWhite.svg"
                alt="Background"
                className="lg:w-[290px] w-[220px] lg:h-28 h-20"
                width={0}
                height={0}
              />
              <p className="pl-5 font-roboto font-normal italic lg:text-[16px] text-[14px] leading-[120%] tracking-[0px] text-white">The Backbone of Your Gym Business.</p>
            </div>

            <div className="flex flex-col gap-6 pl-5">
              <h2 className="font-roboto font-bold lg:text-[40px] text-[32px] leading-[120%] align-bottom">
                Automate. Optimise. Grow.
              </h2>
              <p className="font-roboto font-normal lg:text-[16px] text-[14px] leading-[120%] tracking-[0px] !m-0">
                Smart Fitness Management, Anytime, Anywhere. <br />
                With Us, Lift Your Gym to the Next Level.
              </p>
            </div>

            <div className="pl-5">
              <div className="bg-white/20 lg:p-2.5 p-2 rounded-xl font-roboto font-medium lg:text-[14px] text-[12px]">
                © {new Date().getFullYear()} LeftUp, All Rights Reserved.
              </div>
            </div>
          </div>

          <div className=" bg-white lg:p-10 p-6 w-[45%] flex flex-col lg:gap-6 gap-4 rounded-2xl">
            {/* Right side content */}
            <div className="flex flex-col gap-2">
              <div className="font-roboto lg:text-[13px] text-[11px] font-normal">
                Welcome Back
              </div>
              <div className="font-roboto lg:text-[24px] text-[18px] font-medium">
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
                  className="!mb-3"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                {/* Remember me and Forgot Password */}
                <div className="flex items-center justify-between mb-4">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="font-roboto lg:!text-[14px] !text-[12px]">
                      Remember me
                    </Checkbox>
                  </Form.Item>
                  {/* <Link
                    href="/forgot-password"
                    className="!text-black-primary hover:underline text-[14px] font-roboto"
                  >
                    Forgot Password?
                  </Link> */}
                </div>

                <Form.Item>
                  <button
                    type="submit"
                    className="w-full bg-black !text-white lg:p-2.5 p-2 rounded-xl font-roboto lg:!text-[14px] !text-[12px] font-bold"
                  >
                    CONTINUE
                  </button>
                </Form.Item>
              </Form>
            </div>

            <div className="flex items-center w-full gap-2">
              <div className="flex-1 h-px bg-black/20" />
              <span className="text-gray-500 lg:text-[14px] text-[12px]">OR</span>
              <div className="flex-1 h-px bg-black/20" />
            </div>

            <div className="flex justify-center items-center">
              <div className="font-['Roboto] lg:text-[14px] text-[12px] font-light">
                Registration for New Branch?{" "}
                <span className="font-['Roboto] lg:text-[14px] text-[12px] font-bold underline">
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
