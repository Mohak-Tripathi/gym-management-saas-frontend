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

const FilterSearchInput: React.FC<FormInputProps> = ({
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
            <Title className="!text-[#071726] !text-[12px] leading-[100%] !font-semibold !mb-0">
                {label}
            </Title>
            <Input
                rootClassName='customSearch'
                placeholder={placeholder}
                style={{ width: 200, height: 32 }}
                className='!w-[200px] !rounded-2xl !bg-transparent !text-[14px] !text-[#071726] !font-[400] cursor-pointer'
            />
        </div>
    )
}

export default FilterSearchInput
