'use client'
import useSWR from 'swr'
import dayjs from 'dayjs'
import { MyRecord, TaskData } from '../lib/type'
import React from 'react'

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


    const resault = React.useMemo(() => {
        if (data) {
            const userTasks = data.reduce((acc, curr) => {
                const { agent_staffid, agent_name, direction, duration } = curr
                if (!agent_staffid || direction === 'local') {
                    return acc
                }

                if (!acc[agent_staffid]) {
                    acc[agent_staffid] = {
                        agent_staffid,
                        agent_name: agent_name || '0',
                        incomingDuration: 0,
                        outgoingDuration: 0,
                        totalDuration: 0,
                        incomingCount: 0,
                        outgoingCount: 0,
                        totalCount: 0,
                    }
                }


                acc[agent_staffid].totalDuration += duration ?? 0
                acc[agent_staffid].totalCount++

                if (direction === 'inbound') {
                    acc[agent_staffid].incomingDuration += duration ?? 0
                    acc[agent_staffid].incomingCount++
                }

                if (direction === 'outbound') {
                    acc[agent_staffid].outgoingDuration += duration ?? 0
                    acc[agent_staffid].outgoingCount++
                }


                return acc
            }, {} as Record<string, TaskData>)

            return Object.values(userTasks)
        } else {
            return {} as TaskData[]
        }
    }, [data])

    return (
        <>
            {isLoading ? 'isLoading' : resault.map((task) =>
                <li key={task.agent_staffid}> {JSON.stringify(task)} </li>
            )}
        </>
    )
}