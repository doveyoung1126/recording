'use client'
import useSWR from 'swr'
import { formatCurrentUserReocrds } from '@/app/lib/formatdata'

export const UserTasks = ({ staffid, date }: {
    staffid: string,
    date: string
}) => {


    const fetcher = async ([staffid, date]: [string, string]) => {
        const { workLoad } = await formatCurrentUserReocrds(staffid, date)
        const data = JSON.stringify(workLoad)
        return data
    }

    const { data, error, isLoading } = useSWR([staffid, date], (e) => fetcher(e))
    console.log(data, 'data')
    console.log(error, 'error')
    console.log(isLoading, 'isLoading')

    return <div>{data}</div>
}

