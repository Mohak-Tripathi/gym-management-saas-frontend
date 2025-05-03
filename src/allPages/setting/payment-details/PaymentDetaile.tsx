import Image from 'next/image'
import React from 'react'

const PaymentDetaile = () => {
    return (
        <div className="w-full grid grid-cols-4 gap-6">
            <div className='min-w-[330px] h-[180px] rounded-[20px] p-4 bg-[#000]/80 flex flex-col justify-between relative'>

                <div className='flex justify-between items-center'>
                    <p className='text-[18px] font-normal text-white leading-[100%] !m-0'>Credit</p>
                    <Image
                        src={`/images/masterLogo.svg`}
                        width={0}
                        height={0}
                        alt="cardLogo"
                        className="w-[48px] h-[48px]"
                    />
                </div>

                <div className='flex flex-col gap-1.5'>
                    <p className='text-[18px] font-normal text-white leading-[100%] !m-0'>Emiway Bantai</p>
                    <p className='text-[18px] font-normal text-white leading-[100%] !m-0'>2221 - 0057 - 4680 - 2089</p>
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

            <div className="min-h-[180px] bg-white border border-dashed border-[#000] px-3.5 py-4 flex justify-center items-center rounded-xl cursor-pointer"
                style={{
                    boxShadow: '0px 4px 8px rgba(193, 224, 255, 0.25)'
                }}
            >
                <div className="bg-[#F5FAFB] w-full h-full rounded-lg px-2 py-1 flex flex-col gap-2.5 justify-center items-center ">
                    <div className="h-[36px] w-[36px] bg-[#FFFFFF] border border-[#0000001A] rounded-full flex items-center justify-center">
                        <Image
                            src='/images/iconly/light/plusCircleBlack.svg'
                            width={0}
                            height={0}
                            alt="Profile"
                            className="w-[24px] h-[24px]"
                        />
                    </div>

                    <p className="!font-semibold text-[14px] text-[#071726]">Add New Card</p>
                </div>

            </div>
        </div>
    )
}

export default PaymentDetaile
