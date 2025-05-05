import PaymentCard from '@/components/payment-details/PaymentCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PaymentDetails = () => {
    return (
        <div className="w-full grid grid-cols-4 gap-6">
            <PaymentCard
                type='credit'
                cardCompany='masterCard'
                cardHolder='Avinash'
                cardNumber='2222222222222222'
            />

            <PaymentCard
                type='credit'
                cardCompany='visa'
                cardHolder='Avinash'
                cardNumber='9956543290856435'
            />

            <Link
                href={`/management/settings/payment-details/add`}
                className="min-h-[180px] bg-white border border-dashed border-black px-3.5 py-4 flex justify-center items-center rounded-xl cursor-pointer"
                style={{
                    boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
                }}
            >
                <div className="bg-blue-light w-full h-full rounded-lg px-2 py-1 flex flex-col gap-2.5 justify-center items-center ">
                    <div className="h-[36px] w-[36px] bg-white border border-[#0000001A] rounded-full flex items-center justify-center">
                        <Image
                            src='/images/iconly/light/plusCircleBlack.svg'
                            width={0}
                            height={0}
                            alt="Profile"
                            className="w-[24px] h-[24px]"
                        />
                    </div>

                    <p className="!font-semibold text-[14px] text-black-primary">Add New Card</p>
                </div>

            </Link>
        </div>
    )
}

export default PaymentDetails
