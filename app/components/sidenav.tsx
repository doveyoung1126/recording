import Link from 'next/link';
import Clock from './clock';
import { Button, Card, CardBody, CardFooter, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { SignInOut } from './sign-in-out';

export const SideNav = () => {

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            {/* <Link
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
                href="/"
            >
                <div className="w-32 text-white md:w-40">
                    <Clock />
                </div>
            </Link> */}
            <Card fullWidth={true}  >
                <CardBody className="overflow-visible" >
                    <Clock live={true} hourMarkFormat="number" className="flex-shrink-0" />
                </CardBody>
                <CardFooter><p>Today is today</p></CardFooter>
            </Card>
            {/* <Clock live={true} /> */}
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <NavLinksInProgress />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>


                <SignInOut />

            </div>
        </div>
    )
}

const NavLinksInProgress = () => {
    return (
        <Popover placement="right">
            <PopoverTrigger>
                <Button className='flex  flex-row justify-between '>通话量</Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <div className="text-small font-bold">施工中。。。</div>
                    <div className="text-tiny">等待完善</div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

const NavLinks = () => {
    const links = [
        { name: 'Home', href: '/dashboard', icon: '', text: '通话记录' },
        /* {
            name: 'Records',
            href: '/records',
            icon: '',
            text: '通话记录'
        },
        { name: 'Missions', href: '/missions', icon: '', text: '通话量' }, */
    ];

    return (
        <>
            {
                links.map(link => {
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"                    >
                            {link.text}
                        </Link>

                    )
                })
            }
        </>

    )
}