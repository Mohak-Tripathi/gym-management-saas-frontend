'use client'
import FormDate from '@/components/formComponents/FormDate';
import FormInput from '@/components/formComponents/FormInput';
import FormSelect from '@/components/formComponents/FormSelect';
import { getRequest, postRequest, putRequest } from '@/lib/services/request';
import { Form, Skeleton } from 'antd'
import { useParams, useRouter } from 'next/navigation';
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

    const [loading, setLoading] = useState(false);
    const [leadData, setLeadData] = useState<any>({});
    const [subscriptionDetailsData, setSubscriptionDetailsData] = useState<any[]>([]);
    const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"

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
    }, []);

    useEffect(() => {
        if (params.editTrainerId === 'add') return;

        const fetchLeadById = async () => {
            setLoading(true);
            try {
                const data = await getRequest(`/api/crm-lead/${params.editLeadId}?gymBranchId=${currentGymBranchId}`);
                setLeadData(data);
                console.log(data, "lead data");

            } catch (error) {
                // Optionally handle error
                setLeadData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLeadById();
    }, [])

    const handleFinish = async (values: any) => {
        if (params.editLeadId === 'add') {
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
                router.push("/management/crm/leads")
                console.log(response, "lead created");
            } catch (error) {
                console.error("Lead creation failed:", error);
                toast.error("Lead creation failed. Please try again.");
            }

        } else {
            const payload = {
                name: values.name || leadData.name,
                email: values.email || leadData.email,
                contactNumber: values.contactNumber || leadData.contactNumber,
                whatsappNumber: values.whatsappNumber || leadData.whatsappNumber,
                probabilityPercent: Number(values.probabilityPercent) || leadData.probabilityPercent,
                leadSource: values.leadSource || leadData.leadSource,
                status: values.status || leadData.status,
                expectedMembershipId: values.expectedMembershipId || leadData.expectedMembershipId,
                followUpDate: values.followUpDate || leadData.followUpDate,
                conversionDate: values.conversionDate || leadData.conversionDate,
                notes: values.notes || leadData.notes,
                gymBranchId: values.gymBranchId || leadData.gymBranchId,
            };

            try {
                const response = await putRequest(`/api/crm-lead/${params.editLeadId}?gymBranchId=${leadData.gymBranchId}`, payload);
                toast.success("Lead updated successfully.")
                router.push("/management/crm/leads")
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
                            initialValue={leadData && leadData?.name}
                        />
                        <div className='w-full grid grid-cols-2 gap-4'>
                            <FormInput
                                label='Email'
                                name='email'
                                initialValue={leadData && leadData?.email}
                            />

                            <FormInput
                                label='Contact Number'
                                name='contactNumber'
                                initialValue={leadData && leadData?.contactNumber}
                            />

                            <FormInput
                                label='Whatsapp Number'
                                name='whatsappNumber'
                                initialValue={leadData && leadData?.whatsappNumber}
                            />

                            <FormInput
                                label='Probability %'
                                name='probabilityPercent'
                                initialValue={leadData && leadData?.probabilityPercent}
                            />

                            <FormInput
                                label='Lead Source'
                                name='leadSource'
                                initialValue={leadData && leadData?.leadSource}
                            />

                            <FormSelect
                                label='Status'
                                name='status'
                                options={leadStatusData}
                                initialValue={leadData && leadData?.status}
                            />

                            <FormSelect
                                label='Expected Subscription'
                                name='expectedMembershipId'
                                options={subscriptionDetailsData}
                                initialValue={leadData && leadData?.expectedMembershipId}
                            />

                            <FormDate
                                label='Follow Up Date'
                                name='followUpDate'
                                initialValue={leadData?.followUpDate && dayjs(leadData.followUpDate)}
                            />

                            <FormDate
                                label='Conversion Date'
                                name='conversionDate'
                                initialValue={leadData?.conversionDate && dayjs(leadData.conversionDate)}
                            />

                            <FormSelect
                                label='Branch'
                                name='gymBranchId'
                                options={branchOptions}
                                initialValue={leadData && leadData?.gymBranchId}
                            />

                            <FormInput
                                label='Notes'
                                name='notes'
                                initialValue={leadData && leadData?.notes}
                            />
                        </div>
                    </div>

                    {/* buttons */}
                    <div className='flex justify-center gap-4'>
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
                            {params?.editLeadId === 'add' ? 'Add New Lead' : 'Update Lead'}
                        </button>
                    </div>
                </Form>
            )}
        </main>
    )
}

export default AddLeads
