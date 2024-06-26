import { NextResponse } from "next/server"
import { getUser } from "./app/api/logto/user/get-user"

export async function middleware() {
    const { isAuthenticated } = await getUser()
    if (!isAuthenticated) {
        return Response.json(
            { success: false, message: 'authentication failed' },
            { status: 401 }
        )
    } else {
        return NextResponse.next()
    }
}

export const config = {
    matcher: ['/api/download/:filepath*', '/api/fetch-users-records']
}