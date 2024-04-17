import { getUser } from "../api/logto/user/get-user";
import { MyCard } from "../components/cards"
import { MyTable } from "../components/table"
import { formatCurrentUserReocrds } from "../lib/formatdata"
import { taskRequirements } from "../lib/constant";

export default async function Page() {
    const currentDate = new Date().toISOString().slice(0, 10);
    const user = await getUser()

    const staffid = user.userInfo?.custom_data?.staffid
    const userGroups: string = user.userInfo?.custom_data?.groups ?? ''
    const userAssessed: boolean = (user.userInfo?.custom_data?.assessed !== false)

    if (!staffid) {
        return (
            <>
                <h1>你是营销中心同事吗？</h1>
                <h1>看起来你没有分机号，或者管理员还没有设置。</h1>
                <h1>如果你确定你可以使用这个系统，请联系管理员。</h1>
                {/* {!user.isAuthenticated &&
                    <span>
                        也许
                        <Link className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                            href='/api/logto/sign-in'>
                            登录
                        </Link>
                        可以解决这个问题
                    </span>
                } */}
            </>
        )
    }

    const { totalTaskNum, totalTaskMinutes }: { totalTaskNum: number, totalTaskMinutes: number } = userGroups
        ? taskRequirements[userGroups]
        : { totalTaskNum: Infinity, totalTaskMinutes: Infinity }

    const { tableData, workLoad } = await formatCurrentUserReocrds(staffid, currentDate)
    return (
        <>
            {userAssessed &&
                <div className="flex " >
                    <MyCard
                        value={workLoad.totalNum}
                        maxValue={totalTaskNum}
                        color={
                            workLoad.totalNum / totalTaskNum > 0.5 ?
                                "success" :
                                "warning"
                        }
                        cardfoot={`通话个数 ${workLoad.totalNum} / ${totalTaskNum === Infinity ? '∞' : totalTaskNum} 个`}
                    />
                    <MyCard
                        value={Math.floor(workLoad.totalTime / 60)}
                        maxValue={totalTaskMinutes}
                        color={
                            Math.floor(workLoad.totalTime / 60) / totalTaskMinutes > 0.5 ?
                                "success" :
                                "warning"
                        }
                        cardfoot={`今日时长 ${Math.floor(workLoad.totalTime / 60)} / ${totalTaskMinutes === Infinity ? '∞' : totalTaskMinutes} 分钟`}
                    />
                    <MyCard
                        value={workLoad.totalAnswered}
                        maxValue={workLoad.totalNum || 1}
                        color={
                            workLoad.totalAnswered / workLoad.totalNum > 0.5 ?
                                "success" :
                                "warning"
                        }
                        cardfoot="接通率"
                    />
                </div>
            }
            <div className='flex  pb-5  h-full'>
                <MyTable data={tableData} />
            </div>
        </>
    )
}