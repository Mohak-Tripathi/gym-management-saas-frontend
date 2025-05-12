'use client'
import FormDate from '@/components/formComponents/FormDate';
import FormInput from '@/components/formComponents/FormInput';
import FormMultiselect from '@/components/formComponents/FormMultiselect';
import FormSelect from '@/components/formComponents/FormSelect';
import { getRequest, postRequest, putRequest } from '@/lib/services/request';
import { Form, message } from 'antd'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { workTypeOption } from '@/constant/filterData';

interface AddTrainerProps {
    onClose: () => void;
    open: boolean;
    selectedTrainerData?: any;
}

const expertiseOptions = [
    { value: 'Yoga', label: 'Yoga' },
    { value: 'Zumba', label: 'Zumba' },
    { value: 'Pilates', label: 'Pilates' },
    { value: 'CrossFit', label: 'CrossFit' },
    { value: 'HIIT', label: 'HIIT' },
]

const genderOption = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
]

const AddLeads: React.FC<AddTrainerProps> = ({ onClose, open, selectedTrainerData }) => {
    const [form] = Form.useForm();
    const router = useRouter()
    const params = useParams()

    const [loading, setLoading] = useState(false);
    const [trainerData, setTrainerData] = useState<any>({});
    const currentGymBranchId = "aa2ec403-de84-43eb-913a-9c63455f26ca"

    const { branches } = useSelector((state: any) => state.branch);

    const branchOptions = branches?.map((branch: any) => ({
        value: branch.id,
        label: branch.name,
    }));

    useEffect(() => {
        if (params.editTrainerId === 'add') return;

        const fetchTrainerById = async () => {
            setLoading(true);
            try {
                const data = await getRequest(`/api/trainers/${params.editTrainerId}?gymBranchId=${currentGymBranchId}`);
                setTrainerData(data.data);
            } catch (error) {
                // Optionally handle error
                setTrainerData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTrainerById();
    }, [])

    const handleFinish = async (values: any) => {
        if (params.editTrainerId === 'add') {
            const payload = {
                userData: {
                    fullName: values.fullName,
                    email: values.email,
                    role: values.role,
                    phone: values.phone,
                },
                trainerData: {
                    referenceMobileNo: values.referenceMobileNo,
                    gender: values.gender || "MALE",
                    specialization: values.specialization,
                    workType: values.workType,
                    joiningDate: values.joiningDate || new Date().toISOString(),
                    experienceYears: Number(values.experienceYears),
                    gymBranchId: values.gymBranchId,
                },
            };

            try {
                const response = await postRequest("/api/trainers", payload);
                message.success("New Branch creared successfully")
                router.push("/management/trainer/trainer")
                console.log(response, "branch created");
            } catch (error) {
                console.error("Branch creation failed:", error);
            }

        } else {
            const payload = {
                // fullName: values.fullName || trainerData && trainerData?.user?.fullName,
                // email: values.email || trainerData && trainerData?.user?.email,
                // role: values.role || trainerData && trainerData?.user?.role,
                // phone: values.phone || trainerData && trainerData?.user?.phone,
                referenceMobileNo: values.referenceMobileNo || trainerData && trainerData?.referenceMobileNo,
                specialization: values.specialization || trainerData && trainerData?.specialization,
                experienceYears: Number(values.experienceYears) || Number(trainerData && trainerData?.experienceYears),
                workType: values.workType || trainerData && trainerData?.workType,
                gender: values.gender || trainerData && trainerData?.gender || "MALE",
                joiningDate: values.joiningDate || trainerData?.joiningDate || new Date().toISOString(),
                gymBranchId: values.gymBranchId,
            };

            try {
                const response = await putRequest(`/api/trainers/${params.editTrainerId}?gymBranchId=${values.gymBranchId}`, payload);
                message.success("New Branch creared successfully")
                router.push("/management/trainer/trainer")
                console.log(response, "branch created");
            } catch (error) {
                console.error("Branch creation failed:", error);
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
                <div>Loading...</div>
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
                            label='Trainer name'
                            name='fullName'
                            initialValue={trainerData && trainerData?.user?.fullName}
                        />
                        <div className='w-full grid grid-cols-2 gap-4'>
                            <FormInput
                                label='Email'
                                name='email'
                                initialValue={trainerData && trainerData?.user?.email}
                            />

                            <FormInput
                                label='Role'
                                name='role'
                                initialValue={trainerData && trainerData?.user?.role}
                            />

                            <FormInput
                                label='Mobile No.'
                                name='phone'
                                initialValue={trainerData && trainerData?.user?.phone}
                            />

                            <FormInput
                                label='Reference Mobile No.'
                                name='referenceMobileNo'
                                initialValue={trainerData && trainerData?.referenceMobileNo}
                            />

                            <FormMultiselect
                                label='Expertise'
                                name='specialization'
                                options={expertiseOptions}
                                initialValue={trainerData && trainerData?.specialization}
                            />

                            <FormInput
                                label='Experience (Years)'
                                name='experienceYears'
                                initialValue={trainerData && trainerData?.experienceYears}
                            />

                            <FormSelect
                                label='Work Type'
                                name='workType'
                                options={workTypeOption}
                                initialValue={trainerData && trainerData?.workType}
                            />

                            <FormSelect
                                label='Gender'
                                name='gender'
                                options={genderOption}
                                initialValue={trainerData && trainerData?.gender}
                            />

                            <FormDate
                                label='Joining Date'
                                name='joiningDate'
                                initialValue={trainerData?.joiningDate && dayjs(trainerData.joiningDate)}
                            />

                            <FormSelect
                                label='Branch Name'
                                name='gymBranchId'
                                options={branchOptions}
                                initialValue={trainerData && trainerData?.gymBranchId}
                            />

                        </div>

                        {/* <FormInput
                        label='Address'
                        name='address'
                    /> */}

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
                            Add Lead
                        </button>
                    </div>
                </Form>
            )}
        </main>
    )
}

export default AddLeads
