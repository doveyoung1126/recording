import { MyCard } from "../components/cards"
import { MyTable } from "../components/table"
import { fetchUserRecords } from "../lib/data"


export default async function Page() {
    const userRecords = await fetchUserRecords()

    const tableRecords = userRecords.map((userRecord) => {
        function formatDuration(seconds: number | null) {

            if (seconds === 0 || !seconds) {
                return '0'
            }

            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;

            const formatedDuration = `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
            return formatedDuration;
        }

        const attachData: Record<string, any> = {
            inbound: {
                formattedDirection: '呼入',
                formattedStart_stamp: userRecord.start_stamp?.toLocaleString('zh-CN'),
                local_number: userRecord.destination_number,
                remote_number: userRecord.outbound_cid,
                formattedDuration: formatDuration(userRecord.duration)
            },
            outbound: {
                formattedDirection: '呼出',
                formattedStart_stamp: userRecord.start_stamp?.toLocaleString('zh-CN'),
                local_number: userRecord.destination_number,
                remote_number: userRecord.outbound_cid,
                formattedDuration: formatDuration(userRecord.duration)
            },
        }

        return userRecord.direction ? {
            ...userRecord,
            ...attachData[userRecord.direction]
        } : null



    })
    return (
        <>
            <div className="flex " >
                <MyCard value={50} color="success" cardfoot="通话个数 10 / 20" />
                <MyCard value={40} color="success" cardfoot="今日时长 120 / 300" />
                <MyCard value={30} color="warning" cardfoot="今日拒接率" />
            </div>
            <MyTable data={tableRecords} />
        </>
    )
}