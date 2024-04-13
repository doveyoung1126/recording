'use client'
import useSWR from 'swr'
import dayjs from 'dayjs'
import { MyRecord } from '../lib/type'

const fetcher = async (params: string) => {
    try {
        const res
            = await fetch(`/recording/api/fetch-users-records?${params}`)

        return await res.json() as MyRecord

    } catch (error) {
        throw error
    }
}


export const UserTasks = ({ staffid, startDate, endDate }: {
    staffid: string,
    startDate: string,
    endDate?: string
}) => {

    const { data, error, isLoading }
        = useSWR(`staffid=${staffid}&startDate=${startDate}`, fetcher)

    console.log(data)

    return (
        <>
            hi
            {isLoading ? 'isLoading' : data?.map((e) =>
                <p key={e.uuid}> {e.uuid} </p>
            )}

        </>
    )
}