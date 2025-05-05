'use client'
import FormInput from '@/components/formComponents/FormInput';
import FormSelect from '@/components/formComponents/FormSelect';
import { postRequest } from '@/lib/services/request';
import { Form, message } from 'antd'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

const workTypeOption = [
    {label: 'Part Time', value: 'PART_TIME'},
    {label: 'Full Time', value: 'FULL_TIME'},
]

const AddTrainer: React.FC<AddTrainerProps> = ({ onClose, open, selectedTrainerData }) => {
    const [form] = Form.useForm();
    const router = useRouter()

    const handleFinish = async (values: any) => {
        console.log(values, "trainer values");

        const payload = {
            userData: {
              fullName: values.fullName,
              email: values.email,
              role: values.role,
              phone: values.phone,
            },
            trainerData: {
              referenceMobileNo: values.referenceMobileNo,
            //   gender: values.gender || "MALE", // defaulting if gender not present
              specialization: values.expertise ? [values.expertise] : [], // wrap in array
              workType: values.workType,
            //   joiningDate: values.joiningDate || new Date().toISOString(), // default to now if not given
              experienceYears: Number(values.experienceYears), // ensure it's a number
              gymBranchId: "284bb49b-e9e3-41c2-8531-0653876aff13",
            },
          };

        try {
            const response = await postRequest("/api/trainers", payload);
            message.success("New Branch creared successfully")
            // router.push("/management/trainer/trainer")
            console.log(response, "branch created");
        } catch (error) {
            console.error("Branch creation failed:", error);
        }
        // onClose()
    };

    const handleCancel = () => {
        onClose()
    }

    useEffect(() => {
        if (selectedTrainerData) {
            form.setFieldsValue({
                trainerName: selectedTrainerData.name,
                mobileNumber: selectedTrainerData.mobileNumber,
                workType: selectedTrainerData.workType,
                email: selectedTrainerData.email,
                address: selectedTrainerData.address,
            });
        } else {
            form.resetFields();
        }
    }, [selectedTrainerData, form]);

    return (
        <main className='w-full h-full'>
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
                    />
                    <div className='w-full grid grid-cols-2 gap-4'>
                        <FormInput
                            label='Email'
                            name='email'
                        />

                        <FormInput
                            label='Role'
                            name='role'
                        />

                        <FormInput
                            label='Mobile No.'
                            name='phone'
                        />

                        <FormInput
                            label='Reference Mobile No.'
                            name='referenceMobileNo'
                        />

                        <FormSelect
                            label='Expertise'
                            name='expertise'
                            options={expertiseOptions}
                        />

                        <FormInput
                            label='Experience (Years)'
                            name='experienceYears'
                        />

                        <FormSelect
                            label='Work Type'
                            name='workType'
                            options={workTypeOption}
                        />

                    </div>

                    <FormInput
                        label='Address'
                        name='address'
                    />

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
                        Add Trainer
                    </button>
                </div>
            </Form>
        </main>
    )
}

export default AddTrainer
