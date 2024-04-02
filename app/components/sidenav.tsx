import Clock from './clock';
import { Button, Card, CardBody, CardFooter, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { SignInOut } from './sign-in-out';
import { NavLinks } from './navlinks';

export const SideNav = () => {


    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">

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
                <Button className='flex  flex-row justify-between '>部门工作量统计</Button>
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

