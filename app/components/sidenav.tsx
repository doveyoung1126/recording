import Clock from './clock';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import { SignInOut } from './sign-in-out';
import { NavLinks } from './navlinks';
import { getUser } from '../api/logto/user/get-user';

export const SideNav = async () => {

    const user = await getUser()
    const { isAuthenticated } = user
    const username = user.userInfo?.name as string

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">

            <Card fullWidth={true}  >
                <CardBody className="overflow-visible" >
                    <Clock live={true} hourMarkFormat="number" className="flex-shrink-0" />
                </CardBody>
                <CardFooter><p>{username ?? "Today is today"}</p></CardFooter>
            </Card>
            {/* <Clock live={true} /> */}
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <SignInOut isAuthenticated={isAuthenticated} username={username} />
            </div>
        </div>
    )
}
