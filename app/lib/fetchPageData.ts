import { getUser } from "../api/logto/user/get-user";
import { taskRequirements } from "../lib/constant";

export const fetchPageData = async () => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const user = await getUser()
    /* if (!user.isAuthenticated) {
        redirect('/api/logto/sign-in')
    } */


    const staffid = user.userInfo?.custom_data?.staffid

    if (!staffid) {
        return {
            staffid: ''
        }
    }

    const userGroups: string = user.userInfo?.custom_data?.groups ?? ''
    const userRole: string = user.userInfo?.custom_data?.role ?? ''
    const userAssessed: boolean = (user.userInfo?.custom_data?.assessed !== false)

}