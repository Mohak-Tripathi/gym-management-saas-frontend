import Image from 'next/image'
import React from 'react'

interface PaymentCardProp {
    type: string,
    cardCompany: string,
    cardHolder: string,
    cardNumber: string,
}

const PaymentCard = ({ type, cardCompany, cardHolder, cardNumber }: PaymentCardProp) => {
    return (
        <div className='min-w-[330px] h-[240px] rounded-[20px] p-4 flex flex-col justify-between relative'
            style={{
                backgroundImage:
                    cardCompany === 'masterCard'
                        ? 'linear-gradient(to right, #064A7D, #642401)'
                        : 'linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.8) 100%)',
            }}
        >
            <div className='flex justify-between items-center'>
                <p className='text-[18px] font-normal text-white leading-[100%] !m-0'>{type}</p>
                <Image
                    src={`/images/masterLogo.svg`}
                    width={0}
                    height={0}
                    alt="cardLogo"
                    className="w-[48px] h-[48px]"
                />
            </div>

            <div className='flex flex-col gap-4'>
                <p className='text-[20px] font-normal text-white leading-[100%] !m-0'>{cardHolder}</p>
                <p className='text-[22px] font-bold text-white leading-[100%] !m-0'>{cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')}</p>
            </div>

            <div className='h-[48px] w-[48px] bg-[#0000004D] rounded-[20px] flex justify-center items-center absolute right-0 bottom-0 cursor-pointer hover:opacity-80 transition-all duration-200'>
                <Image
                    src={`/images/iconly/bold/pencilWhite.svg`}
                    width={0}
                    height={0}
                    alt="edit"
                    className="w-[20px] h-[20px]"
                />
            </div>
        </div>
    )
}

export default PaymentCard
