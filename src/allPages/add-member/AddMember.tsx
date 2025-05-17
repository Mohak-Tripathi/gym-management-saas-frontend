'use client'
import FormDate from '@/components/formComponents/FormDate';
import FormInput from '@/components/formComponents/FormInput';
import FormMultiselect from '@/components/formComponents/FormMultiselect';
import FormSelect from '@/components/formComponents/FormSelect';
import { getRequest, postRequest, putRequest } from '@/lib/services/request';
import { Form, Skeleton } from 'antd'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { toast } from 'sonner';

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
    const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"
    const [loading, setLoading] = useState(false);
    const [subscriptionDetailsData, setSubscriptionDetailsData] = useState<any[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
    const [discountedPrice, setDiscounbtedPrice] = useState(0)

    const { branches } = useSelector((state: any) => state.branch);

    const branchOptions = branches?.map((branch: any) => ({
        value: branch.id,
        label: branch.name,
    }));

    const GenderOptions = [{
        value: "MALE",
        label: "Male",
    }, {

        value: "FEMALE",
        label: "Female",
    }]

    const fetchAllSubscriptionPlan = async () => {
        setLoading(true);
        try {
            const data = await getRequest(`/api/memberships?gymBranchId=${currentGymBranchId}`);
            // Extract only id and name
            const filteredData = data.map((plan: any) => ({
                value: plan.id,
                label: plan.name,
                price: plan.actualPrice,
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
        if (params.editMemberId != 'add') {

            const payload = {
                "userData": {
                    "email": values.email || memberData?.user?.email,
                    "fullName": values.fullName || memberData?.user?.fullName,
                    "role": "TRAINEE",
                    "phone": values.phone || memberData?.user?.phone,
                },
                "traineeData": {
                    "referenceMobileNo": values.referenceMobileNo || memberData?.referenceMobileNo,
                    "gender": values.gender || memberData?.gender,
                    "image": values.image || memberData?.image,
                    "age": Number(values.age) || memberData?.age,
                    "address": values.address || memberData?.address,
                    "personalizedGoal": values.personalizedGoal || memberData?.personalizedGoal,
                    "healthIssues": values.healthIssues || memberData?.healthIssues,
                    "gymBranchId": values.gymBranchId || memberData?.gymBranchId,
                },
                "traineeMembershipData": {
                    "membershipId": values.membershipId || memberData?.traineeMemberships[0]?.membershipId,
                    "discountedPrice": discountedPrice,
                    "discountPercentage": Number(values.discountPercentage) || memberData?.traineeMemberships[0]?.discountPercentage,
                    "reasonOfDiscount": values.reasonOfDiscount || memberData?.traineeMemberships[0]?.reasonOfDiscount,
                    "extraMonths": Number(values.extraMonths) || memberData?.traineeMemberships[0]?.extraMonths,
                    "startDate": values.startDate || memberData?.traineeMemberships[0]?.startDate,
                    "endDate": values.endDate || memberData?.traineeMemberships[0]?.endDate,
                }
            }

            try {
                const response = await putRequest(`/api/trainees/${params.editMemberId}?gymBranchId=${currentGymBranchId}`, payload);

                toast.success("Member data update successfully")
                router.push("/management/members/members/")
                console.log(response, "members updated");
            } catch (error) {
                console.error("Branch creation failed:", error);
                toast.error("Failed to update member")
            }
        } else {
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
                    "discountedPrice": discountedPrice,
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
                toast.success("New Member added successfully")
                router.push("/management/members/members/")
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
                            label='Reference Mobile No.'
                            name='referenceMobileNo'
                            initialValue={memberData && memberData?.referenceMobileNo}
                        />

                        <FormSelect
                            label='Gender'
                            name='gender'
                            options={GenderOptions}

                            initialValue={memberData && memberData?.gender}
                        />

                        <FormInput
                            label='Age'
                            name='age'
                            initialValue={memberData && memberData?.age}
                        />

                        <FormInput
                            label='Image'
                            name='image'
                            initialValue={memberData && memberData?.image}
                        />

                    </div>

                    <FormInput
                        label='Address'
                        name='address'
                        initialValue={memberData && memberData?.address}
                    />

                    <div className='w-full grid grid-cols-2 gap-4'>
                        <FormMultiselect
                            options={userGoals}
                            label='Goal'
                            name='personalizedGoal'
                            initialValue={memberData && memberData?.personalizedGoal}
                        />

                        <FormMultiselect
                            options={healthIssues}
                            label='Health Issues'
                            name='healthIssues'
                            initialValue={memberData && memberData?.healthIssues}
                        />

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

                </div>

                {/* buttons */}
                <div className='flex justify-start gap-6 '>
                    <button
                        type='button'
                        onClick={() => handleCancel()}
                        className=' w-[147px] h-8 !bg-blue-secondary !text-black-primary rounded-lg px-4 py-2 cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className=' w-[147px] h-8 !bg-black-primary !text-white rounded-lg px-4 py-2 cursor-pointer'
                    >
                        {params?.editMemberId === 'add' ? 'Add Member' : 'Edit Member'}
                    </button>
                </div>
            </Form>

        </main>
    )

}

export default AddMember
