'use client'
import FormInput from '@/components/formComponents/FormInput';
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
                const data = await getRequest(`/api/trainees/${params.subscriptionId}?gymBranchId=${currentGymBranchId}`);
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





    const handleFinish = async (values: any) => {
        console.log(values, "values");

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
              "age": values.age,
              "address": values.address,
              "personalizedGoal": ["Fat Loss", "Muscle Gain"],
              "healthIssues": ["Back Pain"],
              "gymBranchId": values.gymBranchId,            },
            "traineeMembershipData": {
              "membershipId": values, 
              "discountedPrice": values.discountedPrice,
              "discountPercentage": values.discountPercentage,
              "reasonOfDiscount": values.reasonOfDiscount,
              "extraMonths": values.extraMonths,
              "startDate": values.startDate,
              "endDate": values.endDate,
              // gymId and gymBranchId will be added by the backend
            }
          }

        // gymBranchId, 
        // return;
        if (params.editMemberId != 'add') {
            // console.log('put request');
            const payload = {
                name: values.name || memberData?.name,
                actualPrice: Number(values.actualPrice) || Number(memberData.actualPrice),
                baseDuration: Number(values.baseDuration) || Number(memberData.baseDuration),
                benefits: [values.benefits || memberData?.benefits[0]],
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
                name: values.name,
                actualPrice: Number(values.actualPrice),
                baseDuration: Number(values.baseDuration),
                benefits: [values.benefits],
                gymBranchId: 'aa2ec403-de84-43eb-913a-9c63455f26ca'
            }
            try {
                const response = await postRequest(`/api/trainees`, payload);
                message.success("New Branch creared successfully")
                router.push("/management/members/members/")
                console.log(response, "new member created");
            } catch (error) {
                console.error("New Member creation failed:", error);
            }
        }

        onClose();
    };

    const handleCancel = () => {
        onClose()
    }

    return (
        <main className='w-full h-full'>
            <Form
                form={form}
                onFinish={handleFinish}
                initialValues={{
                    memberName: selectedMemberData?.name,
                }}
                layout="vertical"
                className='h-full flex flex-col justify-between gap-4'
            >
                {/* user data */}
                <div className='flex flex-col gap-4'>
                    <FormInput
                        label='Member name'
                        name='fullName'
                    />
                    <div className='w-full grid grid-cols-2 gap-4'>
                        <FormInput
                            label='Email'
                            name='email'
                        />

                        <FormInput
                            label='Mobile No.'
                            name='phone'
                        />

                        <FormInput
                            label='Reference Mobile No.'
                            name='referenceMobileNo'
                        />

                        <FormInput
                            label='Gender'
                            name='gender'
                        />

                        <FormInput
                            label='Age'
                            name='age'
                        />

                        <FormInput
                            label='Image'
                            name='image'
                        />


                    </div>

                    <FormInput
                        label='Address'
                        name='address'
                    />

                    <div className='w-full grid grid-cols-2 gap-4'>
                        <FormInput
                            label='Goal'
                            name='personalizedGoal'
                        />

                        <FormInput
                            label='Health Issues'
                            name='healthIssues'
                        />

                        <FormSelect
                            options={subscriptionDetailsData}
                            label='Subscription Plan'
                            name='membershipId'
                        />

                        <FormInput
                            label='Discounted Price'
                            name="discountedPrice"
                        />
                        <FormInput
                            label='Discount Percentage'
                            name='discountPercentage'
                        />
                        <FormInput
                            label='Reason of Discount'
                            name='reasonOfDiscount'
                        />
                        <FormInput
                            label='Extra Months'
                            name='extraMonths'
                        />
                        <FormSelect
                            options={branchOptions}
                            label='Branch Name'
                            name='gymBranchId'
                        />

                        <FormInput
                            label='Subscription end date'
                            name='startDate'
                        />
                        <FormInput
                            label='Subscription start date'
                            name='endDate'
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
        </main>
    )
}

export default AddMember
