import React from 'react'
import { DatePicker, Form, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import Image from 'next/image';

interface FormInputProps {
  label: string;
  name: string;
  customClass?: string;
  required?: boolean;
  placeholder?: string;
  disable?: boolean;
  initialValue?: string;
  toolTip?: string
}

const FormDate = ({
  label,
  name,
  customClass = "",
  required = false,
  placeholder = "Select",
  disable = false,
  initialValue,
  toolTip,
}: FormInputProps) => {
  return (
    <div className={`!flex !flex-col !gap-[6px] !items-start !justify-start w-full ${customClass}`}>
      <div className='flex items-center gap-2'>
      <Title className="!text-black-primary !text-[14px] !font-semibold !mb-0">
          {label}
        </Title>
        {toolTip && (
          <Tooltip placement="topLeft" title={toolTip} mouseEnterDelay={0.5}>
            <Image
              loading="lazy"
              src="/assets/images/information.svg"
              width={16}
              height={16}
              className={`text-base text-[#F1F2EE] w-4 cursor-pointer`}
              alt="down Arrow"
            />
          </Tooltip>
        )}
      </div>
      <Form.Item
        name={name}
        rootClassName='formDateCustom'
        className="!my-0 w-full"
      >
        <DatePicker
          className="!h-[40px] !px-3 !py-1.5 !w-full !rounded-lg !border !border-[#D5D8D8] !bg-[#FFF] !shadow-[0px_1px_2px_0px_rgba(184,200,224,0.22)] box-border !text-black-primary !font-sans !text-base !font-normal !leading-6"
          placeholder={placeholder}
          defaultValue={initialValue}
          disabled={disable}
          rootClassName='customDatePicker'
          inputReadOnly
          suffixIcon={
            <Image
              loading="lazy"
              src="/images/iconly/light/calendar.svg"
              width={16}
              height={16}
              className={`text-base text-[#F1F2EE] w-4`}
              alt="callender"
            />
          }
        />
      </Form.Item>
    </div>
  )
}

export default FormDate
