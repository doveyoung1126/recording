'use client'
import useSWR from 'swr'
import dayjs from 'dayjs'
import { MyRecord, TaskData } from '../lib/type'
import React from 'react'
import { MyTaskData } from '@/app/components/my-task-data'
import { TaskTable } from './task-table'

const fetcher = async (params: string) => {
    try {
        const res
            = await fetch('/recording/api/fetch-users-records')
        if (!res.ok) {
            throw new Error(`Error ${res.status}`)
        }

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

    const calculateTask = (data: MyRecord) => {
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
    }

    const weeklyTaskData = React.useMemo(() => {

        if (data && data.length > 0) {

            const userTasks = calculateTask(data)

            return userTasks
        } else {
            return []
        }

    }, [data])

    const todayTaskData = React.useMemo(() => {
        if (data && data.length > 0) {
            const filteredTodayTask = data.filter((task) =>
                dayjs(task.start_stamp).isSame(dayjs(), 'day')
            )
            const todayTask = calculateTask(filteredTodayTask)
            return todayTask
        }
        return []
    }, [data])

    return (
        <div>
            <TaskTable todayTaskData={todayTaskData} weeklyTaskData={weeklyTaskData} isLoading={isLoading} />
        </div>
    )
}