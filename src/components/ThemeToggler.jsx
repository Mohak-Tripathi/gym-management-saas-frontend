'use client';
import React from 'react'

import { useDarkMode } from '../context/ThemeContext'

const ThemeToggler = () => {
    const {darkMode, setDarkMode} = useDarkMode()

  return (
    <button onClick={() => setDarkMode(!darkMode)} className='bg-black dark:bg-white text-white dark:text-black'>
        { darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

export default ThemeToggler
