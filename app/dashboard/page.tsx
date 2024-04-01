import { redirect } from "next/navigation";
import { getUser } from "../api/logto/user/get-user";
import { MyCard } from "../components/cards"
import { MyTable } from "../components/table"
import { formatCurrentUserReocrds } from "../lib/formatdata"
import { taskRequirements } from "../lib/constant";

export default async function Page() {
    const currentDate = new Date().toISOString().slice(0, 10);
    const user = await getUser()
    /* if (!user.isAuthenticated) {
        redirect('/api/logto/sign-in')
    } */


    console.log(user)
    const staffid = user.userInfo?.custom_data?.staffid
    const userGroups: string = user.userInfo?.custom_data?.groups ?? ''
    const userRole: string = user.userInfo?.custom_data?.role ?? ''
    const userAssessed: boolean = (user.userInfo?.custom_data?.assessed !== false)

    if (!staffid) {
        return (
            <>
                <h1>Are you sales?</h1>
                <h1>It seems you do not have a phone number, or the Administrator has not set it up.</h1>
                <h1>Please contact the Administrator if you ensure you should have been able to see something.</h1>
                {/* <h1>{user.userInfo?.email}</h1> */}
            </>
        )
    }
    // const staffid = '8283'
    // const totalMissionNum = 60
    // const totalMissionMinutes = 100
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
                        cardfoot={`通话个数${workLoad.totalNum} / ${totalTaskNum === Infinity ? '∞' : totalTaskNum} 个`}
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
            <div className='flex  pb-5 bg-red-200 h-full'>
                <MyTable data={tableData} />
            </div>
        </>
    )
}