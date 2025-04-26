import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Tabs = ({ tabs }: { tabs: any[] }) => {

    const pathname = usePathname();
    const currentPath = pathname.split('/')[3];
    const activeIndex = tabs.findIndex((item: any) => item.title.toLowerCase().replace(/\s+/g, '-') === currentPath)

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
                {tabs.map((item: any, index: number) => (
                    <li
                        key={index}
                        className={`w-[171px] h-8 rounded-t-xl text-[14px] font-bold flex items-center justify-center cursor-pointer z-10 transition-all duration-200 ${currentPath === item.title.toLowerCase().replace(/\s+/g, '-') ? 'text-white' : 'text-[#071726]'}`}
                    >
                        <Link
                            href={item.src}
                            className='w-full h-full flex items-center justify-center'
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Tabs
