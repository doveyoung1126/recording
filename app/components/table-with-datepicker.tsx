'use client'
import React from "react"
import { formatUsersReocrds } from "../lib/formatdata"
import { MyTable } from "./table"
import { DatePicker } from "antd"
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { Button } from "@nextui-org/react"


export const TableWithDatePicker = ({ staffid }: { staffid: string }) => {
    const currentDate = new Date().toISOString().slice(0, 10)
    // const [startDate, setStartDate] = React.useState<string>(currentDate)
    // const [endDate, setEndDate] = React.useState<string>(currentDate)
    const [data, setData] = React.useState<any>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [queryButtonIsloading, setQueryButtonIsLoading] = React.useState(false)
    const [dates, setDates] = React.useState<[Dayjs | null, Dayjs | null]>([null, null])
    // const startDate = dates?[0].toISOString().slice(0, 10) || currentDate
    const tmpDate = dates ? (dates[0] ? dates[0].toISOString().slice(0, 10) : currentDate) : currentDate
    const tmpDate2 = dates?.[0]?.toISOString().slice(0, 10) ?? currentDate
    // const startDate = dates?.[0]?.toLocaleDateString().slice(0, 10) ?? currentDate
    const startDate = dates?.[0]?.format('YYYY-MM-DD') ?? currentDate
    const endDate = dates?.[1]?.format('YYYY-MM-DD') ?? currentDate
    const minDatePicker = dayjs().subtract(1, 'month').startOf('month')
    const maxDatePicker = dayjs()
    // const endDate = dates?.[1]?.toISOString().slice(0, 10) ?? startDate

    console.log(dates, 'Date picker value')
    console.log(startDate, 'startDate')
    console.log(endDate, 'endDate')
    const fetchData = React.useCallback(async (date1: string, date2: string = date1) => {
        setIsLoading(true)
        const fetchedData = await formatUsersReocrds(staffid, date1, date2)
        setData(fetchedData.tableData)
        setIsLoading(false)
        setQueryButtonIsLoading(false)
    }, [staffid])

    React.useEffect(() => {
        setIsLoading(true)
        fetchData(currentDate)
    }, [currentDate, fetchData])

    const handleRefresh = () => {
        setQueryButtonIsLoading(true)
        fetchData(startDate, endDate)
    }
    const { RangePicker } = DatePicker

    return (
        <div className="flex flex-col pb-10 h-full space-y-4">
            <div className="flex flex-row space-x-4 ">
                <RangePicker
                    className="w-1/4"
                    value={dates}
                    minDate={minDatePicker}
                    maxDate={maxDatePicker}
                    onChange={(e) => setDates(e)}
                />
                <Button isLoading={queryButtonIsloading}
                    disabled={queryButtonIsloading}
                    variant="faded"
                    onClick={handleRefresh}
                >
                    {queryButtonIsloading ? "查询中..." : "查询"}
                </Button>
            </div>
            <MyTable data={data} isSearchAble isLoading={isLoading} />
        </div>
    )
}