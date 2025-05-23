"use client";

import React from "react";
import Image from "next/image";
import { Form, Input, message } from "antd";
import { postRequest, putRequest } from "@/lib/services/request";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const ChangePassword = () => {
    const router = useRouter()
    const [form] = Form.useForm();
    const { user } = useSelector((state: any) => state.user.loggedinUserData);
    console.log(user, "user");


    const handleFinish = async (values: any) => {
        if (values.newPassword != values.confirmPassword) {
            message.error("New Password and Confirm Password do not match");
            return;
        }

        try {
            const payload = {
                'currentPassword': values.currentPassword,
                'newPassword': values.newPassword,
            };
            const response = await postRequest(`/api/auth/${user.userId}/change-password`, payload);
            toast.success("Password changed successfully.")
            router.push("/sign-in");
        } catch (error) {
            console.error("Password change failed:", error);
            toast.error("Failed to change password. Please try again.");
        }
    }

    return (
        <div className="bg-[url('/images/signInBackgroundImage.png')] bg-cover bg-center min-h-screen w-full">
            <div className="h-screen flex justify-center items-center w-full px-10">
                <div className="flex h-auto justify-between w-[60%] gap-16">

                    <div className=" bg-white p-8  w-[45%] flex flex-col gap-3 rounded-2xl">
                        {/* Right side content */}
                        <div className="flex flex-col gap-2">
                            {/* <div className="font-['Roboto'] text-[13px] font-[400px]">
                                {" "}
                                Welcome Back{" "}
                            </div> */}
                            <div className="font-['Roboto'] text-2xl font-medium">
                                Change Password
                            </div>
                        </div>

                        <div className="flex flex-1 w-full">
                            <Form
                                layout="vertical"
                                onFinish={handleFinish}
                                form={form}
                                className="mt-8 !mb-0 flex flex-col justify-between gap-4 w-full"
                                rootClassName="customizedFormStyling"
                            >
                                <div className="flex flex-col gap-3">
                                    <Form.Item
                                        label="Current Password"
                                        name="currentPassword"
                                        className="!mb-2"
                                        rules={[
                                            { required: true, message: "Please input your current password!" },
                                        ]}
                                    >
                                        <Input.Password
                                            placeholder="********"
                                            className="h-8" />
                                    </Form.Item>
                                    <Form.Item
                                        label="New Password"
                                        name="newPassword"
                                        className="!mb-2"
                                        rules={[
                                            { required: true, message: "Please input your new password!" },
                                        ]}
                                    >
                                        <Input.Password
                                            placeholder="********"
                                            className="h-8" />
                                    </Form.Item>

                                    <Form.Item
                                        label="Confirm New Password"
                                        name="confirmPassword"
                                        className="!mb-2"
                                        rules={[
                                            { required: true, message: "Please confirm your new password!" },
                                        ]}
                                    >
                                        <Input.Password
                                            placeholder="********"
                                            className="h-8" />
                                    </Form.Item>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black !text-white p-[10px] rounded-xl font-['Roboto'] text-[14px] font-bold"
                                >
                                    CONTINUE
                                </button>
                            </Form>
                        </div>
                    </div>

                    <div className="text-white  flex flex-col justify-between gap4 w-[45%]">
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
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
