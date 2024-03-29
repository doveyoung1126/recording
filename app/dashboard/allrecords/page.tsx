import { getUser } from "../../api/logto/user/get-user"
import AllRecordsTable from "../../components/allRecordsTable"
import { MyTable } from "@/app/components/table"
import { formatUsersReocrds } from "../../lib/formatdata"

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

    const { tableData } = await formatUsersReocrds(staffid, currentDate)
    const tmpdata = [
        {
            uuid: '7ea699f6-ece5-11ee-8dc0-89a67eeb5b6f',
            outbound_cid: '8283',
            destination_number: '9013469180889',
            direction: 'outbound',
            start_stamp: '2024-03-28T17:28:10.000Z',
            duration: 10,
            isanswer: '未接听',
            record_filename: null,
            formattedDirection: '呼出',
            formattedStart_stamp: '2024/3/28 17:28:10',
            local_number: '8283',
            remote_number: '9013469180889',
            formattedDuration: '0:00:10'
        }, {
            uuid: '8ea699f6-ece5-11ee-8dc0-89a67eeb5b6f',
            outbound_cid: '8283',
            destination_number: '9013469180889',
            direction: 'outbound',
            start_stamp: '2024-03-28T17:28:10.000Z',
            duration: 10,
            isanswer: '未接听',
            record_filename: null,
            formattedDirection: '呼出',
            formattedStart_stamp: '2024/3/28 17:28:10',
            local_number: '8283',
            remote_number: '9013469180889',
            formattedDuration: '0:00:10'
        }, {
            uuid: '6ea699f6-ece5-11ee-8dc0-89a67eeb5b6f',
            outbound_cid: '8253',
            destination_number: '9013469180889',
            direction: 'outbound',
            start_stamp: '2024-03-28T17:28:10.000Z',
            duration: 10,
            isanswer: '未接听',
            record_filename: null,
            formattedDirection: '呼出',
            formattedStart_stamp: '2024/3/28 17:28:10',
            local_number: '8253',
            remote_number: '9013469180889',
            formattedDuration: '0:00:10'
        }
    ]
    return (
        <>
            {/* <AllRecordsTable data={tableData} /> */}
            <MyTable data={tableData} isSearchAble />
        </>
    )

}

export default Page