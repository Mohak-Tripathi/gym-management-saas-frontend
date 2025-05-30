import FormTextArea from '@/components/formComponents/FormTextArea';
import Image from 'next/image';
import { Form } from 'antd';
import React from 'react'
import { postRequest } from '@/lib/services/request';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
interface ContactUsProps {
    onClose: () => void;
    open: boolean;
}

const ContactUs: React.FC<ContactUsProps> = ({ onClose }) => {

    const [form] = Form.useForm();
    const { user, gymId } = useSelector((state: any) => state.user.loggedinUserData);
    const { selectedBranch } = useSelector((state: any) => state.selectedBranch);

    const handleFinish = async (values: any) => {

        if(values.message === undefined || values.message === '') {
            toast.error('Please enter message!');
            return;
        }

        const payload = {
            "message": values.message,
            "userId": user.userId,
            "gymId": gymId,
            "gymBranchId": selectedBranch.id,
            "response": ""
        };

        try {
            const response = await postRequest("/api/feedback", payload);
            toast.success("Message send successfully.")
            form.resetFields();
            onClose()
        } catch (error) {
            console.error("contact failed:", error);
            toast.error("Failed to send message.");
        }
    };

    const handleCancel = () => {
        onClose()
    }

    return (
        <main className='h-full flex flex-col justify-between'>
            <Form
                onFinish={handleFinish}
                form={form} layout="vertical" className='flex flex-col justify-between h-full'>
                <div className='flex flex-col gap-6'>
                    {/* Contact details */}
                    <div className='flex flex-col gap-6'>
                        <div className='flex gap-3 items-center'>
                            <Image
                                src="/images/iconly/light/call.svg"
                                height={0}
                                width={0}
                                alt='call'
                                className='w-4 h-4'
                            />
                            <p className='font-roboto font-semibold text-[16px] leading-[28.16px] text-black-primary !m-0'>
                                Mobile Number: +91 98543634789
                            </p>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <Image
                                src="/images/iconly/light/mail.svg"
                                height={0}
                                width={0}
                                alt='mail'
                                className='w-4 h-4'
                            />
                            <p className='font-roboto font-semibold text-[16px] leading-[28.16px] text-black-primary !m-0'>
                                Email Id: email@gmail.com
                            </p>
                        </div>
                    </div>

                    {/* Textarea */}
                    <FormTextArea label='Message' name='message' required />
                </div>

                {/* Buttons */}
                <div className='flex justify-start gap-6 mt-4'>
                    <button
                        type='button'
                        onClick={handleCancel}
                        className='w-[147px] !bg-blue-secondary !text-black-primary rounded-lg px-4 py-2 cursor-pointer'
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='w-[147px] !bg-black-primary !text-white rounded-lg px-4 py-2 cursor-pointer'
                    >
                        Send
                    </button>
                </div>
            </Form>
        </main>
    )
}

export default ContactUs
