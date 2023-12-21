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

            const formatDuration = `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
            return formatDuration;
        }

        const textMap = {
            inbound: '呼入',
            outbound: '呼出',
        }
        switch (userRecord.direction) {
            case 'inbound':
                return {
                    ...userRecord,
                    directionFormatted: `${textMap[userRecord.direction]}`,
                    formattedStart_stamp: userRecord.start_stamp?.toString(),
                    local_number: userRecord.destination_number,
                    remote_number: userRecord.outbound_cid,
                    durationFormatted: formatDuration(userRecord.duration)
                }
            default:
                return {
                    ...userRecord,
                    directionFormatted: `${textMap['outbound']}`,
                    formattedStart_stamp: userRecord.start_stamp?.toString(),
                    local_number: userRecord.outbound_cid,
                    remote_number: userRecord.destination_number,
                    durationFormatted: formatDuration(userRecord.duration)
                }
        }
    })
    return (
        <>
            <div className="flex">
                <MyCard value={60} color="success" cardfoot="今日工作进度 [FAKE]" />
                <MyCard value={80} color="success" cardfoot="本周工作进度 [FAKE]" />
                <MyCard value={20} color="warning" cardfoot="本周拒接率 [FAKE]" />
            </div>
            <MyTable data={tableRecords} />
        </>
    )
}