'use server'
import { fetchDayUserRecords } from "./data"



export const formatUserTodayRecords = async (
    staffid: string,
    date: string
) => {
    const userTodayRecords = await fetchDayUserRecords(staffid, date)
    const formattedUserTodayRecords = userTodayRecords.map((userTodayRecord) => {

        if (!userTodayRecord.direction
            || userTodayRecord.direction === "local"
            || !userTodayRecord.duration
            || userTodayRecord.duration === 0) {

            return
        }

        function formatDuration(seconds: number) {

            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;

            const formatedDuration = `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
            return formatedDuration;
        }

        const attachData: Record<string, any> = {
            inbound: {
                formattedDirection: '呼入',
                formattedStart_stamp: userTodayRecord.start_stamp?.toLocaleString('zh-CN'),
                local_number: userTodayRecord.destination_number,
                remote_number: userTodayRecord.outbound_cid,
                formattedDuration: formatDuration(userTodayRecord.duration)
            },
            outbound: {
                formattedDirection: '呼出',
                formattedStart_stamp: userTodayRecord.start_stamp?.toLocaleString('zh-CN'),
                local_number: userTodayRecord.outbound_cid,
                remote_number: userTodayRecord.destination_number,
                formattedDuration: formatDuration(userTodayRecord.duration)
            },
        }



        return {
            ...userTodayRecord,
            ...attachData[userTodayRecord.direction]
        };


    })
    const compWorkLoad = () => {
        const filteredRecordsDuration = userTodayRecords.filter((userTodayRecord) => {
            return (
                userTodayRecord.duration && userTodayRecord.duration > 1
            )
        })
        const compTime = filteredRecordsDuration.reduce((acc, filteredRecord) => acc + (filteredRecord.duration ?? 0), 0)
        const compNum = userTodayRecords.length
        const filteredRecordsAnswered = userTodayRecords.filter((userTodayRecord) => {
            return (
                userTodayRecord.isanswer === '已接听'
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
    return {
        tableData: formattedUserTodayRecords,
        workLoad: compWorkLoad()
    }
}