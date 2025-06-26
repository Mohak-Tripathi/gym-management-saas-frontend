'use client'
import React, { useEffect, useState } from 'react'
import { Form, Input, Skeleton } from 'antd'
import Image from 'next/image';
import FormInput from '@/components/formComponents/FormInput';
import FormSelect from '@/components/formComponents/FormSelect';
import FormDate from '@/components/formComponents/FormDate';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getRequest } from '@/lib/services/request';
import { modeOfPaymentOption } from '@/constant/dropdownData';

const MemberPaymentDetails = () => {

  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams()

  const { selectedBranch } = useSelector((state: any) => state.selectedBranch);
  const token = useSelector((state: any) => state.user.loggedinUserData?.token);
  const currentGymBranchId = selectedBranch.id;

  const [subscriptionDetailsData, setSubscriptionDetailsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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
        price: plan.actualPrice,
        months: plan?.baseDuration
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

  const handleFinish = async (values: any) => {
    console.log('values', values);
  }

  return (
    <main className='w-full flex flex-col gap-4 flex-1'>

      <div className='relative'>
        <div className='flex items-center gap-2'>
          <Image
            src={"/images/iconly/light/Arrow.svg"}
            alt="back"
            width={0}
            height={0}
            className='w-5 h-5 cursor-pointer'
            onClick={() => router.push(`/management/members/members`)}
          />
          <p className='text-[14px] text-black-primary font-normal flex items-center gap-1 !m-0'>
            Members
            <Image
              src={`/images/iconly/light/arrowBlack.svg`}
              alt="back"
              width={0}
              height={0}
              className='w-5 h-5'
            />
            <span className='text-[14px] text-black-primary font-bold '>
              Add New Member
            </span>
          </p>
        </div>

        {params?.memberPaymentDetailsId == 'add' && (
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='flex items-center gap-3 '>
              <p className='font-roboto font-bold text-[14px] leading-[100%] tracking-[0px] align-middle text-black-primary !m-0'>Step 1 - Member Details</p>
              <Image
                src={`/images/iconly/light/stepper.svg`}
                alt="back"
                width={0}
                height={0}
                className='w-16 h-2'
              />
              <p className='font-roboto font-bold text-[14px] leading-[100%] tracking-[0px] align-middle text-black-primary !m-0'>Step 2 - Payment Details</p>
            </div>
          </div>
        )}


      </div>

      <Form
        form={form}
        onFinish={handleFinish}
        layout="vertical"
        className='flex flex-1 flex-col justify-between gap-6 w-full bg-white !p-6'>

        <div className='flex gap-14 w-full'>
          {/* left */}
          <div className='w-[40%] flex flex-col gap-6'>
            <div className='flex gap-7'>
              <div>
                <Image
                  src={`/images/iconly/light/dummyUserProfile.svg`}
                  height={0}
                  width={0}
                  alt='profile'
                  className='h-[96px] w-[96px]'
                />
              </div>
            </div>
            <p className='font-roboto font-bold text-[14px] leading-[100%] tracking-[0px] align-middle text-black-primary !m-0'>Profile Image</p>
            <div className='grid grid-cols-2 gap-4'>
              <div className='col-span-2'>
                <FormInput
                  label='Member name'
                  name='fullName'
                />
              </div>
              <FormInput
                label='Receipt No.'
                name='receiptNo'
              />
              <FormDate
                label='Payment Date'
                name='paymentDate'
              />
              <div className='col-span-2'>
                <FormSelect
                  label='Branch Name'
                  name='branchId'
                  options={branchOptions}
                />
              </div>
              <FormSelect
                label='Subscription Name'
                name='membershipId'
                options={subscriptionDetailsData}
              />
              <FormDate
                label='Subscription Expiry Date'
                name='expiryDate'
              />
            </div>
          </div>

          {/* right */}
          <div className='flex-1 flex flex-col gap-6 mt-10'>
            <p className='font-roboto font-bold text-[14px] leading-[100%] tracking-[0px] align-middle text-black-primary !m-0'>Payment Details</p>
            <div className='grid grid-cols-3 gap-4'>
              <div className='col-span-3'>
                <div className='grid grid-cols-3 space-x-4'>
                  <FormSelect
                    label='Mode Of Payment'
                    name='modeOfPayment'
                    options={modeOfPaymentOption}
                  />
                  <FormInput
                    label='Registration Fees'
                    name='registrationFees'
                  />
                </div>
              </div>
              <FormInput
                label='Subscription Amount'
                name='squbscriptionAmount'
              />
              <FormInput
                label='Discount %'
                name='discount'
              />
              <FormInput
                label='Total Amount'
                name='totalAmount'
              />

              <FormInput
                label='Paid Amount'
                name='paidAmount'
              />
              <FormInput
                label='Balance Amount'
                name='balanceAmount'
              />
              <FormDate
                label='Partial Pay Date'
                name='partialPayDate'
              />

              <FormInput
                label='Reward Points'
                name='rewardPoints'
              />
              <FormSelect
                label='Tax Type'
                name='taxType'
              />
              <FormInput
                label='Tax Amount'
                name='taxAmount'
              />

              <div className='col-span-2'>
                <FormInput
                  label='Total Amount'
                  name='totalAmount'
                />
              </div>

            </div>
          </div>
        </div>

        {/* button */}
        <div className='flex justify-between gap-6 '>
          <div className='flex justify-start gap-6 '>
            <button
              type='button'
              // onClick={() => handleCancel()}
              className=' w-[147px] !bg-transparent border-[1px] border-solid border-black-10 !text-black-primary rounded-xl px-4 py-2 cursor-pointer'
            >
              Cancel
            </button>
            {/* <button
            type='button'
            // onClick={() => handleCancel()}
            className=' w-[147px] !bg-blue-secondary !text-black-primary rounded-xl px-4 py-2 cursor-pointer'
          >
            Print Registration
          </button> */}
            <button
              type='submit'
              className=' w-[147px] !bg-black-primary !text-white rounded-xl px-4 py-2 cursor-pointer'
            >
              Make Payment
            </button>
          </div>
          <button
            type='button'
            // onClick={() => handleCancel()}
            className=' w-[147px] !bg-transparent border-[1px] border-solid border-black-10 !text-black-primary rounded-xl px-4 py-2 cursor-pointer'
          >
            Reset
          </button>
        </div>
      </Form>
    </main>
  )
}

export default MemberPaymentDetails
