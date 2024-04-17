import { UserTasks } from "@/app/components/user-tasks"
import { getUser } from "../../api/logto/user/get-user"
import dayjs from 'dayjs'
import Link from "next/link";

const Page = async () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const user = await getUser()
    const staffid = user.userInfo?.custom_data?.staffid

    if (!staffid) {
        return (
            <>
                <h1>你是营销中心同事吗？</h1>
                <h1>看起来你没有分机号，或者管理员还没有设置。</h1>
                <h1>如果你确定你可以使用这个系统，请联系管理员。</h1>
                {user.isAuthenticated &&
                    <span>
                        也许
                        <Link className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            href='/api/logto/sign-in'>
                            登录
                        </Link>
                        可以解决这个问题
                    </span>
                }
            </>
        )
    }

    return (
        <>
            <UserTasks />
        </>
    )
}

export default Page