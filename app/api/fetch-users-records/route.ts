import { fetchUsersRecords } from "@/app/lib/data"
import { NextResponse } from "next/server"
import { getUser } from "../logto/user/get-user"
import dayjs from 'dayjs'


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    // const staffid = searchParams.get('staffid')
    const user = await getUser()
    const staffid = user.userInfo?.custom_data?.staffid

    dayjs.locale('zh', { weekStart: 1 })
    const startOfWeek = dayjs().startOf('week').format('YYYY-MM-DD')
    const endOfWeek = dayjs().endOf('week').format('YYYY-MM-DD')

    console.log(startOfWeek, endOfWeek)

    if (staffid) {
        const data
            = await fetchUsersRecords(staffid, startOfWeek, endOfWeek)

        return NextResponse.json(data)
    } else {
        return NextResponse.json({ error: 'Params Error Or Unauthenticated' }, { status: 400 })
    }
}
