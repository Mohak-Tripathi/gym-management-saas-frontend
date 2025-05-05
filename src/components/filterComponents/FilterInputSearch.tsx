import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface CustomSearchProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  disable?: boolean;
  customClass?: string;
  searchInput?: string;
  setSearchInput?: (value: string) => void;
}

const FilterInputSearch: React.FC<CustomSearchProps> = ({
  placeholder = 'Search...',
  onSearch,
  disable = false,
  customClass,
  searchInput,
  setSearchInput
}) => {

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedValue = e.target.value;

    if (setSearchInput) {
      setSearchInput(searchedValue);
    }
  };
 
  return (
    <div className={`flex items-end w-full relative ${customClass}`}>
      <Input
        id="custom-search-input"
        placeholder={placeholder}
        disabled={disable}
        onChange={handleSearch}
        value={searchInput}
        className="!h-[40px] !px-3 !py-1.5 !rounded-lg !border !border-[#D5D8D8] !bg-white !shadow-[0px_1px_2px_0px_rgba(184,200,224,0.22)] box-border !text-[#032F35] !font-sans !text-[16px] !font-medium !leading-6 !w-full"
      />
    </div>
  );
};

export default FilterInputSearch;
