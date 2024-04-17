'use client'

export const SignInOut = ({ isAuthenticated }: { isAuthenticated: boolean }) => {


    return (
        <>

            {!isAuthenticated
                ? <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    onClick={() => {
                        window.location.assign('/recording/api/logto/sign-in')
                    }}>
                    Sign In
                </button>
                : <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
                    onClick={() => {
                        window.location.assign('/recording/api/logto/sign-out')
                    }}>
                    Sign Out
                </button>}
        </>
    )
}