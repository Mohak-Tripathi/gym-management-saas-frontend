'use client'
import FormDate from '@/components/formComponents/FormDate';
import FormInput from '@/components/formComponents/FormInput';
import FormSelect from '@/components/formComponents/FormSelect';
import { getRequest, postRequest, putRequest } from '@/lib/services/request';
import { Form, Skeleton } from 'antd'
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { leadStatusData } from '@/constant/leadsData';

interface AddTrainerProps {
    onClose: () => void;
    open: boolean;
    selectedTrainerData?: any;
}

const AddLeads: React.FC<AddTrainerProps> = ({ onClose, open, selectedTrainerData }) => {
    const [form] = Form.useForm();
    const router = useRouter()
    const params = useParams()
    const pathname = usePathname()
    const currentPath = pathname.split('/')[3]

    const [loading, setLoading] = useState(false);
    const [dealData, setdealData] = useState<any>({});
    const [subscriptionDetailsData, setSubscriptionDetailsData] = useState<any[]>([]);
    const { selectedBranch } = useSelector((state: any) => state.selectedBranch);
    const currentGymBranchId = selectedBranch.id;

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
        if (params.editLeadId === 'add') return;

        const fetchLeadById = async () => {
            setLoading(true);
            try {
                const data = await getRequest(`/api/crm-lead/${params.editLeadId}?gymBranchId=${currentGymBranchId}`);
                setdealData(data);
            } catch (error) {
                // Optionally handle error
                console.error("Lead data error:", error);
                setdealData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLeadById();
    }, [])

    const handleFinish = async (values: any) => {
        console.log(values, "values");
        
        if (params.editLeadId === 'add' || params.editDealId === 'add') {
            const payload = {
                name: values.name,
                email: values.email,
                contactNumber: values.contactNumber,
                whatsappNumber: values.whatsappNumber,
                probabilityPercent: Number(values.probabilityPercent),
                leadSource: values.leadSource,
                status: values.status,
                expectedMembershipId: values.expectedMembershipId,
                followUpDate: values.followUpDate,
                conversionDate: values.conversionDate,
                notes: values.notes,
                gymBranchId: values.gymBranchId,
            };

            try {
                const response = await postRequest("/api/crm-lead", payload);
                toast.success("New lead created successfully.")
                if (currentPath === "leads") {
                    router.push("/management/crm/leads")
                } else {
                    router.push("/management/crm/deals")
                }
                console.log(response, "lead created");
            } catch (error) {
                console.error("Lead creation failed:", error);
                toast.error("Lead creation failed. Please try again.");
            }

        } else {
            const payload = {
                name: values.name || dealData.name,
                email: values.email || dealData.email,
                contactNumber: values.contactNumber || dealData.contactNumber,
                whatsappNumber: values.whatsappNumber || dealData.whatsappNumber,
                probabilityPercent: Number(values.probabilityPercent) || dealData.probabilityPercent,
                leadSource: values.leadSource || dealData.leadSource,
                status: values.status || dealData.status,
                expectedMembershipId: values.expectedMembershipId || dealData.expectedMembershipId,
                followUpDate: values.followUpDate || dealData.followUpDate,
                conversionDate: values.conversionDate || dealData.conversionDate,
                notes: values.notes || dealData.notes,
                gymBranchId: values.gymBranchId || dealData.gymBranchId,
            };

            try {
                const response = await putRequest(`/api/crm-lead/${params.editLeadId}?gymBranchId=${dealData.gymBranchId}`, payload);
                toast.success("Lead updated successfully.")
                if (currentPath === "leads") {
                    router.push("/management/crm/leads")
                } else {
                    router.push("/management/crm/deals")
                }
                console.log(response, "Lead updated");
            } catch (error) {
                console.error("Lead update failed:", error);
                toast.error("Failed to update lead. Please try again.");
            }
        }

        onClose()
    };

    const handleCancel = () => {
        onClose()
    }

    return (
        <main className='w-full h-full'>
            {loading ? (
                <div>
                    <Skeleton active />
                </div>
            ) : (
                <Form
                    form={form}
                    onFinish={handleFinish}
                    layout="vertical"
                    className='h-full flex flex-col justify-between gap-4'
                >
                    {/* user data */}
                    <div className='flex flex-col gap-4'>
                        <FormInput
                            label='Full Name'
                            name='name'
                            initialValue={dealData && dealData?.name}
                        />
                        <div className='w-full grid grid-cols-2 gap-4'>
                            <FormInput
                                label='Email'
                                name='email'
                                initialValue={dealData && dealData?.email}
                            />

                            <FormInput
                                label='Contact Number'
                                name='contactNumber'
                                initialValue={dealData && dealData?.contactNumber}
                            />

                            <FormInput
                                label='Whatsapp Number'
                                name='whatsappNumber'
                                initialValue={dealData && dealData?.whatsappNumber}
                            />

                            <FormInput
                                label='Probability %'
                                name='probabilityPercent'
                                initialValue={dealData && dealData?.probabilityPercent}
                            />

                            <FormInput
                                label='Lead Source'
                                name='leadSource'
                                initialValue={dealData && dealData?.leadSource}
                            />

                            <FormSelect
                                label='Status'
                                name='status'
                                options={leadStatusData}
                                initialValue={dealData && dealData?.status}
                            />

                            <FormSelect
                                label='Expected Subscription'
                                name='expectedMembershipId'
                                options={subscriptionDetailsData}
                                initialValue={dealData && dealData?.expectedMembershipId}
                            />

                            <FormDate
                                label='Follow Up Date'
                                name='followUpDate'
                                initialValue={dealData?.followUpDate && dayjs(dealData.followUpDate)}
                            />

                            <FormDate
                                label='Conversion Date'
                                name='conversionDate'
                                initialValue={dealData?.conversionDate && dayjs(dealData.conversionDate)}
                            />

                            <FormSelect
                                label='Branch'
                                name='gymBranchId'
                                options={branchOptions}
                                initialValue={dealData && dealData?.gymBranchId}
                            />

                            <FormInput
                                label='Notes'
                                name='notes'
                                initialValue={dealData && dealData?.notes}
                            />
                        </div>
                    </div>

                    {/* buttons */}
                    <div className='flex justify-center gap-4'>
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
                            {params?.editLeadId === 'add' || params.editDealId === 'add' ? 'Add New Lead' : 'Update Lead'}
                        </button>
                    </div>
                </Form>
            )}
        </main>
    )
}

export default AddLeads
