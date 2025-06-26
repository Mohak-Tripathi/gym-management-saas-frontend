'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Skeleton } from 'antd'
import Image from 'next/image';
import FormInput from '@/components/formComponents/FormInput';
import FormSelect from '@/components/formComponents/FormSelect';
import FormDate from '@/components/formComponents/FormDate';
import { useParams, useRouter } from 'next/navigation';
import WebcamCapture from '@/components/WebcamCapture';
import { getRequest } from '@/lib/services/request';
import { useSelector } from 'react-redux';
import { bloodGroupData, genderOption, userGoals } from '@/constant/dropdownData';
import FormMultiselect from '@/components/formComponents/FormMultiselect';
import { toast } from 'sonner';

const MemberDetails = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const params = useParams();
    const [memberData, setMemberData] = useState<any>({});
    const { selectedBranch } = useSelector((state: any) => state.selectedBranch);
    const token = useSelector((state: any) => state.user.loggedinUserData?.token);
    const currentGymBranchId = selectedBranch.id;
    const [loading, setLoading] = useState(false);
    const [subscriptionDetailsData, setSubscriptionDetailsData] = useState<any[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const [discountedPrice, setDiscounbtedPrice] = useState(0);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    const { branches } = useSelector((state: any) => state.branch);

    const branchOptions = branches?.map((branch: any) => ({
        value: branch.id,
        label: branch.name,
    }));

    const fetchAllSubscriptionPlan = async () => {
        setLoading(true);
        try {
            const data = await getRequest(`/api/memberships?gymBranchId=${currentGymBranchId}`);
            // Extract only id and name
            const filteredData = data.map((plan: any) => ({
                value: plan.id,
                label: plan.name,
                price: plan.actualPrice,
                months: plan?.baseDuration
            }));

            setSubscriptionDetailsData(filteredData);

        } catch (error) {
            // Optionally handle error
            setSubscriptionDetailsData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllSubscriptionPlan();
    }, [selectedBranch]);

    // Utility to calculate age from date of birth
    const calculateAge = (birthDate: string | Date): number => {
        const dob = new Date(birthDate);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        return age;
    };

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

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setCapturedImage(base64); // This will update and also use the same logic you're using for formData
            };
            reader.readAsDataURL(file);
        }
    };


    const handleFinish = async (values: any) => {
        const birthDate = values.birthDate
        const formData = new FormData();
        // Append userData
        formData.append("userData", JSON.stringify({
            email: values.email,
            fullName: values.fullName,
            role: "TRAINEE",
            phone: values.phone,
            address: values.address,
            birthDate,
            aadharNumber: values.aadharNumber,
            bloodGroup: values.bloodGroup,
            clientRepresentative: values.clientRepresentative
        }));
        // Append traineeData
        formData.append("traineeData", JSON.stringify({
            referenceMobileNo: values.referenceMobileNo,
            gender: values.gender,
            personalizedGoal: values.personalizedGoal,
            healthIssues: values.healthIssues,
            height: Number(values.height),
            weight: Number(values.weight),
            bmi: Number(values.bmi),
            bodyFatPercentage: Number(values.bodyFatPercentage),
            // age: birthDate ? calculateAge(birthDate) : undefined,

            // TODO
            // trinerId: 
            gymBranchId: currentGymBranchId,
        }));

        // Append traineeMembershipData
        formData.append("traineeMembershipData", JSON.stringify({
            membershipId: values.membershipId,
            extraMonths: Number(values.extraMonths),
            startDate: values.startDate,
            endDate: values.endDate,
            // discountedPrice: discountedPrice,
            // discountPercentage: Number(values.discountPercentage),
            // reasonOfDiscount: values.reasonOfDiscount,
        }));

        // Convert and append image
        if (capturedImage) {
            const imageBlob = base64ToBlob(capturedImage);
            formData.append("image", imageBlob, "photo.jpg");
        }
        try {
            const apiurl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiurl}/api/trainees`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                toast.error("Failed to add new member");
                return;
            }
            toast.success("New Member added successfully");
            router.push("/management/members/member-payment-details/add");
            console.log(response, "new member created");

        } catch (error) {
            console.error("New Member creation failed:", error);
            toast.error("Failed to add new member")
        }

    };

    const handleCancel = () => {
        router.push("/management/members/members/");
    }

    return loading ? (
        <main className='flex flex-1 flex-col justify-between gap-6 w-full bg-white !p-6 rounded-xl'>
            <Skeleton active />
        </main>
    ) : (
        <main className='w-full flex flex-col gap-4 flex-1'>

            <div className='relative'>
                <div
                    onClick={() => router.push(`/management/members/members`)}
                    className='flex items-center gap-2 cursor-pointer'>
                    <Image
                        src={"/images/iconly/light/Arrow.svg"}
                        alt="back"
                        width={0}
                        height={0}
                        className='w-5 h-5 cursor-pointer'

                    />
                    <p className='text-[14px] text-black-primary font-normal flex items-center gap-1 !m-0'>
                        Members
                        <Image
                            src={`/images/iconly/light/arrowBlack.svg`}
                            alt="back"
                            width={0}
                            height={0}
                            className='w-5 h-5'
                        />
                        <span className='text-[14px] text-black-primary font-bold '>
                            Add New Member
                        </span>
                    </p>
                </div>

                {params?.memberDetailsId == 'add' && (
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <div className='flex items-center gap-3 '>
                            <p className='font-roboto font-bold text-[14px] leading-[100%] tracking-[0px] align-middle text-black-primary !m-0'>Step 1 - Member Details</p>
                            <Image
                                src={`/images/iconly/light/stepper.svg`}
                                alt="back"
                                width={0}
                                height={0}
                                className='w-16 h-2'
                            />
                            <p className='font-roboto font-bold text-[14px] leading-[100%] tracking-[0px] align-middle text-black-primary !m-0'>Step 2 - Payment Details</p>
                        </div>
                    </div>
                )}
            </div>

            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                className='flex flex-1 flex-col justify-between gap-6 w-full bg-white !p-6 rounded-xl'
            >

                <div className='flex gap-14 w-full'>
                    {/* left */}
                    <div className='w-[40%] flex flex-col gap-6'>
                        <div className='flex gap-7'>
                            <div className='rounded-xl'>
                                <Image
                                    src={`${capturedImage ? capturedImage : '/images/iconly/light/dummyUserProfile.svg'}`}
                                    height={0}
                                    width={0}
                                    alt='profile'
                                    className='h-[96px] w-[96px] rounded-xl'
                                />
                            </div>
                            <div className='flex flex-col justify-between gap-4'>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-roboto font-bold text-[14px] leading-[100%] tracking-[0px] align-middle text-black-primary !m-0'>Profile Image</p>
                                    <p className='font-roboto font-normal text-[12px] leading-[100%] tracking-[0px] align-middle text-black-60 !m-0'>Open web cam to capture image and upload image from your device.</p>
                                </div>
                                <div className='flex gap-3'>

                                    <WebcamCapture onCapture={setCapturedImage} />

                                    {/* <div className='h-[32px] w-[120px] rounded-[66px] border-[1px] border-solid border-black-10 py-1.5 pl-3 pr-2 flex items-center justify-center gap-2.5 cursor-pointer'>
                                        <Image
                                            src={`/images/iconly/light/upload.svg`}
                                            height={0}
                                            width={0}
                                            alt='upload'
                                            className='h-[20px] w-[20px]'
                                        />
                                        <p className='font-roboto font-semibold text-[12px] leading-[100%] tracking-[0px] align-middl text-black-primary !m-0'>Upload</p>
                                    </div> */}

                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className='h-[32px] w-[120px] rounded-[66px] border-[1px] border-solid border-black-10 py-1.5 pl-3 pr-2 flex items-center justify-center gap-2.5 cursor-pointer'
                                    >
                                        <Image
                                            src={`/images/iconly/light/upload.svg`}
                                            height={0}
                                            width={0}
                                            alt='upload'
                                            className='h-[20px] w-[20px]'
                                        />
                                        <p className='font-roboto font-semibold text-[12px] leading-[100%] tracking-[0px] align-middl text-black-primary !m-0'>
                                            Upload
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>


                                    <div className='h-[32px] w-[120px] rounded-[66px] border-[1px] border-solid border-black-10 py-1.5 pl-3 pr-2 flex items-center justify-center gap-2.5 cursor-pointer'>
                                        <Image
                                            src={`/images/iconly/light/reset.svg`}
                                            height={0}
                                            width={0}
                                            alt='reset'
                                            className='h-[20px] w-[20px]'
                                        />
                                        <p className='font-roboto font-semibold text-[12px] leading-[100%] tracking-[0px] align-middl text-black-primary !m-0'>Reset</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <p className='font-roboto font-bold text-[14px] leading-[100%] tracking-[0px] align-middle text-black-primary !m-0'>
                            Mandatory Field
                        </p>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='col-span-2'>
                                <FormInput
                                    label='Member name'
                                    name='fullName'
                                />
                            </div>
                            <FormInput
                                label='Mobile No.'
                                name='phone'
                            />
                            <FormInput
                                label='Emergency Mobile No. (Optional)'
                                name='referenceMobileNo'
                            />

                            <FormSelect
                                label='Gender'
                                name='gender'
                                options={genderOption}
                            />
                            <FormDate
                                label='Date Of Birth'
                                name='birthDate'
                            />

                            <FormSelect
                                label='Subscription Name'
                                name='membershipId'
                                options={subscriptionDetailsData}
                            />
                            <FormInput
                                label='Add On Duration Term (Optional)'
                                name='extraMonths'
                            />
                        </div>
                    </div>

                    {/* right */}
                    <div className='flex-1 flex flex-col gap-6 mt-10'>
                        <p className='font-roboto font-bold text-[14px] leading-[100%] tracking-[0px] align-middle text-black-primary !m-0'>Optional Field</p>
                        <div className='grid grid-cols-3 gap-4'>

                            <FormInput
                                label='Email'
                                name='email'
                            />

                            <FormInput
                                label='Aadhar Number'
                                name='aadharNumber'
                            />

                            <FormInput
                                label='Body Fat %'
                                name='bodyFat'
                            />

                            <FormInput
                                label='BMI'
                                name='bmi'
                            />
                            <FormInput
                                label='Height'
                                name='height'
                            />
                            <FormInput
                                label='Weight'
                                name='weight'
                            />

                            <FormSelect
                                label='Trainer Assign to Member'
                                name='assignTrainer'
                            />
                            <FormMultiselect
                                label='Member Goal'
                                name='goal'
                                options={userGoals}
                            />

                            <FormSelect
                                label='Blood Group'
                                name='bloodGroup'
                                options={bloodGroupData}
                            />

                            <div className='col-span-2'>
                                <FormInput
                                    label='Health Issues'
                                    name='healthIssues'
                                />
                            </div>

                            <FormInput
                                label='Address'
                                name='address'
                            />

                            <FormDate
                                label='Start Date'
                                name='startDate'
                            />
                            <FormDate
                                label='End Date'
                                name='endDate'
                            />
                            <FormSelect
                                label='Client Representative'
                                name='clientRepresentative'
                            />
                        </div>
                    </div>
                </div>

                {/* button */}
                <div className='flex justify-start gap-6 '>
                    <button
                        type='button'
                        onClick={() => handleCancel()}
                        className=' w-[147px] !bg-blue-secondary !text-black-primary rounded-xl px-4 py-2 cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className=' w-[147px] !bg-black-primary !text-white rounded-xl px-4 py-2 cursor-pointer'
                    >
                        Next
                    </button>
                </div>
            </Form>
        </main>
    )
}

export default MemberDetails
