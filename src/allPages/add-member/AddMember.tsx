'use client'
import FormInput from '@/components/formComponents/FormInput';
import FormSelect from '@/components/formComponents/FormSelect';
import { Form } from 'antd'
import { useEffect } from 'react';

interface AddMemberProps {
    onClose: () => void;
    open: boolean;
  }

const AddMember: React.FC<AddMemberProps> = ({ onClose, open }) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        onClose()
    };

    const handleCancel = () => {
        onClose()
    }

    useEffect(() => {
        if (!open) {
          form.resetFields();
        }
      }, [open]);

    return (
        <main className='w-full h-full'>
            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
                className='h-full flex flex-col justify-between gap-4'
            >
                {/* user data */}
                <div className='flex flex-col'>
                    <FormInput
                        label='Member name'
                        name='memberName'
                    />
                    <div className='w-full grid grid-cols-2 gap-x-4'>
                        <FormInput
                            label='Email'
                            name='email'
                        />

                        <FormInput
                            label='Mobile No.'
                            name='mobileNumber'
                        />

                        <FormInput
                            label='Date of Birth'
                            name='DOB'
                        />

                        <FormInput
                            label='Reference Mobile No.'
                            name='referenceMobileNumber'
                        />
                    </div>

                    <FormInput
                        label='Address'
                        name='address'
                    />

                    <div className='w-full grid grid-cols-2 gap-x-4'>
                        <FormInput
                            label='Goal'
                            name='goal'
                        />

                        <FormInput
                            label='Trainer Name'
                            name='trainerName'
                        />

                        <FormInput
                            label='Duration Type'
                            name='durationType'
                        />

                        <FormSelect
                            label='Subscription Type'
                            name='subscriptionType'
                        />
                    </div>

                </div>

                {/* buttons */}
                <div className='flex justify-center gap-4'>
                    <button
                        type='button'
                        onClick={() => handleCancel()}
                        className=' w-[147px] h-10 !bg-[#F5FAFB] !text-[#071726] rounded-lg px-4 py-2 cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className=' w-[147px] h-10 !bg-[#071726] !text-white rounded-lg px-4 py-2 cursor-pointer'
                    >
                        Add Member
                    </button>
                </div>
            </Form>
        </main>
    )
}

export default AddMember
