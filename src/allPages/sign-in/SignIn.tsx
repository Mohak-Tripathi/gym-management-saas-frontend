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
        <div className="flex h-auto justify-between w-[60%] gap-16">
          <div className="text-white flex flex-col justify-between gap-4 w-[45%]">
            <div>
              <Image
                src="/images/iconly/bold/logoWhite.svg"
                alt="Background"
                className="w-[290px] h-28"
                width={0}
                height={0}
              />
              <p className="pl-5 font-roboto font-normal italic text-[16px] leading-[28.16px] tracking-[0px] text-white">The Backbone of Your Gym Business.</p>
            </div>

            <div className="flex flex-col gap-6 pl-5">
              <h2 className="font-roboto font-bold text-[39px] leading-[46.87px] align-bottom">
                Automate. Optimise. Grow.
              </h2>
              <p className="font-roboto font-normal text-[16px] leading-[28.16px] tracking-[0px] !m-0">
                Smart Fitness Management, Anytime, Anywhere. <br />
                With Us, Lift Your Gym to the Next Level.
              </p>
            </div>

            <div className="pl-5">
              <div className="bg-white/20 p-2.5 rounded-xl font-roboto font-medium text-[14px]">
                © 2025 LeftUp, All Rights Reserved.
              </div>
            </div>
          </div>

          <div className=" bg-white p-10 w-[45%] flex flex-col gap-6 rounded-2xl">
            {/* Right side content */}
            <div className="flex flex-col gap-2">
              <div className="font-roboto text-[13px] font-[400px]">
                Welcome Back
              </div>
              <div className="font-roboto text-2xl font-medium">
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
                    <Checkbox className="font-roboto text-[14px]">
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
                    className="w-full bg-black !text-white p-[10px] rounded-xl font-roboto text-[14px] font-bold"
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
