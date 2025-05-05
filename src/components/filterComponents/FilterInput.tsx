import { Input } from 'antd'
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

const FilterInput: React.FC<FormInputProps> = ({
    label,
    name,
    customClass = '',
    required = false,
    placeholder = 'Enter',
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
            <Title className="!text-black-primary !text-[12px] !font-normal !mb-0">
                {label}
            </Title>
            <Input
                rootClassName='customSearch'
                placeholder={placeholder}
                style={{ width: 200, height: 32 }}
                className='!w-[200px] !rounded-2xl !bg-transparent !text-[14px] !text-black-primary !font-[400] cursor-pointer'
            />
        </div>
    )
}

export default FilterInput
