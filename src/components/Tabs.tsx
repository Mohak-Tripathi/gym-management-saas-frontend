import React, { useState } from 'react'

const tabs = [
    {
        'title': 'Members',
        'src': '/management/members/members'
    },
    {
        'title': 'Billing History',
        'src': '/management/members/billing-history'
    },
]

const Tabs = () => {
    const [tab, settab] = useState('Members');

    const handleTabClick = (tabName: string) => {
        settab(tabName);
    }

    const activeIndex = tabs.findIndex(item => item.title === tab)

    return (
        <div className="relative w-auto">
            <ul className="!m-0 border-b border-[#D6DDE6] flex relative">
                {/* Sliding background */}
                <div
                    className="absolute top-0 h-8 rounded-t-xl bg-[#071726] transition-all duration-300"
                    style={{
                        width: '171px',
                        left: `${activeIndex * 171}px`
                    }}
                ></div>

                {/* Tabs */}
                {tabs.map((item, index) => (
                    <li
                        key={index}
                        className={`w-[171px] h-8 rounded-t-xl text-[14px] font-bold flex items-center justify-center cursor-pointer z-10 transition-all duration-200 ${tab === item.title ? 'text-white' : 'text-[#071726]'
                            }`}
                        onClick={() => handleTabClick(item.title)}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tabs
