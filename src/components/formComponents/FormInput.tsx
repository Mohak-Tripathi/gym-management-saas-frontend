import { Form, Input } from 'antd'
import Title from 'antd/es/typography/Title'
import React from 'react'

interface FormInputProps {
    label: string;
    name: string;
    customClass?: string;
    required?: boolean;
    placeholder?: string;
    disable?: boolean;
    options?: { label: string; value: string | number; img?: string }[];
    initialValue?: string | number;
    onChange?: (value: string | number) => void;
    value?: any;
    toolTip?: string
    dropDownMode?: 'multiple' | 'tags' | undefined;
}

const FormInput: React.FC<FormInputProps> = ({
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
                <Input
                    placeholder={placeholder}
                    defaultValue={initialValue}
                    style={{ height: 40 }}
                    className=' !rounded-[12px] !bg-transparent !text-[14px] !text-black-primary !font-[400] cursor-pointer'
                />
            </Form.Item>
        </div>
    )
}

export default FormInput
