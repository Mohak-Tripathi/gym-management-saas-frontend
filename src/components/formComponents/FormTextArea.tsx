import { Form, Input } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'
import { ChangeEvent } from 'react';
const { TextArea } = Input;

interface FormTextAreaProps {
    label: string;
    name: string;
    customClass?: string;
    required?: boolean;
    placeholder?: string;
    disable?: boolean;
    options?: { label: string; value: string | number; img?: string }[];
    initialValue?: string | number;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    value?: any;
    toolTip?: string
    dropDownMode?: 'multiple' | 'tags' | undefined;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
    label,
    name,
    customClass = '',
    required = false,
    placeholder = 'Type',
    disable = false,
    options,
    initialValue,
    onChange,
    value,
    toolTip,
    dropDownMode,
}) => {
    return (
        <div className='flex flex-col gap-1.5'>
            <Title className="!text-black-primary !text-[14px] !font-semibold !mb-0">
                {label}
            </Title>
            <Form.Item
                name={name}
                className='!m-0'
            >
                {/* <Input
                    placeholder={placeholder}
                    defaultValue={initialValue}
                    disabled={disable}
                    onChange={onChange}
                    style={{ height: 40 }}
                    className=' !rounded-[12px] bg-transparent !text-[14px] !text-black-primary !font-[400] cursor-pointer'
                /> */}
                <TextArea
                    // type={inputType}
                    autoSize={{ minRows: 14, maxRows: 22 }}
                    placeholder={placeholder}
                    className={` !mb-0 !px-4 !rounded-lg !border !border-[#D5D8D8] ${disable ? '!bg-[#F4F5F5]' : '!bg-[#FFF]'}  !shadow-[0px_1px_2px_0px_rgba(184,200,224,0.22)] box-border !text-[#032F35] !font-sans !text-[14px] !font-normal !w-full`}
                    disabled={disable}
                    defaultValue={initialValue}
                    value={value}
                // rows={4}

                // onChange={onChange}
                />
            </Form.Item>
        </div>
    )
}

export default FormTextArea
