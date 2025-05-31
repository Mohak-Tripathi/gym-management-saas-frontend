'use client'
import FormDate from '@/components/formComponents/FormDate';
import FormInput from '@/components/formComponents/FormInput';
import FormMultiselect from '@/components/formComponents/FormMultiselect';
import FormSelect from '@/components/formComponents/FormSelect';
import { getRequest, postRequest, putRequest } from '@/lib/services/request';
import { Form, Input, Skeleton } from 'antd'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import WebcamCapture from '@/components/WebcamCapture';
import { genderOption, healthIssues, userGoals } from '@/constant/dropdownData';

interface AddMemberProps {
    onClose: () => void;
    open: boolean;
    selectedMemberData?: any;
}

const AddMember: React.FC<AddMemberProps> = ({ onClose }) => {
    const [form] = Form.useForm();
    const router = useRouter()
    const params = useParams()
    const [memberData, setMemberData] = useState<any>({});
    const { selectedBranch } = useSelector((state: any) => state.selectedBranch);
    const token = useSelector((state: any) => state.user.loggedinUserData?.token);
    const currentGymBranchId = selectedBranch.id;
    const [loading, setLoading] = useState(false);
    const [subscriptionDetailsData, setSubscriptionDetailsData] = useState<any[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const [discountedPrice, setDiscounbtedPrice] = useState(0)
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

    useEffect(() => {

        if (params.editMemberId === "add") return;

        const fetchMemberDataById = async () => {
            console.log('memberDataHitted');

            setLoading(true);
            try {
                const data = await getRequest(`/api/trainees/${params.editMemberId}?gymBranchId=${currentGymBranchId}`);
                setMemberData(data.data);
            } catch (error) {
                // Optionally handle error
                setMemberData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMemberDataById();
    }, [])




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

    const handleFinish = async (values: any) => {
        if (params.editMemberId != 'add') {
            // const birthDate = values.birthDate || memberData?.user?.birthDate;

            // const payload = {
            //     "userData": {
            //         "email": values.email || memberData?.user?.email,
            //         "fullName": values.fullName || memberData?.user?.fullName,
            //         "role": "TRAINEE",
            //         "phone": values.phone || memberData?.user?.phone,
            //         birthDate,
            //     },
            //     "traineeData": {
            //         "referenceMobileNo": values.referenceMobileNo || memberData?.referenceMobileNo,
            //         "gender": values.gender || memberData?.gender,
            //         "image": values.image || memberData?.image,
            //         "age": birthDate ? calculateAge(birthDate) : memberData?.age,
            //         "address": values.address || memberData?.address,
            //         "personalizedGoal": values.personalizedGoal || memberData?.personalizedGoal,
            //         "healthIssues": values.healthIssues || memberData?.healthIssues,
            //         "gymBranchId": values.gymBranchId || memberData?.gymBranchId,
            //     },
            //     "traineeMembershipData": {
            //         "membershipId": values.membershipId || memberData?.traineeMemberships[0]?.membershipId,
            //         "discountedPrice": discountedPrice,
            //         "discountPercentage": Number(values.discountPercentage) || memberData?.traineeMemberships[0]?.discountPercentage,
            //         "reasonOfDiscount": values.reasonOfDiscount || memberData?.traineeMemberships[0]?.reasonOfDiscount,
            //         "extraMonths": Number(values.extraMonths) || memberData?.traineeMemberships[0]?.extraMonths,
            //         "startDate": values.startDate || memberData?.traineeMemberships[0]?.startDate,
            //         "endDate": values.endDate || memberData?.traineeMemberships[0]?.endDate,
            //     }
            // }

            // try {
            //     const response = await putRequest(`/api/trainees/${params.editMemberId}?gymBranchId=${currentGymBranchId}`, payload);

            //     toast.success("Member data update successfully")
            //     router.push("/management/members/members/")
            //     console.log(response, "members updated");
            // } catch (error) {
            //     console.error("Branch creation failed:", error);
            //     toast.error("Failed to update member")
            // }
            const birthDate = values.birthDate || memberData?.user?.birthDate;
            const formData = new FormData();

            // Append userData
            formData.append("userData", JSON.stringify({
                email: values.email || memberData?.user?.email,
                fullName: values.fullName || memberData?.user?.fullName,
                role: "TRAINEE",
                phone: values.phone || memberData?.user?.phone,
                birthDate,
            }));

            // Append traineeData
            formData.append("traineeData", JSON.stringify({
                referenceMobileNo: values.referenceMobileNo || memberData?.referenceMobileNo,
                gender: values.gender || memberData?.gender,
                height: Number(values.height) || memberData?.height,
                weight: Number(values.weight) || memberData?.weight,
                bmi: Number(values.bmi) || memberData?.bmi,
                bodyFatPercentage: Number(values.bodyFatPercentage) || memberData?.bodyFatPercentage,
                age: birthDate ? calculateAge(birthDate) : memberData?.age,
                address: values.address || memberData?.address,
                personalizedGoal: values.personalizedGoal || memberData?.personalizedGoal,
                healthIssues: values.healthIssues || memberData?.healthIssues,
                gymBranchId: values.gymBranchId || memberData?.gymBranchId,
            }));

            // Append traineeMembershipData
            formData.append("traineeMembershipData", JSON.stringify({
                membershipId: values.membershipId || memberData?.traineeMemberships[0]?.membershipId,
                discountedPrice: discountedPrice,
                discountPercentage: Number(values.discountPercentage) || memberData?.traineeMemberships[0]?.discountPercentage,
                reasonOfDiscount: values.reasonOfDiscount || memberData?.traineeMemberships[0]?.reasonOfDiscount,
                extraMonths: Number(values.extraMonths) || memberData?.traineeMemberships[0]?.extraMonths,
                startDate: values.startDate || memberData?.traineeMemberships[0]?.startDate,
                endDate: values.endDate || memberData?.traineeMemberships[0]?.endDate,
            }));

            // Convert and append image (if present)
            if (capturedImage) {
                const imageBlob = base64ToBlob(capturedImage);
                formData.append("image", imageBlob, "photo.jpg");
            }

            if(!capturedImage) {
                formData.append("image", memberData?.imageUrl);
            }

            try {
                const apiurl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiurl}/api/trainees/${params.editMemberId}?gymBranchId=${currentGymBranchId}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });

                if (!response.ok) throw new Error("Update failed");

                toast.success("Member data updated successfully");
                router.push("/management/members/members/");
                console.log(await response.json(), "member updated");
            } catch (error) {
                console.error("Member update failed:", error);
                toast.error("Failed to update member");
            }

        } else {
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
            }));
            // Append traineeData
            formData.append("traineeData", JSON.stringify({
                referenceMobileNo: values.referenceMobileNo,
                gender: values.gender,
                height: Number(values.height),
                weight: Number(values.weight),
                bmi: Number(values.bmi),
                bodyFatPercentage: Number(values.bodyFatPercentage),
                age: birthDate ? calculateAge(birthDate) : undefined,
                personalizedGoal: values.personalizedGoal,
                healthIssues: values.healthIssues || [],
                gymBranchId: values.gymBranchId,
            }));

            // Append traineeMembershipData
            formData.append("traineeMembershipData", JSON.stringify({
                membershipId: values.membershipId,
                discountedPrice: discountedPrice,
                discountPercentage: Number(values.discountPercentage),
                reasonOfDiscount: values.reasonOfDiscount,
                extraMonths: Number(values.extraMonths),
                startDate: values.startDate,
                endDate: values.endDate,
            }));

            // Convert and append image
            if (capturedImage) {
                const imageBlob = base64ToBlob(capturedImage);
                formData.append("image", imageBlob, "photo.jpg");
            }
            try {
                // const response = await postRequest(`/api/trainees`, payload);
                const apiurl = process.env.NEXT_PUBLIC_API_URL;
                const response = await fetch(`${apiurl}/api/trainees`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });
                toast.success("New Member added successfully");
                router.push("/management/members/members/");
                console.log(response, "new member created");
            } catch (error) {
                console.error("New Member creation failed:", error);
                toast.error("Failed to add new member")
            }
        }

        // onClose();
    };

    const handleCancel = () => {
        onClose()
    }

    const handleSelectChange = (value: string | number) => {
        const selected = subscriptionDetailsData.find((option) => option.value === value);
        if (selected) {
            setSelectedPrice(selected.price);
            const discount = form.getFieldValue('discountPercentage') || 0;
            const discountedPrice = selected.price * (1 - discount / 100);
            form.setFieldsValue({
                discountedPrice: Math.round(discountedPrice),
            });
            setDiscounbtedPrice(Math.round(discountedPrice));
        }
    };

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const discount = parseFloat(e.target.value);
        if (selectedPrice != null && !isNaN(discount)) {
            const discountedPrice = selectedPrice * (1 - discount / 100);
            form.setFieldsValue({
                discountedPrice: Math.round(discountedPrice),
            });
            setDiscounbtedPrice(Math.round(discountedPrice));
        }
    };

    return loading ? (
        <div>
            <Skeleton active />
        </div>
    ) : (

        <main className='w-full h-full'>

            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                className='h-full flex flex-col justify-between gap-8'
            >
                {/* user data */}
                <div className='flex flex-col gap-4 h-[calc(100%-40px)]  overflow-y-scroll pr-2'>
                    <div className="px-4 max-w-md mx-auto flex flex-col items-center">
                        <h2 className="text-lg font-bold mb-3">Profile Image</h2>

                        <WebcamCapture onCapture={setCapturedImage} />

                        {!capturedImage && memberData?.imageUrl && (
                            <>
                                <img
                                    src={memberData?.imageUrl}
                                    alt="Captured"
                                    className=" mt-2 w-40 h-40 object-cover border rounded"
                                />
                            </>
                        )}

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

                    <FormInput
                        label='Member name'
                        name='fullName'
                        initialValue={memberData && memberData?.user?.fullName}
                    />
                    <div className='w-full grid grid-cols-2 gap-4'>
                        <FormInput
                            label='Email'
                            name='email'
                            initialValue={memberData && memberData?.user?.email}
                        />

                        <FormInput
                            label='Mobile No.'
                            name='phone'
                            initialValue={memberData && memberData?.user?.phone}
                        />

                        <FormInput
                            label='Height (cm)'
                            name='height'
                            initialValue={memberData && memberData?.height}
                        />

                        <FormInput
                            label='Weight (kg)'
                            name='weight'
                            initialValue={memberData && memberData?.weight}
                        />

                        <FormInput
                            label='BMI'
                            name='bmi'
                            initialValue={memberData && memberData?.bmi}
                        />

                        <FormInput
                            label='Body Fat Percentage'
                            name='bodyFatPercentage'
                            initialValue={memberData && memberData?.bodyFatPercentage}
                        />
                        <div className='col-span-2'>
                            <FormInput
                                label='Address'
                                name='address'
                                initialValue={memberData && memberData?.address}
                            />
                        </div>

                        <FormSelect
                            options={subscriptionDetailsData}
                            label='Subscription Plan'
                            name='membershipId'
                            onChange={handleSelectChange}
                            initialValue={memberData && memberData?.traineeMemberships && memberData?.traineeMemberships.length > 0 && memberData?.traineeMemberships[0]?.membershipId}
                        />

                        <FormInput
                            label='Discount %'
                            name='discountPercentage'
                            onChange={handleDiscountChange}
                            initialValue={memberData && memberData?.traineeMemberships && memberData?.traineeMemberships.length > 0 && memberData?.traineeMemberships[0]?.discountPercentage}
                        />

                        <FormInput
                            label='Discounted Price'
                            name="discountedPrice"
                            initialValue={memberData && memberData?.traineeMemberships && memberData?.traineeMemberships.length > 0 && memberData?.traineeMemberships[0]?.discountedPrice}
                            disable={true}
                        />

                        <FormInput
                            label='Reason of Discount'
                            name='reasonOfDiscount'
                            initialValue={memberData && memberData?.traineeMemberships && memberData?.traineeMemberships.length > 0 && memberData?.traineeMemberships[0]?.reasonOfDiscount}

                        />
                        <FormInput
                            label='Extra Months'
                            name='extraMonths'
                            initialValue={memberData && memberData?.traineeMemberships && memberData?.traineeMemberships.length > 0 && memberData?.traineeMemberships[0]?.extraMonths}

                        />
                        <FormSelect
                            options={branchOptions}
                            label='Branch Name'
                            name='gymBranchId'
                            initialValue={memberData && memberData?.gymBranchId}
                        />

                        <FormDate
                            label='Subscription start date'
                            name='startDate'
                            initialValue={memberData && memberData?.traineeMemberships && memberData?.traineeMemberships.length > 0 && dayjs(memberData?.traineeMemberships[0]?.endDate)}
                        />

                        <FormDate
                            label='Subscription end date'
                            name='endDate'
                            initialValue={memberData && memberData?.traineeMemberships && memberData?.traineeMemberships.length > 0 && dayjs(memberData?.traineeMemberships[0]?.startDate)}
                        />

                    </div>



                    <div className='w-full grid grid-cols-2 gap-4'>
                        <FormInput
                            label='Reference Mobile No.'
                            name='referenceMobileNo'
                            initialValue={memberData && memberData?.referenceMobileNo}
                        />

                        <FormSelect
                            label='Gender'
                            name='gender'
                            options={genderOption}

                            initialValue={memberData && memberData?.gender}
                        />

                        <FormDate
                            label='Date of Birth'
                            name='birthDate'
                            initialValue={memberData && memberData?.user?.birthDate && dayjs(memberData?.user?.birthDate)}
                        />

                        {/* <FormInput
                            label='Image'
                            name='image'
                            initialValue={memberData && memberData?.image}
                        /> */}

                        <FormMultiselect
                            options={userGoals}
                            label='Goal'
                            name='personalizedGoal'
                            initialValue={memberData && memberData?.personalizedGoal}
                        />

                        <FormInput
                            // options={healthIssues}
                            label='Health Issues'
                            name='healthIssues'
                            initialValue={memberData && memberData?.healthIssues}
                        />

                    </div>

                </div>

                {/* buttons */}
                <div className='flex justify-start gap-6 '>
                    <button
                        type='button'
                        onClick={() => handleCancel()}
                        className=' w-[147px] !bg-blue-secondary !text-black-primary rounded-lg px-4 py-2 cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className=' w-[147px] !bg-black-primary !text-white rounded-lg px-4 py-2 cursor-pointer'
                    >
                        {params?.editMemberId === 'add' ? 'Add Member' : 'Edit Member'}
                    </button>
                </div>
            </Form>

        </main>
    )

}

export default AddMember
