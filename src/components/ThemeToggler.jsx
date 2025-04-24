'use client';
import React from 'react'

import { useDarkMode } from '../context/ThemeContext'
import { Button } from 'antd';

const ThemeToggler = () => {
  const { darkMode, setDarkMode } = useDarkMode()

  return (
    <>
      {/* <button className='bg-black dark:bg-white text-white dark:text-black'>
        
      </button> */}

      <Button type="primary" onClick={() => setDarkMode(!darkMode)} >{darkMode ? 'Light Mode' : 'Dark Mode'}</Button>
    </>
  )
}

export default ThemeToggler
