import Link from "next/link";
import { getUser } from "../api/logto/user/get-user";


export const SignInOut = async () => {

    const user = await getUser()
    const { isAuthenticated } = user

    return (
        (!isAuthenticated)
            ? <Link className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                href='/api/logto/sign-in'>
                Sign In
            </Link>
            : <Link className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                href='/api/logto/sign-out'>
                {user.userInfo?.name ?? "Sign Out"}
            </Link>
    )
}