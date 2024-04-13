import { UserTasks } from "@/app/components/user-tasks"
import { getUser } from "../../api/logto/user/get-user"
import dayjs from 'dayjs'

const Page = async () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const user = await getUser()
    const staffid = user.userInfo?.custom_data?.staffid

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

    return (
        <>
            <UserTasks staffid={staffid} startDate='2024-04-11' />
        </>
    )
}

export default Page