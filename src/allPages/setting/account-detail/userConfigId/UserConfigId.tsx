"use client";

import { Image, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import FormInput from "@/components/formComponents/FormInput";
import { Form } from "antd";
import Link from "next/link";
import { useSelector } from "react-redux";
import FormSelect from "@/components/formComponents/FormSelect";
import { useParams, useRouter } from "next/navigation";
import { getRequest, postRequest, putRequest } from "@/lib/services/request";
import { toast } from "sonner";
import FormDate from "@/components/formComponents/FormDate";
import dayjs from 'dayjs';
import WebcamCapture from "@/components/WebcamCapture";

const UserConfigId = () => {
  const { branches } = useSelector((state: any) => state.branch);

  const [form] = Form.useForm();
  const router = useRouter()
  const params = useParams()
  const token = useSelector((state: any) => state.user.loggedinUserData?.token);

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const { selectedBranch } = useSelector((state: any) => state.selectedBranch);
  const currentGymBranchId = selectedBranch.id;
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const branchOptions = branches?.map((branch: any) => ({
    value: branch.id,
    label: branch.name,
  }));


  const UserRoleOptions = [
    {
      value: "ADMIN",
      label: "Admin",
    }, {

      value: "RECEPTIONIST",
      label: "Receptionist",
    }

  ]


  const fetchUserById = async () => {
    setLoading(true);
    try {
      const data = await getRequest(`/api/auth/${params.userConfigId}?gymBranchId=${currentGymBranchId}`);
      setUserData(data.data);
    } catch (error) {
      // Optionally handle error
      setUserData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.userConfigId === 'add') return;

    fetchUserById();
  }, [currentGymBranchId, params.userConfigId]);

  const base64ToBlob = (base64Data: string, contentType = 'image/jpeg') => {
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i += 512) {
      const slice = byteCharacters.slice(i, i + 512);
      const byteNumbers = new Array(slice.length);
      for (let j = 0; j < slice.length; j++) {
        byteNumbers[j] = slice.charCodeAt(j);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const handleFinish = async (values: any) => {
    if (params.userConfigId === 'add') {
      const formData = new FormData();

      // Append fields directly
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("role", values.role);
      formData.append("phone", values.phone);
      formData.append("gymBranchId", values.gymBranchId);
      formData.append("birthDate", new Date(values.birthDate).toISOString());
      formData.append("address", values.address);

      // Append image if available
      if (capturedImage) {
        const imageBlob = base64ToBlob(capturedImage);
        formData.append("image", imageBlob, "user-photo.jpg");
      }

      try {
        const apiurl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiurl}/api/auth`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        toast.success("User created successfully");
        router.push("/management/settings/account-details/user-configuration");
        console.log(response, "User created");
      } catch (error) {
        toast.error("User creation failed");
        console.error("User creation failed:", error);
      }
    }
    else {
      const payload = {
        fullName: values.fullName || userData && userData?.fullName,
        email: values.email || userData && userData?.email,
        role: values.role || userData && userData?.role,
        phone: values.phone || userData && userData?.phone,
        gymBranchId: values.gymBranchId || userData && userData?.gymBranchId,
        birthDate: values.birthDate || userData && userData?.birthDate,
      };

      try {
        const response = await putRequest(`/api/auth/${params.userConfigId}?gymBranchId=${currentGymBranchId}`, payload);
        toast.success("User data updated successfully")
        // message.success("User data updated successfully")
        router.push("/management/settings/account-details/user-configuration")
        console.log(response, "User data updated successfully");
      } catch (error) {
        toast.error("User data updation failed")
        console.error("User data updation failed:", error);
      }
    }

  };

  return loading ? (
    <main
      className="flex flex-col w-full h-full gap-6 p-3 bg-white rounded-xl"
      style={{
        boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
      }}
    >
      <div>
        <Skeleton active />
      </div>
    </main>
  ) : (
    <main
      className="flex flex-col w-full h-full gap-6 p-3 bg-white rounded-xl"
      style={{
        boxShadow: "0px 4px 8px rgba(193, 224, 255, 0.25)",
      }}
    >
      <Form
        className="w-full h-full flex flex-col gap-6 justify-between"
        form={form}
        onFinish={handleFinish}
      >
        <div className="w-full flex flex-col gap-4">
          <div className="bg-blue-secondary rounded-lg px-2 py-1 flex items-center justify-between">
            <div className="flex gap-2.5 items-center justify-between">
              <div className="h-[36px] w-[36px] bg-white border border-black-10 rounded-full flex items-center justify-center">
                <Image
                  src={`/images/iconly/light/buildings.svg`}
                  alt="Arrow"
                  width={20}
                  height={20}
                />
              </div>
              <div className="text-[20px] font-bold text-black-primary">
                {params.userConfigId === 'add' ? 'Create New User' : 'Edit User'}
              </div>
            </div>
          </div>

          <div className="w-full p-3 rounded-xl border border-black-10 gap-6 flex flex-col">
            <div className="flex flex-col gap-2">
              <h2 className="text-[14px] text-black-primary font-semibold leading-[100%] !m-0">
                User
              </h2>
              <p className="text-[14px] font-normal text-black-60 leading-[100%] !m-0">
                You can add multiple users as needed and assign each users role accordingly.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">

              <div className="px-4 max-w-md mx-auto flex gap-4 items-center">
                <div>
                  <h2 className="text-lg font-bold mb-3">Profile Image</h2>

                  <WebcamCapture onCapture={setCapturedImage} />
                </div>

                {capturedImage && (
                  <div className="mt-2">
                    <p className="!mb-1 ">Captured Image:</p>
                    <img
                      src={capturedImage}
                      alt="Captured"
                      className="w-40 h-40 object-cover border rounded"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-6">
                <FormInput
                  label="User Name"
                  name="fullName"
                  initialValue={userData && userData?.fullName}
                />

                <FormInput
                  label="Email"
                  name="email"
                  initialValue={userData && userData?.email}
                />

                <FormInput
                  label="Phone"
                  name="phone"
                  initialValue={userData && userData?.phone}
                />

              </div>

              {/* {params.userConfigId === 'add' && (
                <FormInput
                  label="Password"
                  name="password"
                  initialValue={userData && userData?.email}
                />
              )} */}

              <FormInput
                label='Address'
                name='address'
                initialValue={userData && userData?.address}
              />

              <FormSelect
                label="Role"
                name="role"
                options={UserRoleOptions}
                initialValue={userData && userData?.role}
              />



              <FormDate
                label='Date of Birth'
                name='birthDate'
                initialValue={userData && userData?.birthDate && dayjs(userData?.birthDate)}
              />

              <FormSelect
                label="Branch"
                name="gymBranchId"
                options={branchOptions}
                initialValue={userData && userData?.gymBranchId}
              />


            </div>
          </div>

          {/* <div className="w-full p-3 rounded-xl border border-[#D9D9D999] gap-6 flex flex-col">
            <div className="flex flex-col gap-2">
              <h2 className="text-[14px] text-black-primary font-semibold leading-[100%] !m-0">
                User Permission
              </h2>
              <p className="text-[14px] font-normal text-black-60 leading-[100%] !m-0">
                An Admin has full control over the system and user management, while a User has limited access restricted to their own activities.
              </p>
            </div>

            <Form.Item
              name="isMainBranch"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Radio.Group className="w-full !flex flex-col gap-4">
                <Radio
                  value={'ADMIN'}
                  className="text-[14px] text-black-primary font-semibold leading-[100%] !m-0"
                >
                  Admin
                </Radio>
                <Radio
                  value={'USER'}
                  className="text-[14px] text-black-primary font-semibold leading-[100%] !m-0"
                >
                  User
                </Radio>
              </Radio.Group>
            </Form.Item>
          </div> */}
        </div>

        {/* buttons */}
        <div className="flex gap-4">
          <Link href="/management/settings/account-details/user-configuration">
            <button
              type="button"
              className=" w-[147px] h-[40px] !bg-blue-secondary !text-black-primary rounded-lg px-4 py-2 cursor-pointer"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            className=" w-[147px] h-[40px] !bg-black-primary !text-white rounded-lg px-4 py-2 cursor-pointer"
          >
            {params.userConfigId === 'add' ? 'Create User' : 'Update User'}
          </button>
        </div>
      </Form>
    </main>
  );
};

export default UserConfigId;


