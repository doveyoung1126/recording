'use client'

import { useRouter } from "next/navigation"

export const SignInOut = ({
    isAuthenticated,
    username
}: {
    isAuthenticated: boolean
    username?: string
}) => {

    const router = useRouter()
    return (
        <>

            {!isAuthenticated
                ? <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    onClick={() =>
                        router.push('/api/logto/sign-in')
                    }>
                    Sign In
                </button>
                : <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    onClick={() =>
                        router.push('/api/logto/sign-out')
                    }>
                    {username ?? "Sign Out"}
                </button>}
        </>
    )
}