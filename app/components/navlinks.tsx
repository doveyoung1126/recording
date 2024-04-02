'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from 'clsx'

export const NavLinks = () => {
    const pathname = usePathname()
    const links = [
        { name: 'MyRecords', href: '/dashboard', icon: '', text: '我的通话记录' },
        { name: 'allRecords', href: '/dashboard/allrecords', icon: '', text: '所有通话记录' }
    ];

    return (
        <>
            {
                links.map(link => {
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                                {
                                    'bg-sky-100 text-blue-600': pathname === link.href,
                                },
                            )}
                        >
                            {link.text}
                        </Link>
                    )
                })
            }
        </>

    )
}