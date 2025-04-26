import React from 'react';
import { Form, Select, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import Image from 'next/image';
import { Rule } from 'antd/es/form';

const { Option } = Select;

interface FormSelectProps {
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
    inputRules?: Rule[]
}

const FormSelect: React.FC<FormSelectProps> = ({
    label,
    name,
    customClass = '',
    required = false,
    placeholder = 'Select',
    disable = false,
    options,
    initialValue,
    onChange,
    value,
    toolTip,
    dropDownMode,
    inputRules = []
}) => {
    return (
        <div className='flex flex-col gap-1.5'>
            <Title className="!text-[#071726] !text-[12px] !font-normal !mb-0">
                {label}
            </Title>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search to Select"
                options={options}
                optionFilterProp="label"
                rootClassName='customSelect'
                suffixIcon={
                    <Image
                        loading="lazy"
                        src="/images/dropdown.svg"
                        width={16}
                        height={16}
                        className={`w-4`}
                        alt="down Arrow"
                    />
                }
                className='!w-[200px] !h-8 !rounded-2xl !border-none !text-[12px] !text-[#677171] f!ont-[400] cursor-pointer'
            />
        </div>
    );
};

export default FormSelect;
