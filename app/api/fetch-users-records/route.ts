import { fetchUsersRecords } from "@/app/lib/data"
import { NextResponse } from "next/server"
import { getUser } from "../logto/user/get-user"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const staffid = searchParams.get('staffid')
    const currentDate = new Date().toISOString().slice(0, 10)
    const startDate = searchParams.get('startDate') ?? currentDate
    const endDate = searchParams.get('endDate')
    const user = await getUser()

    if (user.userInfo?.custom_data?.staffid === staffid) {
        const data
            = await fetchUsersRecords(staffid, startDate, endDate ? endDate : startDate)

        return NextResponse.json(data)
    } else {
        return NextResponse.json({ error: 'Params Error Or Unauthenticated', status: 400 })
    }
}
