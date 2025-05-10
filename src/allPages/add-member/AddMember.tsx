'use client'
import FormDate from '@/components/formComponents/FormDate';
import FormInput from '@/components/formComponents/FormInput';
import FormMultiselect from '@/components/formComponents/FormMultiselect';
import FormSelect from '@/components/formComponents/FormSelect';
import { membersData } from '@/constant/membersData';
import { getRequest, postRequest, putRequest } from '@/lib/services/request';
import { Form, message } from 'antd'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface AddMemberProps {
    onClose: () => void;
    open: boolean;
    selectedMemberData?: any;
}

const AddMember: React.FC<AddMemberProps> = ({ onClose, open, selectedMemberData }) => {
    const [form] = Form.useForm();
    const router = useRouter()
    const params = useParams()
    const [memberData, setMemberData] = useState<any>({});
    // const [currentGymBranchId, setCurrentGymBranchId] = useState<string | null>(null);
    const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"
    const [loading, setLoading] = useState(false);
    const [subscriptionDetailsData, setSubscriptionDetailsData] = useState<any[]>([]);

    console.log(subscriptionDetailsData, "subscriptionDetailsData");

    const { branches } = useSelector((state: any) => state.branch);

    const branchOptions = branches?.map((branch: any) => ({
        value: branch.id,
        label: branch.name,
    }));



    const fetchAllSubscriptionPlan = async () => {
        setLoading(true);
        try {
            const data = await getRequest(`/api/memberships?gymBranchId=${currentGymBranchId}`);
            console.log(data, "subscriptionPlan");

            // Extract only id and name
            const filteredData = data.map((plan: any) => ({
                value: plan.id,
                label: plan.name,
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
    }, []);



    useEffect(() => {

        if (params.editMemberId === "add") return;

        const fetchMemberDataById = async () => {
            setLoading(true);
            try {
                const data = await getRequest(`/api/trainees/${params.editMemberId}?gymBranchId=${currentGymBranchId}`);
                console.log(data, "gymSubscriptiondata");
                setMemberData(data);
            } catch (error) {
                // Optionally handle error
                setMemberData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMemberDataById();
    }, [])


    const healthIssues = [
        { value: 'Diabetes', label: 'Diabetes' },
        { value: 'Hypertension', label: 'Hypertension' },
        { value: 'Asthma', label: 'Asthma' },
        { value: 'HeartDisease', label: 'Heart Disease' },
        { value: 'JointPain', label: 'Joint Pain' },
        { value: 'BackPain', label: 'Back Pain' },
        { value: 'Obesity', label: 'Obesity' },
        { value: 'Arthritis', label: 'Arthritis' },
        { value: 'Thyroid', label: 'Thyroid' },
        { value: 'PCOS', label: 'PCOS' },
    ];

    const userGoals = [
        { value: 'WeightLoss', label: 'Weight Loss' },
        { value: 'MuscleGain', label: 'Muscle Gain' },
        { value: 'GeneralFitness', label: 'General Fitness' },
        { value: 'Endurance', label: 'Build Endurance' },
        { value: 'Flexibility', label: 'Improve Flexibility' },
        { value: 'Rehabilitation', label: 'Rehabilitation' },
        { value: 'StressRelief', label: 'Stress Relief' },
        { value: 'BodyToning', label: 'Body Toning' },
        { value: 'SportsPerformance', label: 'Sports Performance' },
        { value: 'PostPregnancyFitness', label: 'Post-Pregnancy Fitness' },
    ];






    const handleFinish = async (values: any) => {
        console.log(values, "values");

        if (params.editMemberId != 'add') {

            const payload = {
                "userData": {
                    "email": values.email || memberData?.userData?.email,
                    "fullName": values.fullName || memberData?.userData?.fullName,
                    "role": "TRAINEE",
                    "phone": values.phone || memberData?.userData?.phone,
                },
                "traineeData": {
                    "referenceMobileNo": values.referenceMobileNo || memberData?.traineeData?.referenceMobileNo,
                    "gender": values.gender,
                    "image": values.image || memberData?.traineeData?.image,
                    "age": values.age || memberData?.traineeData?.age,
                    "address": values.address || memberData?.traineeData?.address,
                    "personalizedGoal": values.personalizedGoal || memberData?.traineeData?.personalizedGoal,
                    "healthIssues": values.healthIssues || memberData?.traineeData?.healthIssues,
                    "gymBranchId": values.gymBranchId || memberData?.traineeData?.gymBranchId,
                },
                "traineeMembershipData": {
                    "membershipId": values.membershipId,
                    "discountedPrice": values.discountedPrice,
                    "discountPercentage": values.discountPercentage,
                    "reasonOfDiscount": values.reasonOfDiscount,
                    "extraMonths": Number(values.extraMonths),
                    "startDate": values.startDate,
                    "endDate": values.endDate,
                    // gymId and gymBranchId will be added by the backend
                }
            }
   
            try {
                const response = await putRequest(`/api/trainees/${params.subscriptionId}?gymBranchId=${currentGymBranchId}`, payload);

                message.success("Members updated successfully")
                router.push("/management/members/members/")
                console.log(response, "members updated");
            } catch (error) {
                console.error("Branch creation failed:", error);
            }
        } else {
            console.log('post request');

            const payload = {
                "userData": {
                    "email": values.email,
                    "fullName": values.fullName,
                    "role": "TRAINEE",
                    "phone": values.phone,
                },
                "traineeData": {
                    "referenceMobileNo": values.referenceMobileNo,
                    "gender": values.gender,
                    "image": values.image,
                    "age": Number(values.age),
                    "address": values.address,
                    "personalizedGoal": values.personalizedGoal,
                    "healthIssues": values.healthIssues,
                    "gymBranchId": values.gymBranchId,
                },
                "traineeMembershipData": {
                    "membershipId": values.membershipId,
                    "discountedPrice": Number(values.discountedPrice),
                    "discountPercentage": Number(values.discountPercentage),
                    "reasonOfDiscount": values.reasonOfDiscount,
                    "extraMonths": Number(values.extraMonths),
                    "startDate": values.startDate,
                    "endDate": values.endDate,
                    // gymId and gymBranchId will be added by the backend
                }
            }
            try {
                const response = await postRequest(`/api/trainees`, payload);
                message.success("New Member got created successfully")
                router.push("/management/members/members/")
                console.log(response, "new member created");
            } catch (error) {
                console.error("New Member creation failed:", error);
            }
        }

        // onClose();
    };

    const handleCancel = () => {
        onClose()
    }

    return (

        <main className='w-full h-full'>
            {loading ? (
                <div>Loading...</div>
            ) : (
            <Form
                form={form}
                onFinish={handleFinish}
                // initialValues={{
                //     memberName: selectedMemberData?.name,
                // }}
                layout="vertical"
                className='h-full flex flex-col justify-between gap-4'
            >
                {/* user data */}
                <div className='flex flex-col gap-4'>
                    <FormInput
                        label='Member name'
                        name='fullName'
                        // initialValue={memberData && memberData.userData.fullName}
                    />
                    <div className='w-full grid grid-cols-2 gap-4'>
                        <FormInput
                            label='Email'
                            name='email'
                            // initialValue={memberData && memberData.userData.email}
                        />

                        <FormInput
                            label='Mobile No.'
                            name='phone'
                            // initialValue={memberData && memberData.userData.phone}
                        />

                        <FormInput
                            label='Reference Mobile No.'
                            name='referenceMobileNo'
                            // initialValue={memberData && memberData.traineeData.referenceMobileNo}
                        />

                        <FormInput
                            label='Gender'
                            name='gender'
                            // initialValue={memberData && memberData.traineeData.gender}
                        />

                        <FormInput
                            label='Age'
                            name='age'
                            // initialValue={memberData && memberData.traineeData.age}
                        />

                        <FormInput
                            label='Image'
                            name='image'
                            // initialValue={memberData && memberData.traineeData.image}
                        />


                    </div>

                    <FormInput
                        label='Address'
                        name='address'
                        // initialValue={memberData && memberData.traineeData.address}
                    />

                    <div className='w-full grid grid-cols-2 gap-4'>
                        <FormMultiselect
                            options={userGoals}
                            label='Goal'
                            name='personalizedGoal'
                            // initialValue={memberData && memberData.traineeData.personalizedGoal}
                        />

                        <FormMultiselect
                            options={healthIssues}
                            label='Health Issues'
                            name='healthIssues'
                            // initialValue={memberData && memberData.traineeData.healthIssues}
                        />

                        <FormSelect
                            options={subscriptionDetailsData}
                            label='Subscription Plan'
                            name='membershipId'
                            // initialValue={memberData}
                        />

                        <FormInput
                            label='Discounted Price'
                            name="discountedPrice"
                            // initialValue={memberData && memberData.traineeData.discountedPrice}
                        />
                        <FormInput
                            label='Discount Percentage'
                            name='discountPercentage'
                            //initialValue={memberData && memberData.traineeData.discountPercentage}
                        />
                        <FormInput
                            label='Reason of Discount'
                            name='reasonOfDiscount'
                            //initialValue={memberData && memberData.traineeData.reasonOfDiscount}
                        />
                        <FormInput
                            label='Extra Months'
                            name='extraMonths'
                            //initialValue={memberData && memberData.traineeData.extraMonths}

                        />
                        <FormSelect
                            options={branchOptions}
                            label='Branch Name'
                            name='gymBranchId'
                            //initialValue={memberData && memberData.traineeData.gymBranchId}
                        />

                        <FormDate
                            label='Subscription end date'
                            name='startDate'
                            //initialValue={memberData && memberData.traineeData.startDate}
                        />
                        <FormDate
                            label='Subscription start date'
                            name='endDate'
                            //initialValue={memberData && memberData.traineeData.endDate}
                        />

                    </div>

                </div>

                {/* buttons */}
                <div className='flex justify-center gap-4'>
                    <button
                        type='button'
                        onClick={() => handleCancel()}
                        className=' w-[147px] h-10 !bg-blue-secondary !text-black-primary rounded-lg px-4 py-2 cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className=' w-[147px] h-10 !bg-black-primary !text-white rounded-lg px-4 py-2 cursor-pointer'
                    >
                        Add Member
                    </button>
                </div>
            </Form>
            )}
        </main>
    )
}

export default AddMember
