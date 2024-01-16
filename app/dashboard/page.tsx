// import { useState } from "react"
import { MyCard } from "../components/cards"
import { MyTable } from "../components/table"
import { fetchUserRecords, fetchUserRecentRecords } from "../lib/data"


export default async function Page() {
    const currentDate = new Date().toISOString().slice(0, 10);
    // const [startDate, setStartDate] = useState(currentDate)
    const staffid = '8283'
    const userRecords = await fetchUserRecentRecords(staffid, currentDate)

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
                local_number: userRecord.outbound_cid,
                remote_number: userRecord.destination_number,
                formattedDuration: formatDuration(userRecord.duration)
            },
        }

        return userRecord.direction ? {
            ...userRecord,
            ...attachData[userRecord.direction]
        } : null

    })
    const totalMissionNum = 60
    const totalMissionMinutes = 100

    const compMission = () => {
        const filteredRecordsDuration = userRecords.filter((userRecord) => {
            return (
                userRecord.duration && userRecord.duration > 1
            )
        })
        const compTime = filteredRecordsDuration.reduce((acc, filteredRecord) => acc + (filteredRecord.duration ?? 0), 0)
        const compNum = userRecords.length
        const filteredRecordsAnswered = userRecords.filter((userRecord) => {
            return (
                userRecord.isanswer === '已接听'
            )
        })

        return (
            {
                totalNum: compNum,
                totalTime: compTime,
                totalAnswered: filteredRecordsAnswered.length
            }
        )
    }
    console.log(compMission().totalNum, compMission().totalAnswered)
    // console.log(tableRecords[0])
    return (
        <>
            <div className="flex " >
                <MyCard
                    value={compMission().totalNum}
                    maxValue={totalMissionNum}
                    color="success"
                    cardfoot={`通话个数${compMission().totalNum} / ${totalMissionNum} 个`}
                />
                <MyCard
                    value={Math.floor(compMission().totalTime / 60)}
                    maxValue={totalMissionMinutes}
                    color="success"
                    cardfoot={`今日时长 ${Math.floor(compMission().totalTime / 60)} / ${totalMissionMinutes} 分钟`}
                />
                <MyCard
                    value={compMission().totalAnswered}
                    maxValue={compMission().totalNum}
                    color="success"
                    cardfoot="接通率"
                />
            </div>
            <MyTable data={tableRecords} />
        </>
    )
}