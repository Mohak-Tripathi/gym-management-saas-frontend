'use client'
import FormInput from '@/components/formComponents/FormInput';
import FormSelect from '@/components/formComponents/FormSelect';
import { Form } from 'antd'

interface AddPaymentDetailProps {
  onClose: () => void;
  open: boolean;
  selectedMemberData?: any;
}

const AddPaymentDetail: React.FC<AddPaymentDetailProps> = ({ onClose, open, selectedMemberData }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onClose()
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
          <div className='w-full grid grid-cols-2 gap-4'>
            <FormInput
              label='Card Type'
              name='cardType'
            />
            <FormInput
              label='Card Company'
              name='cardCompany'
            />

            <FormInput
              label='Holder Name'
              name='holderName'
            />

            <FormInput
              label='Card Number'
              name='cardNumber'
            />

            <FormInput
              label='Expiry'
              name='expiry'
            />

            <FormInput
              label='CVV'
              name='cvv'
            />

          </div>

        </div>

        {/* buttons */}
        <div className='flex justify-center gap-4'>
          <button
            type='button'
            onClick={() => handleCancel()}
            className=' w-[147px] h-10 !bg-[#EAEEF8] !text-black-primary rounded-lg px-4 py-2 cursor-pointer'
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

export default AddPaymentDetail
