'use server'
import { fetchCurrentUserRecords, fetchUsersRecords } from "./data"
import type { MyRecord } from "./type"

export const formatCurrentUserReocrds = async (
    staffid: string,
    date: string,
) => {
    const fetchData = fetchCurrentUserRecords
    const records: MyRecord = await fetchData(staffid, date)
    const data = await formatData(records)

    return data
}

export const formatUsersReocrds = async (
    staffid: string,
    date: string,
    isLeader?: boolean,
) => {
    const fetchData = fetchUsersRecords
    const records: MyRecord = await fetchData(staffid, date)
    const data = await formatData(records)

    return data
}

const formatData = async (records: MyRecord) => {
    const filteredData = records.filter((record) => (
        record.direction !== "local" && Boolean(record.duration) && Boolean(record.direction)
    ))

    const formattedData = filteredData.map((record) => {

        /*         if (!record.direction
                    || record.direction === "local"
                    || !record.duration
                    || record.duration === 0) {
        
                    return
                }
         */
        const direction = record.direction || "未知"
        function formatDuration(duration: number | null) {
            const seconds = duration || 0

            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;

            const formattedDuration = `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
            return formattedDuration;
        }

        const attachData: Record<string, any> = {
            inbound: {
                formattedDirection: '呼入',
                formattedStart_stamp: record.start_stamp?.toLocaleString('zh-CN'),
                local_number: record.destination_number,
                remote_number: record.outbound_cid,
                formattedDuration: formatDuration(record.duration)
            },
            outbound: {
                formattedDirection: '呼出',
                formattedStart_stamp: record.start_stamp?.toLocaleString('zh-CN'),
                local_number: record.outbound_cid,
                remote_number: record.destination_number,
                formattedDuration: formatDuration(record.duration)
            },
        }



        return {
            ...record,
            ...attachData[direction]
        };


    })
    const compWorkLoad = () => {
        const filteredRecordsDuration = records.filter((record) => {
            return (
                record.duration && record.duration > 1
            )
        })
        const compTime = filteredRecordsDuration.reduce((acc, filteredRecord) => acc + (filteredRecord.duration ?? 0), 0)
        const compNum = records.length
        const filteredRecordsAnswered = records.filter((record) => {
            return (
                record.isanswer === '已接听'
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
        tableData: formattedData,
        workLoad: compWorkLoad()
    }
}